import { useEffect } from "react";
import { useWallet } from "../Context/walletContext";

export default () => {
  const { connectedWallet, connect, address } = useWallet();

  let addressModify;
  if (address !== null) {
    addressModify =
      address.slice(0, 6) +
      "..." +
      address.slice(address.length - 4, address.length);
  }

  return (
    <nav class="bg-gray-900 border-b border-gray-900 shadow-slate-700 shadow-sm fixed z-30 w-full">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-500 focus:bg-gray-500 focus:ring-2 focus:ring-gray-500 rounded"
            >
              <svg
                id="toggleSidebarMobileHamburger"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                id="toggleSidebarMobileClose"
                class="w-6 h-6 hidden"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <a href="/" class="text-xl font-bold flex items-center lg:ml-2.5">
              <img src="./logo1.png" class="h-12 mr-2" alt="Windster Logo" />
            </a>
            <form action="#" method="GET" class="hidden lg:block lg:pl-32">
              <label for="topbar-search" class="sr-only">
                Search
              </label>
              <div class="mt-1 relative lg:w-64">
                <div class="absolute inset-y-0 left-0 bg-gray-700 pl-3  rounded-lg flex items-center pointer-events-none">
                  <svg
                    class="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  class="bg-gray-700 border border-gray-700 text-gray-300 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div class="flex items-center">
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              class="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
            >
              <span class="sr-only">Search</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div class="hidden lg:flex items-center">
              {connectedWallet ? (
                <span class="text-lg font-bold  text-gray-300 px-5  hover:scale-105 cursor-pointer mr-5  bg-gray-800 p-2 rounded-full">
                  {addressModify}
                </span>
              ) : (
                <span
                  onClick={connect}
                  class="text-lg font-bold  text-gray-300 px-5  hover:scale-105 cursor-pointer mr-5  bg-gray-800 p-2 rounded-full"
                >
                  Connect Metamask
                </span>
              )}

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
