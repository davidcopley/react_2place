import React from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {Chip, IconButton} from "material-ui"
import Left from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Right from "material-ui/svg-icons/hardware/keyboard-arrow-right"
import emptyPropertyImagePlaceholder from "../../images/emptyPropertyImagePlaceholder.jpg"
import {getPropertyDetail} from "../../actionCreators/propertiesDBActionCreators"
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

class PropertyBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stuffToShow: "detail",
            currentImageIndex: 0
        }
    }

    changeStuffToShow = stuffToShow => {
        this.setState({stuffToShow})
    }
    changeImageIndex = n => {
        const {currentImageIndex} = this.state
        const {images} = this.props.propertyBasic
        if (images.length > 1) {
            this.setState({currentImageIndex: (currentImageIndex + n) % images.length})
        }
    }
    renderStuffToShow = () => {
        const {stuffToShow} = this.state
        const {short_title} = this.props.propertyBasic
        switch (stuffToShow) {
            case("detail"):
                return (
                    short_title
                )
            case("features"):
                return "features"
            case("location"):
                return (
                    <MapWithAMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `100%`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                    />
                )
            default:
                return "stuff"
        }
    }
    urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

    render() {
        const {propertyBasic,property_id,getPropertyDetail} = this.props
        const {currentImageIndex} = this.state
        let {building_name, building_phase_no, building_region, building_street_name} = propertyBasic
        const {images} = propertyBasic
        const {lease_type, net_unit_size, gross_unit_size, number_of_room, number_of_bathroom, unit_price} = propertyBasic
        const imageUrls = images.map(image => image.image_path)
        const currentImage = imageUrls[currentImageIndex]
        if (building_name.match(this.urlRegex)) {
            building_name = <a href={building_name.match(this.urlRegex)[0]}>Link</a>
        }
        if (building_street_name.match(this.urlRegex)) {
            building_street_name = <a href={building_street_name.match(this.urlRegex)}>Link</a>
        }
        return (
            <div style={{
                marginTop: 10,
                height: 300,
                width: 300,
                maxWidth: 300,
                border: "1px solid #777777",
                position: "relative"
            }}>
                <Chip style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    height: 20,
                    display: "flex",
                    alignItems: "center"
                }}>{lease_type}</Chip>
                <div style={{display: "flex", width: "100%", height: "100%"}}>
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
                        <div style={{height: "auto"}} className="clickable" onClick={()=>getPropertyDetail(property_id)}>
                            <div style={{padding: 5, textOverflow: "ellipsis", overflow: "hidden", maxWidth: 300}}>
                                ${unit_price} {lease_type === "rent" && <span>per month</span>}
                            </div>
                            <div style={{
                                padding: 5,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                maxWidth: 300,
                                fontSize: 12
                            }}>
                                {net_unit_size}/{gross_unit_size} ft², {number_of_room} Rooms, {number_of_bathroom}
                                Bathrooms
                            </div>
                            <div style={{
                                padding: 5,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                maxWidth: 300,
                                fontSize: 12
                            }}>
                                {building_name} {building_phase_no},{building_street_name},{building_region.replace(/_/g, ' ')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    propertyBasic: state.propertiesDBReducer.propertiesBasic[props.property_id]
})

export default connect(mapStateToProps, {getPropertyDetail})(PropertyBlock)