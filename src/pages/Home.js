import { Component } from "react";
import defaultCredDataService from "../service/CredDataService.service";
import CredGroup from "../components/CredGroup";

class Home extends Component{
    state ={
        credgroups : []
    }
    
    constructor(props){
        super(props)
        this.credDataService = defaultCredDataService;
    }
    componentDidMount(){
        this.credDataService.fetchCredGroup(groups => {
            groups.forEach(
                group => {
                    this.setState({credgroups: [...this.state.credgroups, group]})
                }
            )
        })
    }
    render(){
        return (
            <div className= "container mt-3">
                <div className="" style={{marginBottom: '100px'}}>
                    <h2>Manage Your Credentials</h2>

                </div>
                {
                    this.state.credgroups.map(
                        group => <CredGroup name={group} key={group}/>
                    )
                }
            </div>
        )
    }
}

export default Home;