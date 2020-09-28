import React, {Fragment} from 'react';
import Notification from './Notification'

const Heading = ({text,errors,notice}) => {
    return ( 
    <Fragment>
        <h1>{text}</h1> 
        {/* <Notification errors={errors} notice={notice} /> */}
    </Fragment>
    );
}
 
export default Heading;