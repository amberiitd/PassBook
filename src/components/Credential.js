import { Component } from "react"

export default class Credential extends Component{
    state = {
        cred:{
            groupName: "",
            credName: "",
            webServer: "",
            username: "",
            password: "",
        }
    }
    constructor(props){
        super(props);
        this.props = props;

    }

    render(){
        return (
            <div className="container mb-3" style={{width: '80%'}}>
                 <div className="row" >
                    <div className=" col-7" >{this.props.credName}</div>
                    <div className="col-4 ">{this.props.lastModified}</div>
                    <div className="col-1 " >
                        <button className="btn bg-light rounded-pill">
                            <i className="bi bi-chevron-down"></i>
                            <i className="bi bi-chevron-up" hidden></i>
                        </button>
                    </div>
                </div>
                <hr className="m-1"/>
            </div>
        )
    }
}