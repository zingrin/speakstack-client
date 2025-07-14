import React from "react";
import Banner from "../../components/Banner";
import AllPets from "../AllPets";
import Services from "../../components/Services";
import CustomerReviewsCarousel from "../../components/CustomerReviewsCarousel";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
    {/* <AllPosts></AllPosts> */}
      <AllPets></AllPets>
      <Services></Services>
      <CustomerReviewsCarousel></CustomerReviewsCarousel>
    </div>
  );
};

export default Home;
