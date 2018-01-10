var fs = require("fs")
var Web3 = require('web3')

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

web3.eth.accounts
code = fs.readFileSync('Voting.sol').toString()
solc = require('solc')
var compiledCode = solc.compile(code)

//console.log("Compiled", compiledCode)

var abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
var VotingContract = web3.eth.contract(abiDefinition)
var byteCode = compiledCode.contracts[':Voting'].bytecode

var contractInstance = VotingContract.new(["Rama", "Nick", "Jose"], {
    data: byteCode,
    from: web3.eth.accounts[0],
    gas: web3.eth.estimateGas({ data: byteCode }) * 2
}, (err, res) => {
    if (err) {
        console.log(err)
        return;
    }   

    // If we have an address property, the contract was deployed
    if (res.address) {
        console.log('Contract address: ' + res.address)
    } else {
         // Log the tx, you can explore status with eth.getTransaction()
        console.log('transaction', res.transactionHash)
    }
})



