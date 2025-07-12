import React from "react";
import Banner from "../../components/Banner";
import Pagination from "../Pagination";
import AllPets from "../AllPets";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AllPets></AllPets>
      <Pagination></Pagination>
    </div>
  );
};

export default Home;
