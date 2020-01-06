import React from "react";
import Cross from "./Cross";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export default function ListItemRight({
  listId,
  listItem,
  editItem,
  removeItem
}) {
  const itemId = listItem.id.split("-");

  const modules = {
    toolbar: [
      { header: "1" },
      { header: "2" },
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "link",
      "image",
      "video"
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    }
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video"
  ];

  return (
    <div className="list-item-content">
      <ReactQuill
        className="react-quill"
        theme="bubble"
        defaultValue={listItem.text}
        onChange={(content, delta, source, editor) =>
          editItem(editor.getContents(), listId, itemId)
        }
        formats={formats}
        modules={modules}
        data-testid="todo-item-input"
        bounds={".list"}
      />
      <Cross
        title="Remove parent and its children"
        className="list-item-cross"
        dataTestId="todo-item-cross"
        listId={listId}
        itemId={itemId}
        removeItem={removeItem}
      />
    </div>
  );
}
