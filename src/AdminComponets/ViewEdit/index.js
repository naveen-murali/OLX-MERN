import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../../Config/axios';

const Index = () => {
    const [view, setView] = useState(true);
    const [user, setUser] = useState(null);

    const { id, state } = useParams();

    useEffect(() => {
        if (state === "edit")
            return setView(false);
        if (state === "view")
            return setView(true);
    }, [state]);

    useEffect(() => {
        let token = localStorage.getItem("adminAccessToken");
        axios.get(`/admin/user/${id}`, { headers: { 'x-auth-token': token } })
            .then(response => setUser(response.data.user))
            .catch(err => console.log(err));
    }, [id]);

    const inpuHandler = (e) =>  setUser({ ...user, [e.target.name]: e.target.value })

    const updateUser = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("adminAccessToken");
        axios.patch(`/admin/updateUser/${id}`, user, { headers: { 'x-auth-token': token } })
            .then(response => {
                setUser(response.data.user);
                window.location.href = `/admin/viewAndEdit/${id}/view`;
            })
            .catch(err => console.log(err));
    }

    const deleteUser = (e) => {
        let token = localStorage.getItem("adminAccessToken");
        axios.delete(`/admin/deleteUser/${id}`, { headers: { 'x-auth-token': token } })
            .then(response => window.location.href = "/admin")
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className="container">
                <form className="container p-md-5 p-2">
                    <div className="d-flex flex-column align-items-center justify-content-center">

                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-between">
                            <h5 className="h4 text-primary mb-3">View</h5>
                            <div>
                                <span onClick={deleteUser} title="Delete" className="text-danger mx-2" style={{cursor: "pointer"}}>Delete</span>
                                {
                                    view
                                        ? <Link to={`/admin/viewAndEdit/${id}/edit`} title="Edit" type="submit" className="btn btn-warning align-self-start">Edit</Link>
                                        : <Link to={`/admin/viewAndEdit/${id}/view`} title="Edit" type="submit" className="btn btn-warning align-self-start">View</Link>
                                }
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label htmlFor="exampleInputName" className="htmlForm-label">Name</label><br />
                                {
                                    view
                                        ? <input type="text" name="name" className="htmlForm-control w-100" id="exampleInputName"
                                            aria-describedby="emailHelp" disabled value={user ? user.name : ""} />
                                        : <input type="text" name="name" className="htmlForm-control w-100" id="exampleInputName"
                                            aria-describedby="emailHelp" value={user ? user.name : ""} onChange={inpuHandler} />
                                }
                                <div id="nameHelp" className="htmlForm-text text-danger"></div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email</label><br />
                                {
                                    view
                                        ? <input type="text" name="email" className="htmlForm-control w-100" id="exampleInputEmail1"
                                            aria-describedby="emailHelp" disabled value={user ? user.email : ""} />
                                        : <input type="text" name="email" className="htmlForm-control w-100" id="exampleInputEmail1"
                                            aria-describedby="emailHelp" value={user ? user.email : ""} onChange={inpuHandler} />
                                }
                                <div id="emailHelp" className="htmlForm-text text-danger"></div>
                            </div>
                        </div>

                        {
                            !view &&
                            <div className="col-12 col-md-6">
                                <button type="submit" onClick={updateUser} className="btn btn-primary align-self-start">Update</button>
                            </div>
                        }

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Index
