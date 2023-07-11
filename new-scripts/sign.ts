import { ethers } from "ethers";

import config from "../config.json";

const abi = [
  "function isValidSignature(bytes32 _message, bytes _signature) public view returns (bytes4)",
  "function execute(address to, uint256 value, bytes data)",
  "function validateSignature(bytes32 _message, bytes _signature) public view returns (uint256)",
];

type Location = "remote" | "local";

const testMessage = "hello world";

async function main(location: Location) {
  const wallet = new ethers.Wallet(config[location].signingKey);
  const messageHash = ethers.utils.solidityKeccak256(["string"], [testMessage]);
  const messageHashBytes = ethers.utils.arrayify(messageHash);
  const signature = await wallet.signMessage(messageHashBytes);

  const provider = new ethers.providers.JsonRpcProvider(
    config[location].rpcUrl
  );

  const kernelContract = new ethers.Contract(
    config[location].deployedKernel,
    abi,
    provider
  );
  const result = await kernelContract.isValidSignature(
    messageHashBytes,
    signature
  );

  console.log(result);
}

main("local");
