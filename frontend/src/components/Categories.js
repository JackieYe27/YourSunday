import React from "react";
import { Button } from "react-bootstrap";

const Categories = ({ categories, filterItems, openSubCategory }) => {

  const displaySub = (e) => {
    const page = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    console.log(e.target)
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = (tempBtn.bottom - 3);
    openSubCategory(page, {center, bottom});
  }

  return (
    <div>
      <div className="btn-container">
      {categories.map((mainCategory, i) => {
        return (
          <Button type="button" className="filter-btn" key={i} onClick={() => filterItems(mainCategory)} onMouseOver={displaySub}>
            {mainCategory}
          </Button>
        )
      })}
      </div>
    </div>
  )
}

export default Categories