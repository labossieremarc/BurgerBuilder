import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return  class extends Component {
        state = {
            error: null
        }
        constructor(props){
            super(props);
            this.state = {
                error: null
            }
        }
        componentDidMount(){
            this.requestInt = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            this.responseInt = axios.interceptors.response.use(null, error => {
                this.setState({error: error});
            })
            
        }
        componentWillUnmount(){    
            axios.interceptors.request.eject(this.requestInt)
            axios.interceptors.response.eject(this.responseInt)
        }
        errorConfirmedHandler = () => {
            this.setState({error: null})
            
        }
        render() {
            return(
            <Fragment>
                <Modal show={this.state.error ? true: false}
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
            <WrappedComponent {...this.props}/>
            </Fragment>
            )
        }
    }
    
}


export default withErrorHandler;