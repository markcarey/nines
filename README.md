# Nines

Nines is a cross-chain NFT game where NFTs from different chains come together in bands of 9 NFTs and challenge each other for low or high stakes.

## The Vision
- NFTs from multiple chains join together in teams of 9
- (Trusted) Registrar validates ownership
- When a team reaches 9 members, each member gets an NFT (ERC1155)
- Members deposit a stake
- Nines are mini DAOs
- Proposals to challenge other DAOs, to respond or retreat.
- Lose portion of stake if retreat or challenge lost

## How it was made
- Moralis NFT api is used to display the user's NFT from the chose chain
- the chosenNFT is sent to a (trusted/centralized) server, which validates the claimed ownership (also using Moralis NFT api). Once validated, the registrar registers the NFT with the nines smart contract (currently Polygon Mumbai).
- the user can then choose to create a Nine or join an existing Nine. A transaction is required for either.
- once a Nine reaches 9 members, and ERC1155 NFT is minted (a 9 of 9) and sent to each member automatically

## Next Steps
- Staking
- Proposals / voting
- Challenging / Responding / Retreating
- Leaderboard
- Discord integration for Nines to coordinate

