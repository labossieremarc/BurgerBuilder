import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import instance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component{

   componentDidMount(){
    this.props.onGetOrders();
    console.log(this.props.orders)
   }    
    render () {
        let orders = <Spinner />;
        if(!this.props.loading ){
            orders = this.props.orders.map(order => (
                
                <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}/>
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
        orders: state.ord.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOrders: () => dispatch(actionCreator.getOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, instance));