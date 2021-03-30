import React, {Component, Fragment} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';



class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    sideDrawerHandler = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer})
    }

    render () {

        return (
            <Fragment>
            <Toolbar auth={this.props.token} clicked={this.sideDrawerHandler}/>
            <SideDrawer auth={this.props.token} show={this.state.showSideDrawer} clicked={this.sideDrawerHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>

            </Fragment>
        )
    }

    
};

const mapStateToProps = state => {
    return {
        token: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);