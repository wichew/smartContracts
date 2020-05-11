const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface, bytecode } = require('../compile.js');


let accounts;
let inbox;
beforeEach( async() => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    //Use one of those accounts to deploy
    //the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({ from: accounts[0], gas: '1000000' })
    
    inbox.setProvider(provider);
    await inbox.methods.set("Hi there!").send({from: accounts[0]});
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        //await inbox.methods.set('Hi there!').call();
        let message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });

    it('can change data', async () => {
       await inbox.methods.set('Bye').send({from: accounts[0]})
       let message = await inbox.methods.get().call();
       assert.equal(message, 'Bye');
    });

});




/*class Car {
    park() {
        return 'stopped';
    }
}

let car;

beforeEach(() => {
    car = new Car();    
});

describe('Car', () => {
    it('can park', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('can drive', () => {
        assert.equal(car.drive(), 'vroom');
    });
});*/
