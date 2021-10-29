import { Component } from "react";
import defaultAuthService from "../service/Authentication.service";
import { isEmpty } from 'lodash';
import { Link } from "react-router-dom";

class Login extends Component{
  state = {
      username: "",
      password: "",
      loginStatus: "logged-out",
      errorMsg: "",
      onSuccessMsg: "",
  }
  constructor(props){
    super(props);
    this.props = props;
    if(defaultAuthService.isAuthenticated){
      this.state = {
        username: "",
        password: "",
        loginStatus: "logged-in",
        errorMsg: "",
        onSuccessMsg: "",
      }
    }else{
      this.state = {
        username: "",
        password: "",
        loginStatus: "logged-out",
        errorMsg: "",
        onSuccessMsg: "",
      }
    }
    
  }

  submitLogin(){
    console.log("username: "+ this.state.username)
    console.log("password: "+ this.state.password)
    defaultAuthService.login(this.state.username, this.state.password, (user)=> {
      if(user && !isEmpty(user.username)){
        this.setState({
          username: "",
          password: "",
          loginStatus: "logged-in",
          errorMsg: ""
        })
      }else{
        this.setState({
          username: "",
          password: "",
          loginStatus: "error",
          errorMsg: "Could not Authorize"
        })
      }
      
    });

  }

  logout(){
    defaultAuthService.logout((user)=>{
      if(user && isEmpty(user.username)){
        this.setState(this.state = {
          username: "",
          password: "",
          loginStatus: "logged-out",
          errorMsg: "",
          onSuccessMsg: "You have been successfully logged out",
        })
      }else{
        this.setState({
          username: "",
          password: "",
          loginStatus: "error",
          errorMsg: "Logout error!"
        })
      }
    })
  }

  navigate(path){
    this.context.router.transitionTo(path);
  }

  inlineRender1(){
    switch(this.state.loginStatus){   
      case 'logged-in': 
        return (
          <div className="container text-center" style={{width: '20em'}}>
            <h2 className="mb-3"> Welcome {defaultAuthService.userCtx.firstName}</h2>
            <Link className="btn btn-primary form-control mb-3" to="/home">
              Go to Home
            </Link>
            <button className="btn btn-primary form-control mb-3" onClick= {()=>{this.logout()}}>
              Logout
            </button>
            <a></a>
          </div>
        )
        default:
          return (
            <div className="container" style={{width: '20em'}}>
              <h2 className="text-center mb-3">Please Login!</h2>
              <input 
                className="form-control mb-3"
                type="text"
                placeholder="username" 
                value={this.state.username}
                onChange={(e)=>{this.setState({...this.state, username: e.target.value})}}
              />
            
              <input 
                  className="form-control mb-3"
                  type="password" 
                  placeholder="password" 
                  value={this.state.password}
                  onChange={(e)=>{this.setState({...this.state, password: e.target.value})}}
              />
              <div>
                <button className="btn btn-primary form-control" type="button" onClick={()=> {this.submitLogin()}}>
                  Login
                </button>
              </div>
              
            </div>
          )

    }
  }

  render(){
    return (
      <div className="container border" style={{minWidth: '20em'}}>
        {  
          this.inlineRender1()
        }
        {
          this.state.loginStatus === 'error' ?
            <div align="center">
              <button className="btn">
                <i className="bi bi-exclamation-triangle-fill"></i>
              </button>
              {this.state.errorMsg}
            </div>
          : ''
        }
        <div className="container bg-info text-center mt-3" style= {{width: '19em'}}>
          {this.state.onSuccessMsg}
        </div>
          
        
      </div>
    )
    
  }
}

export default Login;
