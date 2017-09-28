import React from "react"
import {connect} from "react-redux"
import {push} from "react-router-redux"
import {IconButton} from "material-ui"
import Add from "material-ui/svg-icons/content/add"
import Tiles from "material-ui/svg-icons/image/view-comfy"
const Home = props => {
    const {push} = props
    return (
        <div style={{width: "100%", height: "100%", display: "flex", flexWrap: "wrap",justifyContent:"space-evenly"}}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <IconButton
                    style={{width: 300,height:250}}
                    iconStyle={{width: "100%", height: "100%",fill:"#1e717f"}}
                    onClick={() => push("/propertiesTiles")}
                >
                    <Tiles/>
                </IconButton>
                <div style={{textAlign:"center",width:"100%"}}>Property tiles</div>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <IconButton
                    style={{width: 300,height:250}}
                    iconStyle={{width: "100%", height: "100%",fill:"#1e717f"}}
                    onClick={() => push("/addProperty")}
                >
                    <Add/>
                </IconButton>
                <div style={{textAlign:"center",width:"100%"}}>Add new property</div>
            </div>
        </div>
    )
}
export default connect(null, {push})(Home)

