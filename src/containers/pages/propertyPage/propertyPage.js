import React from "react"
import {connect} from "react-redux"
import {getPropertyDetail, getPropertyCoordinatesByAddress} from "../../../actionCreators/propertiesDBActionCreators"
import PropertyPageStuffToShow from "./propertyPageStuffToShow"
import PropertyPageAlbum from "./propertyPageAlbum"
import PropertyPageInformation from "./propertyPageInformation"
class PropertyPage extends React.Component {
    componentDidMount() {
        const {getPropertyDetail, getPropertyCoordinatesByAddress} = this.props
        const propertyId = this.props.match.params.propertyId
        getPropertyDetail(propertyId)
            .then(res => {
                const {building_name, building_region, building_street_name} = res
                const address = `${building_name}, ${building_street_name}, ${building_region.replace(/_/g, " ")}`
                getPropertyCoordinatesByAddress(propertyId, address)
            })
    }

    render() {
        const {propertyDetail,propertyCoordinates} = this.props
        if (!propertyDetail) {
            return <div>Loading</div>
        }
        return (
            <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent:"center"}}>
                <div style={{minHeight:"50vh",display:"flex",flexWrap:"wrap",width:"100%"}}>
                    <div style={{flex:1,minWidth:500}}><PropertyPageAlbum propertyDetail={propertyDetail}/></div>
                    <div style={{flex:1,minWidth:500}}><PropertyPageInformation propertyDetail={propertyDetail}/></div>
                </div>
                <PropertyPageStuffToShow propertyDetail={propertyDetail} propertyCoordinates={propertyCoordinates}/>
            </div>
        )
    }
}
const mapStateToProps = (state, props) => ({
    propertyDetail: state.propertiesDBReducer.propertiesDetail[props.match.params.propertyId],
    propertyCoordinates: state.propertiesDBReducer.propertiesCoordinates[props.match.params.propertyId]
})
export default connect(mapStateToProps, {getPropertyDetail, getPropertyCoordinatesByAddress})(PropertyPage)