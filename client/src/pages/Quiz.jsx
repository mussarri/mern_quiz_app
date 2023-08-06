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
import React, { useContext, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Timer from "../components/Timer";
import Stepperr from "../components/Stepper";
import { useGetSingleQuizQuestionQuery } from "../redux/api";
import { setResult } from "../redux/resultSlice";
import { UserContext } from "../App";
import { useDispatch } from "react-redux";

function Quiz() {
  const theme = useTheme();
  const { slug } = useParams();
  const [trace, setTrace] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useContext(UserContext);

  const { isLoading, data } = useGetSingleQuizQuestionQuery({ slug, trace });

  const handleChange = (e) => {
    setAnswers((prev) => ({
      ...prev,
      [trace]: e.target.value,
    }));
  };

  const handleFinish = () => {
    dispatch(
      setResult({
        username: user.username,
        answers: answers,
        quizName: data.name,
      })
    );
  };

  const handleNext = () => {
    if (trace >= data?.length - 1) {
      handleFinish();
      navigate("/result");
    } else {
      setTrace((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (trace < 1) return false;
    setTrace((prev) => prev - 1);
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
      {data?.question && (
        <>
          <Box p={5} borderRight="1px dotted grey">
            <Typography mt={5} fontSize={20}>
              {trace + 1 + ". " + data?.question.desc}
            </Typography>
            <Typography mt={4} fontSize={18} fontWeight="bold">
              {data?.question.main}
            </Typography>
          </Box>
          <Box p={5} mt={2}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={handleChange}
              >
                {data?.question.options.map((item, i) => (
                  <FormControlLabel
                    checked={+answers[trace] === i}
                    key={i}
                    value={i}
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
      <Timer time={data?.length * 10} />
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
          <Stepperr count={data?.length} active={trace} />
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
