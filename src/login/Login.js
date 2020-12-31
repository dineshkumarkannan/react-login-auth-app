import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {AuthContext} from '../context/authContext';

function Login(props) {

    const history = useHistory();

    const authApi = useContext(AuthContext);

    const [loginDetails, setLoginDetails] = useState({
        username: null,
        password: null
      });
      const [loginErrors, setLoginErrors] = useState({});
    
      function inputLoginDetails(event) {
        const { name, value } = event.target;
        setLoginDetails({
          ...loginDetails,
          [name]: value
        });
      }
    
      function isMinLength(field, value) {
        return value?.length > 0 ? null : `${field} is required`;
      }
    
      function submitLoginDetails(event) {
        event.preventDefault();
    
        let formErrors = Object.entries(loginDetails).reduce((formErrors, [field, value]) => {
          const fieldError = isMinLength(field, value);
    
          if (fieldError !== null) {
            formErrors = {
              ...formErrors,
              [field]: fieldError
            };
          }
    
          return formErrors;
        }, {});

        let isFormValid = Object.keys(formErrors).length === 0 && authApi.login(loginDetails.username, loginDetails.password);
    
        setLoginErrors(formErrors);
    
        if (isFormValid) {
          history.push("/");
        } else {
          console.error('Form is invalid', loginErrors);
        }
      }

      function validateField(e) {
         const {name, value } = e.target;
         const fieldError = isMinLength(name, value);
         setLoginErrors({...loginErrors, [name]: fieldError});
      }
    
      return (
        <form onSubmit={submitLoginDetails} noValidate>
          <h1>Login</h1>
          <div>
            <label htmlFor="username">Username*</label>
            <input type="text" name="username" id="username" onChange={inputLoginDetails} onBlur={validateField} required/>
            {loginErrors.username && <div>{loginErrors.username}</div>}
          </div>
          <div>
            <label htmlFor="password">Password*</label>
            <input type="password" name="password" id="password" onChange={inputLoginDetails} onBlur={validateField} required/>
            {loginErrors.password && <div>{loginErrors.password}</div>}
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      );
}

export default Login;
