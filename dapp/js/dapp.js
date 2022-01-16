/* Moralis init code */
const serverUrl = "https://azabf5m0ll7e.usemoralis.com:2053/server";
const appId = "EITqHfNiV9kpMCeH57o1u6JxuQ2QcmuFCDEhHMCY";
Moralis.start({ serverUrl, appId });

var chains = {};
chains["eth"] = 1;
chains["ropsten"] = 3;
chains["rinkeby"] = 4;
chains["goerli"] = 5;
chains["kovan"] = 42;
chains["bsc"] = 56;
chains["polygon"] = 137;
chains["mumbai"] = 80001;
chains["avalanche"] = 43114;
chains["avalanche testnet"] = 43113;
chains["fantom"] = 250;

var chain = "mumbai";

var rpcURLs = {};
rpcURLs.rinkeby = "eth-rinkeby.alchemyapi.io/v2/n_mDCfTpJ8I959arPP7PwiOptjubLm57";
rpcURLs.mumbai = "polygon-mumbai.g.alchemy.com/v2/Ptsa6JdQQUtTbRGM1Elvw_ed3cTszLoj";
rpcURLs.polygon = "polygon-mainnet.g.alchemy.com/v2/Ptsa6JdQQUtTbRGM1Elvw_ed3cTszLoj";

var factory;
var ethersFactory;
var web3;
var BN;
var blockExplorer = ""
var addr = {};
var chosenChain = 1;
var chosenChainName = "eth";
var ninesAddress;
var nines;
var chosenNFT = {};
var ninesIds;

var factories = {};
factories.rinkeby =     "";
factories.mumbai =      "0xd957f6EC278BD6105910aF73FdEB23626516966E";
factories.polygon =     ""; // localhost:polygon
var factoryAddress = factories[chain];

function getFactory() {
    var rpcURL = rpcURLs[chain];
    factoryAddress = factories[chain];
    ninesAddress = factoryAddress;
    //rpcURL = "localhost:8545";                  //localhost!!!!
    web3 = AlchemyWeb3.createAlchemyWeb3("wss://"+rpcURL);
    //web3 = AlchemyWeb3.createAlchemyWeb3("http://"+rpcURL); // localhost!!!!
    //const prov = {"url": "http://"+rpcURL};           //localhost!!!!
    const prov = {"url": "https://"+rpcURL};
    var provider = new ethers.providers.JsonRpcProvider(prov);

    nines = new web3.eth.Contract(ninesABI, ninesAddress);
    ethersNines = new ethers.Contract(ninesAddress, ninesABI, provider);
    BN = web3.utils.BN;
    setAddr();
}
getFactory();

const ipfsURL = "https://api.nft.storage/upload";
var showWizard = false;

var roles = {
    MANAGER: web3.utils.keccak256("MANAGER_ROLE"),
    REGISTRAR: web3.utils.keccak256("REGISTRAR_ROLE")
};

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

