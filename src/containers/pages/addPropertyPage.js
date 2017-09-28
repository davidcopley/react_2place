import React from "react"
import {TextField,Subheader} from "material-ui"
import {propertyTypes} from "../../images/propertyPage"
class AddPropertyPage extends React.Component{
    render(){
        return(
            <div style={{width:"100%",display:"flex",flexWrap:"wrap",position:"relative",top:10}}>
                <div style={{flex:1,padding:5,minWidth:300,border: "1px solid rgb(221, 223, 226)", borderRadius:3,}}>
                    <span>Property</span>
                    <TextField fullWidth hintText={"location"}/>
                    <TextField fullWidth hintText={"street name"}/>
                    <TextField fullWidth hintText={"region"}/>
                    <TextField fullWidth hintText={"district"}/>
                    <span  style={{fontSize:13}}>Property Type</span>
                    <div style={{display:"flex",justifyContent:"space-evenly",marginTop:10,marginBottom:10}}>
                        {Object.keys(propertyTypes).map(propertyType=>{
                            return(
                                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    <div
                                        className="clickable"
                                        style={{
                                            backgroundImage:`url(${propertyTypes[propertyType]})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            width:50,
                                            height:50
                                        }}
                                    />
                                    <span>{propertyType.replace(/_/g,' ')}</span>
                                </div>
                            )
                        })}
                    </div>
                    <span style={{fontSize:13}}>Description</span>
                    <TextField fullWidth hintText={"short title"}/>
                    <TextField fullWidth hintText={"describe your property"}/>
                </div>
                <div style={{flex:1,padding:5,minWidth:300,border: "1px solid rgb(221, 223, 226)", borderRadius:3,}}>
                    <span style={{fontSize:13}}>Price & size</span>
                    <span style={{fontSize:13}}>Price</span>
                    <TextField fullWidth hintText={"sale price"}/>
                    <TextField fullWidth hintText={"rent price"}/>
                    <TextField fullWidth hintText={"saleable area (ft²)"}/>
                    <TextField fullWidth hintText={"gross area (ft²)"}/>
                    <TextField fullWidth hintText={"number of rooms"}/>
                    <TextField fullWidth hintText={"number of bathrooms"}/>
                </div>
            </div>
        )
    }
}
export default AddPropertyPage