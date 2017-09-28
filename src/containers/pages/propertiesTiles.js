import React from "react"
import {getPropertiesBasic} from "../../actionCreators/propertiesDBActionCreators"
import {connect} from "react-redux"
import PropertyBlock from "../property/propertyBlock"
import {withRouter} from "react-router-dom"
class PropertiesTiles extends React.Component{
    componentDidMount(){
        this.props.getPropertiesBasic()
    }
    renderProperties = () => {
        const {propertiesBasic} = this.props
        if(propertiesBasic) {
            return Object.keys(propertiesBasic).map(property_id => {
                return <PropertyBlock key={`property${property_id}`} property_id={property_id}/>
            })
        }
        return <span>"No properties loaded"</span>
    }
    render(){
        return(
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
                {this.renderProperties()}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    propertiesBasic:state.propertiesDBReducer.propertiesBasic
})

export default withRouter(connect(mapStateToProps,{getPropertiesBasic})(PropertiesTiles))