function setAddr() {
    if (chain == "mumbai") {
        //Mumbai:
        blockExplorer = "https://mumbai.polygonscan.com/";
        addr.router = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
        addr.Resolver = "0x8C54C83FbDe3C59e59dd6E324531FB93d4F504d3";
        addr.SuperTokenFactory = "0x200657E2f123761662567A1744f9ACAe50dF47E6";
        addr.SuperHost = "0xEB796bdb90fFA0f28255275e16936D25d3418603";
        addr.cfa = "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873";
        addr.WETH = "0x3C68CE8504087f89c640D02d133646d98e64ddd9";
        addr.DAI = "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F";
        addr.USDC = "0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e";
        addr.WETHx = "0x7dA8ba196E747eec76246726Dc5BFC8a459BCD3e";
    }
    if (chain == "polygon") {
        //Polygon
        blockExplorer = "https://polygonscan.com/";
        addr.router = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
        addr.Resolver = "0xE0cc76334405EE8b39213E620587d815967af39C";
        addr.SuperTokenFactory = "0x2C90719f25B10Fc5646c82DA3240C76Fa5BcCF34";
        addr.SuperHost = "0x3E14dC1b13c488a8d5D310918780c983bD5982E7";
        addr.cfa = "0x6EeE6060f715257b970700bc2656De21dEdF074C";
        addr.WETH = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
        addr.DAI = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
        addr.USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
        addr.ETHx = "0x27e1e4E6BC79D93032abef01025811B7E4727e85";
        addr.WETHx = "0x27e1e4E6BC79D93032abef01025811B7E4727e85";
        addr.USDCx = "0xCAa7349CEA390F89641fe306D93591f87595dc1F";
        addr.WBTC = "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6";
        addr.WBTCx = "0x4086eBf75233e8492F1BCDa41C7f2A8288c2fB92";
        addr.DAIx = "0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2";
    }
    if ( chain == "rinkeby" ) {
        blockExplorer = "https://rinkeby.etherscan.io/";
        addr.router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
        addr.Resolver = "0x659635Fab0A0cef1293f7eb3c7934542B6A6B31A";
        addr.SuperTokenFactory = "0xd465e36e607d493cd4CC1e83bea275712BECd5E0";
        addr.SuperHost = "0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6";
        addr.cfa = "0xF4C5310E51F6079F601a5fb7120bC72a70b96e2A";
        addr.WETH = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
        addr.DAI = "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa";
        addr.USDC = "";
        addr.ETHx = "0xa623b2DD931C5162b7a0B25852f4024Db48bb1A0";
        addr.WETHx = addr.ETHx; // "0x3FbcaeaA76d6f7Fe31DaEa1655b97F1436c0a747";
        addr.USDCx = "";
        addr.WBTC = "";
        addr.WBTCx = "";
        addr.DAIx = "";
        addr.fDAI = "0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7";
        addr.fDAIx = "0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90";
        addr.fUSDC = "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2";
        addr.fUSDCx = "0x0F1D7C55A2B133E000eA10EeC03c774e0d6796e8";
    }
}
setAddr();
var chainName = {};
chainName.rinkeby = "Ethereum Testnet Rinkeby";
chainName.ethereum = "Ethereum Network";
chainName.polygon = "Matic(Polygon) Mainnet";
chainName.mumbai = "Mumbai(Polygon) Testnet";

var gas = web3.utils.toHex(new BN('3000000000')); // 3 Gwei;
var dappChain = 4; // default to Rinkeby
var userChain;
var accounts;

var showProfile = false;

function abbrAddress(address){
    if (!address) {
        address = ethereum.selectedAddress;
    }
    return address.slice(0,4) + "..." + address.slice(address.length - 4);
}


async function main() {
    $(".section").hide();
    $(".welcome").show();
    dappChain = await web3.eth.getChainId();
    console.log("The chainId is " + dappChain);

    accounts = await web3.eth.getAccounts();
    
    userChain = await ethereum.request({ method: 'eth_chainId' });
    console.log("The chainId of connected account is " + web3.utils.hexToNumber(userChain));

    if ( !correctChain() ) {
        if ( userChain == 80001 ) {
            chain = "mumbai";
            getFactory();
            $(".chain").text(chain);
        } else {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(dappChain) }],
            });
        }
    }

    window.ethereum.on('accountsChanged', function () {
        log("accounts changed");
        web3.eth.getAccounts(function (error, accts) {
            console.log(accts[0], 'current account after account change');
            accounts = accts;
            location.reload();
        });
    });

    window.ethereum.on('chainChanged', function () {
        log("chain changed");
        location.reload();
    });

    if (ethereum.selectedAddress) {
        return afterConnection();
    } else {
        if(window.location.hash) {
            var hash = window.location.hash.substring(1);
            console.log("hash", hash);
            if ( hash.match(/^0x/) ) {
                appAddress = hash;
                showProfile = true;
                $("#public-profile").show();
            }
        }
        if (showProfile) {
            return afterConnection();
        } else {
            $(".section").hide();
            showWizard = true;
            $(".welcome").show();
        }
        
    }
    
}

function correctChain() {
  var correct = false;
  if (accounts.length < 1) {
      return true;
  }
  if (dappChain == userChain) {
    correct = true;
  }
  return correct;
}

