import {
  BLACK_DEFAULT_COLOR,
  CYAN_DEFAULT_COLOR,
  WHITE_DEFAULT_COLOR,
} from "./color";
import { MAX_WRAPPER_WIDTH } from "./value";

//main
export const MAIN_STYLE = {
  backgroundImage: "url(/images/uwfomo3d.jpg)",
  height: "100vh",
  width: "100vw",
  backgroundPosition: "50%",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
// Navbar styles
export const NAVBAR_TEXT_STYLE = {
  fontSize: "18px",
  fontWeight: "700",
};

export const NAVBAR_LINK_BUTTON_STYLE = {
  ...NAVBAR_TEXT_STYLE,
  ...{
    color: BLACK_DEFAULT_COLOR,
    borderRadius: "32px",
  },
};

export const SOCIAL_LINK_BUTTON_STYLE = {
  width: "42px",
  height: "42px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  marginBottom: "10px",
};

// Main wrapper style
export const MAIN_WRAPPER_STYLE = {
  width: "90vw",
  maxWidth: `${MAX_WRAPPER_WIDTH}px`,
  width: "90vw",
  alignItems: "center",
  justifyContent: "space-between",
  // border: "solid 2px yellow",
  // backgroundColor : GRAY_DEFAULT_COLOR,
  // backgroundColor: `${DARK_DEFAULT_COLOR} !important`,
};

export const MAIN_DESCRIPTION_TITLE_STYLE = {
  fontSize: "64px",
  fontWeight: "700",
  color: BLACK_DEFAULT_COLOR,
  margin: "0 0 20px 0",
};

export const MAIN_DESCRIPTION_TEXT_STYLE = {
  fontSize: "24px",
  lineHeight: "36px",
  color: BLACK_DEFAULT_COLOR,
  margin: 0,
};

export const MAIN_STATUS_WRAPPER_STYLE = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: "25vh",
  padding: "20px 0",
  marginTop: "60px",
};

// default styles
export const DISPLAY_ROW_STYLE = {
  display: "flex",
  flexDirection: "row",
};

export const DISPLAY_COLUMN_STYLE = {
  display: "flex",
  flexDirection: "column",
};

export const MUI_BUTTON_FOCUS_CLEAR_STYLE = {
  "&:focus": {
    outline: "none",
  },
};

// coin-flip control styles
export const SELECT_COIN_FACE_BUTTON_STYLE = {
  width: "120px",
  height: "120px",
  fontSize: "28px",
  border: "5px solid",
  borderColor: CYAN_DEFAULT_COLOR,
};
