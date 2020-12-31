import React, { Component, createContext } from 'react';
import Auth from '../api/auth';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
    state = {
        user : {
            name: null, 
            isAdmin: false, 
            sessionId: null}
    }
    constructor(props){
       super(props);
       this.authApi = new Auth();
    }

    login = (userName, password)=> {
        const user = this.authApi.loginUser(userName, password);
        if(user){
            this.setState({user});
        }
        return user ? true : false;
    }
    

    render() { 
        return ( 
            <AuthContext.Provider value={{...this.state, login: this.login}}>
                {this.props.children}
            </AuthContext.Provider>
         );
    }
}
 
export default AuthContextProvider;