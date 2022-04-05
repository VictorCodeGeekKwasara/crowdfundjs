const {
  Connection,
  TransactionInstruction,
  Keypair,
  sendAndConfirmTransaction,
  Transaction,
  PublicKey,
  SystemProgram,
} = require('@solana/web3.js');

const { fs } = require('mz');

let connection ;

async function establishConnection() {

  const rpcUrl = 'http://localhost:8899';

  connection = new Connection(rpcUrl, 'confirmed');

  const version = await connection.getVersion();

  console.log('Connection to cluster established:' , rpcUrl, version) ;
}

establishConnection()

async function createKeypairFromFile() {

  const secretKeyString = await fs.readFile("/home/professorcodegeek/.config/solana/id.json", {encoding:'utf8'});

  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));

  return Keypair.fromSecretKey(secretKey);
}


async function createAccount() {

const signer = await createKeypairFromFile();
const newAccountPubkey = await PublicKey.createWithSeed(
  signer.publicKey,
  "campaign1",
  new PublicKey("7JMG1nUG9aF16PQD7gUseKeUuPaVENfqcCVkFJH9x7dq")
);
const lamports = await connection.getMinimumBalanceForRentExemption(
  1024,
)
const instruction = SystemProgram.createAccountWithSeed({
  fromPubkey:signer.publicKey,
  basePubkey:signer.publicKey,
  seed:"campaign1",
  newAccountPubkey,
  lamports,
  space:1024,
  programId: new PublicKey("7JMG1nUG9aF16PQD7gUseKeUuPaVENfqcCVkFJH9x7dq"),
});
const transaction = new Transaction().add(
  instruction
)
console.log(`The address of the campaign1 is: ${newAccountPubkey.toBase58()}`);

await sendAndConfirmTransaction(connection,transaction,[signer]);  
}

createAccount();








