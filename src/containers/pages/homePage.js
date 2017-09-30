import React from "react"
import {connect} from "react-redux"
import {push} from "react-router-redux"
import {IconButton} from "material-ui"
import Add from "material-ui/svg-icons/content/add"
import Tiles from "material-ui/svg-icons/image/view-comfy"
import x from "../../constants/locale"
const Home = props => {
    const {push,accessToken,locale} = props
    return (
        <div style={{width: "100%", height: "100%", display: "flex", flexWrap: "wrap",justifyContent:"space-evenly"}}>
            <div key={"propertiesTiles"} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <IconButton
                    style={{width: 200,height:200}}
                    iconStyle={{width: "100%", height: "100%",fill:"#1e717f"}}
                    onClick={() => accessToken?push("/propertiesTiles"):push("/signup")}
                >
                    <Tiles/>
                </IconButton>
                <div style={{textAlign:"center",width:"100%",position:"relative",top:-20}}>{x["myProperties"][locale]}</div>
            </div>
            <div key={"addProperty"} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <IconButton
                    style={{width: 200,height:200}}
                    iconStyle={{width: "100%", height: "100%",fill:"#1e717f"}}
                    onClick={() => accessToken?push("/addProperty"):push("/signup")}
                >
                    <Add/>
                </IconButton>
                <div style={{textAlign:"center",width:"100%",position:"relative",top:-20}}>{x["addProperty"][locale]}</div>
            </div>
            {new Array(4).fill(<div style={{width:200}}/>)}
        </div>
    )
}
const mapStateToProps = state => ({
    accessToken:state.authReducer.accessToken,
    locale:state.localeReducer.locale
})
export default connect(mapStateToProps, {push})(Home)

