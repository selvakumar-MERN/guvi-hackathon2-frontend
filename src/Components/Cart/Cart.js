import React, { useContext, useState } from 'react';
import Usernav from '../Landingpage/Usernav';
import axios from 'axios';
import Footer from '../Footer/Footer';
import Mycontext from '../../Context';
import Calender from '../Calender';



function Cart(props) {

    const [amount, setamount] = useState('')
    const { CartItems, setCartItems } = useContext(Mycontext)
    const user = {
        userName: "",
        email: "",
        data: CartItems
    }
    const [users, setusers] = useState(user)

    //increase quantity
    const increase = (id) => {
        const find = CartItems.findIndex((value) => value[0]._id === id)
        if (CartItems[find][0].quantity !== 5) {
            CartItems[find][0].quantity += 1
        }
        setCartItems([...CartItems])
    }

    //decrease quantity
    const decrease = (id) => {
        const find = CartItems.findIndex((value) => value[0]._id === id)
        if (CartItems[find][0].quantity !== 1) {
            CartItems[find][0].quantity -= 1
        }
        setCartItems([...CartItems])
    }

    //remove cart item
    const removeitem = (id) => {
        const find = CartItems.findIndex((value) => value[0]._id === id)
        CartItems.splice(find, 1)
        setCartItems([...CartItems])
    }

    //total amount
    const total = CartItems.reduce((a, b) => {
        return (a = a + b[0].productPrice * b[0].quantity * b[0].hours);

    }, 0);

    //handling email and name
    const handler = (e) => {
        const { name, value } = e.target
        setusers({ ...users, [name]: value })

    }

    //razor pay payment handler
    const handleRazorpay = (data) => {
        const options = {
            key: "rzp_test_gXkfVOK0D8Ct2S",
            amount: Number(data.amount),
            currency: data.currency,
            name: "Rent House",
            description: "xyz",
            order_id: data.id,
            handler: function (response) {
                console.log(response)

                axios.post('https://guvi-hackathon2-6k8d.onrender.com/product/verify', { response: response })
                    .then(res => {

                        //signature verification and creating the customer record            
                        if (res.data.message === 'signature valid') {
                            axios.post('https://guvi-hackathon2-6k8d.onrender.com/user/createUser', users)
                                .then(res => {
                                    //  setcart("")
                                    return res
                                })
                                .catch(error => {
                                    return error
                                })
                        }

                    })
                    .catch(error => {
                        return error
                    })

            }
        }
        const rzp1 = new window.Razorpay(options);
        rzp1.open()
    }
    const handlepayment = (e) => {
        e.preventDefault()
        console.log(CartItems)
        const data = { amount: amount }

        axios.post('https://guvi-hackathon2-6k8d.onrender.com/product/payment', data)
            .then(res => {
                handleRazorpay(res.data.data)
            })
            .catch(error => {
                return (error)
            })
    }
    return (
        <div>
            <Usernav />
            <div className='container'>
                <div className='row'>
                    <h2 className='mt-2'>Cart</h2>
                </div>
                {CartItems.length > 0 ? <div>
                    <table className='table table-responsive-sm'>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Product Quantity</th>
                                <th>Date</th>
                                <th>hours</th>
                                <th>Total Amount</th>
                                <th>Remove from cart</th>
                            </tr>
                        </thead>
                        <tbody>

                            {CartItems.map(items =>
                                <tr>
                                    <td className='d-flex'><img src={items[0].productImage} height={"100px"} width={"100px"} alt='...'></img><span className='ml-2'>{items[0].productName}</span></td>
                                    <td>{items[0].productPrice}</td>
                                    <td className='d-flex-column'><button onClick={() => { decrease(items[0]._id) }} style={{ border: "none", backgroundColor: "orange" }}>-</button><span>{items[0].quantity}</span><button onClick={() => { increase(items[0]._id) }} style={{ border: "none", backgroundColor: "orange" }}>+</button></td>
                                    <td ><Calender id={items[0]._id} /></td>
                                    <td>{items[0].hours}</td>
                                    <td>{items[0].productPrice * items[0].quantity * items[0].hours}</td>
                                    <td><button className='btn btn-danger' onClick={() => { removeitem(items[0]._id) }}>Remove</button></td>

                                </tr>)}
                        </tbody>

                    </table>
                    <h3>Total Amount : {total}</h3>
                    <form className='col-12 col-md-6 form-group'>
                        <div>
                            <input type='text' name='userName' placeholder='name' onChange={handler} className='form-control mb-2'></input>
                        </div>
                        <div>
                            <input type='email' name='email' placeholder='email' onChange={handler} className='form-control'></input>
                        </div>
                    </form>
                    <button className='btn btn-warning' onClick={(e) => handlepayment(e, setamount(total))}>Check out</button>
                </div> : <h4>Cart is Empty</h4>}
            </div>
            <div className='my-5'>
                <Footer />
            </div>
        </div>


    );
}

export default Cart;
