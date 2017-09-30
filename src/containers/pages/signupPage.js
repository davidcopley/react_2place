import React from "react"
import {connect} from "react-redux"
import ReactAvatarEditor from 'react-avatar-editor'
import Logo from "../../images/1placeLogo.png"
import {TextField, FlatButton, Chip, IconButton} from "material-ui"
import {Hong_Kong_Island, Kowloon, Outlying_Islands, New_Territories} from "../../constants/districts"
import More from "material-ui/svg-icons/content/add"
import Less from "material-ui/svg-icons/content/remove"
import {sendVerificationCode,validateVerificationCode} from "../../actionCreators/phoneVerificationActionCreators"
class Signup extends React.Component {
    state = {
        allowZoomOut: false,
        position: {x: 0.5, y: 0.5},
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: null,
        width: 200,
        height: 200,
        districts: {},
        showHongKongIsland: false,
        showKowloon: false,
        showNewTerritories: false,
        showOutlyingIslands: false,
        verificationCodeIsSent:false,
        verificationCodeIsValidated:false
    }

    handleNewImage = e => {
        this.setState({image: e.target.files[0]})
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
        this.setState({scale})
    }

    handleSubmit = () => {
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
        this.setState({position})
    }

    setDistrict = districtKey => {
        this.setState({districts: {...this.state.districts, [districtKey]: !this.state.districts[districtKey]}})
    }

    handleSendCode = () => {
        const {sendVerificationCode} = this.props
        sendVerificationCode(this.countryCode.input.value,this.phoneNumber.input.value)
            .then(res=>{
                console.log(res)
                this.setState({verificationCodeIsSent:true})
            })
    }

    handleVerifyCode = () => {
        const {validateVerificationCode} = this.props
        validateVerificationCode(this.countryCode.input.value,this.phoneNumber.input.value,this.verificationCode.input.value)
            .then(res=>{
                console.log(res)
                const {valid} = res.data
                if(valid) {
                    this.setState({verificationCodeIsValidated: true})
                }
            })
    }

