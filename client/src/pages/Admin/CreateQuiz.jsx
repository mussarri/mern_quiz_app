import { useTheme } from "@emotion/react";
import {
  Alert,
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
import { instance } from "../Layout";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
  const theme = useTheme();
  const [post, setPost] = useState(false);
  const [errors, setErrors] = useState();

  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [questions, setQuestions] = useState([]);

  const [correct, setCorrect] = useState(0);
  const [desc, setQuestionDesc] = useState("");
  const [main, setQuestionMain] = useState("");
  const [options, setCurrentOptions] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ]);

  const navigate = useNavigate();

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
    if (!main || !options) {
      alert("Please fill the question form");
      setPost(false);
      return false;
    }

    const question = {
      desc,
      main,
      options,
      true: correct,
    };
    setQuestions((prev) => [...prev, question]);
    setCorrect(0);
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
    if (post) return false;
    let postedQuestions = errors
      ? [...questions]
      : main
      ? [...questions, { desc, main, options, true: correct }]
      : [...questions];
    const data = JSON.stringify({ questions: postedQuestions });
    setPost(true);
    handleClick();

    const formData = new FormData();
    formData.set("image", image);
    formData.set("name", name);
    formData.set("category", category);
    formData.set("questions", data);

    instance
      .post("admin/create", formData)
      .then((res) => {
        console.log(res);
        alert(`Quiz saved succesfully`);
        navigate("/admin/quizzes");
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.message?.code === 11000) {
          setErrors("Duplicated error, please use different quiz name.");
        } else if (err.response.data.message.message) {
          setErrors(err.response.data.message.message);
        }
      });
  };

  return (
    <Box>
      {errors && (
        <Alert
          variant="outlined"
          severity="error"
          sx={{ marginBottom: 2, width: "100%" }}
        >
          {errors}
        </Alert>
      )}
      <Box display="flex" gap={3}>
        <Box>
          <TextField
            placeholder="Quiz Name *"
            size="small"
            // disabled={post}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <FormControl size="small" sx={{ width: 200 }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            required
            // disabled={post}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem selected={category === "movies"} value="movies">
              Movies
            </MenuItem>
            <MenuItem selected={category === "religions"} value="religions">
              Religions
            </MenuItem>
            <MenuItem selected={category === "sicence"} value="science">
              Science
            </MenuItem>
            <MenuItem selected={category === "spor"} value="spor">
              Spor
            </MenuItem>

            <MenuItem selected={category === "technology"} value="technology">
              Technology
            </MenuItem>
          </Select>
        </FormControl>
        <Box>
          <Input
            placeholder="image"
            disabled={post}
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
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
      {post ? (
        ""
      ) : errors ? (
        ""
      ) : (
        <Question
          index={questions.length}
          questionDesc={desc}
          setQuestionDesc={setQuestionDesc}
          handleChange={handleChange}
          currentOptions={options}
          questionMain={main}
          setQuestionMain={setQuestionMain}
          theme={theme}
          setCorrect={setCorrect}
          correct={correct}
        />
      )}
      <Button
        disabled={questions.length < 3}
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
  setCorrect,
  correct,
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
            placeholder="Question description (optional)"
            style={{ ...textareaSyle, flex: 2 }}
            value={item?.desc || questionDesc}
            disabled={disable}
            onChange={isQuestion || ((e) => setQuestionDesc(e.target.value))}
          />
          <TextareaAutosize
            placeholder="Question main text"
            style={{ ...textareaSyle, flex: 1 }}
            value={item?.main || questionMain}
            disabled={disable}
            onChange={isQuestion || ((e) => setQuestionMain(e.target.value))}
          />
        </Box>

        <Box flex={1} mt={2} display="flex" gap={1} flexWrap="wrap">
          <>
            {item
              ? item.options.map((option, i) => (
                  <TextField
                    id="outlined-basic"
                    value={option}
                    onChange={isQuestion || ((e) => handleChange(e, i))}
                    variant="outlined"
                    size="small"
                    disabled={disable}
                  />
                ))
              : currentOptions.map((option, i) => (
                  <TextField
                    id="outlined-basic"
                    value={option}
                    onChange={isQuestion || ((e) => handleChange(e, i))}
                    variant="outlined"
                    size="small"
                    disabled={disable}
                  />
                ))}
          </>
        </Box>
        <Box display="flex" alignItems="flex-end" gap={2}>
          <InputLabel>Correct Answer Index:</InputLabel>
          <Input
            disabled={post}
            sx={{ mt: 2, width: 50 }}
            size="small"
            placeholder="Correct Answer Index"
            value={correct}
            onChange={(e) => setCorrect(e.target.value)}
          />
        </Box>
      </Box>
    </>
  );
}

export default CreateQuiz;
