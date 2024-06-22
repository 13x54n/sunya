import { CardBody, CardContainer, CardItem } from "./3d-card";
import React, { useState } from "react";
import AuditRegistryABI from "../utils/SNABI.json";
import { Contract, Provider, shortString } from "starknet";
import lighthouse from "@lighthouse-web3/sdk";

const provider = new Provider({
  rpc: {
    nodeUrl:
      "https://starknet-sepolia.infura.io/v3/ba5903caf9854d20950f7279ffb2fd7c",
  },
});

export default function MintAuditDidCard({
  output,
  wallet,
  projectOwner,
  setIsMintDiDModelOpen,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const mintToSN = async () => {
    setIsLoading(true);
    console.log();
    const contract = new Contract(
      AuditRegistryABI,
      "0x066f2930a1a05062c1745d9e2059b0b2a41c289135c3b8f00e9d34d6d8a34711",
      provider
    );
    contract.connect(starknet.account);
    console.log("✅ Test Contract connected at =", contract.address);

    const apiKey = "f684a909.442b3d1a8a9e4fb4b3a30fdf045899a4";

    const name = (Date.now() + Math.random()).toString();
    const lightHouseResponse = await lighthouse.uploadText(
      output,
      apiKey,
      name
    );

    const response = await contract.set_audit(
      name,
      // lightHouseResponse?.data?.Hash, -> this should be dynamic link,
      "https://github.com/13x54n/sunya",
      projectOwner || wallet?.selectedAddress
    );
    // const response = await contract.get_audit("13x54n");
    if (response) {
      setIsMintDiDModelOpen(false);
    }

    setIsLoading(false);

    // console.log(`Tx Response: ${shortString.decodeShortString(response)}`);
  };

  const mintToETH = () => {};

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          <p>🦄 Mint Audit</p>
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          We're proud to be part of your amazing project. We got your back on
          analysis. 💪
        </CardItem>
        <CardItem translateZ="100" className="w-full my-2">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2twdWxsYnA1a285YWgxcjQyaDVwbGxxaDlvbW1senY3YzR2NXpkdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlMDr5SOKGpNu5a/giphy.webp"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl mt-4"
            alt="thumbnail"
          />
          <p className="text-sm font-medium mt-3 text-gray-500">
            Note: We made it easy for you, whichever network you deploy to you
            can easily interact with them later. ✅
          </p>
          <div className="flex gap-2 mt-3">
            <button
              disabled={isLoading}
              className="px-3 py-2 rounded-md bg-black dark:bg-white dark:text-black text-white text-xs font-bold flex items-center gap-1"
              onClick={() => mintToSN()}
            >
              <img
                className="w-4"
                src="https://imgs.search.brave.com/xeoPVavFDXH3bpPnO4ckaut48yL2w-503bUe0ClyawQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/c3RhcmtuZXQtZWNv/c3lzdGVtLmNvbS9z/dGFya25ldC1sb2dv/LnBuZw"
                alt=""
              />
              <p className="text-sm">{isLoading ? "Minting" : "Mint to SN"}</p>
            </button>
            <button
              disabled={isLoading}
              className="px-3 py-2 rounded-md bg-black dark:bg-white dark:text-black text-white text-xs font-bold flex items-center gap-1"
            >
              <img
                className="w-4"
                src="https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"
                alt=""
              />
              <p className="text-sm">{isLoading ? "Minting" : "Mint to ETH"}</p>
            </button>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
