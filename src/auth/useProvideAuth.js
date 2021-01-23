import axiosInstance from "../http/axiosInstance";
import {useState} from "react";
import history from "../history/history";

const useProvideAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.token);

    const logIn = (username, password) => {
        return axiosInstance()
            .post('/login', {
                username,
                password
            }).then((res) => {
            localStorage.setItem('token', res.data.token);
            setIsAuthenticated(true);
            history.push('/expenses');
        });
    };

    const logOut = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        history.push('/login')
    };

    return {
        isAuthenticated,
        logIn,
        logOut
    };
};

export default useProvideAuth;