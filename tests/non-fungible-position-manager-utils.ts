import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import {
  Collect,
  DecreaseLiquidity,
  IncreaseLiquidity,
  Transfer,
} from "../generated/NonFungiblePositionManager/NonFungiblePositionManager";
import { blockNumber, blockTimestamp, logIndex, transactionHash, user } from "./constParams";

export function createIncreaseLiquidityEvent(
  tokenId: BigInt,
  liquidity: BigInt,
  amount0: BigInt,
  amount1: BigInt
): IncreaseLiquidity {
  let increaseLiquidityEvent = changetype<IncreaseLiquidity>(newMockEvent());

  increaseLiquidityEvent.parameters = new Array();

  increaseLiquidityEvent.logIndex = logIndex;
  increaseLiquidityEvent.transaction.hash = transactionHash;
  increaseLiquidityEvent.block.number = blockNumber;
  increaseLiquidityEvent.block.timestamp = blockTimestamp;
  increaseLiquidityEvent.transaction.from = user;

  increaseLiquidityEvent.parameters.push(
    new ethereum.EventParam("tokenId", ethereum.Value.fromUnsignedBigInt(tokenId))
  );
  increaseLiquidityEvent.parameters.push(
    new ethereum.EventParam("liquidity", ethereum.Value.fromUnsignedBigInt(liquidity))
  );
  increaseLiquidityEvent.parameters.push(
    new ethereum.EventParam("amount0", ethereum.Value.fromUnsignedBigInt(amount0))
  );
  increaseLiquidityEvent.parameters.push(
    new ethereum.EventParam("amount1", ethereum.Value.fromUnsignedBigInt(amount1))
  );
  return increaseLiquidityEvent;
}

export function createTransferEvent(from: Address, to: Address, tokenId: BigInt): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent());

  transferEvent.parameters = new Array();
  transferEvent.logIndex = logIndex;
  transferEvent.transaction.hash = transactionHash;
  transferEvent.block.number = blockNumber;
  transferEvent.block.timestamp = blockTimestamp;

  transferEvent.parameters.push(new ethereum.EventParam("from", ethereum.Value.fromAddress(from)));
  transferEvent.parameters.push(new ethereum.EventParam("to", ethereum.Value.fromAddress(to)));
  transferEvent.parameters.push(
    new ethereum.EventParam("tokenId", ethereum.Value.fromUnsignedBigInt(tokenId))
  );

  return transferEvent;
}

export function createCollectEvent(
  tokenId: BigInt,
  recipient: Address,
  amount0: BigInt,
  amount1: BigInt
): Collect {
  let collectEvent = changetype<Collect>(newMockEvent());

  collectEvent.parameters = new Array();

  collectEvent.parameters.push(
    new ethereum.EventParam("tokenId", ethereum.Value.fromUnsignedBigInt(tokenId))
  );
  collectEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  );
  collectEvent.parameters.push(
    new ethereum.EventParam("amount0", ethereum.Value.fromUnsignedBigInt(amount0))
  );
  collectEvent.parameters.push(
    new ethereum.EventParam("amount1", ethereum.Value.fromUnsignedBigInt(amount1))
  );

  return collectEvent;
}

export function createDecreaseLiquidityEvent(
  tokenId: BigInt,
  liquidity: BigInt,
  amount0: BigInt,
  amount1: BigInt
): DecreaseLiquidity {
  let decreaseLiquidityEvent = changetype<DecreaseLiquidity>(newMockEvent());

  decreaseLiquidityEvent.parameters = new Array();

  decreaseLiquidityEvent.parameters.push(
    new ethereum.EventParam("tokenId", ethereum.Value.fromUnsignedBigInt(tokenId))
  );
  decreaseLiquidityEvent.parameters.push(
    new ethereum.EventParam("liquidity", ethereum.Value.fromUnsignedBigInt(liquidity))
  );
  decreaseLiquidityEvent.parameters.push(
    new ethereum.EventParam("amount0", ethereum.Value.fromUnsignedBigInt(amount0))
  );
  decreaseLiquidityEvent.parameters.push(
    new ethereum.EventParam("amount1", ethereum.Value.fromUnsignedBigInt(amount1))
  );

  return decreaseLiquidityEvent;
}
