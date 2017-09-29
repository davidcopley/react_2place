import React from "react"
import {compose} from "redux"
import {FlatButton, List, ListItem} from "material-ui"
import Tick from "material-ui/svg-icons/action/done"
import Cross from "material-ui/svg-icons/navigation/close"
import featuresImages from "../../../images/features/index"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const MapWithAMarker = compose(
    withScriptjs,
    withGoogleMap
)(props => {
    const {propertyCoordinates} = props
    return (
        <GoogleMap
            defaultZoom={20}
            defaultCenter={propertyCoordinates}
        >
            <Marker
                position={propertyCoordinates}
            />
        </GoogleMap>
    )
});
class PropertyPageStuffToShow extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            stuffToShow: "location",
        }
    }
    changeStuffToShow = stuffToShow => {
        this.setState({stuffToShow})
    }
    renderStuffToshow(){
        const {stuffToShow} = this.state
        const {propertyDetail} = this.props
        switch (stuffToShow) {
            case("rentInfo"):
                const {rental_start_time, is_short_terms_rental, allows_pets, including_all_bills} = propertyDetail
                return (
                    <List>
                        <ListItem primaryText={"rent start date"} rightIcon={<span
                            style={{minWidth: 200, textAlign: "right"}}>{rental_start_time}</span>}/>
                        <ListItem primaryText={"short term rental"}
                                  rightIcon={is_short_terms_rental ? <Tick/> : <Cross/>}/>
                        <ListItem primaryText={"owner allows pets"} rightIcon={allows_pets ? <Tick/> : <Cross/>}/>
                        <ListItem primaryText={"rate & gov mgmt fees"}
                                  rightIcon={including_all_bills ? <Tick/> : <Cross/>}/>
                    </List>
                )
            case("otherInfo"):
                const {property_building_features, property_unit_features} = propertyDetail
                return (
                    <span>
                        {property_building_features && <div>Property building features</div>}
                        <div style={{display: "flex", flexWrap: "wrap", width: "100%"}}>
                            {Object.keys(property_building_features).map(feature => {
                                return (
                                    <div style={{
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        padding: 5
                                    }}>
                                        <div style={{
                                            backgroundImage: `url(${featuresImages[feature]})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            width: 70,
                                            height: 70
                                        }}/>
                                        <span style={{
                                            fontSize: 12,
                                            textTransform: "capitalize"
                                        }}>{feature.replace(/_/g, " ")}</span>
                                    </div>
                                )
                            })}
                        </div>
                        {property_unit_features && <div>Property unit features</div>}
                        <div style={{display: "flex", flexWrap: "wrap", width: "100%"}}>
                            {Object.keys(property_unit_features).map(feature => {
                                return (
                                    <div style={{
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        padding: 5
                                    }}>
                                        <div style={{
                                            backgroundImage: `url(${featuresImages[feature]})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            width: 70,
                                            height: 70
                                        }}/>
                                        <span style={{
                                            fontSize: 12,
                                            textTransform: "capitalize"
                                        }}>{feature.replace(/_/g, " ")}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </span>
                )
            case("location"):
                if (!this.props.propertyCoordinates) {
                    return <div>Unable to locate address.</div>
                }
                return (
                    <MapWithAMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?libraries=visualization&key=AIzaSyDUey-ysXXRD1vnY2abVyxa86CKjhIa3Fw"
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{minHeight:500,width:"100%"}}/>}
                        mapElement={<div style={{minHeight:500,width:"100%"}}/>}
                        propertyCoordinates={this.props.propertyCoordinates}
                    />
                )
            default:
                return "stuff"
        }
    }
    render(){
        const {propertyDetail} = this.props
        const {stuffToShow} = this.state
        const {lease_type} = propertyDetail
        return(
            <span style={{width:"100%"}}>
                <div style={{display: "flex", width: "100%"}}>
                    <FlatButton
                        style={{
                            flex: 1,
                            border: "1px solid rgb(221, 223, 226)",
                            color: stuffToShow === "location" ? "#ffffff" : "#1e717f"
                        }}
                        label={"Location"}
                        onClick={() => this.changeStuffToShow("location")}
                        backgroundColor={stuffToShow === "location" ? "#1e717f" : "#ffffff"}
                    />
                    {lease_type === "rent" &&
                    <FlatButton
                        style={{
                            flex: 1,
                            border: "1px solid rgb(221, 223, 226)",
                            color: stuffToShow === "rentInfo" ? "#ffffff" : "#1e717f"
                        }}
                        label={"Rent Info"}
                        onClick={() => this.changeStuffToShow("rentInfo")}
                        backgroundColor={stuffToShow === "rentInfo" ? "#1e717f" : "#ffffff"}
                    />}
                    <FlatButton
                        style={{
                            flex: 1,
                            border: "1px solid rgb(221, 223, 226)",
                            color: stuffToShow === "otherInfo" ? "#ffffff" : "#1e717f"
                        }}
                        label={"Other Info"}
                        onClick={() => this.changeStuffToShow("otherInfo")}
                        backgroundColor={stuffToShow === "otherInfo" ? "#1e717f" : "#ffffff"}
                    />
                </div>
                {this.renderStuffToshow()}
            </span>
        )
    }
}
export default PropertyPageStuffToShow