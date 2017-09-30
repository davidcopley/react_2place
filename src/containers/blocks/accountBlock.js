import React from "react"
import {connect} from "react-redux"
import {FlatButton,Avatar,RaisedButton,TextField} from "material-ui"
import {signin} from "../../actionCreators/authActionCreators"
class AccountBlock extends React.Component {
    constructor(props){
        super(props)
        this.state={
            open:false
        }
    }
    handleSubmitSignin = () => {
        const email = this.email.input.value
        const password = this.password.input.value
        const {signin} = this.props
        signin(email,password)
    }
    render() {
        const {open} = this.state
        const {accessToken,signin} = this.props
        return (
            <span>
                <FlatButton onClick={()=>this.setState({open:!open})} style={{color:"#1e717f"}}>sign-in</FlatButton>
                {open&&
                    <div style={{width: "100vw", height: "100vh", position: "fixed", zIndex: 3}}>
                        <div
                            tabIndex={0}
                            style={{
                                width: 270,
                                height: 180,
                                background: "#ffffff"
                                , position: "fixed"
                                , top: 60
                                , right: 10
                                , zIndex: 4,
                                boxShadow: "0px 0px 5px #999999",
                                padding: 10,
                            }}
                            onClick={() => {
                            }}
                        >
                            {accessToken &&
                                <span>
                                    <div style={{marginLeft: 15, marginRight: 15, fontSize: 13}}>
                                        email
                                    </div>
                                    < div style={{margin: 15, display: "flex"}}>
                                        <div style={{height: "100%", marginRight: 10}}>
                                        <Avatar style={{width: 64, height: 64}}/>
                                        </div>
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                        <b style={{fontSize: 13}}>display name</b>
                                        <RaisedButton
                                            style={{marginTop: 10, fontSize: 13, backgroundColor: "#c5c5c5"}}><span
                                            style={{margin: 10}}>Account settings</span></RaisedButton>
                                        </div>
                                        </div>
                                        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                                        <FlatButton>sign-out</FlatButton>
                                    </div>
                                </span>
                            }
                            {!accessToken&&
                                <span>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <span style={{fontSize: 13, minWidth: 100}}>email</span>
                                        <TextField name="email" ref={x=>this.email=x} type={"email"} onKeyPress={e=>e.key==="Enter"&&signin(this.email.input.value,this.password.input.value)}/>
                                    </div>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <span style={{fontSize: 13, minWidth: 100}}>password</span>
                                        <TextField name="password" ref={x=>this.password=x} type={"password"} onKeyPress={e=>e.key==="Enter"&&signin(this.email.input.value,this.password.input.value)}/>
                                    </div>
                                    <FlatButton fullWidth style={{fontSize:13}} onClick={()=>signin(this.email.input.value,this.password.input.value)}>submit</FlatButton>
                                    <FlatButton fullWidth style={{fontSize:13}}>forgot password</FlatButton>
                                </span>
                            }
                        </div>
                    </div>
                }
            </span>
        )
    }
}

const mapStateToProps = state => {
    return {accessToken: state.authReducer.accessToken}
}

export default connect(mapStateToProps,{signin})(AccountBlock)