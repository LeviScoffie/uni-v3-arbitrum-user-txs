import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Nft, UserNft } from "../../generated/schema";


export function getOrCreateNft(tokenId: BigInt, userAddress: Address): Nft {
  let nft = Nft.load(tokenId.toString());
  let user = userAddress
  if (!nft) {
    nft = new Nft(tokenId.toString());
    nft.nftId = tokenId;
    nft.userNft = UserNft.load(user.toHexString() + "-" + tokenId.toString())
    nft.save();
  }
  return nft as Nft;
}

export function getOrCreateUserNft(tokenId: BigInt, userAddress: Address): UserNft {
  let userNft = UserNft.load(userAddress.toHexString() + "-" + tokenId.toString());
  if (!userNft) {
    userNft = new UserNft(userAddress.toHexString() + "-" + tokenId.toString());
    userNft.userAddress = userAddress;
    userNft.save();
  }
  return userNft as UserNft;
}
