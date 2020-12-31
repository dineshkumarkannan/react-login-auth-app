import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from './login/Login';
import Home from './home/Home';

import Auth from './api/auth';
import AuthContextProvider from './context/authContext';

function App() {
  const authApi = new Auth();
  return (
    <Router>
    <div className="App">
      <AuthContextProvider>
      <Switch>
          <Route path="/login" render={() => (
            authApi.isUserValid()
            ? <Redirect to='' />
            : <Login authApi={authApi}/>
              )} />
            <Route exact path="" render={() => (
            authApi.isUserValid()
            ? <Home isUserAdmin={authApi.user.isAdmin} authApi={authApi}/>
            : <Redirect to='/login' />
              )} />

        </Switch>
        </AuthContextProvider>
    </div>
    </Router>
  );
}

export default App;
