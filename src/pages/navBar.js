import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";

import {
  DISPLAY_COLUMN_STYLE,
  DISPLAY_ROW_STYLE,
  NAVBAR_LINK_BUTTON_STYLE,
  SOCIAL_LINK_BUTTON_STYLE,
  MAIN_WRAPPER_STYLE,
} from "../default/style";
import { MAX_WRAPPER_WIDTH, NAVBAR_HEIGHT } from "../default/value";
import HashPackConnectButton from "../components/hashpackConnectButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  BLACK_DEFAULT_COLOR,
  RED_DEFAULT_COLOR,
  DARK_DEFAULT_COLOR,
} from "../default/color";

const pathList = ["", "home", "play", "history"];

function Navbar() {
  let history = useHistory();
  const location = useLocation();
  const [navSelected, setNavSelected] = useState("");

  useEffect(() => {
    let pathName = location.pathname.replace("/", "");
    if (!pathList.includes(pathName)) pathName = "";
    setNavSelected(pathName);
  }, [location]);

  return (
    <>
      <Box
        sx={{
          ...DISPLAY_COLUMN_STYLE,
          ...{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            backgroundColor: DARK_DEFAULT_COLOR,
          },
        }}
      >
        <Box
          sx={{
            ...DISPLAY_ROW_STYLE,
            ...{
              margin: "10px 0 10px 0",
              width: "100%",
              height: "100%",
              maxWidth: `${MAX_WRAPPER_WIDTH}px`,
              height: `${NAVBAR_HEIGHT}px`,
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <WalletMultiButton />
        </Box>
      </Box>
    </>
  );
}

export default Navbar;
