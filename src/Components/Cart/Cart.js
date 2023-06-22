import React, { useState } from 'react';
import Usernav from '../Landingpage/Usernav';
import axios from 'axios';
import Footer from '../Footer/Footer';



function Cart(props) {
    
    const [users, setusers] = useState({})
    const [cartdetails, setcart] = useState(props.cart)


    const handlechange = (e) => {
        const { name, value } = e.target
        setusers({ ...users, [name]: value })
        console.log(users)
    }
    // changing the price while changing quantitty 
    const handleprice = (e) => {
        const name = "productPrice";
        if (e.target.value === "") {
            const value = cartdetails.productPrice * 0;
            setcart({ ...cartdetails, [name]: value })
        }
        else if (e.target.value === "1") {
            const value = props.cart.productPrice;
            setcart({ ...cartdetails, [name]: value })
            console.log(cartdetails)
        }
        else {
            const value = props.cart.productPrice * e.target.value;
            setcart({ ...cartdetails, [name]: value })
            console.log(cartdetails)
        }
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
                                    setcart("")
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
    const handlepayment = (e, amount) => {
        e.preventDefault()

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
            <div className='container mt-4'>
                <div className='row'>
                    <h2>Cart</h2>
                </div>

               { cartdetails!=="" ? <div className='row'>
              
                   <div className='col-12 col-md-6 mt-3' >
                           <h5>Product Details</h5>
                           <div className='row'>
                            <div className='col-12 col-md-8'>
                            <div className="card h-100">
                                {/*Product image*/}
                                <img className="card-img-top" src={cartdetails.productImage} alt="..." height={"200px"} width={"100px"}></img>
                                { /*Product details*/}
                                <div className="card-body p-2">
                                    <div className="text-left">
                                        {/*Product name*/}
                                        <h6 className="fw-bolder">{cartdetails.productName}</h6>
                                        {/*Product price*/}
                                        <div className="text-decoration-line-through">Rs.{cartdetails.productPrice}</div>

                                    </div>
                                </div>
                                </div>
                            </div>

                           </div>
                        <div>
                            <h6 className='mt-3'>Fill Out the form and Check out we will contact you about further details or you can find our 
                                mobile number in contact us page
                            </h6>
                        </div>
                        <div>
                            <h6>Keep the payment recipt safe for further verification</h6>
                        </div>

                    </div>
                    <div className='col-12 col-md-6' >
                        <form>
                            <div className='form-group'>
                                <input type='text' className='form-control' name='rentedItem' onChange={handlechange} placeholder='Product Name' required></input>
                            </div>
                            <div className='form-group'>
                                <input type='text' className='form-control' name='name' placeholder='Name' onChange={handlechange} required></input>
                            </div>
                            <div className='form-group'>
                                <input type='text' className='form-control' name='email' placeholder='email' onChange={handlechange} required></input>
                            </div>
                            <div className='form-group'>
                                <input type='text' className='form-control' name='quantity' placeholder='quantity' required onChange={(e) => { handlechange(e); handleprice(e) }}></input>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <div className='form-group'>
                                        <label>Start Date</label>
                                        <input type='date' className='form-control' name='fromDate' required onChange={handlechange}></input>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <div className='form-group'>
                                        <label>Start Time</label>
                                        <input type='time' className='form-control' name='fromTime' required onChange={handlechange}></input>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <div className='form-group'>
                                        <label>End Date</label>
                                        <input type='date' className='form-control' name='toDate' required onChange={handlechange}></input>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <div className='form-group'>
                                        <label>End Time</label>
                                        <input type='time' className='form-control' name='toTime' required onChange={handlechange}></input>
                                    </div>
                                </div>
                            </div>

                            <button className='btn btn-warning' onClick={(e) => handlepayment(e, cartdetails.productPrice)}>Checkout</button>
                        </form>




                    </div>
                </div>: 
                <div className='text-center'>
                    <h4>No items in the cart ! Please Add items</h4></div>} 
            </div>
            <div className='my-5'>
                <Footer />
            </div>
        </div>


    );
}

export default Cart;