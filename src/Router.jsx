import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { connect } from "starknetkit";
import { useEffect, useState } from "react";

export default function Router() {
  const [wallet, setWallet] = useState(null);

  const connectWallet = async () => {
    const { wallet } = await connect({
      webWalletUrl: "https://web.argent.xyz",
    });

    if (wallet && wallet.isConnected) {
      setWallet(wallet);
      localStorage.setItem("Sunya_IS_L2_WALLET_CONNECTED", "true");
      // setProvider(wallet.account);
      // setAddress(wallet.selectedAddress);
    }
  };

  useEffect(() => {
    const isL2WalletAuthenticated = localStorage.getItem(
      "Sunya_IS_L2_WALLET_CONNECTED"
    );

    if (isL2WalletAuthenticated === "true") {
      connectWallet();
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar wallet={wallet} connectWallet={connectWallet} setWallet={setWallet} />
          This is Home
        </>
      ),
    },
    {
      path: "/dashboard",
      element: <>Dashboard</>,
    },
    {
      path: "*",
      element: <>404 Not Found</>,
    },
  ]);

  return <RouterProvider router={router} />;
}
