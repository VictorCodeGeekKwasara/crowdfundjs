const { Keypair } = require('@solana/web3.js');
const { Connection} = require('@solana/web3.js');
const { fs } = require('mz');

async function establishConnection() {

  const rpcUrl = 'http://localhost:8899';

  let connection = new Connection(rpcUrl, 'confirmed');

  const version = await connection.getVersion();

  console.log('Connection to cluster established:' , rpcUrl, version) ;
}

establishConnection()

async function createKeypairFromFile() {

  const secretKeyString = await fs.readFile("~/.config/solana/id.json", {encoding:'utf8'});

  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));

  return Keypair.fromSecretKey(secretKey);
}