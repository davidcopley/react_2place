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
import Tick from "material-ui/svg-icons/action/done"
import {propertyTypes} from "../../images/propertyPage"
import featureImages,{building_features,building_facilities,views} from "../../images/features"
import Dropzone from 'react-dropzone'
import {putProperty,postPropertyImages,getPropertyDetail} from "../../actionCreators/propertiesDBActionCreators"
import {getBuildingAddressAutocompletes,getBuildingById} from "../../actionCreators/autocompleteActionCreators"
import {regions} from "../../constants/districts"
import x from "../../constants/locale"
const tf2val = textfieldRef => textfieldRef.input.value
class EditPropertyPage extends React.Component {
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
            oldImages:[],
            imagesToDelete:{}
        }
    }

    componentDidMount(){
        const {propertyDetail,getPropertyDetail} = this.props
        if(!propertyDetail){
            getPropertyDetail(this.props.match.params.propertyId)
                .then(res=>{
                    this.mapPropertyDetailToForm(res)
                })
        }else{
            this.mapPropertyDetailToForm(propertyDetail)
        }
    }

    mapPropertyDetailToForm = propertyDetail => {
        const{
            building_district,
            building_name,
            building_region,
            building_street_name,
            gross_unit_size,
            images,
            lease_type,
            net_unit_size,
            number_of_bathroom,
            number_of_room,
            property_building_features,
            property_unit_features,
            property_type,
            remark,
            short_title,
            unit_level,
            unit_price
        } = propertyDetail
        let facilities = {}
        Object.keys(property_building_features).forEach(facility=>{
            facilities[facility] = true
        })
        let features = {}
        Object.keys(property_unit_features).forEach(feature=>{
            features[feature] = true
        })
        this.setState({
            district:building_district,
            region:building_region,
            features,
            facilities,
            forRent:lease_type==="rent",
            propertyType:property_type,
            oldImages:images
        })
        this.buildingName.refs.searchTextField.input.value = building_name
        this.streetName.input.value = building_street_name
        this.grossArea.input.value = gross_unit_size
        this.saleableArea.input.value = net_unit_size
        this.numberOfBathrooms.input.value = number_of_bathroom
        this.numberOfRooms.input.value = number_of_room
        this.remark.input.value = remark
        this.shortTitle.input.value = short_title
        this.unitLevel.state.selected = unit_level
        if(lease_type === "rent"){
            this.rentPrice.input.value = unit_price
            this.salePrice.input.disabled = true
        }else{
            this.salePrice.input.value = unit_price
            this.rentPrice.input.disabled = true
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
                const {building_district,building_region} = res
                this.setState({district:building_district.toLowerCase(),region:building_region})
            })
        let buildingName, buildingStreetName
        [buildingName, buildingStreetName] = value.address.split(",")
        this.buildingName.refs.searchTextField.input.value = buildingName
        this.streetName.input.value = buildingStreetName
    }
    handleSubmit = () => {
        const {putProperty,propertyDetail,postPropertyImages} = this.props
        const {property_id} = propertyDetail
        const {region, district,forRent,images,imagesToDelete} = this.state
        const property_unit_features = Object.keys(this.state.features).filter(key=>this.state.features[key]).join()
        const property_building_features = Object.keys(this.state.facilities).filter(key=>this.state.facilities[key]).join()
        console.log(Object.keys(imagesToDelete).filter(i=>imagesToDelete[i]).join())
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
            "property_building_features":property_building_features,

        }
        if(Object.keys(imagesToDelete).length>0){
            data["delete_images"] = Object.keys(imagesToDelete).filter(i=>imagesToDelete[i]).join()
        }
        if(tf2val(this.salePrice)){
            const sellAttr = {
                "unit_price":tf2val(this.salePrice),
                "lease_type":"sell"
            }
            const sellData = Object.assign({},data,sellAttr)
            putProperty(property_id,sellData).then(res=>{
                if(images.length>0){
                    postPropertyImages(property_id,images)
                }
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
            putProperty(property_id,rentData).then(res=>{
                if(images.length>0){
                    postPropertyImages(property_id,images)
                }
            })
        }
    }
    dataSourceConfig = {
        text: 'address',
        value: 'id',
    };

    render() {
        const {features,facilities, propertyType, forRent, dataSource, region, district} = this.state
        const {locale} = this.props
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
                            style={{zIndex: 10}}
                            menuStyle={{zIndex: 10}}
                        />
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["street_name"][locale]}</span>
                        <TextField name={"streetName"} key='streetName' ref={x => this.streetName = x} fullWidth/>
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
                        <DropDownMenu maxHeight={300} value={district}
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
                        <TextField name={"shortTitle"} key="shortTitle" ref={x => this.shortTitle = x} fullWidth/>
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
                        <TextField name={"salePrice"} min={0} key="salePrice" ref={x => this.salePrice = x} fullWidth type={"number"}/>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["rentPrice"][locale]}</span>
                        <TextField name={"rentPrice"} min={0} key='rentPrice' ref={x => this.rentPrice = x}
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
                        <TextField name={"saleableArea"} min={0} key="saleableArea" ref={x => this.saleableArea = x} fullWidth
                                   type={"number"}/></div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["grossArea"][locale]}</span>
                        <TextField name={"grossArea"} min={0} key="grossArea" ref={x => this.grossArea = x} fullWidth type={"number"}/></div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["numberOfRoom"][locale]}</span>
                        <TextField name={"numberOfRooms"} min={0} key="numberOfRooms" ref={x => this.numberOfRooms = x} fullWidth
                                   type={"number"}/></div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 13, minWidth: 100}}>{x["numberOfBathRoom"][locale]}</span>
                        <TextField name={"numberOfBathrooms"} min={0} key="numberOfBathrooms" ref={x => this.numberOfBathrooms = x} fullWidth
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
                        {this.state.oldImages.map((image, index) => {
                            const isToDelete = this.state.imagesToDelete[image.image_id]
                            return (
                                <div key={`oldImage${index}`} style={{position: "relative"}}>
                                    <div
                                        className="clickable"
                                        style={{
                                            border: "1px solid rgb(221, 223, 226)", borderRadius: 3,
                                            background: "#1e717f",
                                            backgroundImage: `url(${image.image_path})`,
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
                                        iconStyle={{background: isToDelete?"#35b056":"#cf0001", fill: "#ffffff"}}
                                        onClick={() => this.setState({imagesToDelete: {...this.state.imagesToDelete,[image.image_id]:!isToDelete}})}
                                    >
                                        {isToDelete?<Tick/>:<Remove/>}
                                    </IconButton>
                                </div>
                            )

                        })}
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
                <FlatButton onClick={() => this.handleSubmit()} label={x['update'][locale]} fullWidth style={{marginBottom: 20}}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    propertyDetail: state.propertiesDBReducer.propertiesDetail[props.match.params.propertyId],
    locale:state.localeReducer.locale
})
export default connect(mapStateToProps, {putProperty, getBuildingAddressAutocompletes,getBuildingById,postPropertyImages,getPropertyDetail})(EditPropertyPage)