

const data = [
    {
      name: "Admin",
      password: "admin",
      permission: "admin"
    },
    {
      name: "User",
      password: "user",
      permission: "user"
    }
  ];
  

  export default class Auth {
    constructor() { 
      let loggedInUser = JSON.parse(sessionStorage.getItem('loggedUser'));
      this.user = {name: null, isAdmin: false, sessionId: null};
      if(loggedInUser && loggedInUser.sessionId){
        this.user = this.getUserDetails(loggedInUser.name, loggedInUser.sessionId);
      }
    }
  
    loginUser(userName, pwd){
      const isValid = data.some(({name, password})=> name === userName && password === pwd);
      if(isValid){
        const sessionId = Math.random();
        sessionStorage.setItem('loggedUser', JSON.stringify({sessionId, name: userName}));
        this.user = this.getUserDetails(userName, sessionId);
        console.log(sessionId , this.user.sessionId);
      } else {
        sessionStorage.clear();
      }
      
      return isValid ? this.user : null;
    }
  
    isUserValid(){
      let loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
      console.log(loggedUser?.sessionId , this.user.sessionId);
      return loggedUser?.sessionId === this.user.sessionId || false;
    }
  
    logOut(){
      sessionStorage.clear();
      this.user = {name: null, isAdmin: false, sessionId: null};
      return true;
    }
  
    getUserDetails(userName, sessionId){
      return {name: userName, 
        isAdmin: data.some(({name, permission})=> name === userName && permission === 'admin'), 
        sessionId};
      }
    
  }

