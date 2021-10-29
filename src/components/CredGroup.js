import { Component } from "react"
import defaultCredDataService from "../service/CredDataService.service"
import Credential from "./Credential"

class CredGroup extends Component{
    state = {
        name: "",
        creds: [],
        collapseExpanded: false
    }
    constructor(props){
        super(props)
        this.props = props
        this.state = {
            name : this.props.name,
            creds: this.state.creds,
            collapseExpanded: false
        }

        this.credDataService = defaultCredDataService;
    }
    loadCreds(){
        if(this.state.collapseExpanded){
            this.setState({...this.state, collapseExpanded: false})
            return;
        }

        this.credDataService.fetchCredOverviews( this.state.name,
            overviews => {
                var creds =[]
                overviews.forEach(
                    overview =>{
                        creds.push(overview)
                    }
                )
                this.setState({...this.state, creds: creds, collapseExpanded: true})
            }
        );
    }
    getCollpaseId(){
        return this.state.name.replace(/\s/g, "") + '_collapse';
    }
    render(){
        return (
            <div className="container mt-3">
                <div className="" style={{position: 'relative'}}>
                    <div className="">{this.state.name}</div>
                    <div className="" style={{position: 'absolute', right: '5px', top: '0px'}}>
                        <button className="btn bg-light" data-bs-toggle="collapse" data-bs-target={'#'+ this.getCollpaseId()} aria-expanded="false" aria-controls={this.getCollpaseId()} onClick={()=> {this.loadCreds()}}>
                            <i className="bi bi-chevron-down" hidden={this.state.collapseExpanded}></i>
                            <i className="bi bi-chevron-up" hidden={!this.state.collapseExpanded}></i>
                        </button>
                    </div>
                </div>
                <hr />

                <div className="collapse" id={this.state.name.replace(/\s/g, "")+ '_collapse'}>
                    {
                        this.state.creds.map(
                            cred => 
                            <Credential 
                                credGroupName={cred.credGroupName}
                                credName={cred.credName}
                                credWebServer={cred.credWebServer}
                                lastModified={cred.lastModified}
                                parentCredName={cred.parentCredName}
                                key={cred.credName}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default CredGroup;