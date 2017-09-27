import React from "react"
import {connect} from "react-redux"
import {signin,signout,setAccessToken} from "../actionCreators/authActionCreators"
import {getPropertiesBasic} from "../actionCreators/propertiesDBActionCreators"
import {FlatButton,TextField} from "material-ui"
import PropertiesList from "./property/propertiesList"
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
        const {signin,signout,accessToken,getPropertiesBasic} = this.props
        return(
            <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
                <div style={{position:"fixed",height:60,width:"100%",background:"#eeeeee",display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <div style={{display:"flex",height:"100%",maxWidth:1000,width:"100%",justifyContent:"start",alignItems:"center"}}>
                        <span style={{fontSize:50}}>1PLACE</span>
                        <span style={{marginLeft:"auto"}}>
                            {accessToken ?
                                <span>
                                    <FlatButton onClick={()=>signout()}>
                                        Signout
                                    </FlatButton>
                                </span>:
                                <span>
                                    <TextField
                                        style={{width: 150, marginRight: 10}}
                                        hintText={"email"}
                                        type={"email"}
                                        ref={email => this.email = email}
                                    />
                                    < TextField style = {{width: 150}} hinttext={"password"} type={"password"} ref={password=>this.password=password}/>
                                    <FlatButton onClick={()=>signin(this.email.input.value,this.password.input.value)}>
                                        Signin
                                    </FlatButton>
                                </span>
                            }
                        </span>
                    </div>
                </div>
                <div style={{height:60}}/>
                <div style={{flex:"auto",width:"100%",display:"flex",justifyContent:"center"}}>
                    <div style={{display:"flex",flexDirection:"column",maxWidth:1000,width:"100%"}}>
                        <FlatButton label={"get props"} onClick={()=>getPropertiesBasic()}/>
                        <PropertiesList/>
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
export default connect(mapStateToProps,{signin,signout,getPropertiesBasic,setAccessToken})(Main)
