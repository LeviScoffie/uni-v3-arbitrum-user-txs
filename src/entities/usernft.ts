import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { Nft, UserNft } from "../../generated/schema";


export function getOrCreateNft(tokenId: BigInt): Nft {
  let nft = Nft.load(tokenId.toString());
  if (!nft) {
    nft = new Nft(tokenId.toString());
    nft.nftId= tokenId;
    nft.save();
  }
  return nft as Nft;
}

export function getOrCreateUserNft(
  tokenId: BigInt,
  userAddress: Address
): UserNft {
  let userNft = UserNft.load(userAddress.toHexString()+"-"+tokenId.toString());
  if (!userNft) {
    userNft = new UserNft(userAddress.toHexString()+"-"+tokenId.toString());
    userNft.userAddress = userAddress;
    userNft.tokenId = tokenId
    userNft.save();
  }
  return userNft as UserNft;
}
