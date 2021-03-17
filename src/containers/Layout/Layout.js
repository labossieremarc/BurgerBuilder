import React, {Component, Fragment} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'



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
            <Toolbar clicked={this.sideDrawerHandler}/>
            <SideDrawer show={this.state.showSideDrawer} clicked={this.sideDrawerHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Fragment>
        )
    }

    
};

export default Layout;