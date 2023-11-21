import { Bytes, ethereum } from "@graphprotocol/graph-ts";
import { UserTransaction } from "../../generated/schema";

export function getOrCreateUserTransactions(
  event: ethereum.Event,
  userAddress: string
): UserTransaction {
  const id = event.transaction.hash.toHexString() + "-" + userAddress;
  let userTransaction = UserTransaction.load(id);
  if (!userTransaction) {
    userTransaction = new UserTransaction(id);
    userTransaction.transactionHash = event.transaction.hash;
    userTransaction.block = event.block.number;
    userTransaction.timestamp = event.block.timestamp;
    userTransaction.userAddress= userAddress
    userTransaction.save();
  }
  return userTransaction as UserTransaction;
}
