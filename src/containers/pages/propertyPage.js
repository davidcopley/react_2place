import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {getPropertyDetail} from "../../actionCreators/propertiesDBActionCreators"
import emptyPropertyImagePlaceholder from "../../images/emptyPropertyImagePlaceholder.jpg"
import {FlatButton, IconButton} from "material-ui"
import Left from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Right from "material-ui/svg-icons/hardware/keyboard-arrow-right"
import Location from "material-ui/svg-icons/communication/location-on"
import propetyPageImages from "../../images/propertyPage"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const MapWithAMarker = compose(
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{lat: -34.397, lng: 150.644}}
    >
        <Marker
            position={{lat: -34.397, lng: 150.644}}
        />
    </GoogleMap>
);
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
        switch (stuffToShow) {
            case("rentInfo"):
                return "rent info"
            case("otherInfo"):
                return "other info"
            case("location"):
                return (
                    <MapWithAMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?libraries=visualization&key=AIzaSyDUey-ysXXRD1vnY2abVyxa86CKjhIa3Fw"
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `100%`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                    />
                )
            default:
                return "stuff"
        }
    }

    componentDidMount() {
        const {getPropertyDetail} = this.props
        const propertyId = this.props.match.params.propertyId
        getPropertyDetail(propertyId)
    }

    render() {
        const {currentImageIndex} = this.state
        const {propertyDetail} = this.props
        if (!propertyDetail) {
            return <div>Loading</div>
        }
        console.log(propertyDetail)
        let {building_name, building_phase_no, building_region, building_street_name} = propertyDetail
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
                <div style={{width: "100%", border: "1px solid #000000", display: "flex", flexWrap: "wrap"}}>
                    <div style={{flex: 1, height: 500, border: "1px solid #000000"}}>
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
                    <div style={{flex: 1, border: "1px solid red"}}>
                        <div style={{padding: 10, display: "flex", flexDirection: "column",justifyContent:"space-evenly",minHeight:"50%"}}>
                            <div style={{fontSize: 40, flex: 1}}>
                                {building_name}
                            </div>
                            <div style={{fontSize: 30, flex: 1}}>
                                ${unit_price} {lease_type === "rent" && <span>per month</span>}
                            </div>
                            <div style={{
                                fontSize: 20,
                                flex: 1,
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <Location/>{building_phase_no} {building_street_name},{building_region.replace(/_/g, ' ')}
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    height:"100%"
                                }}
                            >
                                <div style={{textAlign: "center"}}>
                                    <div style={{
                                        backgroundImage: `url(${propetyPageImages["size"]})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        width: 70,
                                        height: 70
                                    }}/>
                                    {net_unit_size}/{gross_unit_size} ft<sup>2</sup>
                                </div>
                                <div style={{textAlign: "center"}}>
                                    <div style={{
                                        backgroundImage: `url(${propetyPageImages["room"]})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        width: 70,
                                        height: 70
                                    }}/>
                                    {number_of_room} Rooms
                                </div>
                                <div style={{textAlign: "center"}}>
                                    <div style={{
                                        backgroundImage: `url(${propetyPageImages["bathroom"]})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        width: 70,
                                        height: 70
                                    }}/>
                                    {number_of_bathroom} Bathrooms
                                </div>
                                <div style={{textAlign: "center",textTransform:"capitalize"}}>
                                    <div style={{
                                        backgroundImage: `url(${propetyPageImages[property_type]})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        width: 70,
                                        height: 70
                                    }}/>
                                    {property_type.replace(/_/g," ")}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div style={{display:"flex",width:"100%"}}>
                    <FlatButton style={{flex:1}} label={"Location"} onClick={()=>this.changeStuffToShow("location")}/>
                    <FlatButton style={{flex:1}} label={"Rent Info"} onClick={()=>this.changeStuffToShow("rentInfo")}/>
                    <FlatButton style={{flex:1}} label={"Other Info"} onClick={()=>this.changeStuffToShow("otherInfo")}/>
                </div>
                {this.renderStuffToShow()}
            </div>
        )
    }
}
const mapStateToProps = (state, props) => ({
    propertyDetail: state.propertiesDBReducer.propertiesDetail[props.match.params.propertyId]
})
export default connect(mapStateToProps, {getPropertyDetail})(PropertyPage)