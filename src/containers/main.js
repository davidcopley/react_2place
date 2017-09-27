import React from "react"
import {connect} from "react-redux"
import PropertyBlock from "./property/propertyBlock"
class Main extends React.Component{
    render(){
        return(
            <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
                <div style={{position:"fixed",height:60,width:"100%",background:"#eeeeee",display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <div style={{display:"flex",height:"100%",maxWidth:1000,width:"100%",justifyContent:"start",alignItems:"center"}}>
                        <span style={{fontSize:50}}>1PLACE</span>
                        <span style={{marginLeft:"auto"}}>login</span>
                    </div>
                </div>
                <div style={{height:60}}/>
                <div style={{flex:"auto",width:"100%",display:"flex",justifyContent:"center"}}>
                    <div style={{display:"flex",flexDirection:"column",maxWidth:1000,width:"100%"}}>
                        <PropertyBlock/>
                        <PropertyBlock/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main
