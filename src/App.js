import nacl from "tweetnacl";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { clusterApiUrl } from "@solana/web3.js";
import Home from "./pages/home";

import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";

import { useEffect, useState, useMemo } from "react";
import {
  useWallet,
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletNotConnectedError,
  WalletAdapterNetwork,
} from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  CoinbaseWalletAdapter,
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
  const { publicKey, signMessage, connected } = useWallet();
  console.log("**********************", publicKey, signMessage, connected);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  useEffect(() => {
    if (!connected) {
      setError("");
      setMessage("");
      setSignature("");
      setSignedMessage("");
      setVerified();
    }
  }, [connected]);

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const _signMessage = async () => {
    try {
      console.log("signing message");
      if (!publicKey) throw new WalletNotConnectedError();
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);
      setSignedMessage(encodedMessage);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    try {
      if (!publicKey) throw new WalletNotConnectedError();
      const verified = nacl.sign.detached.verify(
        signedMessage,
        signature,
        publicKey.toBuffer()
      );
      setVerified(verified);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <Switch>
        <Route path="/home" render={(props) => <Home {...props} />} />
        <Redirect to="/home" />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}

export default App;
