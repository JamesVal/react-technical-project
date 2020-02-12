import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Main, Login, OrderForm, ViewOrders } from '../components';

const mapStateToProps = (state) => ({
    auth: state.auth
})

const ProtectedRoute = ({component: Component, auth, ...rest}) => (
    <Route {...rest} render={(props) =>
        auth.token ?
        <Component {...props}/> :
        <Redirect to={"/login"}/>
    }/>
);

const ProtectedRoutedConn = connect(mapStateToProps, null)(ProtectedRoute);

const AppRouter = (props) => {
    return (
        <Router>
            <Route path="/" exact component={Main} />
            <Route path="/login" exact component={Login} />
            <ProtectedRoutedConn path="/order" component={OrderForm} />
            <ProtectedRoutedConn path="/edit-order" component={OrderForm} />
            <ProtectedRoutedConn path="/view-orders" component={ViewOrders} />
        </Router>
    );
}

export default AppRouter;