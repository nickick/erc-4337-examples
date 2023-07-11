const signTypedDataV4Payload = {
  domain: {
    name: "Seaport",
    version: "1.5",
    chainId: 5,
    verifyingContract: "0x00000000000000adc04c56bf30ac9d3c0aaf14dc",
  },
  primaryType: "OrderComponents",
  types: {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
    OrderComponents: [
      { name: "offerer", type: "address" },
      { name: "zone", type: "address" },
      { name: "offer", type: "OfferItem[]" },
      { name: "consideration", type: "ConsiderationItem[]" },
      { name: "orderType", type: "uint8" },
      { name: "startTime", type: "uint256" },
      { name: "endTime", type: "uint256" },
      { name: "zoneHash", type: "bytes32" },
      { name: "salt", type: "uint256" },
      { name: "conduitKey", type: "bytes32" },
      { name: "counter", type: "uint256" },
    ],
    OfferItem: [
      { name: "itemType", type: "uint8" },
      { name: "token", type: "address" },
      { name: "identifierOrCriteria", type: "uint256" },
      { name: "startAmount", type: "uint256" },
      { name: "endAmount", type: "uint256" },
    ],
    ConsiderationItem: [
      { name: "itemType", type: "uint8" },
      { name: "token", type: "address" },
      { name: "identifierOrCriteria", type: "uint256" },
      { name: "startAmount", type: "uint256" },
      { name: "endAmount", type: "uint256" },
      { name: "recipient", type: "address" },
    ],
  },
  message: {
    kind: "single-token",
    offerer: "0xD1d0c59D36be0555B2034c7bb06B2fdCEf37F886",
    zone: "0x0000000000000000000000000000000000000000",
    offer: [
      {
        itemType: 2,
        token: "0x932ca55b9ef0b3094e8fa82435b3b4c50d713043",
        identifierOrCriteria: "24294",
        startAmount: "1",
        endAmount: "1",
      },
    ],
    consideration: [
      {
        itemType: 0,
        token: "0x0000000000000000000000000000000000000000",
        identifierOrCriteria: "0",
        startAmount: "1000000000000000",
        endAmount: "1000000000000000",
        recipient: "0xD1d0c59D36be0555B2034c7bb06B2fdCEf37F886",
      },
    ],
    orderType: 0,
    startTime: 1688092553,
    endTime: 1789096213,
    zoneHash:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    salt: "16184194831101861726006543015570503459298694222654417638899507155898314739881",
    conduitKey:
      "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
    counter: "0",
    signature:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
};

export { signTypedDataV4Payload };
