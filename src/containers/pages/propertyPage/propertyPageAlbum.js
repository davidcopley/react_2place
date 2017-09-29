import React from "react"
import emptyPropertyImagePlaceholder from "../../../images/emptyPropertyImagePlaceholder.jpg"
import Left from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Right from "material-ui/svg-icons/hardware/keyboard-arrow-right"
import {IconButton,} from "material-ui"

class PropertyPageAlbum extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currentImageIndex: 0
        }
    }
    changeImageIndex = n => {
        const {currentImageIndex} = this.state
        const {images} = this.props.propertyDetail
        if (images.length > 1) {
            this.setState({currentImageIndex: (currentImageIndex + n) % images.length})
        }
    }
    render(){
        const {currentImageIndex} = this.state
        const {propertyDetail} = this.props
        const {images} = propertyDetail
        const imageUrls = images.map(image => image.image_path)
        const currentImage = imageUrls[currentImageIndex]
        return(
            <div style={{
                minHeight:"50vh",
                width:"100%",
                border: "1px solid rgb(221, 223, 226)",
                borderRadius: 3,
                display:"flex",
                flexDirection:"column"
            }}>
                <div style={{
                    flex:1,
                    background: "#dddddd",
                    backgroundImage: `url(${currentImage || emptyPropertyImagePlaceholder})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    position: "relative"
                }}>
                    {images.length > 1 &&
                        <span>
                            <IconButton onClick={() => this.changeImageIndex(-1)}
                                        style={{position: "absolute", left: 0, top: "40%"}} iconStyle={{fill: "white"}}><Left/>
                            </IconButton>
                            <IconButton onClick={() => this.changeImageIndex(1)}
                                        style={{position: "absolute", right: 0, top: "40%"}}
                                        iconStyle={{fill: "white"}}><Right/>
                            </IconButton>
                        </span>
                    }
                </div>
                <div style={{
                    height: "auto",
                    width: "100%",
                    display: "flex",
                    overflow: "scroll",
                    justifyContent: "space-evenly"
                }}>
                    {imageUrls.map((imageUrl, index) =>
                        <div
                            className="clickable"
                            style={{
                                backgroundImage: `url(${imageUrl})`,
                                height: 60,
                                minWidth: 100,
                                backgroundPosition: "center",
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                border: currentImageIndex === index ? "1px solid #1e717f" : "1px solid #ffffff"
                            }}
                            onClick={() => this.changeImageIndex(index - currentImageIndex)}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default PropertyPageAlbum