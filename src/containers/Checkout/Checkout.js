import React, { Component, Fragment} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';



class Checkout extends Component {
    

    

    
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    checkoutCancelled = () =>{
        this.props.history.goBack();
    }
    render() {
        let summary = <Redirect to='/'/>
        
        if(this.props.ingredients){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;
            summary = (
                <Fragment>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        checkoutContinued={this.checkoutContinued}
                        checkoutCancelled={this.checkoutCancelled}/>
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData}/>
                </Fragment>
            )            
        }
        return(
            <div>
                {summary}     
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.bur.ingredients,
        purchased: state.ord.purchased
    }
}



export default connect(mapStateToProps)(Checkout)