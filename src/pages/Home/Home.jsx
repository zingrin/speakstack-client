import React from 'react';
import Banner from '../../components/Banner';
import Pagination from '../Pagination';
import AllPets from '../AllPets';

const Home = () => {
    return (
        <div>
            <Pagination></Pagination>
           <Banner></Banner>
           <AllPets></AllPets>
        </div>
    );
};

export default Home;