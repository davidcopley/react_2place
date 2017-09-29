import React from "react"
import {connect} from "react-redux"
import {
    TextField,
    FlatButton,
    IconButton,
    Checkbox,
    DatePicker,
    RadioButtonGroup,
    RadioButton,
    AutoComplete,
    DropDownMenu,
    MenuItem
} from "material-ui"
import Remove from "material-ui/svg-icons/navigation/close"
import {propertyTypes} from "../../images/propertyPage"
import featureImages,{building_features,building_facilities,views} from "../../images/features"
import Dropzone from 'react-dropzone'
import {postProperty} from "../../actionCreators/propertiesDBActionCreators"
import {getBuildingAddressAutocompletes,getBuildingById} from "../../actionCreators/autocompleteActionCreators"
import {regions} from "../../constants/districts"
const tf2val = textfieldRef => textfieldRef.input.value
class AddPropertyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            features: {},
            facilities: {},
            propertyType: "apartment",
            forRent: false,
            dataSource: [],
            region: "Hong_Kong_Island",
            district: ""
        }
    }

    setFeature = feature => this.setState({
        features: {
            ...this.state.features,
            [feature]: !this.state.features[feature]
        }
    })
    setFacilities = facility => this.setState({
        facilities:{
            ...this.state.facilities,
            [facility]: !this.state.facilities[facility]
        }
    })
    setPropertyType = propertyType => this.setState({propertyType: propertyType})
    handleBuildingNameChange = value => {
        const {getBuildingAddressAutocompletes} = this.props
        getBuildingAddressAutocompletes(value)
            .then(res => {
                this.setState({dataSource: res})
            })
    }
    handleBuildingNameSelect = value => {
        const {getBuildingById} = this.props
        getBuildingById(value.id)
            .then(res=>{
                console.log(res)
                const {building_district,building_region} = res
                this.setState({district:building_district.toLowerCase(),region:building_region})
            })
        let buildingName, buildingStreetName
        [buildingName, buildingStreetName] = value.address.split(",")
        console.log(this.buildingName)
        this.buildingName.refs.searchTextField.input.value = buildingName
        this.streetName.input.value = buildingStreetName
    }
    handleSubmit = () => {
        const {postProperty} = this.props
        const {region, district,forRent} = this.state
        const data = {
            "building_name": this.buildingName.refs.searchTextField.input.value,
            "building_street_name": tf2val(this.streetName),
            "building_region": region,
            "building_district": district,
            "property_type": this.state.propertyType,
            "short_title": tf2val(this.shortTitle),
            "remark": tf2val(this.remark),
            "net_unit_size": tf2val(this.saleableArea),
            "gross_unit_size": tf2val(this.grossArea),
            "number_of_room": tf2val(this.numberOfRooms),
            "number_of_bathroom": tf2val(this.numberOfBathrooms),
            "unit_level": this.unitLevel.state.selected
        }


        if(tf2val(this.salePrice)){
            const sellAttr = {
                "unit_price":tf2val(this.salePrice),
                "lease_type":"sell"
            }
            const sellData = Object.assign({},data,sellAttr)
            postProperty(sellData)

        }
        if(forRent){
            const rentAttr = {
                "unit_price":tf2val(this.rentPrice),
                "lease_type":"rent",
                "rental_start_time":this.startDate.refs.input.input.value,
                "is_short_terms_rental":this.isShortTermRental.state.switched?"1":"0",
                "allows_pets":this.allowPets.state.switched?"1":"0",
                "including_all_bills":this.allowPets.state.switched?"1":"0"
            }
            const rentData = Object.assign({},data,rentAttr)
            postProperty(rentData)
        }
    }
    dataSourceConfig = {
        text: 'address',
        value: 'id',
    };

    render() {
        const {features,facilities, propertyType, forRent, dataSource, region, district} = this.state
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
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>Building name</span>
                        <AutoComplete
                            dataSourceConfig={this.dataSourceConfig}
                            filter={AutoComplete.noFilter}
                            ref={x => this.buildingName = x}
                            fullWidth
                            onUpdateInput={value => this.handleBuildingNameChange(value)}
                            onNewRequest={value => this.handleBuildingNameSelect(value)}
                            dataSource={dataSource}
                            openOnFocus
                            listStyle={{zIndex: 10}}
                            style={{zIndex: 10}}
                            menuStyle={{zIndex: 10}}
                        />
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>Street name</span>
                        <TextField key='streetName' ref={x => this.streetName = x} fullWidth/>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>Region</span>
                        <DropDownMenu value={region} onChange={(x, y, v) => this.setState({region: v, district: ""})}
                                      style={{width: "100%"}} menuStyle={{width: "100%"}} listStyle={{width: "100%"}}>
                            {Object.keys(regions).map(region =>
                                <MenuItem key={`region${region}`} primaryText={region} value={region}/>
                            )}
                        </DropDownMenu>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>District</span>
                        <DropDownMenu maxHeight={300} value={district}
                                      onChange={(x, y, v) => this.setState({district: v})} style={{width: "100%"}}
                                      menuStyle={{width: "100%"}} listStyle={{width: "100%"}}>
                            {Object.keys(regions[region]).map(district =>
                                <MenuItem key={`district${district}`} primaryText={district} value={district}/>
                            )}
                        </DropDownMenu>
                    </div>
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
                    <RadioButtonGroup defaultSelected={"middle"} ref={x => this.unitLevel = x} name="unit_level"
                                      style={{display: 'flex', justifyContent: "space-evenly"}}>
                        <RadioButton labelStyle={{fontSize:13}} label="high" value={"high"} style={{width: 100}}/>
                        <RadioButton labelStyle={{fontSize:13}} label="middle" value={"middle"} style={{width: 100}}/>
                        <RadioButton labelStyle={{fontSize:13}} label="low" value={"low"} style={{width: 100}}/>
                    </RadioButtonGroup>
                    <span style={{fontSize: 13}}>Description</span>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>Short title</span>
                        <TextField key="shortTitle" ref={x => this.shortTitle = x} fullWidth/>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>Description</span>
                        <TextField key="remark" ref={x => this.remark = x} fullWidth/>
                    </div>
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
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>Sale price</span>
                        <TextField key="salePrice" ref={x => this.salePrice = x} fullWidth type={"number"}/>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>Rent price</span>
                        <TextField key='rentPrice' ref={x => this.rentPrice = x}
                                   onChange={e => this.setState({forRent: !!e.target.value})}
                                   fullWidth type={"number"}/></div>
                    {forRent &&
                    <span>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 200}}>short term rental</span>
                            <Checkbox ref={x => this.isShortTermRental = x}/>
                        </div>
                        <DatePicker ref={x => this.startDate = x} fullWidth hintText={"start date"}/>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 200}}>rate & gov mgmt fees</span>
                            <Checkbox ref={x => this.rateAndGovMgmtFees = x}/>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 200}}>owner allows pets</span>
                            <Checkbox ref={x => this.allowPets = x}/>
                        </div>
                    </span>
                    }
                    <span style={{fontSize: 13}}>Size</span>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>Saleable area (ft²)</span>
                        <TextField key="saleableArea" ref={x => this.saleableArea = x} fullWidth
                                   type={"number"}/></div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>Gross area (ft²)</span>
                        <TextField key="grossArea" ref={x => this.grossArea = x} fullWidth type={"number"}/></div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>Number of rooms</span>
                        <TextField key="numberOfRooms" ref={x => this.numberOfRooms = x} fullWidth
                                   type={"number"}/></div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>Number of bathrooms</span>
                        <TextField key="numberOfBathrooms" ref={x => this.numberOfBathrooms = x} fullWidth
                                   type={"number"}/></div>
                </div>
                <div style={{
                    flex: 1,
                    padding: 5,
                    minWidth: 340,
                    border: "1px solid rgb(221, 223, 226)",
                    borderRadius: 3,
                }}>
                    <span>Features</span><br/>
                    <span style={{fontSize:13}}>Building features</span>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        marginTop: 10,
                        marginBottom: 10,
                        flexWrap: "wrap"
                    }}>
                        {Object.keys(building_features).map(feature => {
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
                    <span style={{fontSize:13}}>Facilities</span>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        marginTop: 10,
                        marginBottom: 10,
                        flexWrap: "wrap"
                    }}>
                        {Object.keys(building_facilities).map(facility => {
                            return (
                                <div key={`feature${facility}`} className="clickable" style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: 150,
                                    height: 100,
                                }}
                                     onClick={() => this.setFacilities(facility)}
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${building_facilities[facility]})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            width: 50,
                                            height: 50,
                                            filter: facilities[facility] ? undefined : "grayscale(100%) opacity(15%)"
                                        }}
                                    />
                                    <span style={{fontSize: 12}}>{facility.replace(/_/g, ' ')}</span>
                                </div>
                            )
                        })}
                    </div>
                    <span style={{fontSize:13}}>Views</span>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        marginTop: 10,
                        marginBottom: 10,
                        flexWrap: "wrap"
                    }}>
                        {Object.keys(views).map(feature => {
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
export default connect(null, {postProperty, getBuildingAddressAutocompletes,getBuildingById})(AddPropertyPage)