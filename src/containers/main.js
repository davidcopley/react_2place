import React from "react"
import {connect} from "react-redux"
import {Route} from "react-router"
import {withRouter} from "react-router-dom"
import PropertiesTiles from "./pages/propertiesTilesPage"
import PropertyPage from "./pages/propertyPage/propertyPage"
import SignupPage from "./pages/signupPage"
import AddPropertyPage from "./pages/addPropertyPage"
import Home from "./pages/homePage"
import Topbar from "./topbar"
import {setAccessToken} from "../actionCreators/authActionCreators"
class Main extends React.Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){

        if(localStorage.hasOwnProperty('1p_token')){
            const {setAccessToken} = this.props
            setAccessToken(localStorage.getItem('1p_token'))
        }
    }
    render(){
        return(
            <div style={{minHeight:"100vh",width:"100%",display:"flex",flexDirection:"column"}}>
                <Topbar/>
                <div style={{height:60}}/>
                <div style={{height:"100%",width:"100%",display:"flex",justifyContent:"center"}}>
                    <div style={{display:"flex",flexDirection:"column",height:"100%",maxWidth:1000,width:"100%"}}>
                        <Route exact path="/" component={Home}/>
                        <Route path="/propertiesTiles" component={PropertiesTiles}/>
                        <Route path="/propertyPage/:propertyId" component={PropertyPage}/>
                        <Route path="/signup" component={SignupPage}/>
                        <Route path="/addProperty" component={AddPropertyPage}/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return {
        accessToken:state.authReducer.accessToken
    }
}
export default withRouter(connect(mapStateToProps,{setAccessToken})(Main))
