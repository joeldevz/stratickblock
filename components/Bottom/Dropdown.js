import { useState } from "react";
import { useWallet } from "../../Context/walletContext";
export const BotonDropdown = ({ children }) => {
  const { Balance, func, chain, setChain } = useWallet();

  const [menu, setMenu] = useState([
    {
      img: "/bnb.png",
      id: "0x38",
    },
    {
      img: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
      name: "MATIC",
      id: "0x89",
    },
    {
      img: "https://s2.coinmarketcap.com/static/img/coins/64x64/5567.png",
      name: "CELO",
      id: "0xa4ec",
    },
    {
      img: "https://s2.coinmarketcap.com/static/img/coins/64x64/3635.png",
      name: "CRO",
      id: "0x19",
    },
    {
      img: "https://s2.coinmarketcap.com/static/img/coins/64x64/2087.png",
      name: "KCS",
      id: "0x141",
    },
  ]);
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="font-bold px-2 text-gray-300 hidden md:block">
        {Balance.toFixed(4)} {chain.name}
      </div>
      <div className="bg-gray-800 p-2 rounded-md  hidden sm:block">
        <img
          width="25px"
          src={chain.img}
          className="m-auto cursor-pointer"
          onClick={() => setActive(!active)}
        />
      </div>
      <div
        width="50px"
        className={`  absolute mt-28 bg-gray-800 p-3 rounded-md grid grid-cols-5 ${
          active ? "block" : "hidden"
        }`}
      >
        {menu.map((item, index) => (
          <img
            key={"chain" + index}
            width="25px"
            src={item.img}
            className="m-auto cursor-pointer mr-2"
            onClick={() => {
              setActive(!active);
              func
                .chainNetwork(item.id)
                .then(() => {
                  setChain(item);
                  func.GetBalanceWallet();
                })
                .catch((err) => {
                  console.log("error");
                });
            }}
          />
        ))}
      </div>
    </>
  );
};
