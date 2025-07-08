import React from 'react';
import Banner from '../../components/Banner';
import AllPets from '../AllPets';
import Pagination from '../Pagination';

const Home = () => {
    return (
        <div>
           <>
            <Pagination></Pagination>
           <Banner></Banner>
           <AllPets></AllPets>
           </>
        </div>
    );
};

export default Home;