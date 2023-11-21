import {
    DecreaseLiquidity,
    IncreaseLiquidity,
    Collect,
  } from "../../generated/NonFungiblePositionManager/NonFungiblePositionManager";
  import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
  import { Nft, UserNft } from "../../generated/schema";
  
  function determineUserNftAddress(nftId: BigInt): string[] | null {
    const nft = Nft.load(nftId.toString())
    if(nft){
    const userNfts = nft.userNft
    return userNfts
    }
    return null
  }
  
  export function determineIncreaseLiquidityUserNftAddress(event: IncreaseLiquidity):  string[] | null {
    return determineUserNftAddress(event.params.tokenId);
  }
  
  export function determineDecreaseLiquidityUserNftAddress(event: DecreaseLiquidity): string[] | null {
    return determineUserNftAddress(event.params.tokenId);
  }
  
  export function determineCollectUserNftAddress(event: Collect):string[] | null {
    return determineUserNftAddress(event.params.tokenId);
  }