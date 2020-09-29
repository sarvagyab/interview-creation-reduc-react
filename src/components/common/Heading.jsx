import React, {Fragment} from 'react';
// import Notification from './Notification'

const Heading = ({text,errors,notice}) => {
    return ( 
    <Fragment>
        <h3>{text}</h3> 
        {/* <Notification errors={errors} notice={notice} /> */}
    </Fragment>
    );
}
 
export default Heading;