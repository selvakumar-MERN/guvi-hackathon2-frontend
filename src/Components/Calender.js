import React, { useContext, useState } from 'react';
import axios from 'axios';
import Mycontext from '../Context';

function Calender({ id }) {
    const { CartItems, setCartItems } = useContext(Mycontext)
    const [date, setdate] = useState({})

    const handler = (e) => {
        const { name, value } = e.target;
        setdate({ ...date, [name]: value })
    }

    const submit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3030/product/calender/${id}`, date)
            .then(res => {
                const index = CartItems.findIndex((value) => value[0]._id === id)
                CartItems[index][0].hours = res.data
                setCartItems([...CartItems])
            })
            .catch(error => {
                return (error)
            })
    }
    return (
        <div>
            <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>start Date</label>
                        <input type='date' name='fromDate' className='form-control' onChange={handler}  ></input>
                    </div>
                    <div class="form-group col-md-6">
                        <label>start Time</label>
                        <input type='time' name='fromTime' className='form-control' onChange={handler} ></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>end Date</label>
                        <input name='toDate' className='form-control' type='date' onChange={handler} ></input>
                    </div>
                    <div class="form-group col-md-6">
                        <label>End Time</label>
                        <input type='time' className='form-control' name='toTime' onChange={handler} ></input>
                    </div>
                </div>
                <button onClick={submit}>Check Total</button>
            </form>

        </div>
    );
}

export default Calender;