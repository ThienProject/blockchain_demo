import hash from 'crypto-js/sha256.js';

class Block {
	constructor(prevHash, data) {
		this.prevHash = prevHash;
		this.data = data;
		this.timestamp = Date.now();
		this.createHash();
		this.mineVar = 0;
	}

	mineBlock(level) {
		while(!this.hash.startsWith('0'.repeat(level))) {
			this.mineVar++;
			this.createHash();
		}
	}
	createHash() {
		this.hash = hash(this.prevHash + JSON.stringify(this.data) + this.timestamp + this.mineVar).toString();
	}
}

class Blockchain {
	constructor() {
		this.chain = [];
		this.chain.push(this.genesisBlock());
	}

	genesisBlock() {
		return new Block('0', {from: 'admin', to: '0x'});
	}

	getLatestBlock = () => {
		return this.chain[this.chain.length - 1];
	}

	addBlock = (data) => {
		const prevHash = this.getLatestBlock().hash;
		const block = new Block(prevHash, data);
		block.mineBlock(4);
		this.chain.push(block);
	}

	isValid = ()=> {
		for(let i=0; i<this.chain.length -1; i++ ){
			if(this.chain[i].hash !== this.chain[i+1].prevHash) {
				return false;
			}
		}
		return true;
	}
}

const blockchain = new Blockchain();
blockchain.addBlock({from: 'user1', to: '0x123', amount: 100});
blockchain.addBlock({from: 'user2', to: '0x456', amount: 5});
blockchain.addBlock({from: 'user3', to: '0x789', amount: 20});

// fake hack to data return check false;
// blockchain.chain[2].data = {from: 'user3', to: '0x789', amount: 200};
// blockchain.chain[2].createHash();
//


console.log(blockchain.chain);
console.log(blockchain.isValid());