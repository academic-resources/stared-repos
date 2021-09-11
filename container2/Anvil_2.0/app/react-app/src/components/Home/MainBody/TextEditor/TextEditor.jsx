import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import { useDispatch, useSelector } from "react-redux";
import "./editor.css";

import { getUserFile } from "../../../../store/reducers/user";

const TextEditor = ({ content, setContent, fileId }) => {
  const dispatch = useDispatch();
  const { quill, quillRef } = useQuill();

  const fileContent = useSelector((state) => state.user.selectedFile);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setContent(quill.getContents());
      });
    }
  }, [quill, setContent]);

  useEffect(() => {
    dispatch(getUserFile(fileId));
  }, [dispatch, fileId]);

  useEffect(() => {
    if (quill && fileContent) {
      if (fileContent.content !== null) {
        const parsedContent = JSON.parse(fileContent.content);
        quill.setContents(parsedContent.ops);
      } else {
        quill.setContents([{ insert: "" }]);
      }
    }
  }, [fileContent, quill]);

  return (
    <div
      style={{
        height: "90%",
        width: "90%",
        background: "rgba(68, 71, 90, 0.7)",
        color: "#8be9fd",
      }}
    >
      <div
        ref={quillRef}
        style={{
          fontSize: "18px",
          height: "96%",
          border: "none",
        }}
      />
    </div>
  );
};

export default TextEditor;
