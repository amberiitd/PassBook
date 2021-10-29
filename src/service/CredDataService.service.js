import defaultAuthService from "./Authentication.service";

class CredDataService{
    api = "http://localhost:8082"
    authService;

    constructor(){
        this.authService = defaultAuthService;
    }

    fetchCredGroup(callBack){
        var entity = {
            headers : {
                'Authorization': 'Basic '+ this.authService.getToken()
            }
        }
        fetch(this.api + "/groups", entity)
        .then(res => res.json())
        .then(groups => {callBack(groups)})
        .catch(error => console.log(error))
    }

    fetchCredOverviews(groupName, callBack){
        var entity = {
            headers : {
                'Authorization': 'Basic '+ this.authService.getToken()
            }
        }
        var params = "?groupName="+groupName;
        fetch(this.api + "/creds" + params, entity)
        .then(res => res.json())
        .then(overviews => {callBack(overviews)})
        .catch(error => console.log(error))
    }
}
var defaultCredDataService = new CredDataService();
export default defaultCredDataService;