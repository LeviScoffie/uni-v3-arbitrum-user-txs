import {
  DecreaseLiquidity,
  IncreaseLiquidity,
  Collect,
} from "../../generated/NonFungiblePositionManager/NonFungiblePositionManager";
import { BigInt } from "@graphprotocol/graph-ts";
import { Nft, UserNft } from "../../generated/schema";

function determineUserNftAddress(nftId: BigInt): UserNft | null {
  const nft = Nft.load(nftId.toString());
  if (nft) {
    const userNfts = nft.userNft
    return userNfts.id;
  }
  return null;
}

export function determineIncreaseLiquidityUserNftAddress(
  event: IncreaseLiquidity
): String | null {
  return determineUserNftAddress(event.params.tokenId);
}

export function determineDecreaseLiquidityUserNftAddress(
  event: DecreaseLiquidity
): String | null {
  return determineUserNftAddress(event.params.tokenId);
}

export function determineCollectUserNftAddress(event: Collect): String | null {
  return determineUserNftAddress(event.params.tokenId);
}
