import React from "react";
import { Button } from "react-bootstrap";

const Categories = ({ categories, filterItems }) => {
  return (
    <div>
      <div className="btn-container">
      {categories.map((mainCategory, i) => {
        return (
          <Button type="button" className="filter-btn" key={i} onClick={() => filterItems(mainCategory)}>
            {mainCategory}
          </Button>
        )
      })}
      </div>
    </div>
  )
}

export default Categories