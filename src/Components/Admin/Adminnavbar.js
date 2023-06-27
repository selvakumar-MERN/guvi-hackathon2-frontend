import React from 'react';
import { Link } from 'react-router-dom';

function Adminnavbar(props) {

    const logOut = () => {
        window.localStorage.removeItem("admintoken")
    }
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark navbar-static-top">
                <div className='container mt-2'>
                    <h2 className='text-info'>Rent House</h2>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-4 ml-auto ">
                            </li>
                            <li className='mx-4 mt-2'>
                                <a href='/' onClick={logOut}>Logout</a>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Adminnavbar;
