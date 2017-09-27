import React from "react"
import {compose} from "redux"
import {FlatButton} from "material-ui"
import emptyPropertyImagePlaceholder from "../../images/emptyPropertyImagePlaceholder.jpg"
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
            stuffToShow: "location"
        }
    }
    changeStuffToShow = stuffToShow => {
        this.setState({stuffToShow})
    }
    renderStuffToShow = () => {
        const {stuffToShow} = this.state
        switch (stuffToShow) {
            case("detail"):
                return "detail"
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

    render() {
        return (
            <div style={{marginTop: 10, height: 400, width: "100%", border: "1px solid #777777"}}>
                <div style={{display: "flex", width: "100%", height: "100%"}}>
                    <div style={{flex: 1, height: "100%",display:"flex",flexDirection:"column"}}>
                        <div style={{flex:1,background: "#888888",backgroundImage:`url(${emptyPropertyImagePlaceholder})`,backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}/>
                        <div style={{height:"auto"}}>
                            <div>
                                $8,323 per month
                            </div>
                            <div>
                                111/111 ft², 5 Rooms, 6 Bathrooms
                            </div>
                            <div>
                                CHEONG FAT FACTORY BUILDING FLATS A, Cheung Sha Wan
                            </div>
                        </div>
                    </div>
                    <div style={{
                        flex: 1,
                        height: "100%",
                        background: "#eeeeee",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <div style={{height: 40, display: "flex"}}>
                            <div style={{flex: 1, border: "1px solid #000000"}}>
                                <FlatButton label={"Detail"} style={{width: "100%"}}
                                            onClick={() => this.changeStuffToShow("detail")}/>
                            </div>
                            <div style={{flex: 1, border: "1px solid #000000"}}>
                                <FlatButton label={"Features"} style={{width: "100%"}}
                                            onClick={() => this.changeStuffToShow("features")}/>
                            </div>
                            <div style={{flex: 1, border: "1px solid #000000"}}>
                                <FlatButton label={"Location"} style={{width: "100%"}}
                                            onClick={() => this.changeStuffToShow("location")}/>
                            </div>
                        </div>
                        <div style={{width: "100%", flex:1}}>
                            {this.renderStuffToShow()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertyBlock