import { isEmpty } from 'lodash';
class AuthenticationService{
    api = "http://localhost:8082"
    userCtx = {
        username: "",
        firstName: "",
        lastName: "",
        auth: [],
        token: ""
    }

    isAuthenticated= false;
    USERS = [
        {
            username: "namber",
            firstName: "Nazish",
            lastName: "Amber",
            password: "amber1940",
            auth: ["ADMIN", "USER"]
        }
    ]

    constructor(){
        this.isAuthenticated = !isEmpty(sessionStorage.getItem("authToken"));
        if(this.isAuthenticated){
            this.loginWithToken(sessionStorage.getItem("authToken"), (res) => {})
        }
    }

    login(username, password, callBack){
        // var user = this.USERS.find(user => user.username === username && user.password === password)
        var basicAuthToken = this.getBasicAuthCode(username, password)
        this.loginWithToken(basicAuthToken, callBack); 
    }

    loginWithToken(token, callBack){
        var entity = {
            headers : {
                'Authorization': 'Basic '+ token
            }
        }
        fetch(this.api + '/user', entity)
        .then( user => user.json())
        .then(
            user => {
                if (user && user.username){
                    this.userCtx = {
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        auth: user.auth,
                        token: token
                    }
                    this.isAuthenticated = true;
                    sessionStorage.setItem("authToken", this.userCtx.token)
                }
                callBack(user);
            }
        )
        .catch(
            error =>{
                console.log(error);
            }
        )
    }

    logout(callBack){
        if(isEmpty(this.userCtx.username)){
        }else{
            this.userCtx = {
                username: "",
                firstName: "",
                lastName: "",
                auth: []
            }
            
        }
        this.isAuthenticated = false;
        sessionStorage.removeItem("authToken")
        callBack(this.userCtx);
    }

    getBasicAuthCode(username, password){
        return btoa(username + ':' + password);
    }

    getToken(){
        if(this.isAuthenticated){
            return sessionStorage.getItem("authToken");
        }

        return null;
    }
}

var defaultAuthService = new AuthenticationService();
export default defaultAuthService;