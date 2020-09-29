import React, { Fragment } from 'react';

const Notification = ({errors,notice}) => {
    // const [errors,setErrors] = useState([]);
    // const [notice,setNotice] = useState();

    return ( 
        <Fragment>
            <div className="notice">
                {notice}
            </div>
            <div className="errors">
                <ul>
                    {errors.map((err,index)=><li key={index}>{err}</li>)}
                </ul>
            </div>
        </Fragment>
    );
}
 
export default Notification;