import { createContext, useContext, useEffect, useState } from "react";
export function useInactiveListener() {
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error) {
      const handleConnect = () => {
        console.log("cHandling 'connect' event");
        activate(injected);
      };
      const handleChainChanged = (chainId) => {
        console.log("cHandling 'chainChanged' event with payload", chainId);
        activate(injected);
      };
      ethereum.on("accountsChanged", handleAccountsChanged);

      const handleAccountsChanged = (accounts) => {
        console.log("cHandling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId) => {
        console.log("cHandling 'networkChanged' event with payload", networkId);
        activate(injected);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, activate]);
}

export const WalletContext = createContext();
const ListChain = {
  "0x38": {
    name: "BNB",
    img: "/bnb.png",
  },
  "0x89": {
    name: "MATIC",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
  },
  "0xa4ec": {
    name: "CELO",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/5567.png",
  },
  "0x141": {
    name: "KCS",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/2087.png",
  },
  "0x19": {
    name: "CRO",
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/3635.png",
  },
};
const Verify = () => {
  if (!window.ethereum) {
    return true;
  }
};
export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [connectedWallet, setConnected] = useState(false);
  const [Balance, setBalance] = useState(0);
  const [chain, setChain] = useState(ListChain["0x38"]);
  let ethereum;
  const GetBalanceWallet = () => {
    if (Verify()) {
      return;
    }
    return ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        setBalance(parseInt(balance) / 10 ** 18);
      });
  };
  const addTokenWallet = () => {
    if (Verify()) {
      return;
    }
    ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: "0x21633323b1165AaB4537225b00d7f04c2357b301",
          symbol: "SBC",
          decimals: 2,
          image: "https://app.stratickblock.com/logo.png",
        },
      },
    });
  };
  const chainNetwork = (id) => {
    if (Verify()) {
      return;
    }
    try {
      return ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: id }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const func = { GetBalanceWallet, chainNetwork, addTokenWallet };
  useEffect(() => {
    if (Verify()) {
      return;
    }
    ethereum = window.ethereum;

    ethereum.request({ method: "eth_accounts" }).then((res) => {
      if (res.length > 0) {
        setAddress(res[0]);
        setConnected(true);
      }
    });
    ethereum.on("chainChanged", (chainId) => {
      try {
        console.log(chainId);
        const id = ListChain[chainId];

        if (id === undefined) {
          alert(id);
          setTimeout(() => {
            chainNetwork("0x38")
              .then((res) => {
                setChain(ListChain["0x38"]);
              })
              .catch(() => {
                console.log("EEr");
              });
          }, 20000);

          return;
        }

        setChain(id);
        GetBalanceWallet();
      } catch (error) {}
    });
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setConnected(true);
      }
    };
    ethereum.on("accountsChanged", handleAccountsChanged);
  });
  const connect = async () => {
    if (Verify()) {
      return;
    }
    ethereum.request({ method: "eth_requestAccounts" }).then((e) => {
      setAddress(e[0]);
      setConnected(true);
    });
  };
  return (
    <WalletContext.Provider
      value={{
        Balance,
        address,
        connectedWallet,
        connect,
        func,
        chain,
        setChain,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
export const useWallet = () => useContext(WalletContext);
