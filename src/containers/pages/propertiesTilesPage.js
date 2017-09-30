import React from "react"
import {TextField,Checkbox} from "material-ui"
import {getPropertiesBasic} from "../../actionCreators/propertiesDBActionCreators"
import {connect} from "react-redux"
import PropertyBlock from "../property/propertyBlock"
import {withRouter} from "react-router-dom"
import fuzzy from "fuzzy"
import x from "../../constants/locale"
class PropertiesTiles extends React.Component{
    constructor(props){
        super(props)
        this.state={
            filterText:"",
            showSell:true,
            showRent:true
        }
    }
    componentDidMount(){
        this.props.getPropertiesBasic()
    }
    renderProperties = () => {
        const {propertiesBasic} = this.props
        const fuzzyOptions = {
            extract:el=>`${propertiesBasic[el].short_title} ${propertiesBasic[el].remark} ${propertiesBasic[el].building_name} ${propertiesBasic[el].building_street_name}`
        }
        if(propertiesBasic) {
            const {showSell,showRent} = this.state
            let propertiesKeys = Object.keys(propertiesBasic)
            if(!showSell){
                propertiesKeys=propertiesKeys.filter(key=>propertiesBasic[key].lease_type!=="sell")
            }
            if(!showRent){
                propertiesKeys=propertiesKeys.filter(key=>propertiesBasic[key].lease_type!=="rent")
            }
            return fuzzy.filter(this.state.filterText,propertiesKeys.reverse(),fuzzyOptions).map(property_id => {
                return <PropertyBlock key={`property${property_id.original}`} property_id={property_id.original}/>
            })
        }
        return <span>"No properties loaded"</span>
    }
    render(){
        const {showSell,showRent} = this.state
        const {locale} = this.props
        return(
            <div style={{width:"100%"}}>
                <div style={{height:50,width:"100%",background:"#ffffff",position:"fixed",top:60,zIndex:2,padding:10,display:"flex",flexWrap:"wrap",alignItems:"center"}}>
                    <TextField hintText={x["filterText"][locale]} style={{width:200,marginRight:10}} onChange={e=>this.setState({filterText:e.target.value})}/>
                    <div>
                        <Checkbox checked={showSell} onCheck={()=>this.setState({showSell:!showSell})} style={{width:150}} label={x["sell"][locale]}/>
                        <Checkbox checked={showRent} onCheck={()=>this.setState({showRent:!showRent})} style={{width:150}} label={x["rent"][locale]}/>
                    </div>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",width:"100%",justifyContent:"space-evenly",top:60,position:"relative"}}>
                    {this.renderProperties()}
                    {new Array(3).fill(<div style={{width:300}}/>)}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    propertiesBasic:state.propertiesDBReducer.propertiesBasic,
    locale: state.localeReducer.locale
})

export default withRouter(connect(mapStateToProps,{getPropertiesBasic})(PropertiesTiles))