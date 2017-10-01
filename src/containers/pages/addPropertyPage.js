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
import {postProperty,postPropertyImages} from "../../actionCreators/propertiesDBActionCreators"
import {getBuildingAddressAutocompletes,getBuildingById} from "../../actionCreators/autocompleteActionCreators"
import {regions} from "../../constants/districts"
import x from "../../constants/locale"
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
            district: "",
            errors:{}
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
        this.buildingName.refs.searchTextField.input.value = buildingName
        this.streetName.input.value = buildingStreetName
    }
    handleSubmit = () => {
        const {postProperty} = this.props
        const {region, district,forRent,images} = this.state
        const property_unit_features = Object.keys(this.state.features).filter(key=>this.state.features[key]).join()
        const property_building_features = Object.keys(this.state.facilities).filter(key=>this.state.facilities[key]).join()
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
            "unit_level": this.unitLevel.state.selected,
            "property_unit_features":property_unit_features,
            "property_building_features":property_building_features
        }
        if(!tf2val(this.salePrice)&&!tf2val(this.rentPrice)){
            postProperty(data).then(res=>{
                const {postPropertyImages} = this.props
                const newPropertyId = parseInt(res.headers.location.split('/').slice(-1)[0])
                postPropertyImages(newPropertyId,this.state.images)
            }).catch(err=>{
                this.setState({errors:err.response.data.errors})
            })
            return
        }

        if(tf2val(this.salePrice)){
            const sellAttr = {
                "unit_price":tf2val(this.salePrice),
                "lease_type":"sell"
            }
            const sellData = Object.assign({},data,sellAttr)
            postProperty(sellData).then(res=>{
                const {postPropertyImages} = this.props
                const newPropertyId = parseInt(res.headers.location.split('/').slice(-1)[0])
                postPropertyImages(newPropertyId,this.state.images)
            }).catch(err=>{
                this.setState({errors:err.response.data.errors})
            })

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
            postProperty(rentData).then(res=>{
                const {postPropertyImages} = this.props
                const newPropertyId = parseInt(res.headers.location.split('/').slice(-1)[0])
                postPropertyImages(newPropertyId,this.state.images)
            }).catch(err=>{
                this.setState({errors:err.response.data.errors})
            })
        }
    }
    dataSourceConfig = {
        text: 'address',
        value: 'id',
    };

    render() {
        const {features,facilities, propertyType, forRent, dataSource, region, district, errors} = this.state
        const {locale} = this.props
        const y = key => key&&x["errors"][key]&&x["errors"][key][locale]
        return (
            <div style={{width: "100%", display: "flex", flexWrap: "wrap", position: "relative", top: 10}}>
                <div style={{
                    flex: 1,
                    padding: 5,
                    minWidth: 340,
                    border: "1px solid rgb(221, 223, 226)",
                    borderRadius: 3,
                }}>
                    <span>{x["property"][locale]}</span>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["building_name"][locale]}</span>
                        <AutoComplete
                            name="buildingName"
                            dataSourceConfig={this.dataSourceConfig}
                            filter={AutoComplete.noFilter}
                            ref={x => this.buildingName = x}
                            fullWidth
                            onUpdateInput={value => this.handleBuildingNameChange(value)}
                            onNewRequest={value => this.handleBuildingNameSelect(value)}
                            dataSource={dataSource}
                            openOnFocus
                            listStyle={{zIndex: 10}}
                            style={{zIndex: 1}}
                            menuStyle={{zIndex: 10}}
                            errorText={y(errors["building_name"])}
                        />
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["street_name"][locale]}</span>
                        <TextField name={"streetName"} key='streetName' ref={x => this.streetName = x} fullWidth errorText={y(errors['building_street_name'])}/>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["region"][locale]}</span>
                        <DropDownMenu value={region} onChange={(x, y, v) => this.setState({region: v, district: ""})}
                                      style={{width: "100%"}} menuStyle={{width: "100%"}} listStyle={{width: "100%"}}>
                            {Object.keys(regions).map(region =>
                                <MenuItem key={`region${region}`} primaryText={x[region][locale]} value={region}/>
                            )}
                        </DropDownMenu>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x['district'][locale]}</span>
                        <DropDownMenu maxHeight={300} value={district} underlineStyle={{borderBottom:errors['building_district']?"1px solid red":undefined}}
                                      onChange={(x, y, v) => this.setState({district: v})} style={{width: "100%"}}
                                      menuStyle={{width: "100%"}} listStyle={{width: "100%"}}>
                            {Object.keys(regions[region]).map(district =>
                                <MenuItem key={`district${district}`} primaryText={x[district][locale]} value={district}/>
                            )}
                        </DropDownMenu>
                    </div>
                    <div style={{display:"flex"}}>
                        <span style={{fontSize: 13}}>{x['PropertyType'][locale]}</span>
                        <div style={{display: "flex", justifyContent: "space-evenly", marginTop: 10, marginBottom: 10, width:"100%",flex:1}}>
                            {Object.keys(propertyTypes).map(type => {
                                return (
                                    <div key={`propertyType${type}`}
                                         style={{display: "flex", flexDirection: "column", alignItems: "center",flex:1}}>
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
                                        <span style={{fontSize: 12}}>{x[type][locale]}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div style={{display:"flex",width:"100%"}}>
                        <span style={{fontSize: 13,minWidth:100}}>{x["unit_level"][locale]}</span>
                        <RadioButtonGroup defaultSelected={"middle"} ref={x => this.unitLevel = x} name="unit_level"
                                          style={{display: 'flex', justifyContent: "space-evenly",flex:1}}>
                            <RadioButton labelStyle={{fontSize:13}} label={x["high"][locale]} value={"high"} style={{width: 100}}/>
                            <RadioButton labelStyle={{fontSize:13}} label={x["middle"][locale]} value={"middle"} style={{width: 100}}/>
                            <RadioButton labelStyle={{fontSize:13}} label={x["low"][locale]} value={"low"} style={{width: 100}}/>
                        </RadioButtonGroup>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["short_title"][locale]}</span>
                        <TextField name={"shortTitle"} key="shortTitle" ref={x => this.shortTitle = x} fullWidth errorText={y(errors['short_title'])}/>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["Description"][locale]}</span>
                        <TextField name={"remark"} key="remark" ref={x => this.remark = x} fullWidth/>
                    </div>
                </div>
                <div style={{
                    flex: 1,
                    padding: 5,
                    minWidth: 340,
                    border: "1px solid rgb(221, 223, 226)",
                    borderRadius: 3,
                }}>
                    <span>{x["PriceSize"][locale]}</span><br/>
                    <span style={{fontSize: 13}}>{x["Price"][locale]}</span>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["salePrice"][locale]}</span>
                        <TextField name={"salePrice"} min={0} key="salePrice" ref={x => this.salePrice = x} fullWidth type={"number"} errorText={y(errors['unit_price'])}/>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["rentPrice"][locale]}</span>
                        <TextField name={"rentPrice"} min={0} key='rentPrice' ref={x => this.rentPrice = x} errorText={y(errors['unit_price'])}
                                   onChange={e => this.setState({forRent: !!e.target.value})}
                                   fullWidth type={"number"}/></div>
                    {forRent &&
                    <span>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 200}}>{x['shortTermRental'][locale]}</span>
                            <Checkbox ref={x => this.isShortTermRental = x}/>
                        </div>
                        <DatePicker ref={x => this.startDate = x} fullWidth hintText={x['rentStartDate'][locale]}/>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 200}}>{x['govFees'][locale]}</span>
                            <Checkbox ref={x => this.rateAndGovMgmtFees = x}/>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 200}}>{x['allowPets'][locale]}</span>
                            <Checkbox ref={x => this.allowPets = x}/>
                        </div>
                    </span>
                    }
                    <span style={{fontSize: 13}}>{x['Size'][locale]}</span>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["saleableArea"][locale]}</span>
                        <TextField name={"saleableArea"} min={0} key="saleableArea" ref={x => this.saleableArea = x} fullWidth errorText={y(errors['net_unit_size'])}
                                   type={"number"}/></div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["grossArea"][locale]}</span>
                        <TextField name={"grossArea"} min={0} key="grossArea" ref={x => this.grossArea = x} fullWidth type={"number"} errorText={y(errors['gross_unit_size'])}/></div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["numberOfRoom"][locale]}</span>
                        <TextField name={"numberOfRooms"} min={0} key="numberOfRooms" ref={x => this.numberOfRooms = x} fullWidth errorText={y(errors['number_of_room'])}
                                   type={"number"}/></div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["numberOfBathRoom"][locale]}</span>
                        <TextField name={"numberOfBathrooms"} min={0} key="numberOfBathrooms" ref={x => this.numberOfBathrooms = x} fullWidth errorText={y(errors['number_of_bathroom'])}
                                   type={"number"}/></div>
                </div>
                <div style={{
                    flex: 1,
                    padding: 5,
                    minWidth: 340,
                    border: "1px solid rgb(221, 223, 226)",
                    borderRadius: 3,
                }}>
                    <span style={{fontSize:13}}>{x['facilities'][locale]}</span>
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
                                    <span style={{fontSize: 12}}>{x[feature][locale]}</span>
                                </div>
                            )
                        })}
                        {new Array(2).fill(<div style={{width:150}}/>)}
                    </div>
                    <span style={{fontSize:13}}>{x['features'][locale]}</span>
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
                                    <span style={{fontSize: 12}}>{x[facility][locale]}</span>
                                </div>
                            )
                        })}
                        {new Array(2).fill(<div style={{width:150}}/>)}
                    </div>
                    <span style={{fontSize:13}}>{x['views'][locale]}</span>
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
                                    <span style={{fontSize: 12}}>{x[feature][locale]}</span>
                                </div>
                            )
                        })}
                        {new Array(2).fill(<div style={{width:150}}/>)}
                    </div>
                </div>
                <div style={{
                    flex: 1,
                    padding: 5,
                    minWidth: 340,
                    border: "1px solid rgb(221, 223, 226)",
                    borderRadius: 3,
                }}>
                    <span>{x['Photo'][locale]}</span>
                    <FlatButton style={{fontSize: 13}} fullWidth onClick={() => this.dz.open()}>{x['addImages'][locale]}</FlatButton>
                    <Dropzone
                        accept={'image/*'}
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
                                            margin: 5
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
                        <div style={{width:170}}/>
                    </Dropzone>
                </div>
                <FlatButton onClick={() => this.handleSubmit()} label={x['addProperty'][locale]} fullWidth style={{marginBottom: 20}}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    propertyDetail: state.propertiesDBReducer.propertiesDetail[props.match.params.propertyId],
    locale:state.localeReducer.locale
})
export default connect(mapStateToProps, {postProperty, getBuildingAddressAutocompletes,getBuildingById,postPropertyImages})(AddPropertyPage)