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
  const toAddress = event.params.to;
  const tokenId = event.params.tokenId;
  getOrCreateNft(tokenId);
  if (!isZeroAddress(toAddress)) {
    getOrCreateUserNft(tokenId, toAddress);
  }
}

export function handleIncreaseLiquidity(event: IncreaseLiquidity): void {
  const userAddresses = determineIncreaseLiquidityUserNftAddress(event);
  if (userAddresses) {
    userAddresses.forEach((userAddress) => {
      getOrCreateUserTransactions(event, userAddress);
    });
  }
}

export function handleCollect(event: Collect): void {
  const userAddresses = determineCollectUserNftAddress(event);
  if (userAddresses) {
    userAddresses.forEach((userAddress) => {
      getOrCreateUserTransactions(event, userAddress);
    });
  }
}

export function handleDecreaseLiquidity(event: DecreaseLiquidity): void {
  const userAddresses = determineDecreaseLiquidityUserNftAddress(event);
  if (userAddresses) {
    userAddresses.forEach((userAddress) => {
      getOrCreateUserTransactions(event, userAddress);
    });
  }
}
