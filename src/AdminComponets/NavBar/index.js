import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

/* configured globalContext and contants */
import { useGlobalContext } from "../../Config/globalContext";
import { ADMIN_LOGOUT } from '../../Constants/constants';

const Admin = () => {
    const [admin, setAdmin] = useState(null);
    const { dispatch } = useGlobalContext();
    useEffect(() => {
        let admin = JSON.parse(localStorage.getItem("admin"));
        setAdmin(admin);
    }, []);

    const logoutHandler = () => {
        dispatch({ type: ADMIN_LOGOUT });
        window.location.href = "/admin/login";
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/admin">Admin</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample07">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/admin">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle"
                                    id="dropdown07" data-toggle="dropdown" aria-expanded="false">{admin && admin.name}</span>
                                <div className="dropdown-menu" aria-labelledby="dropdown07">
                                    <Link className="dropdown-item" to="/users">Show Users</Link>
                                    <button onClick={logoutHandler} className="dropdown-item" to="/users">Logout</button>
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-md-0">
                            <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Admin;
