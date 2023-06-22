import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';
import Footer from '../Footer/Footer';

function Usersdetails(props) {
    const [users, setusers] = useState([])

    useEffect(() => {
        axios.get('https://guvi-hackathon2-6k8d.onrender.com/admin/users')
            .then((res) => {
                const { data } = res
                setusers(data)

            })
            .catch((error) => {
                return (error)
            })

    }, [])

    const deleteUser = (id) => {
        axios.delete(`https://guvi-hackathon2-6k8d.onrender.com/user/deleteUser/${id}`)
            .then((res) => {
                if (res.data.deletedCount === 1) {
                    setusers(users.filter((user) => user._id !== id))
                }
            })
            .catch((error) => {
                return (error)
            })

    }
    return (
        <div>
            <Adminnavbar />
            <div className='container mt-4'>
                <h4>Customers</h4>
                <table className='table table-striped table-responsive'>
                    <thead >
                        <tr className='text-center'>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map((items) => {
                            return (
                                <tr key={items._id} className='text-center'>
                                    <td>{items.name}</td>
                                    <td>{items.email}</td>
                                    <td>{items.rentedItem}</td>
                                    <td>{items.quantity}</td>
                                    <td>{items.fromDate}
                                     <span className='mx-1'>Time: {items.fromTime}</span>   </td>
                                    <td>{items.toDate}
                                    <span className='mx-1'> Time: {items.toTime}</span></td>
                                    <td>
                                        <button className='btn btn-danger mx-2' onClick={() => deleteUser(items._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })

                        }
                    </tbody>
                </table>
            </div>
            <div className='my-5'>
                <Footer />
            </div>

        </div>
    );
}

export default Usersdetails;