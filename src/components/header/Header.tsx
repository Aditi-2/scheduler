import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar variant="regular">
        <Typography variant="h6" color="inherit">
          Scheduler
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
