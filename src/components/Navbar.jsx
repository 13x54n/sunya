import React, { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "/logo.png";
import L2WalletConnectKit from "./L2WalletConnectKit";
import { useNavigate } from "react-router-dom";

export default function Navbar({ wallet, connectWallet, setWallet }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (_href) => {
    navigate(_href);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-gray-50 border">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 py-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <div
            onClick={() => handleNavigate("/")}
            className="cursor-pointer -m-1.5 p-1.5 flex items-center gap-2"
          >
            <img className="h-8 w-auto" src={Logo} alt="" />
            <span className="text-md font-semibold">Sunya</span>
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <div
            onClick={() => handleNavigate("/audits")}
            className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            Audits
          </div>
          <a
            href="https://lexy-team.gitbook.io/sunya"
            target="_blank"
            className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            Documentation
          </a>
          <div
            onClick={() => handleNavigate("/gas-tank")}
            className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            ⛽ Gas Tank
          </div>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {wallet && wallet.isConnected ? (
            <L2WalletConnectKit wallet={wallet} setWallet={setWallet} />
          ) : (
            <button
              className="text-sm font-semibold leading-6 text-white p-1 px-2 rounded-md bg-black"
              onClick={() => connectWallet()}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div className="-m-1.5 p-1.5 flex items-center gap-2">
              <img className="h-8 w-auto" src={Logo} alt="" />
              <span className="sr-only">Sunya</span>
            </div>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div
                  onClick={() => navigate("/audits")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Audits
                </div>
                <div
                  onClick={() => navigate("/documentation")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Documentation
                </div>
                <div
                  onClick={() => navigate("/gas-tank")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  ⛽ Gas Tank
                </div>
              </div>
              <div className="py-6">
                {wallet && wallet.isConnected ? (
                  <L2WalletConnectKit wallet={wallet} setWallet={setWallet} />
                ) : (
                  <button
                    className="text-sm font-semibold leading-6 text-white p-1 px-2 rounded-md bg-black"
                    onClick={() => connectWallet()}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
