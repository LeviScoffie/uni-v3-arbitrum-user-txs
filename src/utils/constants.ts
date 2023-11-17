import { Address } from "@graphprotocol/graph-ts";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function isZeroAddress(address: Address): boolean {
  return address == Address.fromString(ZERO_ADDRESS);
}
