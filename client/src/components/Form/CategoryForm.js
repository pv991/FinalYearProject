import React from "react";
import "../../pages/Admin/createcategory.css";

const CategoryForm = ({
  handleSubmit,
  value,
  setValue,
  buttonText = "Create",
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <div className="flex">
            <input
              type="text"
              className="form-control"
              placeholder="Enter new category"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="flex">
            <button type="submit" className=" ms-3 buttonsubmit">
              {buttonText}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
