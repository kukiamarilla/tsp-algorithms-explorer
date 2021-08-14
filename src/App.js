import React from 'react';
import './App.css';
import {AppBar, createStyles, makeStyles, Toolbar, Typography} from "@material-ui/core";
import Home from "./components/Home";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1
        }
    })
);


function App() {
    const classes = useStyles();

  return (
      <div className={classes.root}>
          <AppBar position="sticky">
              <Toolbar>
                  <Typography variant="h6">
                      Traveling Salesman Problem
                  </Typography>
              </Toolbar>
          </AppBar>
          <Home/>
      </div>
  );
}

export default App;
