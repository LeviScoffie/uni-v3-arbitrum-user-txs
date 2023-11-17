import {
  DecreaseLiquidity,
  IncreaseLiquidity,
  Transfer,
  Collect,
} from "../../generated/NonFungiblePositionManager/NonFungiblePositionManager";

import { isZeroAddress } from "../utils/constants";
import { getOrCreateNft, getOrCreateUserNft } from "../entities/usernft";
import { getOrCreateUserTransaction } from "../entities/usertransaction";
import { Nft, UserNft } from "../../generated/schema";

export function handleTransfer(event: Transfer): void {
  const toAddress = event.params.to;
  const tokenId = event.params.tokenId;
  getOrCreateNft(tokenId);
  if (!isZeroAddress(toAddress)) {
    getOrCreateUserNft(tokenId, toAddress);
  }
}

function determineUserNftAddress(event: IncreaseLiquidity): string {
  const fromAddress = event.transaction.from.toHexString();
  const toAddress = event.transaction.to ? event.transaction.to.toHexString() : "";
  const tokenId = event.params.tokenId.toString();
  let userNft = UserNft.load(fromAddress + "-" + tokenId)
  if (userNft) {
    return fromAddress;
  }
  return toAddress 
}

export function handleIncreaseLiquidity(event: IncreaseLiquidity): void {
  const userAddress = determineUserNftAddress(event);
  const userNft = UserNft.load(userAddress + "-" + event.params.tokenId.toString());
  if (userNft) {
    getOrCreateUserTransaction(event, userNft);
  }
}
