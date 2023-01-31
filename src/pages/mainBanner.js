import React from "react";
import { Box, Typography } from "@mui/material";

import { DISPLAY_COLUMN_STYLE, DISPLAY_ROW_STYLE } from "../default/style";
import {
  BLACK_DEFAULT_COLOR,
  GRAY_DEFAULT_COLOR,
  RED_DEFAULT_COLOR,
  WHITE_DEFAULT_COLOR,
  GREEN_DEFAULT_COLOR,
  DARK_DEFAULT_COLOR,
} from "../default/color";

function MainBanner() {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            ...DISPLAY_COLUMN_STYLE,
            color: WHITE_DEFAULT_COLOR,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>someone else is</h2>
          <h1>EXIT SCAMMING</h1>
          <h5>loading...</h5>
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          borderRadius: "10px",
          border: "#f000f0",
          backgroundColor: "#f000f0",
          boxShadow: "0 0 2px #690069, 0 0 25px #c0c, 0 0 5px #f0f",
          textTransform: "uppercase",
          textAlign: "center",
          color: "#fff",
          padding: "5px",
        }}
      >
        <Typography
          sx={{
            ...DISPLAY_COLUMN_STYLE,
            color: WHITE_DEFAULT_COLOR,
            alignItems: "center",
            justifyContent: "center",
            fontSize: "calc(1.275rem + .3vw)",
          }}
        >
          The only way you lose in this game is if you stop playing
        </Typography>
      </Box>
    </>
  );
}

export default MainBanner;
