import React from "react"
import {connect} from "react-redux"
import {push} from "react-router-redux"
import {withRouter} from "react-router-dom"
import {signin, signout} from "../actionCreators/authActionCreators"
import {getPropertiesBasic} from "../actionCreators/propertiesDBActionCreators"
import {FlatButton, TextField} from "material-ui"
import AccountBlock from "./blocks/accountBlock"

import Logo from "../images/1placeLogo.png"

const Topbar = props => {
    const {accessToken, signin, signout, push} = props
    return <div style={{
        position: "fixed",
        height: 60,
        width: "100%",
        background: "#eeeeee",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 2
    }}>
        <div style={{
            display: "flex",
            height: "100%",
            maxWidth: 1000,
            width: "100%",
            justifyContent: "start",
            alignItems: "center"
        }}>
            <div
                className="clickable"
                onClick={() => push("/")}
                style={{
                    height: 40, width: 40, backgroundImage: `url(${Logo})`, backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    minWidth:40,
                    minHeight:40
                }}
            />
            <span style={{fontSize: 50, color: "#1e717f"}} className="clickable" onClick={() => push("/")}>1PLACE</span>
            <span style={{marginLeft: "auto"}}>
                {accessToken ?
                    <span>
                        <FlatButton onClick={() => signout()} style={{color:"#1e717f"}}>
                            sign-out
                        </FlatButton>
                    </span> :
                    <span>
                        <AccountBlock/>
                        <FlatButton onClick={() => push("/signup")} style={{color:"#1e717f"}}>
                            sign-up
                        </FlatButton>
                    </span>
                }
            </span>
        </div>
    </div>
}

const mapStateToProps = state => {
    return {
        accessToken: state.authReducer.accessToken
    }
}
export default withRouter(connect(mapStateToProps, {signin, signout, getPropertiesBasic, push})(Topbar))