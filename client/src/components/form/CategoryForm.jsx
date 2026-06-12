import React from "react";

export default function CategoryForm({ handleSubmit, value, setValue }) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter new Category"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "#543a14", color: "#ffffff" }}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
