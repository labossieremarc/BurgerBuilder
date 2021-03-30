import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import instance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component{

   componentDidMount(){
    this.props.onGetOrders(this.props.token, this.props.userId);
   } 
   onDeleteOrderHandler =(id) => {
    this.props.onDeleteOrder(this.props.token, id, this.props.userId)
    
   }


     
    render () {
        let orders = <Spinner />;
        if(!this.props.loading ){
            orders=<p>No Burgers made to order </p>;
            if(this.props.orders)
            orders = this.props.orders.map(order => (
                
                <Order
                key={order.id}
                id={order.id}
                ingredients={order.ingredients}
                price={order.price}
                clicked={()=>this.onDeleteOrderHandler(order.id)}/>
            ))
        }
            
        return(
            <div>
            { orders}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.ord.loading,
        orders: state.ord.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOrders: (token, userId) => dispatch(actionCreator.getOrders(token, userId)),
        onDeleteOrder: (token, id, userId) => dispatch(actionCreator.deleteOrder(token, id, userId))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, instance));