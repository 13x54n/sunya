import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import MintAuditDidCard from "./MintAuditDidCard";

export default function MintAuditDidDIalogueModal({isMintDiDModelOpen, setIsMintDiDModelOpen, output, wallet, projectOwner}) {
  return (
    <Dialog className="relative z-10" open={isMintDiDModelOpen} onClose={setIsMintDiDModelOpen}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-400 backdrop-blur bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform rounded-lg text-left transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <MintAuditDidCard wallet={wallet} output={output} projectOwner={projectOwner} setIsMintDiDModelOpen={setIsMintDiDModelOpen}/>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
