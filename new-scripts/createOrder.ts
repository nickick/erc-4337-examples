import { Seaport } from "@opensea/seaport-js";
import { ethers } from "ethers";

import config from "../config.json";
import { ItemType } from "@opensea/seaport-js/lib/constants";

const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
const wallet = new ethers.Wallet(config.signingKey, provider);
const seaport = new Seaport(wallet);

async function main() {
  const offerer = config.remote.deployedKernel;

  // needed to dig into node_modules/seaport-js/lib/actions/createOrder.js to
  // work around the functions we need not being typed correctly.
  // also into node_modules/seaport-js/lib/utils/balance.js to break assumptions
  // about the ethers signer provided to the sdk being the offerer
  const { actions } = await seaport.createOrder({
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

  const actionsTyped = actions[1] as typeof actions[1] & {
    getMessageToSign: () => any;
    createOrder: () => any;
  };

  console.log(actionsTyped);
  const message = await actionsTyped.getMessageToSign();
  console.log(message);
  const signature = await actionsTyped.createOrder();
  console.log(JSON.stringify(signature));
}

main();
