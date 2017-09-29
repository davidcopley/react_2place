import React from "react"
import propertyPageImages from "../../../images/propertyPage/index"
import commaNumber from "comma-number"
export default ({propertyDetail: {short_title, unit_price, lease_type, building_name, building_phase_no, building_street_name, building_region, net_unit_size, gross_unit_size, number_of_room, number_of_bathroom, property_type, remark}}) => (
    <div style={{
        minHeight: "50vh",
        width:"100%",
        border: "1px solid rgb(221, 223, 226)",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
    }}>
        <div style={{padding: 10}}>
            <div style={{fontSize: 20, borderBottom: "1px solid rgb(221, 223, 226)"}}>
                <span style={{fontSize: 12}}>Short title</span><br/>
                {short_title}
            </div>
            <div style={{
                fontSize: 15,
                paddingTop: 10,
                borderBottom: "1px solid rgb(221, 223, 226)"
            }}>
                <span style={{fontSize: 12}}>Unit price</span><br/>
                ${commaNumber(unit_price)} {lease_type === "rent" && <span>per month</span>}
            </div>
            <div style={{
                fontSize: 15,
                paddingTop: 10,
                borderBottom: "1px solid rgb(221, 223, 226)"
            }}>
                <span style={{fontSize: 12}}>Building name</span><br/>
                {building_name} {building_phase_no}
            </div>
            <div style={{
                fontSize: 14,
                paddingTop: 10,
                borderBottom: "1px solid rgb(221, 223, 226)"
            }}>
                <span style={{fontSize: 12}}>Address</span><br/>
                {building_street_name}<br/>{building_region.replace(/_/g, ' ')}<br/>
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
                <span style={{fontSize: 12}}>{number_of_room} Rooms</span>
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
                <span style={{fontSize: 12}}>{number_of_bathroom} Bathrooms</span>
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
                <span style={{fontSize: 12}}>{property_type.replace(/_/g, " ")}</span>
            </div>
        </div>
        <div style={{padding: 10}}>
            <span style={{fontSize: 12}}>Description</span><br/>
            {remark}
        </div>
    </div>
)