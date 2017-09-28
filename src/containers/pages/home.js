import React from "react"
import {connect} from "react-redux"
import {push} from "react-router-redux"
import {List,ListItem} from "material-ui"
const Home =  props => {
    const {push} = props
    return(
        <List>
            <ListItem onClick={()=>push("/propertiesTiles")}>Property Tiles</ListItem>
        </List>
    )
}
export default connect(null,{push})(Home)

