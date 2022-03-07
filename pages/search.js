import Head from "next/head";
import { Stock } from "@ant-design/plots";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Index";
import { Token, TokenHidden } from "../components/Tokens";
import { GetPortfolio, GetSearch } from "../API";
export default function Search() {
  const [tokens, setTokens] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    GetPortfolio().then((res) => {
      setTokens(res);
    });
  }, []);
  useEffect(() => {
    if (search.length >= 3) {
      GetSearch(search).then((res) => {
        setTokens(res);
      });
    }
  }, [search]);

  return (
    <>
      <Layout address="">
        <div className="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
          <div className="bg-gray-900 shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
            <form action="#" method="GET" className=" w-full ">
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="mt-1 relative w-full">
                <div className="absolute inset-y-0 left-0 bg-gray-700 pl-3  rounded-lg flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  onKeyPress={(e) => {
                    console.log(e.target.value);
                    setSearch(e.target.value);
                  }}
                  className="bg-gray-700 border border-gray-700 text-gray-300 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                  placeholder="Search"
                />
              </div>
            </form>
            <div
              className={`mt-5 grid grid-cols-1 md:grid-cols-${
                tokens.length === 0 ? 1 : 2
              } gap-4`}
            >
              {tokens.length === 0 ? (
                <>
                  {" "}
                  <TokenHidden />
                </>
              ) : (
                tokens.map((token) => (
                  <Token
                    key={token.id}
                    name={token.name}
                    change={token.usd.percent_change_24h}
                    url={token.url}
                    price={token.usd.price}
                    slug={token.slug}
                    symbol={token.symbol}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