    render() {
        const {districts, showHongKongIsland, showKowloon, showNewTerritories, showOutlyingIslands, verificationCodeIsSent,verificationCodeIsValidated} = this.state
        return (
            <div style={{display: "flex", flexWrap: "wrap", position: "relative", top: 10, width: "100%"}}>
                <div style={{
                    minWidth: 300,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "1px solid rgb(221, 223, 226)",
                    borderRadius: 3,
                }}>
                    <div style={{height: 10}}/>
                    <ReactAvatarEditor
                        style={{borderRadius: 3}}
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
                    <div style={{padding: 10}}>
                        <input name='newImage' type='file' onChange={this.handleNewImage}/>
                        <br />
                        <span style={{fontSize: 13, minWidth: 100}}>zoom</span><br/>
                        <input
                            name='scale'
                            type='range'
                            onChange={this.handleScale}
                            min={this.state.allowZoomOut ? '0.1' : '1'}
                            max='2'
                            step='0.01'
                            defaultValue='1'
                            style={{width:"100%"}}
                        />
                        <br />
                        <span style={{fontSize: 13, minWidth: 100}}>rotate</span>
                        <div style={{display:"flex"}}>
                        <FlatButton onClick={this.rotateLeft} style={{fontSize:13,flex:1}}>Left</FlatButton>
                        <FlatButton onClick={this.rotateRight} style={{fontSize:13,flex:1}}>Right</FlatButton>
                        </div>
                    </div>
                </div>
                <div style={{flex: 1, minWidth: "50%", border: "1px solid rgb(221, 223, 226)", borderRadius: 3,}}>
                    <div style={{padding: 10}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 100}}>Email</span>
                            <TextField name={"email"} fullWidth type={"email"} ref={x=>this.email=x}/>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 100}}>Password</span>
                            <TextField name={"password"} fullWidth type={"password"} ref={x=>this.password=x}/>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 100}}>Display name</span>
                            <TextField name={"displayName"} fullWidth ref={x=>this.displayName=x}/>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div style={{display: "flex", alignItems: "center", width: "100%"}}>
                                <span style={{fontSize: 13, minWidth: 100}}>Phone number</span>
                                <TextField name={"countryCode"} ref={x=>this.countryCode = x} style={{width:100,marginRight:5}} type={"number"} hintText={"852"} disabled={verificationCodeIsSent}/>
                                <TextField name={"phoneNumber"} ref={x=>this.phoneNumber = x} fullWidth type={"tel"} hintText={"91234567"} disabled={verificationCodeIsSent}/>
                            </div>
                            <FlatButton style={{color: "#1e717f"}} onClick={()=>this.handleSendCode()} disabled={verificationCodeIsSent}>Send code</FlatButton>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div style={{display: "flex", alignItems: "center", width: "100%"}}>
                                <span style={{fontSize: 13, minWidth: 100}}>Verification code</span>
                                <TextField name={"verificationCode"} ref={x=>this.verificationCode = x} fullWidth type={"number"} disabled={verificationCodeIsValidated}/>
                            </div>
                            <FlatButton style={{color: "#1e717f"}} onClick={()=>this.handleVerifyCode()} disabled={verificationCodeIsValidated}>Verify</FlatButton>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 100}}>Agent license</span>
                        <TextField name={"agentLicense"} fullWidth hintText={"e.g. A-123456"}/>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 100}}>Agency</span>
                        <TextField name={"agency"} fullWidth/>
                        </div>
                        <br/>
                        <span style={{fontSize: 13, minWidth: 100}}>Districts you cover</span>
                        <br/>
                        <div style={{fontSize: 14, color: "#b2b2b2", display: "flex", alignItems: "center"}}><IconButton
                            iconStyle={{fill: "#b2b2b2"}}
                            onClick={() => this.setState({showHongKongIsland: !showHongKongIsland})}>{showHongKongIsland ?
                            <Less/> : <More/>}</IconButton>Hong Kong Island
                        </div>
                        {showHongKongIsland && <div style={{display: "flex", flexWrap: "wrap", width: "100%"}}>
                            {Object.keys(Hong_Kong_Island).sort().map(key => {
                                const isSet = !!districts[key]
                                return (
                                    <Chip key={`chip${key}`} backgroundColor={isSet ? "#1e717f" : "#eeeeee"}
                                          labelStyle={{color: isSet ? "#ffffff" : "#1e717f"}} style={{margin: 2}}
                                          onClick={() => this.setDistrict(key)}>
                                        {Hong_Kong_Island[key]["district_eng"]}
                                    </Chip>
                                )
                            })}
                        </div>}
                        <div style={{fontSize: 14, color: "#b2b2b2", display: "flex", alignItems: "center"}}><IconButton
                            iconStyle={{fill: "#b2b2b2"}}
                            onClick={() => this.setState({showKowloon: !showKowloon})}>{showKowloon ? <Less/> :
                            <More/>}</IconButton>Kowloon
                        </div>
                        {showKowloon &&
                        <div style={{display: "flex", flexWrap: "wrap", width: "100%"}}>
                            {Object.keys(Kowloon).sort().map(key => {
                                const isSet = !!districts[key]
                                return (
                                    <Chip key={`chip${key}`} backgroundColor={isSet ? "#1e717f" : "#eeeeee"}
                                          labelStyle={{color: isSet ? "#ffffff" : "#1e717f"}} style={{margin: 2}}
                                          onClick={() => this.setDistrict(key)}>
                                        {Kowloon[key]["district_eng"]}
                                    </Chip>
                                )
                            })}
                        </div>
                        }
                        <div style={{fontSize: 14, color: "#b2b2b2", display: "flex", alignItems: "center"}}><IconButton
                            iconStyle={{fill: "#b2b2b2"}}
                            onClick={() => this.setState({showNewTerritories: !showNewTerritories})}>{showNewTerritories ?
                            <Less/> : <More/>}</IconButton>New Territories
                        </div>
                        {showNewTerritories && <div style={{display: "flex", flexWrap: "wrap", width: "100%"}}>
                            {Object.keys(New_Territories).sort().map(key => {
                                const isSet = !!districts[key]
                                return (
                                    <Chip key={`chip${key}`} backgroundColor={isSet ? "#1e717f" : "#eeeeee"}
                                          labelStyle={{color: isSet ? "#ffffff" : "#1e717f"}} style={{margin: 2}}
                                          onClick={() => this.setDistrict(key)}>
                                        {New_Territories[key]["district_eng"]}
                                    </Chip>
                                )
                            })}
                        </div>}
                        <div style={{fontSize: 14, color: "#b2b2b2", display: "flex", alignItems: "center"}}><IconButton
                            iconStyle={{fill: "#b2b2b2"}}
                            onClick={() => this.setState({showOutlyingIslands: !showOutlyingIslands})}>{showOutlyingIslands ?
                            <Less/> : <More/>}</IconButton>Outlying Islands
                        </div>
                        {showOutlyingIslands && <div style={{display: "flex", flexWrap: "wrap", width: "100%"}}>
                            {Object.keys(Outlying_Islands).sort().map(key => {
                                const isSet = !!districts[key]
                                return (
                                    <Chip key={`chip${key}`} backgroundColor={isSet ? "#1e717f" : "#eeeeee"}
                                          labelStyle={{color: isSet ? "#ffffff" : "#1e717f"}} style={{margin: 2}}
                                          onClick={() => this.setDistrict(key)}>
                                        {Outlying_Islands[key]["district_eng"]}
                                    </Chip>
                                )
                            })}
                        </div>}
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 100}}>Promotion code</span>
                        <TextField name={"promotionCode"} fullWidth/>
                        </div>
                        <FlatButton fullWidth style={{color: "#1e717f"}}>Submit</FlatButton>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null,{
    sendVerificationCode,
    validateVerificationCode
})(Signup)