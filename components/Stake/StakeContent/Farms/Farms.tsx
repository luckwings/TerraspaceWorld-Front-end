import React, { useRef } from "react";
import "react-multi-carousel/lib/styles.css";
import FarmsCard from "./FarmsCard";
import {
  Container,
  Header,
  TitleTabWrapper,
  SliderWrapper,
  CarouselButtonGroup,
  ArrowButton,
} from "../../styles";

const Farms = () => {
  return (
    <Container>
      <div className="row">
        {[...Array(4).keys()].map((i) => (
          <div className="col-md-4" key={i}>
            <FarmsCard index={i + 1} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Farms;
