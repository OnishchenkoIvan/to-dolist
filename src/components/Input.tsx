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
      <input
        className={error ? "error" : ""}
        value={title}
        onChange={changeTitle}
        onKeyDown={onKeyDownAddTask}
      />
      <button onClick={addTask}>+</button>
      {userMessage}
    </div>
  );
};
