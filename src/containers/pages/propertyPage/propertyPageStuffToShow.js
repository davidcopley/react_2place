import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {FlatButton, List, ListItem} from "material-ui"
import Tick from "material-ui/svg-icons/action/done"
import Cross from "material-ui/svg-icons/navigation/close"
import featuresImages from "../../../images/features/index"
import x from "../../../constants/locale"
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
        const {propertyDetail,locale} = this.props
        switch (stuffToShow) {
            case("rentInfo"):
                const {rental_start_time, is_short_terms_rental, allows_pets, including_all_bills} = propertyDetail
                return (
                    <List>
                        <ListItem primaryText={x["rentStartDate"][locale]} rightIcon={<span
                            style={{minWidth: 200, textAlign: "right"}}>{rental_start_time}</span>}/>
                        <ListItem primaryText={x['shortTermRental'][locale]}
                                  rightIcon={is_short_terms_rental ? <Tick/> : <Cross/>}/>
                        <ListItem primaryText={x['allowPets'][locale]} rightIcon={allows_pets ? <Tick/> : <Cross/>}/>
                        <ListItem primaryText={x["govFees"][locale]}
                                  rightIcon={including_all_bills ? <Tick/> : <Cross/>}/>
                    </List>
                )
            case("otherInfo"):
                const {property_building_features, property_unit_features} = propertyDetail
                return (
                    <span>
                        <div>{x["facilities"][locale]}</div><br/>
                        <div style={{display: "flex", flexWrap: "wrap", width: "100%",borderBottom:"1px solid rgb(221, 223, 226)"}}>
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
                                        }}>{x[feature][locale]}</span>
                                    </div>
                                )
                            })}
                            {new Array(11).fill(<div style={{width:80}}/>)}
                        </div>
                        <div>{x["features"][locale]}</div><br/>
                        <div style={{display: "flex", flexWrap: "wrap", width: "100%",borderBottom:"1px solid rgb(221, 223, 226)"}}>
                            {Object.keys(property_unit_features).filter(x=>!x.match(/view/)).map(feature => {
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
                                        }}>{x[feature][locale]}</span>
                                    </div>
                                )
                            })}
                            {new Array(11).fill(<div style={{width:80}}/>)}
                        </div>
                        <div>{x["views"][locale]}</div><br/>
                        <div style={{display: "flex", flexWrap: "wrap", width: "100%",borderBottom:"1px solid rgb(221, 223, 226)"}}>
                            {Object.keys(property_unit_features).filter(x=>x.match(/view/)).map(feature => {
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
                                        }}>{x[feature][locale]}</span>
                                    </div>
                                )
                            })}
                            {new Array(11).fill(<div style={{width:80}}/>)}
                        </div>

                    </span>
                )
            case("location"):
                if (!this.props.propertyCoordinates) {
                    return <div>{x["unableToLocateAddress"][locale]}</div>
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
        const {propertyDetail,locale} = this.props
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
                        label={x['location'][locale]}
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
                        label={x['rentOptions'][locale]}
                        onClick={() => this.changeStuffToShow("rentInfo")}
                        backgroundColor={stuffToShow === "rentInfo" ? "#1e717f" : "#ffffff"}
                    />}
                    <FlatButton
                        style={{
                            flex: 1,
                            border: "1px solid rgb(221, 223, 226)",
                            color: stuffToShow === "otherInfo" ? "#ffffff" : "#1e717f"
                        }}
                        label={x['otherInfo'][locale]}
                        onClick={() => this.changeStuffToShow("otherInfo")}
                        backgroundColor={stuffToShow === "otherInfo" ? "#1e717f" : "#ffffff"}
                    />
                </div>
                {this.renderStuffToshow()}
            </span>
        )
    }
}
const mapStateToProps = state => ({
    locale:state.localeReducer.locale
})
export default connect(mapStateToProps)(PropertyPageStuffToShow)