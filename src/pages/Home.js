import React from "react";
import Jumbotron from "../components/cards/Jumboltron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
const Home = () => {


  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron
        text={['Latest Products','New Arrivals', 'Best Sellers']}
        />
        {/*loading ? <h4>Loading...</h4> : <h4>All Products</h4>*/}
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New arrivals
      </h4>
      <NewArrivals/>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
       Best Sellers
      </h4>
      <BestSellers/>
      <NewArrivals/>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
       Catégories
      </h4>
      <CategoryList/>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
       subs categories
      </h4>
      <SubList/>
    </>
  );
};

export default Home;
