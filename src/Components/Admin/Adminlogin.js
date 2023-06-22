import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Adminlogin(props) {
    const navigate = useNavigate()
    const [sucess, setsucess] = useState("")
    const [error, seterror] = useState("")
    const [users, setuser] = useState({})

    const handler = (e) => {
        const { name, value } = e.target;
        setuser({ ...users, [name]: value })

    }
    const submit = (e) => {
        e.preventDefault();
        //API fetching     
        axios.post('https://guvi-hackathon2-6k8d.onrender.com/admin/login', users)
            .then((res) => {
                seterror("")
                if (res.status === "200") {
                    setsucess("Login sucessfull")

                }
                window.localStorage.setItem("admintoken", res.data)
                navigate("/admin/adminpage")




            })
            .catch((error) => {

                setsucess("")
                const { data } = error.response;


                seterror(data)

            })

    }
    return (
        <div>

            <div className='container'>
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">

                        <div className="row">

                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form className="user">
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user" onChange={handler} name='email' placeholder="Enter Email Address..."></input>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user" onChange={handler} name='password' placeholder="Password"></input>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                                <input type="checkbox" className="custom-control-input"></input>
                                                <label className="custom-control-label" >Remember
                                                    Me</label>
                                            </div>
                                            {error !== null ? <span className='text-danger'>{error}</span> : null}
                                            {sucess !== null ? <span className='text-success'>{sucess}</span> : null}
                                        </div>
                                        <button onClick={submit} className="btn btn-primary btn-user btn-block">
                                            Login
                                        </button>
                                        <div className='mt-2'>
                                            <h5>
                                                admin email- admin@gmail.com
                                                password- admin123
                                            </h5>
                                            <h5 className='mt-2'>
                                                Notice : Don't reload the admin page after login, you will be logged out automatically
                                                if you reload, this is for security purpose, please login again to continue.
                                            </h5>
                                        </div>

                                    </form>

                                </div>
                            </div>
                            <div className="col-lg-6 d-flex justify-content-center align-items-center" >
                                <img src="/admin.png" height={"250px"} width={"250px"} alt='admin logo'></img>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    );
}

export default Adminlogin;
