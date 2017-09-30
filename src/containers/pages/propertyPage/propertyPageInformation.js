import React from "react"
import {connect} from "react-redux"
import {push} from "react-router-redux"
import propertyPageImages from "../../../images/propertyPage/index"
import commaNumber from "comma-number"
import {FlatButton} from "material-ui"
import x from "../../../constants/locale"
const PropertyPageInformation = ({locale,push,propertyDetail: {property_id,short_title, unit_price,unit_level, lease_type, building_name, building_phase_no, building_street_name,building_district, building_region, net_unit_size, gross_unit_size, number_of_room, number_of_bathroom, property_type, remark}}) => (
    <div style={{
        minHeight: "50vh",
        width:"100%",
        border: "1px solid rgb(221, 223, 226)",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
    }}>
        <div style={{padding: 10}}>
            <div style={{fontSize: 20, borderBottom: "1px solid rgb(221, 223, 226)",wordBreak:"break-all"}}>
                <span style={{fontSize: 12}}>{x["short_title"][locale]}</span><br/>
                {short_title}
            </div>
            <div style={{
                fontSize: 15,
                paddingTop: 10,
                borderBottom: "1px solid rgb(221, 223, 226)",
                wordBreak:"break-all"
            }}>
                <span style={{fontSize: 12}}>{x["unit_price"][locale]}</span><br/>
                ${commaNumber(unit_price)} {lease_type === "rent" && <span>per month</span>}
            </div>
            <div style={{
                fontSize: 15,
                paddingTop: 10,
                borderBottom: "1px solid rgb(221, 223, 226)",
                wordBreak:"break-all"
            }}>
                <span style={{fontSize: 12}}>{x["building_name"][locale]}</span><br/>
                {building_name} {building_phase_no}
            </div>
            <div style={{
                fontSize: 15,
                paddingTop: 10,
                borderBottom: "1px solid rgb(221, 223, 226)",
                wordBreak:"break-all",
                textTransform:"capitalize"
            }}>
                <span style={{fontSize: 12}}>{x["unit_level"][locale]}</span><br/>
                {x[unit_level][locale]}
            </div>
            <div style={{
                fontSize: 14,
                paddingTop: 10,
                borderBottom: "1px solid rgb(221, 223, 226)",
                wordBreak:"break-all",
                textTransform:"capitalize"
            }}>
                <span style={{fontSize: 12}}>{x["address"][locale]}</span><br/>
                {building_street_name}<br/>{building_district.replace(/_/g," ")}<br/>{building_region.replace(/_/g, ' ')}<br/>
            </div>
        </div>
        <br/>
        <div
            style={{
                display: "flex",
                justifyContent: "space-evenly",
                borderBottom: "1px solid rgb(221, 223, 226)"
            }}
        >
            <div style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    backgroundImage: `url(${propertyPageImages["size"]})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    width: 70,
                    height: 70,
                }}/>
                <span style={{fontSize: 12}}>{net_unit_size}/{gross_unit_size} ft<sup>2</sup></span>
            </div>
            <div style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    backgroundImage: `url(${propertyPageImages["room"]})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    width: 70,
                    height: 70
                }}/>
                <span style={{fontSize: 12}}>{number_of_room} {x["rooms"][locale]}</span>
            </div>
            <div style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    backgroundImage: `url(${propertyPageImages["bathroom"]})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    width: 70,
                    height: 70
                }}/>
                <span style={{fontSize: 12}}>{number_of_bathroom} {x["bathrooms"][locale]}</span>
            </div>
            <div style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textTransform: "capitalize"
            }}>
                <div style={{
                    backgroundImage: `url(${propertyPageImages[property_type]})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    width: 70,
                    height: 70
                }}/>
                <span style={{fontSize: 12}}>{x[property_type][locale]}</span>
            </div>
        </div>
        <div style={{padding: 10,marginBottom:"auto",wordBreak:"break-all"}}>
            <span style={{fontSize: 12}}>{x["Description"][locale]}</span><br/>
            {remark}
        </div>
        <div style={{display:"flex",marginTop:"auto",width:"100%",borderTop: "1px solid rgb(221, 223, 226)"}}>
            <FlatButton style={{flex:1,borderRight: "1px solid rgb(221, 223, 226)"}} label={x["edit"][locale]} onClick={()=>push(`/editProperty/${property_id}`)}/><FlatButton style={{flex:1}} label={x["remove"][locale]}/>
        </div>
    </div>
)
const mapStateToProps = state => ({
    locale:state.localeReducer.locale
})
export default connect(mapStateToProps,{push})(PropertyPageInformation)