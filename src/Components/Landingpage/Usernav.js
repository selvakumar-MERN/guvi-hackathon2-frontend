import React from 'react';
import { Link } from 'react-router-dom';

function Usernav(props) {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark navbar-static-top">
                <div className='container mt-2'>
                    <h2 className='text-info text-decoration-none '>Rent House</h2>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">

                        <ul className="navbar-nav mx-4 ml-auto ">
                            <li className="nav-item active mx-3">
                                <Link to='/'
                                    className="nav-link text-primary" >Home <span className="sr-only">(current)</span>
                                </Link>
                            </li>

                            <li className="nav-item mx-3">
                                <Link to='/products'
                                    className="nav-link text-primary" >Products
                                </Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link to='/admin/login'
                                    className="nav-link text-primary">Admin Login
                                </Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link to='/cart'
                                    className="nav-link text-primary">Cart
                                </Link>
                            </li>

                            <li className="nav-item mx-3">
                                <Link to='/contactus'
                                    className="nav-link text-primary">contact Us
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Usernav;