import React from "react";
import Router from "./Router";
import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  argent,
} from "@starknet-react/core";


export default function App() {
  // const chains = [sepolia];
  // const provider = publicProvider();
  // const connectors = [argent()];
  return (
    <>
      <Router />
    </>
  );
}
