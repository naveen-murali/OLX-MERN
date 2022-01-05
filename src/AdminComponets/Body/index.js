import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../Config/axios';

const Index = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        let token = localStorage.getItem("adminAccessToken");
        axios.get("/admin/getUsers", { headers: { 'x-auth-token': token } })
            .then(response => setUsers(response.data.users))
            .catch(err => console.log(err));
    }, []);
    
    const deleteUser = (id) => {
        let token = localStorage.getItem("adminAccessToken");
        axios.delete(`/admin/deleteUser/${id}`, { headers: { 'x-auth-token': token } })
            .then(response => window.location.href = "/admin")
            .catch(err => console.log(err));
    }

    return (
        <div className="container table-responsive py-4">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>...</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => <User key={user._id} {...user} deleteUser={deleteUser} />) }
                </tbody>
            </table>
        </div>
    )
}


const User = ({_id, name, email, phone, deleteUser}) => {
    return (
        <tr>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                <Link to={`/admin/viewAndEdit/${_id}/view`} className='btn btn-outline-primary mx-1'>View</Link>
                <Link to={`/admin/viewAndEdit/${_id}/edit`} className='btn btn-outline-warning mx-1'>Edit</Link>
                <button onClick={()=>deleteUser(_id)} className='btn btn-outline-danger mx-1'>Delete</button>
            </td>
        </tr>
    )
}

export default Index
