import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function Stepperr({ count, active }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={active} alternativeLabel>
        {Array(count)
          .fill(0)
          .map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
      </Stepper>
    </Box>
  );
}
