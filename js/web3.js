const preSaleAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_beneficiary",
				"type": "address"
			}
		],
		"name": "buyTokens",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_beneficiary",
				"type": "address"
			}
		],
		"name": "canClaim",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_beneficiary",
				"type": "address"
			}
		],
		"name": "claimTokens",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "geUnlockTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "lock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unlock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const preSaleAddress = "0x1399aa3C0c19526c32966036319871a2d67093fD";
var amount = document.getElementById("bnbAmount");
var modallink = document.getElementById("myModal");

async function buyToken() {
    if(web3 !== undefined){
		console.log("clicked");
		let bnbval = $("#bnbvalue").val();
        let bnb = web3.utils.toWei(bnbval);
        let userAddress = accounts[0];
        console.log("sending Transaction");
		$("#bnbvalue").val("0");
        await preSaleContract.methods.buyTokens(userAddress).send({value: bnb,from: accounts[0]}).then(function(result){
			window.alert("Purchase of " + bnbval + " BNB presale successful")
		});
		modallink.style.display = "none";

    }else{
        console.log("something went wrong");
    }
}

async function collectToken() {
    if(web3 !== undefined){
		console.log("clicked");
        
        let userAddress = accounts[0];
        console.log("sending Transaction");
        await preSaleContract.methods.claimTokens(userAddress).send({from: accounts[0]}).then(function(result){
			window.alert("Successfully claimed Tokens")
		});
		modallink.style.display = "none";

    }else{
        console.log("something went wrong");
    }
}

window.onload = async () => {
    if(window.ethereum){
        try {
            web3 = new Web3(window.ethereum);
            accounts = await ethereum.enable();
			preSaleContract = new web3.eth.Contract(preSaleAbi,preSaleAddress);
            console.log("Web3 connected 1")
        }catch(e) {
            //console.log(e)
        }
    }else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
        accounts = await web3.eth.getAccounts();
		preSaleContract = new web3.eth.Contract(preSaleAbi,preSaleAddress);
        console.log("Web3 connected 2");

    }
    else{
        
    }
};


async function collect(){
	
}


async function connectWallet() {
	console.log("clicked");
    if(window.ethereum){
        try {
            web3 = new Web3(window.ethereum);
            accounts = await ethereum.enable();
			preSaleContract = new web3.eth.Contract(preSaleAbi,preSaleAddress);
            console.log("Web3 connected")
        }catch(e) {
            console.log(e)
        }
    }else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
        accounts = await web3.eth.getAccounts();
		preSaleContract = new web3.eth.Contract(preSaleAbi,preSaleAddress);
        console.log("Web3 connected")
		

    }
    else{
        
    }
    if (window.web3.currentProvider.selectedAddress == ""){
        $(".walletConnect").html('Connect Wallet');
		$("#walletaddress").hide();
    }else{
        $(".walletConnect").hide();
		var textlable = document.getElementById("walletaddress");
		textlable.innerText = "Wallet " + accounts[0] + " Connected";
		$("#walletaddress").show();
		setInterval(getData, 1000)
    }
    
}


async function getData() {
    if(web3 !== undefined){
		console.log("getting data");
        let userAddress = accounts[0];
		// gets the current state of the presale variable
        preSaleContract.methods.canClaim().call({from: accounts[0]}).then(function(returnedVal){
			console.log(returnedVal);
			//we now have the state variabler
			if(returnedVal == false || returnedVal == "false"){
				console.log("were false")
				var purchase  = document.getElementById("purchaseDiv");
				var collect = document.getElementById("collectDiv");
				collect.style.display = "none";
				purchase.style.display = "inline";
			}else{
				console.log("were true")
				var purchase  = document.getElementById("purchaseDiv");
				var collect = document.getElementById("collectDiv");
				collect.style.display = "inline";
				purchase.style.display = "none";
			}
			
		});

    }else{
        console.log("something went wrong");
    }
}


