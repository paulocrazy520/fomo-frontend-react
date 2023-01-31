import React, { useState } from "react";
import { Button, Modal } from "@mui/material";

import {
  BLACK_DEFAULT_COLOR,
  RED_DEFAULT_COLOR,
  GREEN_DEFAULT_COLOR,
} from "../default/color";
import HashPackConnectModal from "./HashPackConnectModal";
import { useHashConnect } from "../api/HashConnectAPIProvider.tsx";

const HashPackConnectButton = () => {
  const [walletConnectModalViewFlag, setWalletConnectModalViewFlag] =
    useState(false);

  const { walletData, installedExtensions, connect, disconnect } =
    useHashConnect();
  const { accountIds } = walletData;

  const onClickWalletConnectModalClose = () => {
    setWalletConnectModalViewFlag(false);
  };

  const onClickOpenConnectModal = () => {
    setWalletConnectModalViewFlag(true);
    console.log("onClickOpenConnectModal log - 1 : ", walletData);
  };

  const onClickDisconnectHashPack = () => {
    disconnect();
    setWalletConnectModalViewFlag(false);
  };

  const onClickCopyPairingStr = () => {
    navigator.clipboard.writeText(walletData.pairingString);
  };

  const onClickConnectHashPack = () => {
    console.log("onClickConnectHashPack log - 1");
    if (installedExtensions) {
      connect();
      setWalletConnectModalViewFlag(false);
    } else {
      alert(
        "Please install hashconnect wallet extension first. from chrome web store."
      );
    }
  };

  return (
    <>
      <Button
        onClick={() => onClickOpenConnectModal()}
        variant="outlined"
        sx={{
          borderRadius: "32px",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: "700",
          border: "3px solid",
          borderColor: GREEN_DEFAULT_COLOR,
          color: RED_DEFAULT_COLOR,
          "&:hover": {
            backgroundColor: BLACK_DEFAULT_COLOR,
            border: "3px solid",
            borderColor: BLACK_DEFAULT_COLOR,
          },
        }}
      >
        {accountIds?.length > 0 ? accountIds[0] : "Connect Wallet"}
      </Button>
      <Modal
        open={walletConnectModalViewFlag}
        onClose={() => onClickWalletConnectModalClose()}
        centered={true}
      >
        <HashPackConnectModal
          pairingString={walletData.pairingString}
          connectedAccount={accountIds}
          onClickConnectHashPack={onClickConnectHashPack}
          onClickCopyPairingStr={onClickCopyPairingStr}
          onClickDisconnectHashPack={onClickDisconnectHashPack}
        />
      </Modal>
    </>
  );
};

export default HashPackConnectButton;
