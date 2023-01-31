import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { DISPLAY_COLUMN_STYLE, DISPLAY_ROW_STYLE } from "../default/style";
import {
  BLACK_DEFAULT_COLOR,
  GRAY_DEFAULT_COLOR,
  RED_DEFAULT_COLOR,
  WHITE_DEFAULT_COLOR,
  GREEN_DEFAULT_COLOR,
  DARK_DEFAULT_COLOR,
} from "../default/color";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography sx={{ color: WHITE_DEFAULT_COLOR }}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps1(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function a11yProps2(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function MainBanner() {
  const [value1, setValue1] = React.useState(0);
  const [value2, setValue2] = React.useState(0);
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  return (
    <Box
      sx={{
        ...DISPLAY_ROW_STYLE,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "20px",
      }}
    >
      <Box
        sx={{
          ...DISPLAY_COLUMN_STYLE,
          alignItems: "center",
          backgroundColor: DARK_DEFAULT_COLOR,
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value1}
            onChange={handleChange1}
            aria-label="tabs1"
            textColor={WHITE_DEFAULT_COLOR}
            indicatorColor="secondary"
          >
            <Tab label="Purchase" {...a11yProps1(0)} />
            <Tab label="Valut" {...a11yProps1(1)} />
            <Tab label="Vanity & Referrals" {...a11yProps1(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value1} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value1} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value1} index={2}>
          Item Three
        </TabPanel>
      </Box>
      <Box
        sx={{
          ...DISPLAY_COLUMN_STYLE,
          alignItems: "center",
          backgroundColor: DARK_DEFAULT_COLOR,
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value2}
            onChange={handleChange2}
            aria-label="tabs2"
            textColor={WHITE_DEFAULT_COLOR}
            indicatorColor="secondary"
          >
            <Tab label="Round" {...a11yProps2(0)} />
            <Tab label="Teams" {...a11yProps2(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value2} index={0}>
          Item One2
        </TabPanel>
        <TabPanel value={value2} index={1}>
          Item Two2
        </TabPanel>
        <TabPanel value={value2} index={2}>
          Item Three2
        </TabPanel>
      </Box>
    </Box>
  );
}

export default MainBanner;