async function afterConnection() {
    return new Promise(async function(resolve, reject) {
        if (ethereum.selectedAddress) {
            $(".connect").find("span").text( abbrAddress() );
            $(".connect img").attr("src", "https://web3-images-api.kibalabs.com/v1/accounts/" + ethereum.selectedAddress + "/image").css("width", "16px").css("margin-right", "5px");
            $("#start-button").text("Get Started");
        }
        status("Connected as " + abbrAddress() );
        
        $(".section").hide();
        showWizard = true;
        $(".welcome").show();
        resolve();    
    });
}

async function connectWallet() {
    status("Connecting...");
    if (window.ethereum) {
        //console.log("window.ethereum true");
        return window.ethereum
            .enable()
            .then(async result => {
                // Metamask is ready to go!
                //console.log(result);
                accounts = result;
                return afterConnection();
            })
            .catch(reason => {
                // Handle error. Likely the user rejected the login.
            });
    } else {
        // The user doesn't have Metamask installed.
        console.log("window.ethereum false");
    } 
} // connectWallet()

function fromWei(amount) {
    return web3.utils.fromWei(new BN(amount));
}

function loadNFTs(nfts) {
    $("#nft-chooser-cards .card-list").html("");
    $.each(nfts, function( index, nft ) {
        if (nft.metadata) {
            $("#nft-chooser-cards .card-list").append( getNFTHTML(nft) );
        }
    });
    $("#nft-chooser").show();
}

async function loadNines() {
    var count = 0;
    ninesIds = await nines.methods.getNinesIds().call();
    console.log(ninesIds);
    count = ninesIds.length;
    $("#nines-list ul").html("");
    for (let i = 0; i < ninesIds.length; i++) {
        var nine = await nines.methods.getNine(ninesIds[i]).call();
        console.log(nine);
        var ninths = await nines.methods.getNinths(ninesIds[i]).call();
        console.log(ninths);
        console.log(ninths.length);
        nine.id = ninesIds[i];
        nine.members = ninths.length;
        var ctx = {
            "name": nine.name,
            "id": ninesIds[i],
            "members": ninths.length
        }
        $("#nines-list ul").append( getNineHTML(ctx) );
    }
    return count;
}



$( document ).ready(function() {

    main();

    $('select').formSelect();

    $(".chain").text(chain);

    $(".connect").click(function(){
        //wizard
        var $button = $(this);
        connectWallet()
        .then(async function(){
            if ( $button.attr("id") == "start-button" ) {
                $(".welcome").hide();
                $("#nft-chooser").show();
            }
        });
        return false;
    });

    $("#chain-chooser").change(async function(){
        chosenChainName = $(this).val();
        chosenChain = chains[chosenChainName];
        const options = { chain: chosenChainName, address: ethereum.selectedAddress };
        const nfts = await Moralis.Web3API.account.getNFTs(options);
        console.log(nfts);
        loadNFTs(nfts.result);
    });

    $( "#nft-chooser" ).on( "click", ".register", async function() {
        var chainId = $(this).data("chain");
        var contractAddress = $(this).data("contract");
        var tokenId = $(this).data("token");
        var holder = $(this).data("holder");
        var apiUrl = `https://us-central1-slash-translate.cloudfunctions.net/ninesRegister?chain_name=${chosenChainName}&chain_id=${chosenChain}&contract=${contractAddress}&token_id=${tokenId}&holder=${holder}`; 
        apiUrl = `https://api.nines.wtf/register?chain_name=${chosenChainName}&chain_id=${chosenChain}&contract=${contractAddress}&token_id=${tokenId}&holder=${holder}`; 
        const response = await fetch(apiUrl);
        var result = await response.json();
        console.log(result);
        chosenNFT = {
            "chainId": chosenChain,
            "contractAddress": contractAddress,
            "tokenId": tokenId
        };
        $("#nft-chooser").hide();
        var count = loadNines();
        $("#joiner").show();
    });

    $(".create").click(async function(){
        var name = $("#nine-name").val();
        console.log("b4 nonce");
        const nonce = await web3.eth.getTransactionCount(ethereum.selectedAddress, 'latest');
        console.log(nonce);
        console.log(chosenNFT, name);
        const tx = {
            'from': ethereum.selectedAddress,
            'to': ninesAddress,
            'gasPrice': gas,
            'nonce': "" + nonce,
            'data': nines.methods.create(chosenNFT.chainId, chosenNFT.contractAddress, chosenNFT.tokenId, name).encodeABI()
        };
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [tx],
        });
        console.log(txHash);
        var filter = await ethersNines.filters.NineCreated();
        ethersNines.on(filter, (id, name, event) => { 
            status("Nine created " + id);
            $button.text("Created and Joined");
            loadNines();
        });
    });

    $( "#nines-list" ).on( "click", ".join", async function() {
        var $button = $(this);
        var id = $(this).data("nine");
        const nonce = await web3.eth.getTransactionCount(ethereum.selectedAddress, 'latest');
        console.log(chosenNFT, id);
        const tx = {
            'from': ethereum.selectedAddress,
            'to': ninesAddress,
            'gasPrice': gas,
            'nonce': "" + nonce,
            'data': nines.methods.join(chosenNFT.chainId, chosenNFT.contractAddress, chosenNFT.tokenId, id).encodeABI()
        };
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [tx],
        });
        console.log(txHash);
        var filter = await ethersNines.filters.NinthJoined();
        ethersNines.on(filter, (id, chainId, contractAddress, tokenId, event) => { 
            status("Nine joined");
            $(this).find("i").text("check");
            loadNines();
        });
    });



});

