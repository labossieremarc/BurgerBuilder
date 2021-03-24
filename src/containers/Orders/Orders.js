import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import instance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{
    state = {
        orders: [],
        loading: true
    }
   componentDidMount(){
    instance.get('/orders.json')
        .then(res => {
            this.setState({loading: false, orders: Object.values(res.data)});
            console.log(this.state.orders)
        })
        .catch(err => {
            this.setState({loading: false});
        });
   }
    render () {
        
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, instance);