import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import Stepperr from "../components/Stepper";
import { useGetAllQuizQuery } from "../redux/api";

function Quiz() {
  const theme = useTheme();
  const [trace, setTrace] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const { data } = useGetAllQuizQuery();
  const questions = data?.allQuiz[0].questions;
  const question = questions && questions[trace];

  const handleNext = () => {
    if (trace < questions?.length - 1) {
      setAnswer("")
      setTrace((prev) => prev + 1);
    } else navigate("/result");
  };
  const handlePrev = () => {
    if (trace > 0) setTrace((prev) => prev - 1);
  };

  return (
    <Box
      display="grid"
      position="relative"
      gridTemplateColumns="repeat(2, 1fr)"
      sx={{ background: theme.palette.background.paper }}
      borderRadius={4}
      height="100%"
    >
      {question && (
        <>
          <Box p={5} borderRight="1px dotted grey">
            <Typography mt={5} fontSize={20}>
              {trace + 1 + ". " + question.desc}
            </Typography>
            <Typography mt={4} fontSize={18} fontWeight="bold">
              Which answer is correct ?
            </Typography>
          </Box>
          <Box p={5} mt={2}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              >
                {question.options.map((item, i) => (
                  <FormControlLabel
                    key={i}
                    value={item}
                    control={<Radio />}
                    label={item}
                    style={{ marginTop: 20 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </>
      )}

      <Timer time={50} />

      <Box
        position="absolute"
        bottom={0}
        width="100%"
        gridColumn="2 span"
        display="flex"
        justifyContent="space-between"
        px={3}
        alignItems="center"
        height={100}
        sx={{ background: theme.palette.background.paper }}
      >
        <Button
          onClick={handlePrev}
          variant="contained"
          color="primary"
          size="large"
          type="primary"
        >
          Prev
        </Button>
        <Box flex={1}>
          <Stepperr count={questions?.length} active={trace} />
        </Box>
        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
          size="large"
          type="primary"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default Quiz;
