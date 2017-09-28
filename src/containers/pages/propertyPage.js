import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {getPropertyDetail, getPropertyCoordinatesByAddress} from "../../actionCreators/propertiesDBActionCreators"
import emptyPropertyImagePlaceholder from "../../images/emptyPropertyImagePlaceholder.jpg"
import {FlatButton, IconButton, List, ListItem} from "material-ui"
import Left from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Right from "material-ui/svg-icons/hardware/keyboard-arrow-right"
import Location from "material-ui/svg-icons/communication/location-on"
import Tick from "material-ui/svg-icons/action/done"
import Cross from "material-ui/svg-icons/navigation/close"
import propertyPageImages from "../../images/propertyPage"
import featuresImages from "../../images/features"
import commaNumber from "comma-number"
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
class PropertyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stuffToShow: "location",
            currentImageIndex: 0
        }
    }

    changeImageIndex = n => {
        const {currentImageIndex} = this.state
        const {images} = this.props.propertyDetail
        if (images.length > 1) {
            this.setState({currentImageIndex: (currentImageIndex + n) % images.length})
        }
    }
    changeStuffToShow = stuffToShow => {
        this.setState({stuffToShow})
    }
    renderStuffToShow = () => {
        const {stuffToShow} = this.state
        const {propertyDetail} = this.props
        switch (stuffToShow) {
            case("rentInfo"):
                const {rental_start_time,is_short_terms_rental,allows_pets,including_all_bills} = propertyDetail
                return (
                    <List>
                        <ListItem primaryText={"rent start date"} rightIcon={<span style={{minWidth:200,textAlign:"right"}}>{rental_start_time}</span>}/>
                        <ListItem primaryText={"short term rental"} rightIcon={is_short_terms_rental?<Tick/>:<Cross/>}/>
                        <ListItem primaryText={"owner allows pets"} rightIcon={allows_pets?<Tick/>:<Cross/>}/>
                        <ListItem primaryText={"rate & gov mgmt fees"} rightIcon={including_all_bills?<Tick/>:<Cross/>}/>
                    </List>
                )
            case("otherInfo"):
                const {property_building_features,property_unit_features} = propertyDetail
                return (
                    <span>
                        {property_building_features&&<div>Property building features</div>}
                        <div style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
                            {Object.keys(property_building_features).map(feature=>{
                                return(
                                    <div style={{textAlign: "center",display:"flex",flexDirection:"column",alignItems:"center",padding:5}}>
                                        <div style={{
                                            backgroundImage: `url(${featuresImages[feature]})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            width: 70,
                                            height: 70
                                        }}/>
                                        <span style={{fontSize:12,textTransform:"capitalize"}}>{feature.replace(/_/g," ")}</span>
                                    </div>
                                )
                            })}
                        </div>
                        {property_unit_features&&<div>Property unit features</div>}
                        <div style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
                            {Object.keys(property_unit_features).map(feature=>{
                                return(
                                    <div style={{textAlign: "center",display:"flex",flexDirection:"column",alignItems:"center",padding:5}}>
                                        <div style={{
                                            backgroundImage: `url(${featuresImages[feature]})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            width: 70,
                                            height: 70
                                        }}/>
                                        <span style={{fontSize:12,textTransform:"capitalize"}}>{feature.replace(/_/g," ")}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </span>
                )
            case("location"):
                if(!this.props.propertyCoordinates){
                    return <div>Unable to locate address.</div>
                }
                return (
                    <MapWithAMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?libraries=visualization&key=AIzaSyDUey-ysXXRD1vnY2abVyxa86CKjhIa3Fw"
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `100%`,width:"100%"}}/>}
                        mapElement={<div style={{height: `100%`,width:"100%"}}/>}
                        propertyCoordinates={this.props.propertyCoordinates}
                    />
                )
            default:
                return "stuff"
        }
    }

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
        const {currentImageIndex,stuffToShow} = this.state
        const {propertyDetail} = this.props
        if (!propertyDetail) {
            return <div>Loading</div>
        }
        console.log(propertyDetail)
        let {building_name, building_phase_no, building_region, building_street_name} = propertyDetail
        const {short_title,remark} = propertyDetail
        const {images} = propertyDetail
        const {lease_type, net_unit_size, gross_unit_size, number_of_room, number_of_bathroom, unit_price, property_type} = propertyDetail
        const imageUrls = images.map(image => image.image_path)
        const currentImage = imageUrls[currentImageIndex]
        if (building_name.match(this.urlRegex)[0].length > 0) {
            building_name = <a href={building_name.match(this.urlRegex)[0]}>Link</a>
        }
        if (building_street_name.match(this.urlRegex)[0].length > 0) {
            building_street_name = <a href={building_street_name.match(this.urlRegex)}>Link</a>
        }
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div style={{width: "100%",display: "flex", flexWrap: "wrap"}}>
                    <div style={{flex: 1, height: 500, minWidth:300,border: "1px solid rgb(221, 223, 226)", borderRadius:3,}}>
                        <div style={{
                            flex: 1,
                            flexShrink: 0,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <div style={{
                                flex: 1,
                                background: "#888888",
                                backgroundImage: `url(${currentImage || emptyPropertyImagePlaceholder})`,
                                backgroundPosition: "center",
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                position: "relative"
                            }}>
                                {images.length > 1 &&
                                <span>
                            <IconButton onClick={() => this.changeImageIndex(-1)}
                                        style={{position: "absolute", left: 0, top: "40%"}} iconStyle={{fill: "white"}}><Left/></IconButton>
                            <IconButton onClick={() => this.changeImageIndex(1)}
                                        style={{position: "absolute", right: 0, top: "40%"}}
                                        iconStyle={{fill: "white"}}><Right/></IconButton>
                            </span>}
                            </div>
                            <div style={{
                                height: "auto",
                                width: "100%",
                                display: "flex",
                                overflow: "scroll",
                                justifyContent: "space-evenly"
                            }}>
                                {imageUrls.map((imageUrl, index) =>
                                    <div
                                        className="clickable"
                                        style={{
                                            backgroundImage: `url(${imageUrl})`,
                                            height: 60,
                                            minWidth: 100,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            border: currentImageIndex === index ? "1px solid red" : "1px solid #ffffff"
                                        }}
                                        onClick={() => this.changeImageIndex(index - currentImageIndex)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div style={{flex: 1,border: "1px solid rgb(221, 223, 226)", borderRadius:3,}}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            minHeight: "50%",
                            height:"100%"
                        }}>
                            <div style={{padding:10}}>
                                <div style={{fontSize: 40,paddingTop:10}}>
                                    {short_title}
                                </div>
                                <div style={{fontSize: 30,paddingTop:10}}>
                                    ${commaNumber(unit_price)} {lease_type === "rent" && <span>per month</span>}
                                </div>
                                <div style={{fontSize: 25,paddingTop:10}}>
                                    {building_name}
                                </div>
                                <div style={{
                                    fontSize: 18,
                                    display: "flex",
                                    alignItems: "center",
                                    paddingTop:10,
                                }}>
                                    <Location/>{building_phase_no}<br/>{building_street_name}<br/>{building_region.replace(/_/g, ' ')}<br/>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    borderBottom:"1px solid rgb(221, 223, 226)"
                                }}
                            >
                                <div style={{textAlign: "center",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    <div style={{
                                        backgroundImage: `url(${propertyPageImages["size"]})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        width: 70,
                                        height: 70,
                                    }}/>
                                    <span style={{fontSize:12}}>{net_unit_size}/{gross_unit_size} ft<sup>2</sup></span>
                                </div>
                                <div style={{textAlign: "center",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    <div style={{
                                        backgroundImage: `url(${propertyPageImages["room"]})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        width: 70,
                                        height: 70
                                    }}/>
                                    <span style={{fontSize:12}}>{number_of_room} Rooms</span>
                                </div>
                                <div style={{textAlign: "center",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    <div style={{
                                        backgroundImage: `url(${propertyPageImages["bathroom"]})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        width: 70,
                                        height: 70
                                    }}/>
                                    <span style={{fontSize:12}}>{number_of_bathroom} Bathrooms</span>
                                </div>
                                <div style={{textAlign: "center",display:"flex",flexDirection:"column",alignItems:"center",textTransform:"capitalize"}}>
                                    <div style={{
                                        backgroundImage: `url(${propertyPageImages[property_type]})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        width: 70,
                                        height: 70
                                    }}/>
                                    <span style={{fontSize:12}}>{property_type.replace(/_/g, " ")}</span>
                                </div>
                            </div>
                            <div style={{padding:10}}>
                                {remark}
                            </div>
                        </div>
                    </div>

                </div>
                <div style={{display: "flex", width: "100%"}}>
                    <FlatButton
                        style={{flex: 1,border:"1px solid rgb(221, 223, 226)",color:stuffToShow==="location"?"#ffffff":"#1e717f"}}
                        label={"Location"}
                        onClick={() => this.changeStuffToShow("location")}
                        backgroundColor={stuffToShow==="location"?"#1e717f":"#ffffff"}
                    />
                    {lease_type === "rent" &&
                    <FlatButton
                        style={{flex: 1,border:"1px solid rgb(221, 223, 226)",color:stuffToShow==="rentInfo"?"#ffffff":"#1e717f"}}
                        label={"Rent Info"}
                        onClick={() => this.changeStuffToShow("rentInfo")}
                        backgroundColor={stuffToShow==="rentInfo"?"#1e717f":"#ffffff"}
                    />}
                    <FlatButton
                        style={{flex: 1,border:"1px solid rgb(221, 223, 226)",color:stuffToShow==="otherInfo"?"#ffffff":"#1e717f"}}
                        label={"Other Info"}
                        onClick={() => this.changeStuffToShow("otherInfo")}
                        backgroundColor={stuffToShow==="otherInfo"?"#1e717f":"#ffffff"}
                    />
                </div>
                {this.renderStuffToShow()}
            </div>
        )
    }
}
const mapStateToProps = (state, props) => ({
    propertyDetail: state.propertiesDBReducer.propertiesDetail[props.match.params.propertyId],
    propertyCoordinates: state.propertiesDBReducer.propertiesCoordinates[props.match.params.propertyId]
})
export default connect(mapStateToProps, {getPropertyDetail, getPropertyCoordinatesByAddress})(PropertyPage)