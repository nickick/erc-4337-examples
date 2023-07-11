import { ethers } from "ethers";

import config from "../config.json";

const abi = [
  "function execute(address to, uint256 value, bytes data)",
  "function isValidSignature(bytes32 _message, bytes _signature) public view returns (bytes4)",
  "function validateSignature(bytes32 _message, bytes _signature) public view returns (uint256)",
];

type Location = "remote" | "local";

async function main(location: Location) {
  const provider = new ethers.providers.JsonRpcProvider(
    config[location].rpcUrl
  );
  const wallet = new ethers.Wallet(config[location].signingKey, provider);
  const kernelFactoryContract = new ethers.Contract(
    config[location].factoryAddress,
    [
      {
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_index",
            type: "uint256",
          },
        ],
        name: "createAccount",
        outputs: [
          {
            internalType: "contract EIP1967Proxy",
            name: "proxy",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_index",
            type: "uint256",
          },
        ],
        name: "getAccountAddress",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    wallet
  );
  const txn = await kernelFactoryContract.getAccountAddress(wallet.address, 0);
  console.log(txn);
}

main(process.argv[3] as Location).catch((err) => {
  console.log(process.argv[3]);
  console.error(err);
});
