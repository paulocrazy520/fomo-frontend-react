import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import Navbar from "./navBar";
import {
  MAIN_WRAPPER_STYLE,
  MAIN_STYLE,
  DISPLAY_ROW_STYLE,
  DISPLAY_COLUMN_STYLE,
} from "../default/style";
import {
  BLACK_DEFAULT_COLOR,
  GRAY_DEFAULT_COLOR,
  RED_DEFAULT_COLOR,
  WHITE_DEFAULT_COLOR,
  GREEN_DEFAULT_COLOR,
  DARK_DEFAULT_COLOR,
} from "../default/color";
import MainBanner from "./mainBanner";
import MainForm from "./mainForm";

function Home() {
  let history = useHistory();

  return (
    <Box sx={MAIN_STYLE}>
      <Box
        sx={{
          ...DISPLAY_COLUMN_STYLE,
          ...MAIN_WRAPPER_STYLE,
        }}
      >
        <Navbar />
      </Box>
      <Box
        sx={{
          ...DISPLAY_COLUMN_STYLE,
          ...MAIN_WRAPPER_STYLE,
        }}
      >
        <MainBanner />
      </Box>

      <Box
        sx={{
          ...DISPLAY_COLUMN_STYLE,
          ...MAIN_WRAPPER_STYLE,
        }}
      >
        <MainForm />
      </Box>
    </Box>
  );
}

export default Home;
