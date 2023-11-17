import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  log,
  logStore,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";

import {
  Transfer,
  IncreaseLiquidity,
  Collect,
  DecreaseLiquidity,
} from "../generated/NonFungiblePositionManager/NonFungiblePositionManager";
import {
  handleTransfer,
  handleCollect,
  handleDecreaseLiquidity,
  handleIncreaseLiquidity,
} from "../src/mappings/non-fungible-position-manager";
import {
  createTransferEvent,
  createDecreaseLiquidityEvent,
  createIncreaseLiquidityEvent,
  createCollectEvent,
} from "./non-fungible-position-manager-utils";
import { UserNft, UserTransaction } from "../generated/schema";

const user = "0x0000000000000000000000000000000000000001";
const tokenid = "234";
const token0Amount = "100";
const token1Amount = "200";
const liquidity = "1000000";
const eventHash = "0x02082029394f438ca1472adeb502c30376df44983ca7cc1f99c4917e14223e90";

describe("Unit Tests for event handlers", () => {
  describe("Create IncreaseLiquidity Event", () => {
    beforeAll(() => {
      const newIncreaseLiquidityEvent = createIncreaseLiquidityEvent(
        BigInt.fromString(tokenid),
        BigInt.fromString(liquidity),
        BigInt.fromString(token0Amount),
        BigInt.fromString(token1Amount)
      );
      handleIncreaseLiquidity(newIncreaseLiquidityEvent);
      logStore();
    });
    describe("when there's one IncreaseLiquidity event", () => {
      test("It should create A UserTransaction entity", () => {
        assert.entityCount("UserTransaction", 1);
        assert.fieldEquals(
          "UserTransaction",
          `increase-liquidity-${eventHash}-${user}`,
          "user",
          user
        );
      });
    });
  });
  describe("Create A UserNft entity", () => {
    beforeAll(() => {
      const newTransferEvent = createTransferEvent(
        Address.fromString(user),
        Address.fromString(user),
        BigInt.fromString(tokenid)
      );
      handleTransfer(newTransferEvent);
      //  logStore()
    });

    describe("when there's only one transfer event", () => {
      test("It should create a UserNft entity", () => {
        assert.entityCount("UserNft", 1);
        assert.fieldEquals("UserNft", `${user}-${tokenid}`, "userAddress", `${user}`);
      });
    });
  });
});
