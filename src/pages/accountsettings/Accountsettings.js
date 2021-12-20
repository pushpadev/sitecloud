import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import { Link } from "react-router-dom";
import Content from "./Content";
const drawerWidth = 230;

export default function ClippedDrawer() {
  const selectedbylist = [
    {
      url: "/menu1",
      name: "menu 1",
    },
    {
      url: "/menu2",
      name: "menu 2",
    },
  ];
  const [iscategories, setcategories] = useState("false");
  const [isState, setState] = useState("false");
  const handlecategories = () => {
    setcategories(!iscategories);
  };
  const handlestates = () => {
    setState(!isState);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {selectedbylist.map((text, index) => (
              <Link
                to={text.url}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem button key={text.name}>
                  <label for={text.name}>{text.name}</label>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Toolbar />
        <Typography paragraph>
          <Content />
        </Typography>
      </Box>
    </Box>
  );
}
