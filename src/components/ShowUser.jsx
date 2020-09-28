import React, { useEffect, useState, Fragment } from 'react';
import {useParams} from 'react-router-dom';
import GET from '../utilities/GET';
import Parser from '../utilities/parser';
import Heading from './common/Heading';


const ShowInterview = () => {

    const [userDetails,setUserDetails] = useState({});
    const {id} = useParams();
    useEffect(()=>{
        async function fetchUser(){
            let userDetails = await GET(`http://localhost:3000/users/${id}.json`);
            setUserDetails(userDetails);
        }
        fetchUser();
    },[]);

    if(Object.keys(userDetails).length === 0)
        return (
            <Fragment>
                <Heading text="User Details" />
                <h1>Loading</h1>
            </Fragment>
        );

    return ( 
        <section className="section">
                <Heading text="User Details" />
                <strong>Full Name - </strong> {userDetails.name }<br />
                <strong>Email - </strong> {userDetails.email }
        </section>
     );
}
 
export default ShowInterview;