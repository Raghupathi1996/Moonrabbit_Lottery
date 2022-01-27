//var Web3 = require('web3');
const Lottery = artifacts.require("Lottery");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Lottery", (accounts) => {
  beforeEach(async () => {
  instance = await Lottery.new({from: accounts[1]});
  });
  
  it("should assert true", async () => {
    await Lottery.deployed();
    return assert.isTrue(true);
  });
  // let intance
  // beforeEach('setup contarct for each test', async function (){
  //   instance = await Lottery.new();
  // });
  it("constructor should initialize manager", async () => {
    //const instance = await Lottery.deployed();
    let Manager = await instance.manager.call();
    let deployer = accounts[1];
    let abc = await instance.getmanager.call();
    // console.log(Manager);
    // console.log(deployer);
    // console.log(instance.manager.call());
    // console.log(instance.manager());
    //console.log(abc);
    assert.equal(Manager, deployer,"address of the manager should be the deployers adderss");

  });

  it("entering in to the game", async () => {
    let new_player = accounts[1];
    await instance.enter({ from: new_player, value: String(1e17)});
    let Player = await instance.players.call('0');
    // console.log(new_player);
    // console.log(Player);
    
    assert.equal(Player, new_player, 'new player was not added');
  });

  it("has funding balance at inital and after transaction", async () => {

    // instance = await Lottery.new({from: accounts[1]});
    // console.log(instance.address);
    let balance = await web3.eth.getBalance(instance.address);//.toNumber();
    //console.log(balance);
    //let bal = balance.toNumber();
    // let bal = web3.utils.toBN(balance).toString();
    // console.log(bal);
    let abc = await web3.utils.toWei('0', 'ether');
    //console.log(abc);
    assert.equal(balance, abc, "balance at inital before fund transfer should be zero");
    let new_player = accounts[1];
    await instance.enter({ from: new_player, value: String(1e17)});
    balance = await web3.eth.getBalance(instance.address);
    //console.log(balance);
    abc = await web3.utils.toWei('0.1', 'ether');
    //console.log(abc);
    assert.equal(balance, abc, "balance after fund transfer should be 0.1 ether");

  });

  it("restricts players from selecting winner", async() => {
    try{
      await Lottery.pickWinner({ from: accounts[0]});
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("allows manager to select winner", async () => {
    try{
      await Lottery.pickWinner({from: accounts[1]});
      assert(True);
    } catch (err) {
      assert(err);
    }
  });





});


// let lottery;
// before(async () => {
//   lottery = await Lottery.new();
// });

// contract('Lottery', function(accounts){
//   it("is the managers_address equal to deployer_address", async () =>{

//   })
// })


// refer: https://docs.morpheuslabs.io/docs/testing-the-solidity-smart-contract-step-by-step

