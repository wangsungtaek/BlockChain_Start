const SHA256 = require("crypto-js/sha256");
const { merkle } = require("merkletreejs");

class Block {
  constructor(header, body) {
    this.header = header;
    this.body = body;
  }
}

class BlockHeader {
  constructor(
    version,
    index,
    previousBlockHash,
    merkleRoot,
    timestamp,
    difficulty,
    nonce
  ) {
    this.version = version;
    this.index = index;
    this.previousBlockHash = previousBlockHash;
    this.merkleRoot = merkleRoot;
    this.timestamp = timestamp;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }
}

// Genesis Block
function createGenesisBlock() {
  const version = getVersion();
  const index = 0;
  const previousBlockHash = ('0').repeat(64);
  const timestamp = parseInt(Date.now()/1000);
  const body = ["Genesis Block"];
  const tree = merkle("sha256").sync(body);
  const merkleRoot = tree.root() || '0'.repeat(64);
  const difficulty = 0;
  const nonce = 0;

  const header = new BlockHeader(
    version,
    index,
    previousBlockHash,
    merkleRoot,
    timestamp,
    difficulty,
    nonce
  );

  return new Block(header, body);
}

// 블록 해시화
function createHeash(block) {
  const {
    version,
    index,
    previousBlockHash,
    merkleRoot,
    timestamp,
    difficulty,
    nonce
  } = block.header;

  const blockString = version + index + previousBlockHash + merkleRoot + timestamp + difficulty + nonce;
  const hash = SHA256(blockString).toString();

  return hash;
}