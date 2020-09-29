import React, { useEffect, Fragment } from 'react';
import {useParams} from 'react-router-dom';
import Heading from './common/Heading';

import {fetchUsers,usersSelector} from '../slices/users';
import {useDispatch, useSelector} from 'react-redux';


const ShowInterview = () => {

    // const [userDetails,setUserDetails] = useState({});
    const {id} = useParams();

    const dispatch = useDispatch();
    const {users:Users} = useSelector(usersSelector);

    let userDetails = {};
    if(Object.keys(Users).length)
        userDetails = Users[id];
    

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]); 

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