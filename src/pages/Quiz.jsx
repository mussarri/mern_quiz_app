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
import { next, prev, endQuiz } from "../redux/questionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState();
  const trace = useSelector((state) => state.questions.trace);
  const question = useSelector((state) => state.questions.getQuestion(trace));
  const questionLength = useSelector((state) => state.questions.length());

  console.log(questionLength);

  const handleNext = () => {
    if (!answer) {
      alert("Alert");
      return false;
    }
    if (trace < questionLength - 1) {
      setAnswer("");
      dispatch(next(answer));
    } else {
      dispatch(endQuiz());
      navigate("/result");
    }
  };

  const handlePrev = () => {
    dispatch(prev());
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
              {trace + ". " + question.text}
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
                onChange={(e) => setAnswer(e.target.value)}
              >
                {question.options.map((item, i) => (
                  <FormControlLabel
                    key={i}
                    value={item}
                    control={<Radio checked={item === answer} />}
                    label={item}
                    style={{ marginTop: 20 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </>
      )}

      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ position: "absolute", right: 50, bottom: 50 }}
        type="primary"
        onClick={handleNext}
      >
        Next Question
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ position: "absolute", left: 50, bottom: 50 }}
        type="primary"
        onClick={handlePrev}
      >
        PREV Question
      </Button>
    </Box>
  );
}

export default Quiz;
