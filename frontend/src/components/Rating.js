import React from "react";

const Rating = ({ productRating, text, color }) => {
  return (
    <div className="rating">
      <span>
        <i style={{color}}
        className={
          productRating >=1 
          ? "fas fa-star" 
          : productRating >= 0.5 
          ? "fas fa-star-half-alt" 
          : "far fa-star"} 
        ></i>
      </span>
      <span>
        <i style={{color}}
        className={
          productRating >= 2 
          ? "fas fa-star" 
          : productRating >= 1.5 
          ? "fas fa-star-half-alt" 
          : "far fa-star"} 
        ></i>
      </span>
      <span>
        <i style={{color}}
        className={
          productRating >= 3 
          ? "fas fa-star" 
          : productRating >= 2.5 
          ? "fas fa-star-half-alt" 
          : "far fa-star"} 
        ></i>
      </span>
      <span>
        <i style={{color}}
        className={
          productRating >= 4 
          ? "fas fa-star" 
          : productRating >= 3.5 
          ? "fas fa-star-half-alt" 
          : "far fa-star"} 
        ></i>
      </span>
      <span>
        <i style={{color}}
        className={
          productRating >=5 
          ? "fas fa-star" 
          : productRating >= 4.5 
          ? "fas fa-star-half-alt" 
          : "far fa-star"} 
        ></i>
      </span>
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: "#e7bdb3"
}

export default Rating