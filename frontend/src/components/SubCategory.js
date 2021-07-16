import React, {useRef, useEffect} from "react";

const SubCategory = ({ isSubCategoryOpen, location }) => {
  const container = useRef(null)

  useEffect(() => {
      const subCategory = container.current;
      console.log(subCategory);
      const {center, bottom} = location;
      subCategory.style.left = `${center}px`;
      subCategory.style.top = `${bottom}px`;
  },[location]);

  return (
    <aside className={`${isSubCategoryOpen ? "subCategory show" : "subCategory"}`} ref={container}>subCategory</aside>
  )
}

export default SubCategory;