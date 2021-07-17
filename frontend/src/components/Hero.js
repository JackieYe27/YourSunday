import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const Hero = ({ scrollTo }) => {
  
  
  const handleClick = () => {
    scrollTo.scrollIntoView({behavior: "smooth", block: 'center', inline: 'start'});
  }
  return (
    <Wrapper>
      <article className="content">
        <h1>Create the Happiest<br/>Memories</h1>
        <p>
          <strong>Our Mission:</strong> To create a shop for all your baby needs! From comfortable and stylish clothing to
          swaddle blankets that will hug even adults to sleep, we strive to provide the best. Your friends and family will be asking
          you where you shop for your sweet mini me.
        </p>
        <Button className="btn hero-btn" onClick={handleClick}>Shop Now!</Button>
      </article>
      <article className="img-container">
        <img src="https://i.ibb.co/q529gxd/pexels-pixabay-459957.jpg" alt="baby hero" className="main-img"/>
        <img src="https://i.ibb.co/VJDrQf4/pexels-cottonbro-3662667.jpg" alt="baby hero2" className="accent-img"/>
      </article>
    </Wrapper>
  )
}


const Wrapper = styled.section`
  min-height: 60vh;
  display:grid;
  place-items: center;
  .img-container {
    display:none;
  }

  p {
    line-height: 2;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }

  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
  }
  h1 {
    margin-botton: 2rem;
  }
  p {
    font-size: 1.25rem;
  }
  .hero-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  .img-container {
    display: block;
    position: relative;
  }
  .main-img {
    width: 100%;
    height: 550px;
    position: relative;
    border-radius: var(--radius);
    display: block;
    object-fit: cover;
  }
  .accent-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 250px;
    transform: translateX(-50%);
    border-radius: var(--radius);
  }
  .img-container::before {
    content: "";
    position: absolute;
    width: 10%;
    height: 80%;
    background: #fbc6d0;
    bottom: 0%;
    left: -8%;
    border-radius: var(--radius);
  }
}
`

export default Hero;