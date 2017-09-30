import React from "react"
import {connect} from "react-redux"
import {Route} from "react-router"
import {withRouter} from "react-router-dom"
import PropertiesTiles from "./pages/propertiesTilesPage"
import PropertyPage from "./pages/propertyPage/propertyPage"
import SignupPage from "./pages/signupPage"
import AddPropertyPage from "./pages/addPropertyPage"
import Home from "./pages/homePage"
import EditPropertyPage from "./pages/editPropertyPage"
import Topbar from "./topbar"
import {setAccessToken} from "../actionCreators/authActionCreators"

class Main extends React.Component{
    componentWillMount(){

        if(localStorage.hasOwnProperty('1p_token')){
            const {setAccessToken} = this.props
            setAccessToken(localStorage.getItem('1p_token'))
        }
    }
    render(){
        const {locale} = this.props
        return(
            <div style={{minHeight:"100vh",width:"100%",display:"flex",flexDirection:"column"}}>
                <Topbar/>
                <div style={{height:60}}/>
                <div style={{flex:1,height:"100%",width:"100%",display:"flex",justifyContent:"center",marginBottom:"auto"}}>
                    <div style={{display:"flex",flexDirection:"column",height:"100%",maxWidth:1000,width:"100%"}}>
                        <Route exact path="/" component={Home}/>
                        <Route path="/propertiesTiles" component={PropertiesTiles}/>
                        <Route path="/propertyPage/:propertyId" component={PropertyPage}/>
                        <Route path="/signup" component={SignupPage}/>
                        <Route path="/addProperty" component={AddPropertyPage}/>
                        <Route path="/editProperty/:propertyId" component={EditPropertyPage}/>
                    </div>
                </div>
                <div style={{display:"flex",padding:10,alignItems:"center",background:"rgb(238, 238, 238)",marginTop:100}}>
                    <div style={{flex:1,fontSize:10}}><a href="http://www.1place.hk">About us</a></div><div style={{flex:2,textAlign:"center",fontSize:10}}>©2017. All rights reserved by 1PLACE Technology Limited</div><div style={{flex:1,fontSize:8,textAlign:"right",color:"#8e8e8e"}}>Frontend developed by <a href="https://github.com/davidcopley">David Copley</a></div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return {
        accessToken:state.authReducer.accessToken,
        locale:state.localeReducer.locale
    }
}
export default withRouter(connect(mapStateToProps,{setAccessToken})(Main))
