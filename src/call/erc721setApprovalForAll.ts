import input from "@inquirer/input";
import { ICall } from "userop";
import { ethers } from "ethers";
import { ERC721_ABI } from "../abi";

export default async function main(
  provider: ethers.providers.JsonRpcProvider
): Promise<ICall> {
  const contract = await input({
    message: "Enter ERC721 address",
    validate(addr) {
      return ethers.utils.isAddress(addr) ? true : "Address not valid.";
    },
  });

  const operator = await input({
    message: "Enter operator address",
    validate(addr) {
      return ethers.utils.isAddress(addr) ? true : "Address not valid.";
    },
  });
  const value = await input({
    message:
      "Enter true for setting permission or false for revoking permission",
    validate(val) {
      try {
        if (val !== "true" && val !== "false") {
          throw Error;
        }
      } catch {
        return "Value not valid.";
      }
      return true;
    },
  });

  const erc721 = new ethers.Contract(contract, ERC721_ABI, provider);

  console.log(
    `> Transaction will ${
      value === "true" ? "approve" : "revoke"
    } operator to transfer tokens from ERC721 contract ${contract}`
  );

  return {
    to: contract,
    value: ethers.constants.Zero,
    data: erc721.interface.encodeFunctionData("setApprovalForAll", [
      contract,
      value,
    ]),
  };
}
