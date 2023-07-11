import { Seaport } from "@opensea/seaport-js";
import { Chain, OpenSeaSDK } from "opensea-js";
import { ethers } from "ethers";

import config from "../config.json";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { TokenStandard } from "opensea-js/lib/types";

const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
const wallet = new ethers.Wallet(config.signingKey, provider);
const seaport = new Seaport(wallet);
// const openseaSDK = new OpenSeaSDK(provider, {
//   chain: Chain.Goerli,
//   apiKey: "d250c6403dc74dbe8372867d5500df96",
// });

async function main() {
  const offerer = config.remote.deployedKernel;
  console.log(offerer);

  // console.log(offerer);

  // const balance = await openseaSDK.getBalance(
  //   {
  //     accountAddress: offerer,
  //     asset: {
  //       tokenAddress: "0x932Ca55B9Ef0b3094E8Fa82435b3b4c50d713043",
  //       tokenId: "24290",
  //       tokenStandard: TokenStandard.ERC721,
  //     },
  //   },
  //   2
  // );

  const { executeAllActions, actions } = await seaport.createOrder({
    offer: [
      {
        itemType: ItemType.ERC721,
        token: "0x932Ca55B9Ef0b3094E8Fa82435b3b4c50d713043",
        identifier: "24290",
      },
    ],
    consideration: [
      {
        amount: ethers.utils.parseEther("0.001").toString(),
        recipient: offerer,
      },
    ],
  });

  const signature = await executeAllActions();

  console.log(signature);
}

main();
