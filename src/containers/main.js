import React from "react"
import {connect} from "react-redux"
import {Route} from "react-router"
import {push} from "react-router-redux"
import {withRouter} from "react-router-dom"
import {signin,signout,setAccessToken} from "../actionCreators/authActionCreators"
import {getPropertiesBasic} from "../actionCreators/propertiesDBActionCreators"
import {FlatButton,TextField} from "material-ui"
import PropertiesTiles from "./pages/propertiesTilesPage"
import PropertyPage from "./pages/propertyPage"
import SignupPage from "./pages/signupPage"
import AddPropertyPage from "./pages/addPropertyPage"
import Home from "./pages/homePage"
import Logo from "../images/1placeLogo.png"
class Main extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        if(localStorage.getItem('1p_token')!==""){
            const {setAccessToken} = this.props
            setAccessToken(localStorage.getItem('1p_token'))
        }
    }
    render(){
        const {signin,signout,accessToken,push} = this.props
        return(
            <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
                <div style={{position:"fixed",height:60,width:"100%",background:"#eeeeee",display:"flex",flexDirection:"column",alignItems:"center",zIndex:2}}>
                    <div style={{display:"flex",height:"100%",maxWidth:1000,width:"100%",justifyContent:"start",alignItems:"center"}}>
                        <div style={{height:40,width:40,backgroundImage:`url(${Logo})`,backgroundPosition: "center",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",}}/>
                        <span style={{fontSize:50,color:"#1e717f"}} className="clickable" onClick={()=>push("/")}>1PLACE</span>
                        <span style={{marginLeft:"auto"}}>
                            {accessToken ?
                                <span>
                                    <FlatButton onClick={()=>signout()}>
                                        sign-out
                                    </FlatButton>
                                </span>:
                                <span>
                                    <TextField
                                        key={"usernameTextfield"}
                                        style={{width: 150, marginRight: 10}}
                                        hintText={"email"}
                                        type={"email"}
                                        ref={email => this.email = email}
                                    />
                                    <TextField key={"passwordTextfield"} style = {{width: 150}} hinttext={"password"} type={"password"} ref={password=>this.password=password}/>
                                    <FlatButton onClick={()=>signin(this.email.input.value,this.password.input.value)}>
                                        sign-in
                                    </FlatButton>
                                    <FlatButton onClick={()=>push("/signup")}>
                                        sign-up
                                    </FlatButton>
                                </span>
                            }
                        </span>
                    </div>
                </div>
                <div style={{height:60}}/>
                <div style={{flex:"auto",width:"100%",display:"flex",justifyContent:"center"}}>
                    <div style={{display:"flex",flexDirection:"column",maxWidth:1000,width:"100%"}}>
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
export default withRouter(connect(mapStateToProps,{signin,signout,getPropertiesBasic,setAccessToken,push})(Main))
