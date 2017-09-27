import React from "react"
import {connect} from "react-redux"
import PropertyBlock from "./propertyBlock"
class PropertiesList extends React.Component{
    renderProperties = () => {
        const {propertiesBasic} = this.props
        if(propertiesBasic) {
            return Object.keys(propertiesBasic).map(property_id => {
                return <PropertyBlock property_id={property_id}/>
            })
        }
        return <span>"No properties loaded"</span>
    }
    render(){
        return this.renderProperties()
    }
}
const mapStateToProps = state => ({
    propertiesBasic:state.propertiesDBReducer.propertiesBasic
})

export default connect(mapStateToProps)(PropertiesList)