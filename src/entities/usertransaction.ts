import { ethereum } from "@graphprotocol/graph-ts";
import {UserTransaction, UserNft, Nft } from "../../generated/schema";

export function getOrCreateUserTransaction(
    event:ethereum.Event,
    userNft: UserNft,
  ): UserTransaction {
    const id = event.transaction.hash.toHexString() + '-' + event.logIndex.toString();
    let userTransaction = UserTransaction.load(id);
    if (!userTransaction) {
      userTransaction = new UserTransaction(id);
      userTransaction.transactionHash = event.transaction.hash;
      userTransaction.userNft = userNft.id;
      userTransaction.block = event.block.number;
      userTransaction.timestamp = event.block.timestamp;
      userTransaction.save();
    }
    return userTransaction as UserTransaction;
  }