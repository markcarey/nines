require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const ninesJSON = require("../artifacts/contracts/Nines.sol/Nines.json");
const ninesAddress = "0xd957f6EC278BD6105910aF73FdEB23626516966E";

const REGISTRAR = web3.utils.keccak256("REGISTRAR_ROLE");

const signer = new ethers.Wallet(PRIVATE_KEY, ethers.provider);
let nines = new ethers.Contract(
    ninesAddress,
    ninesJSON.abi,
    signer
);

async function register(chainId, contractAddress, tokenId, holder) {
    var res = await nines.register(chainId, contractAddress, tokenId, holder);
    await res.wait();
    var owner = await nines.registeredOwnerOf(chainId, contractAddress, tokenId);
    console.log("owner is", owner);
}

async function create(chainId, contractAddress, tokenId, name) {
    var res = await nines.create(chainId, contractAddress, tokenId, name);
    await res.wait();
    console.log("created");
    var ids = await nines.getNinesIds();
    console.log("ids", ids);
    var nine = await nines.getNine(ids[ids.length-1]);
    console.log("nine", nine);
}

async function getNinesIds() {
    var ids = await nines.getNinesIds();
    console.log("ids", ids);
}

async function getNine(id) {
    var nine = await nines.getNine(id);
    console.log("nine", nine);
}
async function getNinths(id) {
    var ninths = await nines.getNinths(id);
    console.log("ninths", JSON.stringify(ninths));
}

async function join(chainId, contractAddress, tokenId, nineId) {
    var res = await nines.join(chainId, contractAddress, tokenId, nineId);
    await res.wait();
    console.log("joined");
    var ninths = await nines.getNinths(nineId);
    console.log("there are " + ninths.length + " ninths", ninths);
}

async function ownerOf(chainId, contractAddress, tokenId) {
    var owner = await nines.registeredOwnerOf(chainId, contractAddress, tokenId);
    console.log("owener", owner);
}

//register(1, "0xFAFf15C6cDAca61a4F87D329689293E07c98f578", 4, PUBLIC_KEY)
//register(1, "0xFAFf15C6cDAca61a4F87D329689293E07c98f578", 3, PUBLIC_KEY)
//register(1, "0xFAFf15C6cDAca61a4F87D329689293E07c98f578", 2, PUBLIC_KEY)
ownerOf(1, "0xFAFf15C6cDAca61a4F87D329689293E07c98f578", 2)
//getNineId(0)
//getNine("0x0ac3506021f35dce14b9c72dc6284db3b8c1e06feea7bc839cfd9601aad04105")
//getNinths("0x0ac3506021f35dce14b9c72dc6284db3b8c1e06feea7bc839cfd9601aad04105")
//create(1, "0xFAFf15C6cDAca61a4F87D329689293E07c98f578", 4, "Testers")
//getNinesIds()
//join(1, "0xFAFf15C6cDAca61a4F87D329689293E07c98f578", 3, "0x0ac3506021f35dce14b9c72dc6284db3b8c1e06feea7bc839cfd9601aad04105")

.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});