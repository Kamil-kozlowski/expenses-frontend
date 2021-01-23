import './App.css';
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router} from "react-router";
import {
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import useProvideAuth from "../../auth/useProvideAuth";
import {useAuth, authContext} from "../../auth/authContext";
import ExpensesTab from "../Expenses/ExpensesTab";
import Login from "../Login/Login";
import history from "../../history/history";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import CustomNavbar from "../Navbar/CustomNavbar";
import AddEditExpense from "../Expenses/AddEditExpense";
import CategoryTab from "../Category/CategoryTab";
import AddEditCategory from "../Category/AddEditCategory";


function App() {
    return (
        <ProvideAuth>
            <Router history={history}>
                <CustomNavbar/>
                <Switch>
                    <Route exact path={"/"}>
                        <Redirect to={{
                            pathname: "/login"
                        }}/>
                    </Route>
                    <Route exact path="/login" component={Login}/>
                    <PrivateRoute exact path="/expenses" component={ExpensesTab}/>
                    <PrivateRoute exact path="/expenses/edit" component={AddEditExpense}/>
                    <PrivateRoute exact path="/categories" component={CategoryTab}/>
                    <PrivateRoute exact path="/categories/edit" component={AddEditCategory}/>
                </Switch>
            </Router>
        </ProvideAuth>
    );
}

function PrivateRoute({children, ...rest}) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({location}) =>
                auth.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export default App;
