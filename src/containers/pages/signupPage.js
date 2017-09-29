import React from "react"
import ReactAvatarEditor from 'react-avatar-editor'
import Logo from "../../images/1placeLogo.png"
import {TextField,FlatButton, Chip} from "material-ui"
import {Hong_Kong_Island,Kowloon,Outlying_Islands,New_Territories} from "../../constants/districts"
class Signup extends React.Component{
    state = {
        allowZoomOut: false,
        position: { x: 0.5, y: 0.5 },
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: null,
        width: 200,
        height: 200,
        districts:{}
    }

    handleNewImage = e => {
        this.setState({ image: e.target.files[0] })
    }

    handleSave = data => {
        const img = this.editor.getImageScaledToCanvas().toDataURL()
        const rect = this.editor.getCroppingRect()
        this.setState({
            preview: {
                img,
                rect,
                scale: this.state.scale,
                width: this.state.width,
                height: this.state.height,
                borderRadius: this.state.borderRadius
            }
        })
    }

    handleScale = e => {
        const scale = parseFloat(e.target.value)
        this.setState({ scale })
    }

    handleSignup = () => {
        // const {
        //     display_name,
        //     email,
        //     username,
        //     password,
        //     password_confirmation,
        //     firstname,
        //     lastname,
        //     salutation,
        //     phone,
        //     phone_verify_code,
        //     license_number,
        //     agency,
        //     my_usage_of_property,
        //     referee_code,
        //     max_sell_price,
        //     min_sell_price,
        //     speaks_chinese,
        //     speaks_english,
        //     my_region,
        //     profilepic
        // } = data
    }

    rotateLeft = e => {
        e.preventDefault()

        this.setState({
            rotate: this.state.rotate - 90
        })
    }

    rotateRight = e => {
        e.preventDefault()
        this.setState({
            rotate: this.state.rotate + 90
        })
    }

    setEditorRef = editor => {
        if (editor) this.editor = editor
    }

    handlePositionChange = position => {
        console.log('Position set to', position)
        this.setState({ position })
    }

    setDistrict=districtKey=>{
        this.setState({districts:{...this.state.districts,[districtKey]:!this.state.districts[districtKey]}})
    }

    render () {
        const {districts} = this.state
        return (
            <div style={{display:"flex",flexWrap:"wrap",position:"relative",top:10,width:"100%"}}>
                <div style={{minWidth:250,display:"flex",flexDirection:"column",alignItems:"center",border: "1px solid rgb(221, 223, 226)", borderRadius:3,}}>
                    <div style={{height:10}}/>
                    <ReactAvatarEditor
                        style={{borderRadius:3}}
                        ref={this.setEditorRef}
                        scale={parseFloat(this.state.scale)}
                        width={this.state.width}
                        height={this.state.height}
                        position={this.state.position}
                        onPositionChange={this.handlePositionChange}
                        rotate={parseFloat(this.state.rotate)}
                        borderRadius={this.state.borderRadius}
                        onSave={this.handleSave}
                        image={this.state.image || Logo}
                    />
                    <div style={{padding:10}}>
                        <input name='newImage' type='file' onChange={this.handleNewImage} />
                        <br />
                        Zoom:
                        <input
                            name='scale'
                            type='range'
                            onChange={this.handleScale}
                            min={this.state.allowZoomOut ? '0.1' : '1'}
                            max='2'
                            step='0.01'
                            defaultValue='1'
                        />
                        <br />
                        Rotate:
                        <button onClick={this.rotateLeft}>Left</button>
                        <button onClick={this.rotateRight}>Right</button>
                    </div>
                </div>
                <div style={{flex:1,minWidth:"50%",border: "1px solid rgb(221, 223, 226)", borderRadius:3,}}>
                    <div style={{padding:10}}>
                        <TextField fullWidth hintText={"email"} type={"email"}/>
                        <TextField fullWidth hintText={"password"} type={"password"}/>
                        <TextField fullWidth hintText={"display name"} />
                        <div style={{display:"flex",alignItems:"center"}}>
                            <TextField fullWidth hintText={"phone number"} type={"tel"}/>
                            <FlatButton style={{color:"#1e717f"}}>Send code</FlatButton>
                        </div>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <TextField fullWidth hintText={"verification code"} type={"tel"}/>
                            <FlatButton style={{color:"#1e717f"}}>Verify</FlatButton>
                        </div>
                        <TextField fullWidth hintText={"agent license (e.g. A-123456)"}/>
                        <TextField fullWidth hintText={"agency"}/>
                        <div style={{color:"#b2b2b2"}}>Districts you cover</div>
                        <br/>
                        <div style={{fontSize:14,color:"#b2b2b2"}}>Hong Kong Island</div>
                        <div style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
                            {Object.keys(Hong_Kong_Island).sort().map(key=> {
                                const isSet = !!districts[key]
                                return (
                                    <Chip key={`chip${key}`} backgroundColor={isSet?"#1e717f":"#eeeeee"} labelStyle={{color:isSet?"#ffffff":"#1e717f"}} style={{margin:2}} onClick={()=>this.setDistrict(key)}>
                                        {Hong_Kong_Island[key]["district_eng"]}
                                    </Chip>
                                )
                            })}
                        </div>
                        <div style={{fontSize:14,color:"#b2b2b2"}}>Kowloon</div>
                        <div style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
                            {Object.keys(Kowloon).sort().map(key=> {
                                const isSet = !!districts[key]
                                return (
                                    <Chip key={`chip${key}`} backgroundColor={isSet?"#1e717f":"#eeeeee"} labelStyle={{color:isSet?"#ffffff":"#1e717f"}} style={{margin:2}} onClick={()=>this.setDistrict(key)}>
                                        {Kowloon[key]["district_eng"]}
                                    </Chip>
                                )
                            })}
                        </div>
                        <div style={{fontSize:14,color:"#b2b2b2"}}>New Territories</div>
                        <div style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
                            {Object.keys(New_Territories).sort().map(key=> {
                                const isSet = !!districts[key]
                                return (
                                    <Chip key={`chip${key}`} backgroundColor={isSet?"#1e717f":"#eeeeee"} labelStyle={{color:isSet?"#ffffff":"#1e717f"}} style={{margin:2}} onClick={()=>this.setDistrict(key)}>
                                        {New_Territories[key]["district_eng"]}
                                    </Chip>
                                )
                            })}
                        </div>
                        <div style={{fontSize:14,color:"#b2b2b2"}}>Outlying Islands</div>
                        <div style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
                            {Object.keys(Outlying_Islands).sort().map(key=> {
                                const isSet = !!districts[key]
                                return (
                                    <Chip key={`chip${key}`} backgroundColor={isSet?"#1e717f":"#eeeeee"} labelStyle={{color:isSet?"#ffffff":"#1e717f"}} style={{margin:2}} onClick={()=>this.setDistrict(key)}>
                                        {Outlying_Islands[key]["district_eng"]}
                                    </Chip>
                                )
                            })}
                        </div>
                        <TextField fullWidth hintText={"promotion code"}/>
                        <FlatButton fullWidth style={{color:"#1e717f"}}>Submit</FlatButton>
                    </div>
                </div>
            </div>
        )
    }
}
export default Signup