import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";

function getLibrary(provider) {
  return new Web3(provider);
}
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
export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [connectedWallet, setConnected] = useState(false);
  let ethereum;
  useEffect(() => {
    ethereum = window.ethereum;
    ethereum.request({ method: "eth_accounts" }).then((res) => {
      if (res.length > 0) {
        setAddress(res[0]);
        setConnected(true);
      }
    });
    const handleAccountsChanged = (accounts) => {
      console.log("cHandling 'accountsChanged' event with payload", accounts);
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setConnected(true);
      }
    };
    ethereum.on("accountsChanged", handleAccountsChanged);

  });
  const connect = async () => {
    ethereum.request({ method: "eth_requestAccounts" }).then((e) => {
      console.log(e);
      setAddress(e[0]);
      setConnected(true);
    });
  };
  return (
    <WalletContext.Provider
      value={{ address, connectedWallet, connect }}
    >
      {children}
    </WalletContext.Provider>
  );
};
export const useWallet = () => useContext(WalletContext);
