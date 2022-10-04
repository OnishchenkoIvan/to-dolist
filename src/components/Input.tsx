import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type InputPropsType = {
  callBack: (trimmedTitle: string) => void;
};

export const Input = (props: InputPropsType) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(false);
    setTitle(e.currentTarget.value);
  };

  const addTask = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      props.callBack(trimmedTitle);
    } else {
      setError(true);
    }
  };

  const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTask();
  };
  const userMessage = error ? (
    <div style={{ color: "hotpink" }}>Title is required!</div>
  ) : (
    <div>Please, create list item</div>
  );
  return (
    <div>
      <TextField
        error={error}
        id="outlined-basic"
        label={error ? "Enter your task" : "type in"}
        variant="outlined"
        size={"small"}
        value={title}
        onChange={changeTitle}
        onKeyDown={onKeyDownAddTask}
      />
      <Button
        variant={"contained"}
        onClick={addTask}
        style={{
          maxWidth: "40px",
          maxHeight: "40px",
          minWidth: "40px",
          minHeight: "40px",
          backgroundColor: "black",
        }}
      >
        +
      </Button>
      {userMessage}
    </div>
  );
};
