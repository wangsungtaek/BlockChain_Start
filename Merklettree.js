// Import modules
const SHA256 = require("crypto-js/sha256");
const { MerkleTree } = require("merkletreejs");


// SHA256 테스트
console.log("SHA256('a')", SHA256("a"));
console.log("SHA256('a').toString() : ", SHA256('a').toString());

// 머클 트리 만들기
const testSet = ['a', 'b', 'c', 'd', 'e']
const testArray = testSet.map((v) => SHA256(v).toString());
const testMerkleTree = new MerkleTree(testArray, SHA256);

console.log(testArray);
console.log("testMerkleTree : ", testMerkleTree);

// Get merkleRoot
const merkleRoot = testMerkleTree.getRoot();
console.log("merkleRoot : ", merkleRoot);


// 머클 트리 값 검증
const testValue_valid = 'u';
const leaf_valid = SHA256(testValue_valid).toString();
const proof_valid = testMerkleTree.getProof(leaf_valid);
const result_valid = testMerkleTree.verify(proof_valid, leaf_valid, merkleRoot);
console.log('leaf_valid: ', leaf_valid);
console.log('proof_valid: ', proof_valid);
console.log('result_valid: ', result_valid);
