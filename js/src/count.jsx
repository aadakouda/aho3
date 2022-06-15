import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AppBar, Grid, IconButton, Link, Toolbar } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const aho_api = "http://127.0.0.1:8000";

const Count = () => {
  const [number, setNumber] = useState(1);
  const [aho, setAho] = useState(false);
  const [nextNumber, setNextNumber] = useState(2);
  const ahoStyle = {
    fontFamily: "Shizuru",
  };
  const onClickButton = () => {
    const params = { number: nextNumber };
    const query = new URLSearchParams(params);
    fetch(aho_api.concat(`?${query}`), { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNumber(data.number);
        setAho(data.aho);
        setNextNumber(data.next_number);
      });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} sx={{ paddingBottom: "20px" }}>
        <AppBar position="static">
          <Grid container>
            <Grid items xs></Grid>
            <Grid items xs={12} sm={8}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Aho App
                </Typography>
                <Link href="https://github.com/aadakouda/aho3" target="_blank">
                  <IconButton
                    size="large"
                    aria-label="github"
                    sx={{ color: "white" }}
                  >
                    <GitHubIcon />
                  </IconButton>
                </Link>
              </Toolbar>
            </Grid>
            <Grid items xs></Grid>
          </Grid>
        </AppBar>
      </Box>
      <Grid container direction={"column"} alignItems={"center"}>
        <Grid item xs>
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
            }}
          >
            <CircularProgress
              size={200}
              variant="determinate"
              value={(number / 40) * 100}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid container direction={"column"} alignItems={"center"}>
                <Grid item xs>
                  {aho ? <h1 style={ahoStyle}>{number}</h1> : <h1>{number}</h1>}
                </Grid>
                <Grid item xs>
                  <Button variant="contained" onClick={onClickButton}>
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Count;
