import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Timer({ time }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showTime, setShowTime] = useState(time);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (showTime > 0) setShowTime(showTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [showTime]);

  // if (showTime < 1) {
  //   navigate("/result");
  // }

  if (showTime > 0)
    return (
      <Box
        sx={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          border: "1px solid grey",
          height: 100,
          width: 100,
          textAlign: "center",

          borderRadius: "50%",
          background: theme.palette.background.paper,
          zIndex: 2,
        }}
      >
        <Typography lineHeight="100px" fontWeight="bolder" fontSize={22}>
          {showTime > 0 ? showTime : "0"}
        </Typography>
      </Box>
    );
}

export default Timer;
