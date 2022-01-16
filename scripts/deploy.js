async function main() {
    const Nines = await ethers.getContractFactory("Nines");
    
    // Start deployment, returning a promise that resolves to a contract object
    const nine = await Nines.deploy();
    console.log("Contract deployed to address:", nine.address);

    //const NineToken = await ethers.getContractFactory("NineToken");
    //const token = await NineToken.deploy();
    //console.log("Token deployed to address:", token.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });

// npx hardhat run scripts/deploy.js --network mumbai
// npx hardhat verify --network mumbai DEPLOYED_CONTRACT_ADDRESS
// npx hardhat node --fork https://polygon-mumbai.g.alchemy.com/v2/zdeZwAwHBiBZzLtxdWtShZzuAjBPjoUW --fork-block-number 21123603