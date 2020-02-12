import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';

const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`

class ViewOrders extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    /* JJV DEBUG - Add a check before deleting? */
    deleteOrder = (id) => (event) => {
        event.preventDefault();

        fetch(DELETE_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({id: id}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                let curOrders = this.state.orders;
                curOrders = curOrders.filter(order => {
                    return order._id !== id;
                });
                this.setState({ orders: curOrders });
            }
            console.log("Success", JSON.stringify(response));
        })
        .catch(error => console.error(error));
    }

    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        const modifiedDate = new Date(order.updatedAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}`.padStart(2,'0')+`:`+`${createdDate.getMinutes()}`.padStart(2,'0')+`:`+`${createdDate.getSeconds()}`.padStart(2,'0')}</p>
                                    {
                                        createdDate.getTime() !== modifiedDate.getTime() ? 
                                        <p className="view-order-changed">(Modified at {`${modifiedDate.getHours()}`.padStart(2,'0')+`:`+`${modifiedDate.getMinutes()}`.padStart(2,'0')+`:`+`${modifiedDate.getSeconds()}`.padStart(2,'0')})</p> :
                                        ""
                                    }
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                    <Link to={{pathname:"/edit-order", state: {current_order: order}}}><button className="btn btn-success">Edit</button></Link>
                                    <button className="btn btn-danger" onClick={this.deleteOrder(order._id)}>Delete</button>
                                 </div>
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default ViewOrders;
