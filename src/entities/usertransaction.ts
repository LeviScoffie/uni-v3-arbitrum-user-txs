import { Bytes, ethereum } from "@graphprotocol/graph-ts";
import { UserTransaction } from "../../generated/schema";

export function getOrCreateUserTransactions(
  event: ethereum.Event,
  userAddress: String
): UserTransaction {
  const id = event.transaction.hash.toHexString();
  let userTransaction = UserTransaction.load(id);
  if (!userTransaction) {
    userTransaction = new UserTransaction(id);
    userTransaction.transactionHash = event.transaction.hash;
    userTransaction.block = event.block.number;
    userTransaction.timestamp = event.block.timestamp;
    userTransaction.userAddress = userAddress;
    userTransaction.save();
  }
  return userTransaction as UserTransaction;
}
