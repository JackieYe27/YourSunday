import React from "react";
import { Button } from "react-bootstrap";

const Categories = ({ categories, filterItems }) => {
  return (
    <div>
      <div className="btn-container">
      {categories.map((category, i) => {
        return (
          <Button type="button" className="filter-btn" key={i} onClick={() => filterItems(category)}>
            {category}
          </Button>
        )
      })}
      </div>
    </div>
  )
}

export default Categories