import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "remixicon/fonts/remixicon.css";

import {
  DynamicContextProvider
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <DynamicContextProvider
      settings={{
        environmentId: "04e08e7e-e759-4e8b-80b2-dc76a1eb7550",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <App />
    </DynamicContextProvider>
  </>
);
