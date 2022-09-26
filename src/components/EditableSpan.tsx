import React, { ChangeEvent, useState } from "react";
type EditableSpanType = {
  title: string;
  callBack: (currentTitle: string) => void;
};
export const EditableSpan = (props: EditableSpanType) => {
  const [edit, setEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState<string>(props.title);

  const changeEdit = () => {
    setEdit(!edit);
    changeTask();
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.currentTarget.value);
  };

  const changeTask = () => {
    const trimmedTitle = currentTitle.trim();
    props.callBack(trimmedTitle);
  };

  return edit ? (
    <input
      value={currentTitle}
      onBlur={changeEdit}
      onChange={changeTitle}
      autoFocus
    />
  ) : (
    <span onDoubleClick={changeEdit}>{props.title}</span>
  );
};
