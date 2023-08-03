import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useCreateQueryMutation } from "../redux/api";

function CreateQuiz() {
  const theme = useTheme();
  const [post, setPost] = useState(false);

  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [questions, setQuestions] = useState([]);

  const [desc, setQuestionDesc] = useState("");
  const [main, setQuestionMain] = useState("");
  const [options, setCurrentOptions] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ]);
  const [createPost, { data, isLoading, isError, error }] =
    useCreateQueryMutation();

  const handleRemove = (i) => {
    setQuestions((prev) => [...prev.filter((item, index) => index !== i)]);
  };

  const handleChange = (e, i) => {
    const { value } = e.target;
    let newArr = [...options];
    newArr[i] = value;
    setCurrentOptions(newArr);
  };

  const handleClick = () => {
    if (!desc || !main || !options) {
      alert("Please fill the question form");
      setPost(false);
      return false;
    }

    const question = {
      desc,
      main,
      options,
    };
    setQuestions((prev) => [...prev, question]);
    setQuestionDesc("");
    setQuestionMain("");
    setCurrentOptions(["Option 1", "Option 2", "Option 3", "Option 4"]);
  };

  const handlePost = () => {
    // if (questions.length < 3) {
    //   alert("Minimum 3 question");
    //   return false;
    // }
    //add database
    const postedQuestions = [...questions, { desc, main, options }];
    setPost(true);
    handleClick();
    createPost({
      name,
      category,
      questions: postedQuestions,
    });
  };
  console.log(data);
  return (
    <Box>
      <Box display="flex" gap={2}>
        <Box>
          <Typography>Quiz Name</Typography>
          <Input
            disabled={post}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <FormControl size="small" sx={{ marginTop: 3, width: 200 }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            required
            disabled={post}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem selected={category === "sicence"} value="science">
              Science
            </MenuItem>
            <MenuItem selected={category === "spor"} value="spor">
              Spor
            </MenuItem>
            <MenuItem selected={category === "movies"} value="movies">
              Movies
            </MenuItem>
          </Select>
        </FormControl>
        <Box>
          <Typography>Image</Typography>
          <Input disabled={post} type="file" />
        </Box>
      </Box>
      {questions.length > 0
        ? questions.map((item, i) => (
            <Question
              isQuestion={true}
              index={i}
              item={item}
              questions={questions}
              theme={theme}
              disable={true}
              handleRemove={handleRemove}
              post={post}
            />
          ))
        : ""}
      {post || (
        <Question
          index={questions.length}
          setQuestions={setQuestions}
          questionDesc={desc}
          setQuestionDesc={setQuestionDesc}
          handleChange={handleChange}
          currentOptions={options}
          questionMain={main}
          setQuestionMain={setQuestionMain}
          theme={theme}
        />
      )}
      <Button
        onClick={handlePost}
        sx={{ float: "right", marginTop: 3 }}
        variant="secondary"
      >
        Complete QUIZ
      </Button>
      <Button
        onClick={handleClick}
        sx={{ float: "right", marginTop: 3 }}
        variant="secondary"
      >
        Add Question
      </Button>
    </Box>
  );
}

function Question({
  item,
  isQuestion,
  questionDesc,
  setQuestionDesc,
  handleChange,
  currentOptions,
  questionMain,
  setQuestionMain,
  theme,
  disable,
  index,
  handleRemove,
  post,
}) {
  const textareaSyle = {
    width: "100%",
    height: 80,
    background: theme.palette.background.paper,
    border: "none",
    marginTop: 10,
    borderRadius: 7,
    padding: 10,
    resize: "none",
    outline: "none",
  };

  return (
    <>
      <Box display="block" position="relative" gap={2} pt={3}>
        {isQuestion && (
          <Button
            disabled={post}
            onClick={() => handleRemove(index)}
            fontWeight={"bolder"}
            style={{ position: "absolute", top: 20, right: 0 }}
          >
            Remove
          </Button>
        )}
        <Typography fontWeight={"bolder"}>{index + 1})</Typography>
        <Box flex={1} marginTop={1} display="flex" gap={2}>
          <TextareaAutosize
            style={{ ...textareaSyle, flex: 2 }}
            value={item?.desc || questionDesc}
            disabled={disable}
            onChange={isQuestion || ((e) => setQuestionDesc(e.target.value))}
          />
          <TextareaAutosize
            style={{ ...textareaSyle, flex: 1 }}
            value={item?.main || questionMain}
            disabled={disable}
            onChange={isQuestion || ((e) => setQuestionMain(e.target.value))}
          />
        </Box>

        <Box flex={1} mt={2} display="flex" gap={1} flexWrap="wrap">
          {item
            ? item.options.map((option, i) => (
                <>
                  <TextField
                    id="outlined-basic"
                    value={option}
                    onChange={isQuestion || ((e) => handleChange(e, i))}
                    variant="outlined"
                    size="small"
                    disabled={disable}
                  />
                </>
              ))
            : currentOptions.map((option, i) => (
                <>
                  <TextField
                    id="outlined-basic"
                    value={option}
                    onChange={isQuestion || ((e) => handleChange(e, i))}
                    variant="outlined"
                    size="small"
                    disabled={disable}
                  />
                </>
              ))}
        </Box>
      </Box>
    </>
  );
}

export default CreateQuiz;
