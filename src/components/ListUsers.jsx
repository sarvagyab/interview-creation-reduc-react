import React, { useState, useEffect } from 'react';
import GET from '../utilities/GET';
// import ListRow from './common/ListRow';
import ListHeader from './common/ListHeader';
import Heading from './common/Heading';
import Notification from './common/Notification'
import Actions from './common/Actions'

function ListInterviews(props) {
    const [Users, setUsers] = useState([]);
    const [notice,setNotice] = useState('');
    const [errors,setErrors] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            let users = await GET(`http://localhost:3000/users.json/`);
            setUsers(users);
        }
        fetchUsers();
    },[]);

    const count = Users.length;

    if (count === 0)
        return <p>There are no users in the database</p>

    return (
        <div>
            <Heading text={count + " User" + (count !== 1 ? 's' : '')} />
            <Notification notice={notice} errors={errors} />
            <table className="table">
                <ListHeader headers={["Name","Email","Actions"]} />
                <tbody>
                    {Users.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td><Actions id={user.id} path="users" setNotification={{setErrors,setNotice}} /></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default ListInterviews;