import {
  DecreaseLiquidity,
  IncreaseLiquidity,
  Transfer,
  Collect,
} from "../../generated/NonFungiblePositionManager/NonFungiblePositionManager";
import {
  determineIncreaseLiquidityUserNftAddress,
  determineDecreaseLiquidityUserNftAddress,
  determineCollectUserNftAddress,
} from "./helpers";
import { isZeroAddress } from "../utils/constants";
import { getOrCreateNft, getOrCreateUserNft } from "../entities/usernft";
import { getOrCreateUserTransactions } from "../entities/usertransaction";

export function handleTransfer(event: Transfer): void {
  let toAddress = event.params.to;
  let tokenId = event.params.tokenId;
  getOrCreateNft(tokenId, toAddress)
  if (!isZeroAddress(toAddress)) {
    getOrCreateUserNft(tokenId, toAddress);

  }
}

export function handleIncreaseLiquidity(event: IncreaseLiquidity): void {
  const userNfts = determineIncreaseLiquidityUserNftAddress(event);
  if (userNfts) {
    getOrCreateUserTransactions(event, userNfts);
  }
}

export function handleCollect(event: Collect): void {
  const userNfts = determineCollectUserNftAddress(event);
  if (userNfts) {
    for (let i = 0; i < userNfts.length; i++) {
      let user = userNfts[i].userAddress;
      getOrCreateUserTransactions(event, user);
    }
  }
}

export function handleDecreaseLiquidity(event: DecreaseLiquidity): void {
  const userNfts = determineDecreaseLiquidityUserNftAddress(event);
  if (userNfts) {
    for (let i = 0; i < userNfts.length; i++) {
      let user = userNfts[i].userAddress;
      getOrCreateUserTransactions(event, user);
    }
  }
}
