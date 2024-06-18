import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { connect } from "starknetkit";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Audits from "./pages/Audits";
import Documentation from "./pages/Documentation";
import GasTank from "./pages/GasTank";
import Dashboard from "./pages/Dashboard";

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
      element: wallet?.isConnected ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          <Navbar
            wallet={wallet}
            connectWallet={connectWallet}
            setWallet={setWallet}
          />
          <Home />
        </>
      ),
    },
    {
      path: "/dashboard",
      element: wallet?.isConnected ? (
        <>
          <Navbar
            wallet={wallet}
            connectWallet={connectWallet}
            setWallet={setWallet}
          />
          <Dashboard wallet={wallet} />
        </>
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "/audits",
      element: (
        <>
          <Navbar
            wallet={wallet}
            connectWallet={connectWallet}
            setWallet={setWallet}
          />
          <Audits />
        </>
      ),
    },
    {
      path: "/documentation",
      element: (
        <>
          <Navbar
            wallet={wallet}
            connectWallet={connectWallet}
            setWallet={setWallet}
          />
          <Documentation />
        </>
      ),
    },
    {
      path: "/gas-tank",
      element: (
        <>
          <Navbar
            wallet={wallet}
            connectWallet={connectWallet}
            setWallet={setWallet}
          />
          <GasTank />
        </>
      ),
    },
    {
      path: "*",
      element: <>404 Not Found</>,
    },
  ]);

  return <RouterProvider router={router} />;
}
