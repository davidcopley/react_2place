import React from "react"
import {connect} from "react-redux"
import {push} from "react-router-redux"
import {Chip, IconButton} from "material-ui"
import Left from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Right from "material-ui/svg-icons/hardware/keyboard-arrow-right"
import emptyPropertyImagePlaceholder from "../../images/emptyPropertyImagePlaceholder.jpg"
import commaNumber from "comma-number"

class PropertyBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stuffToShow: "detail",
            currentImageIndex: 0
        }
    }

    changeImageIndex = n => {
        const {currentImageIndex} = this.state
        const {images} = this.props.propertyBasic
        if (images.length > 1) {
            this.setState({currentImageIndex: (currentImageIndex + n) % images.length})
        }
    }
    urlRegex = /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi;

    render() {
        const {propertyBasic,property_id,push} = this.props
        const {currentImageIndex} = this.state
        let {building_name, building_phase_no, building_region, building_street_name} = propertyBasic
        const {images} = propertyBasic
        const {lease_type, net_unit_size, gross_unit_size, number_of_room, number_of_bathroom, unit_price} = propertyBasic
        const imageUrls = images.map(image => image.image_path)
        const currentImage = imageUrls[currentImageIndex]
        const buildingNameMatchUrl = building_name.match(this.urlRegex)
        const buildingStreetNameMatchUrl = building_street_name.match(this.urlRegex)
        if (buildingNameMatchUrl && buildingNameMatchUrl[0].length>0) {
            building_name = <a href={buildingNameMatchUrl[0]}>Link</a>
        }
        if (buildingStreetNameMatchUrl&&buildingStreetNameMatchUrl[0].length>0) {
            building_street_name = <a href={buildingStreetNameMatchUrl[0]}>Link</a>
        }
        return (
            <div style={{
                marginTop: 10,
                height: 300,
                width: 300,
                maxWidth: 300,
                border: "1px solid rgb(221, 223, 226)",
                position: "relative",
                borderRadius:3
            }}>
                <Chip style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    height: 20,
                    display: "flex",
                    alignItems: "center"
                }} labelStyle={{color:"#1e717f",}}>{lease_type}</Chip>
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
                            background: "#1e717f",
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
                        <div style={{height: "auto"}} className="clickable" onClick={()=>push(`/propertyPage/${property_id}`)}>
                            <div style={{padding: 5, textOverflow: "ellipsis", overflow: "hidden", maxWidth: 300}}>
                                ${commaNumber(unit_price)} {lease_type === "rent" && <span>per month</span>}
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

export default connect(mapStateToProps, {push})(PropertyBlock)