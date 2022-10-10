import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const Editor = ({ placeholder, changeDescriptionHandler, value }) => {
  console.log("render editor");
  const editor = useRef(null);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    placeholder: placeholder || "Mô tả về hiện vật...",
    minHeight: "300px",
  };

  return (
    <JoditEditor
      ref={editor}
      value={value || ""}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onChange={(newContent) => changeDescriptionHandler(newContent)}
    />
  );
};

export default React.memo(Editor);
