import "../styles/globals.css";
import { WalletProvider } from "../Context/walletContext";

function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}

export default MyApp;
