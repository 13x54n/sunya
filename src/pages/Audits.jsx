import React from "react";
import RecentAudits from "../mocks/RecentAudits.json";

export default function Audits() {
  return (
    <div className="mx-auto max-w-7xl p-6 py-4 lg:px-8">
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
                Audits
              </a>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex justify-between my-6 mt-8">
        <div className="text-2xl">📜 Audited Projects</div>
        <div>
          <i className="ri-search-line"></i>
          <input
            type="text"
            placeholder="Search using DID, project name, etc."
          />
        </div>
      </div>

      <div className="overflow-x-auto flex gap-6 my-4">
        <div className="flex-1">
          <table className="bg-white w-full">
            <thead className="bg-gray-50 text-sm font-medium">
              <tr className="text-left">
                <th className="px-2 py-1">DID</th>
                <th className="px-2 py-1">Platform</th>
                <th className="px-2 py-1">Type</th>
                <th className="px-2 py-1">Age</th>
              </tr>
            </thead>
            <tbody>
              {RecentAudits.map((audit, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-2 py-1 whitespace-nowrap">
                    {audit.did}{" "}
                    <i className="ri-file-copy-line cursor-pointer"></i>
                  </td>
                  <td className="px-2 py-1">
                    <span className="bg-green-200 p-1 text-sm rounded-md">
                      {audit.platform}
                    </span>
                  </td>
                  <td className="px-2 py-1">{audit.project_type}</td>
                  <td className="px-2 py-1">{audit.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
