import React from "react"
import {connect} from "react-redux"
import {TextField, FlatButton, IconButton, Checkbox, DatePicker,RadioButtonGroup,RadioButton} from "material-ui"
import Remove from "material-ui/svg-icons/navigation/close"
import {propertyTypes} from "../../images/propertyPage"
import featureImages from "../../images/features"
import Dropzone from 'react-dropzone'
import {postProperty} from "../../actionCreators/propertiesDBActionCreators"
const tf2val = textfieldRef => textfieldRef.input.value
class AddPropertyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            features: {},
            propertyType: "apartment",
            forRent: false
        }
    }

    setFeature = feature => this.setState({
        features: {
            ...this.state.features,
            [feature]: !this.state.features[feature]
        }
    })
    setPropertyType = propertyType => this.setState({propertyType: propertyType})
    handleSubmit = () => {
        const {postProperty} = this.props
        console.log(this.unitLevel)
        const data = {
            "building_name": tf2val(this.buildingName),
            "building_street_name": tf2val(this.streetName),
            "building_region": tf2val(this.region),
            "building_district": tf2val(this.district),
            "property_type": this.state.propertyType,
            "short_title": tf2val(this.shortTitle),
            "remark": tf2val(this.remark),
            "unit_price": tf2val(this.salePrice),
            "rent_price": tf2val(this.rentPrice),
            "net_unit_size": tf2val(this.saleableArea),
            "gross_unit_size": tf2val(this.grossArea),
            "number_of_room": tf2val(this.numberOfRooms),
            "number_of_bathroom": tf2val(this.numberOfBathrooms),
            "lease_type":"sell",
            "unit_level":this.unitLevel.state.selected
        }
        postProperty(data)
    }

    render() {
        const {features, propertyType, forRent} = this.state

        return (
            <div style={{width: "100%", display: "flex", flexWrap: "wrap", position: "relative", top: 10}}>
                <div style={{
                    flex: 1,
                    padding: 5,
                    minWidth: 340,
                    border: "1px solid rgb(221, 223, 226)",
                    borderRadius: 3,
                }}>
                    <span>Property</span>
                    <TextField ref={x => this.buildingName = x} fullWidth hintText={"building name"}/>
                    <TextField ref={x => this.streetName = x} fullWidth hintText={"street name"}/>
                    <TextField ref={x => this.region = x} fullWidth hintText={"region"}/>
                    <TextField ref={x => this.district = x} fullWidth hintText={"district"}/>
                    <span style={{fontSize: 13}}>Property Type</span>
                    <div style={{display: "flex", justifyContent: "space-evenly", marginTop: 10, marginBottom: 10}}>
                        {Object.keys(propertyTypes).map(type => {
                            return (
                                <div key={`propertyType${type}`}
                                     style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <div
                                        onClick={() => this.setPropertyType(type)}
                                        className="clickable"
                                        style={{
                                            backgroundImage: `url(${propertyTypes[type]})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            width: 50,
                                            height: 50,
                                            filter: propertyType === type ? undefined : "opacity(15%)"
                                        }}
                                    />
                                    <span style={{fontSize: 12}}>{type.replace(/_/g, ' ')}</span>
                                </div>
                            )
                        })}
                    </div>
                    <span style={{fontSize: 13}}>Unit level</span>
                    <RadioButtonGroup defaultSelected={"middle"} ref={x=>this.unitLevel=x} name="unit_level" style={{ display: 'flex',justifyContent:"space-evenly"}}>
                        <RadioButton label="high" value={"high"} style={{width:100}}/>
                        <RadioButton label="middle" value={"middle"} style={{width:100}}/>
                        <RadioButton label="low" value={"low"} style={{width:100}}/>
                    </RadioButtonGroup>
                    <span style={{fontSize: 13}}>Description</span>
                    <TextField ref={x => this.shortTitle = x} fullWidth hintText={"short title"}/>
                    <TextField ref={x => this.remark = x} fullWidth hintText={"describe your property"}/>
                </div>
                <div style={{
                    flex: 1,
                    padding: 5,
                    minWidth: 340,
                    border: "1px solid rgb(221, 223, 226)",
                    borderRadius: 3,
                }}>
                    <span>Price & size</span><br/>
                    <span style={{fontSize: 13}}>Price</span>
                    <TextField ref={x => this.salePrice = x} fullWidth hintText={"sale price"} type={"number"}/>
                    <TextField ref={x => this.rentPrice = x} onChange={e => this.setState({forRent: !!e.target.value})}
                               fullWidth hintText={"rent price"} type={"number"}/>
                    {forRent && <span><Checkbox ref={x => this.isShortTermRental = x} label={"short term rental"}/>
                    < DatePicker ref={x => this.startDate = x} fullWidth hintText={"start date"}/>
                        <Checkbox ref={x => this.rateAndGovMgmtFees = x} label={"rate & gov mgmt fees"}/>
                        <Checkbox ref={x => this.allowPets = x} label={"owner allows pets"}/></span>
                    }
                    <span style={{fontSize: 13}}>Size</span>
                    <TextField ref={x => this.saleableArea = x} fullWidth hintText={"saleable area (ft²)"} type={"number"}/>
                    <TextField ref={x => this.grossArea = x} fullWidth hintText={"gross area (ft²)"} type={"number"}/>
                    <TextField ref={x => this.numberOfRooms = x} fullWidth hintText={"number of rooms"} type={"number"}/>
                    <TextField ref={x => this.numberOfBathrooms = x} fullWidth hintText={"number of bathrooms"} type={"number"}/>
                </div>
                <div style={{
                    flex: 1,
                    padding: 5,
                    minWidth: 340,
                    border: "1px solid rgb(221, 223, 226)",
                    borderRadius: 3,
                }}>
                    <span>Features</span>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        marginTop: 10,
                        marginBottom: 10,
                        flexWrap: "wrap"
                    }}>
                        {Object.keys(featureImages).map(feature => {
                            return (
                                <div key={`feature${feature}`} className="clickable" style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: 150,
                                    height: 100,
                                }}
                                     onClick={() => this.setFeature(feature)}
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${featureImages[feature]})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            width: 50,
                                            height: 50,
                                            filter: features[feature] ? undefined : "grayscale(100%) opacity(15%)"
                                        }}
                                    />
                                    <span style={{fontSize: 12}}>{feature.replace(/_/g, ' ')}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div style={{
                    flex: 1,
                    padding: 5,
                    minWidth: 340,
                    border: "1px solid rgb(221, 223, 226)",
                    borderRadius: 3,
                }}>
                    <span>Photos</span>
                    <FlatButton style={{fontSize: 13}} fullWidth onClick={() => this.dz.open()}>add
                        image(s)</FlatButton>
                    <Dropzone
                        ref={dz => this.dz = dz}
                        style={{
                            minHeight: 100,
                            margin: 20,
                            border: "1px solid rgb(221, 223, 226)",
                            borderRadius: 3,
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-evenly"
                        }}
                        onDrop={images => this.setState({images: [...this.state.images, ...images]})}
                        disableClick
                    >
                        {this.state.images.map((image, index) => {
                            return (
                                <div key={`image${index}`} style={{position: "relative"}}>
                                    <div
                                        className="clickable"
                                        style={{
                                            border: "1px solid rgb(221, 223, 226)", borderRadius: 3,
                                            background: "#1e717f",
                                            backgroundImage: `url(${image.preview})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            width: 160,
                                            height: 160,
                                            margin: 10
                                        }}
                                    />
                                    <IconButton
                                        style={{position: "absolute", top: 5, right: 5}}
                                        iconStyle={{background: "#cf0001", fill: "#ffffff"}}
                                        onClick={() => this.setState({images: this.state.images.filter((_, i) => i !== index)})}
                                    >
                                        <Remove/>
                                    </IconButton>
                                </div>
                            )

                        })}
                    </Dropzone>
                </div>
                <FlatButton onClick={() => this.handleSubmit()} label={"add"} fullWidth style={{marginBottom: 20}}/>
            </div>
        )
    }
}
export default connect(null, {postProperty})(AddPropertyPage)