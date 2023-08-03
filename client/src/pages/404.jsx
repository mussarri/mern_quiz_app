import { Box, Typography } from "@mui/material";
import React from "react";

function Error() {
  return (
    <Box height={"100%"}>
      <Typography variant="h2" lineHeight={1} textAlign="center">
        404
      </Typography>
      <Typography variant="h5" lineHeight={1} textAlign="center">
        Page Not Found
      </Typography>
    </Box>
  );
}

export default Error;
