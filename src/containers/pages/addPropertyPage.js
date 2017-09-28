import React from "react"
import {TextField, FlatButton, IconButton} from "material-ui"
import Remove from "material-ui/svg-icons/navigation/close"
import {propertyTypes} from "../../images/propertyPage"
import featureImages from "../../images/features"
import Dropzone from 'react-dropzone'
class AddPropertyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: []
        }
    }

    render() {
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
                    <TextField fullWidth hintText={"location"}/>
                    <TextField fullWidth hintText={"street name"}/>
                    <TextField fullWidth hintText={"region"}/>
                    <TextField fullWidth hintText={"district"}/>
                    <span style={{fontSize: 13}}>Property Type</span>
                    <div style={{display: "flex", justifyContent: "space-evenly", marginTop: 10, marginBottom: 10}}>
                        {Object.keys(propertyTypes).map(propertyType => {
                            return (
                                <div key={`propertyType${propertyType}`} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <div
                                        className="clickable"
                                        style={{
                                            backgroundImage: `url(${propertyTypes[propertyType]})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            width: 50,
                                            height: 50
                                        }}
                                    />
                                    <span style={{fontSize: 12}}>{propertyType.replace(/_/g, ' ')}</span>
                                </div>
                            )
                        })}
                    </div>
                    <span style={{fontSize: 13}}>Description</span>
                    <TextField fullWidth hintText={"short title"}/>
                    <TextField fullWidth hintText={"describe your property"}/>
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
                    <TextField fullWidth hintText={"sale price"}/>
                    <TextField fullWidth hintText={"rent price"}/>
                    <span style={{fontSize: 13}}>Size</span>
                    <TextField fullWidth hintText={"saleable area (ft²)"}/>
                    <TextField fullWidth hintText={"gross area (ft²)"}/>
                    <TextField fullWidth hintText={"number of rooms"}/>
                    <TextField fullWidth hintText={"number of bathrooms"}/>
                </div>
                <div style={{
                    flex: 1,
                    padding: 5,
                    minWidth: 340,
                    border: "1px solid rgb(221, 223, 226)",
                    borderRadius: 3,
                }}>
                    <span style={{fontSize: 13}}>Features</span>
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
                                    height: 100
                                }}>
                                    <div
                                        style={{
                                            backgroundImage: `url(${featureImages[feature]})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            width: 50,
                                            height: 50
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
                    <span style={{fontSize: 13}}>Photos</span>
                    <FlatButton fullWidth onClick={()=>this.dz.open()}>add image(s)</FlatButton>
                    <Dropzone
                        ref={dz=>this.dz=dz}
                        style={{
                            minHeight: 100,
                            margin: 20,
                            border: "1px solid rgb(221, 223, 226)",
                            borderRadius: 3,
                            display: "flex",
                            flexWrap: "wrap"
                        }}
                        onDrop={images=> this.setState({images: [...this.state.images, ...images]})}
                        disableClick
                    >
                        {this.state.images.map((image,index) => {
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
                                        style={{position:"absolute",top:5,right:5}}
                                        iconStyle={{background:"#cf0001",fill:"#ffffff"}}
                                        onClick={()=>this.setState({images:this.state.images.filter((_,i)=>i!==index)})}
                                    >
                                        <Remove/>
                                    </IconButton>
                                </div>
                            )

                        })}
                    </Dropzone>
                </div>
                <FlatButton label={"add"} fullWidth style={{marginBottom: 20}}/>
            </div>
        )
    }
}
export default AddPropertyPage