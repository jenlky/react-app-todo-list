import React from "react";

const AddNewList = ({ addList }) => {
  return (
    <div>
      <button className="add-another-list" onClick={addList}>
        Add another list
      </button>
    </div>
  );
};

export default AddNewList;
