import React from "react";

const AddNewList = ({ addList }) => {
  return (
    <div className="">
      <button onClick={addList}>Add another list</button>
    </div>
  );
};

export default AddNewList;