function imageUrl(url) {
    if ( url.startsWith("ipfs") ){
        return ipfsToHttp(url);
    } else {
        return url;
    }
}


// HTML templates

function getNFTHTML(ctx) {
    var meta = JSON.parse(ctx.metadata);
    var image;
    if ("image" in meta) {
        image = imageUrl(meta.image);
    }
    var html = "";
    html = `
    <div class="col s6 m3">
        <div class="card">
            <div class="card-image">
                <img src="${image}">
                <a data-chain="${chosenChain}" data-contract="${ctx.token_address}" data-token="${ctx.token_id}" data-holder="${ctx.owner_of}" class="btn-floating halfway-fab waves-effect waves-light red register"><i class="material-icons">add</i></a>
            </div>
            <div class="card-content">
                <span class="card-title">${meta.name}</span>
                <p>${meta.description}</p>
            </div>
        </div>
    </div>
    `;
    return html;
}

function getNineHTML(ctx) {
    console.log(ctx);
    var html = "";
    html = `
    <li class="collection-item"><div>${ctx.name} (${ctx.members})<a href="#!" class="secondary-content join" data-nine="${ctx.id}"><i class="material-icons">add</i></a></div></li>
    `;
    return html;
}

function wrongNetworkModal(ctx){
    var html = "";
    html = `
    <div class="fade modal-backdrop show"></div>
    <div role="dialog" aria-modal="true" class="modal-theme modal-switch light modal" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header"><div class="modal-title-custom modal-title h4">Switch Network</div></div>
                <div class="modal-body" style="margin-left: 20px;">
                    <p>DAOit is currently deployed to Rinkeby testnet.</p>
                    <p><b>To get started, please switch your network by following the instructions below:</b></p>
                    <ol>
                        <li>Open Metamask</li>
                        <li>Click the network select dropdown</li>
                        <li>Click on "Rinkeby Test Network"</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    `;
    return html;
}

function log(message) {
    console.log(message);
    status(message);
}

function status(message) {
    M.toast({html: message});
}


function ipfsToHttp(ipfs) {
    var http = "";
    var cid = ipfs.replace("ipfs://", "");
    //http = "https://" + cid + ".ipfs.dweb.link";
    http = "https://ipfs.moralis.io:2053/ipfs/" + cid;
    return http;
}

function cidToHttp(cid) {
    var http = "";
    http = "https://" + cid + ".ipfs.dweb.link";
    return http;
}

function opts(file) {
    var opts = { 
        method: 'post', 
        headers: new Headers({
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU0NkZiYmNhOEIzZDIwMDAzZTA2ZjMzZmRBN0E0NzUxMGExRUY5OTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyODYxMDE3NzQxNSwibmFtZSI6InNwcm91dCBtZXRhZGF0YSJ9.6YwPqstbUyRfNiGwEaYccfGZZYGmXOSuAuLzLduwdRM', 
            'Content-Type': 'application/json'
        }), 
        body: file
    };
    return opts;
}

