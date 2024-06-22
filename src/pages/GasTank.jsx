import React from "react";
import GaugeChart from "react-gauge-chart";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import RecentAudits from '../mocks/RecentAudits.json'

export default function GasTank() {
  return (
    <div className="container mx-auto max-w-7xl p-6 py-4 lg:px-8">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              Sunya
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <a
                href="#"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                Gas Tank
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex items-center mt-8 justify-between">
        <div className="text-2xl">📜 Gas Tank</div>

        <DynamicWidget />
      </div>
      <p className="text-sm font-medium text-gray-500">
        is a multi signatory embedded wallet that helps developers to interact
        with audits utilizing meta transaction.
      </p>

      <div className="flex gap-4">
        <div>
          <div className="w-80 flex bg-gray-50 my-6 shadow-lg border-2 border-gray-500 rounded-lg flex-col items-center py-2">
            <p className="font-medium">Gas Meter: 87%</p>
            <GaugeChart
              id="gauge-chart5"
              nrOfLevels={420}
              arcsLength={[0.3, 0.3, 0.3]}
              colors={["#EA4228", "#F5CD19", "#5BE12C"]}
              percent={0.87}
              arcPadding={0.02}
              hideText={true}
            />
          </div>
          <p className="text-sm">
            <b>Ethereum Gas Price</b>: n/a <b>Starknet Gas Price</b>: n/a
          </p>
        </div>
        <div className="flex overflow-hidden flex-1 bg-gray-50 my-6 shadow-lg border-2 border-gray-500 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50 text-sm font-medium">
              <tr className="text-left">
                <th className="px-2 py-1">Block Number</th>
                <th className="px-2 py-1">Gas Price</th>
                <th className="px-2 py-1">tx Hash</th>
                <th className="px-2 py-1">Storage Proof</th>
              </tr>
            </thead>
            <tbody>
              {RecentAudits.map((audit, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-2 py-1 whitespace-nowrap">
                    {audit.block_number}
                  </td>
                  <td className="px-2 py-1">
                    0.00003 ETH
                  </td>
                  <td className="px-2 py-1">
                    <a
                      href={
                        audit.platform == "starknet"
                          ? audit.voyager_url
                          : audit.etherscan_url
                      }
                      target="_blank"
                    >
                      {audit.txHash.substring(0, 15)}...
                    </a>
                  </td>
                  <td>
                    <a target="_blank" href={audit.storage_proof}>
                      {audit.storage_proof.substring(0, 25) +
                        audit.storage_proof.slice(-5)}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
