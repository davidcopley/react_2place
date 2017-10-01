import React from "react"
import {connect} from "react-redux"
import ReactAvatarEditor from 'react-avatar-editor'
import Logo from "../../images/1placeLogo.png"
import {TextField, FlatButton, Chip, IconButton} from "material-ui"
import {Hong_Kong_Island, Kowloon, Outlying_Islands, New_Territories,regions} from "../../constants/districts"
import More from "material-ui/svg-icons/content/add"
import Less from "material-ui/svg-icons/content/remove"
import {sendVerificationCode,validateVerificationCode} from "../../actionCreators/phoneVerificationActionCreators"
import {postUser} from "../../actionCreators/accountActionCreators"
import x from "../../constants/locale"
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
        verificationCodeIsValidated:false,
        errors:{}
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

    tf2val = tf => tf.input.value

    handleSubmit = () => {
        const t2v = this.tf2val
        const {postUser} = this.props
        const {districts} = this.state
        const data = {
            display_name:t2v(this.displayName),
            email:t2v(this.email),
            username:t2v(this.email),
            password:t2v(this.password),
            password_confirmation:t2v(this.password),
            firstname:t2v(this.password),
            lastname:"",
            salutation:"Mr",
            phone:`${t2v(this.countryCode)}-${t2v(this.phoneNumber)}`,
            phone_verify_code:t2v(this.verificationCode),
            license_number:t2v(this.agentLicense),
            agency:t2v(this.agency),
            my_usage_of_property:"residential",
            referee_code:t2v(this.promotionCode),
            max_sell_price:0,
            min_sell_price:0,
            max_rent_price:0,
            min_rent_price:0,
            speaks_chinese:1,
            speaks_english:1,
            my_region:Object.keys(regions).join(),
            my_district:Object.keys(districts).fill(x=>x).join(","),
            profilepic:this.state.image
        }
        postUser(data)
            .catch(err=>{
                console.log(err.response.data.errors)
                this.setState({errors:err.response.data.errors})
            })
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
        const {districts, showHongKongIsland, showKowloon, showNewTerritories, showOutlyingIslands, verificationCodeIsSent,verificationCodeIsValidated,errors} = this.state
        const {locale} = this.props
        const z = key => x[key][locale]
        const y = key => key&&x["errors"][key]&&x["errors"][key][locale]
        return (
            <div style={{display: "flex", flexWrap: "wrap", position: "relative", top: 10, width: "100%"}}>
                <div style={{
                    flex:1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "1px solid rgb(221, 223, 226)",
                    borderRadius: 3,
                }}>
                    <div style={{height: 10}}/>
                    <ReactAvatarEditor
                        style={{borderRadius: 3,border:errors['profilepic']?'3px solid red':undefined}}
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
                        <div style={{fontSize: 13,width:"100%"}}>{z('profilePicInput')}</div>
                        <input name='newImage' type='file' onChange={this.handleNewImage}/>
                        <br />
                        <span style={{fontSize: 13, minWidth: 100}}>{z('zoom')}</span><br/>
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
                        <span style={{fontSize: 13, minWidth: 100}}>{z('rotate')}</span>
                        <div style={{display:"flex"}}>
                        <FlatButton onClick={this.rotateLeft} style={{fontSize:13,flex:1}}>{z('rotateLeft')}</FlatButton>
                        <FlatButton onClick={this.rotateRight} style={{fontSize:13,flex:1}}>{z('rotateRight')}</FlatButton>
                        </div>
                    </div>
                </div>
                <div style={{flex: 3, minWidth: "50%", border: "1px solid rgb(221, 223, 226)", borderRadius: 3,}}>
                    <div style={{padding: 10}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 100}}>{z('emailInput')}</span>
                            <TextField name={"email"} fullWidth type={"email"} ref={x=>this.email=x} errorText={y(errors['username'])}/>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 100}}>{z('passwordInput')}</span>
                            <TextField name={"password"} fullWidth type={"password"} ref={x=>this.password=x}/>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 100}}>{z('displayName')}</span>
                            <TextField name={"displayName"} fullWidth ref={x=>this.displayName=x} errorText={y(errors['display_name'])}/>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div style={{display: "flex", alignItems: "center", width: "100%"}}>
                                <span style={{fontSize: 13, minWidth: 100}}>{z('phoneInput')}</span>
                                <TextField name={"countryCode"} ref={x=>this.countryCode = x} style={{width:100,marginRight:5}} type={"tel"} hintText={"852"} disabled={verificationCodeIsSent} errorText={errors['phone']?"Error":null}/>
                                <TextField name={"phoneNumber"} ref={x=>this.phoneNumber = x} fullWidth type={"tel"} hintText={"91234567"} disabled={verificationCodeIsSent} errorText={y(errors['phone'])}/>
                            </div>
                            <FlatButton style={{color: "#1e717f"}} onClick={()=>this.handleSendCode()} disabled={verificationCodeIsSent}>{z('send')}</FlatButton>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div style={{display: "flex", alignItems: "center", width: "100%"}}>
                                <span style={{fontSize: 13, minWidth: 100}}>{z('verificationCode')}</span>
                                <TextField name={"verificationCode"} ref={x=>this.verificationCode = x} fullWidth type={"tel"} disabled={verificationCodeIsValidated} errorText={y(errors['phone_verify_code'])}/>
                            </div>
                            <FlatButton style={{color: "#1e717f"}} onClick={()=>this.handleVerifyCode()} disabled={verificationCodeIsValidated}>{z('verifyButton')}</FlatButton>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 100}}>{z('agentLicense')}</span>
                        <TextField name={"agentLicense"} fullWidth hintText={"e.g. A-123456"} ref={x=>this.agentLicense = x} errorText={y(errors['license_number'])}/>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 100}}>{z('agencyInput')}</span>
                        <TextField name={"agency"} fullWidth ref={x=>this.agency = x} errorText={y(errors['agency'])}/>
                        </div>
                        <br/>
                        <span style={{fontSize: 13, minWidth: 100}}>{z('districts')}</span>
                        <br/>
                        <div style={{fontSize: 14,  display: "flex", alignItems: "center"}}><IconButton
                            iconStyle={{fill: "#b2b2b2"}}
                            onClick={() => this.setState({showHongKongIsland: !showHongKongIsland})}>{showHongKongIsland ?
                            <Less/> : <More/>}</IconButton>{z('Hong_Kong_Island')}
                        </div>
                        {showHongKongIsland && <div style={{display: "flex", flexWrap: "wrap", width: "100%"}}>
                            {Object.keys(Hong_Kong_Island).sort().map(key => {
                                const isSet = !!districts[key]
                                return (
                                    <Chip key={`chip${key}`} backgroundColor={isSet ? "#1e717f" : "#eeeeee"}
                                          labelStyle={{color: isSet ? "#ffffff" : "#1e717f"}} style={{margin: 2}}
                                          onClick={() => this.setDistrict(key)}>
                                        {z(key)}
                                    </Chip>
                                )
                            })}
                        </div>}
                        <div style={{fontSize: 14, display: "flex", alignItems: "center"}}><IconButton
                            iconStyle={{fill: "#b2b2b2"}}
                            onClick={() => this.setState({showKowloon: !showKowloon})}>{showKowloon ? <Less/> :
                            <More/>}</IconButton>{z('Kowloon')}
                        </div>
                        {showKowloon &&
                        <div style={{display: "flex", flexWrap: "wrap", width: "100%"}}>
                            {Object.keys(Kowloon).sort().map(key => {
                                const isSet = !!districts[key]
                                return (
                                    <Chip key={`chip${key}`} backgroundColor={isSet ? "#1e717f" : "#eeeeee"}
                                          labelStyle={{color: isSet ? "#ffffff" : "#1e717f"}} style={{margin: 2}}
                                          onClick={() => this.setDistrict(key)}>
                                        {z(key)}
                                    </Chip>
                                )
                            })}
                        </div>
                        }
                        <div style={{fontSize: 14, display: "flex", alignItems: "center"}}><IconButton
                            iconStyle={{fill: "#b2b2b2"}}
                            onClick={() => this.setState({showNewTerritories: !showNewTerritories})}>{showNewTerritories ?
                            <Less/> : <More/>}</IconButton>{z('New_Territories')}
                        </div>
                        {showNewTerritories && <div style={{display: "flex", flexWrap: "wrap", width: "100%"}}>
                            {Object.keys(New_Territories).sort().map(key => {
                                const isSet = !!districts[key]
                                return (
                                    <Chip key={`chip${key}`} backgroundColor={isSet ? "#1e717f" : "#eeeeee"}
                                          labelStyle={{color: isSet ? "#ffffff" : "#1e717f"}} style={{margin: 2}}
                                          onClick={() => this.setDistrict(key)}>
                                        {z(key)}
                                    </Chip>
                                )
                            })}
                        </div>}
                        <div style={{fontSize: 14, display: "flex", alignItems: "center"}}><IconButton
                            iconStyle={{fill: "#b2b2b2"}}
                            onClick={() => this.setState({showOutlyingIslands: !showOutlyingIslands})}>{showOutlyingIslands ?
                            <Less/> : <More/>}</IconButton>{z('Outlying_Islands')}
                        </div>
                        {showOutlyingIslands && <div style={{display: "flex", flexWrap: "wrap", width: "100%"}}>
                            {Object.keys(Outlying_Islands).sort().map(key => {
                                const isSet = !!districts[key]
                                return (
                                    <Chip key={`chip${key}`} backgroundColor={isSet ? "#1e717f" : "#eeeeee"}
                                          labelStyle={{color: isSet ? "#ffffff" : "#1e717f"}} style={{margin: 2}}
                                          onClick={() => this.setDistrict(key)}>
                                        {z(key)}
                                    </Chip>
                                )
                            })}
                        </div>}
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span style={{fontSize: 13, minWidth: 100}}>{z('promoCode')}</span>
                        <TextField name={"promotionCode"} fullWidth ref={x=>this.promotionCode=x}/>
                        </div>
                        <FlatButton fullWidth style={{color: "#1e717f"}} onClick={()=>this.handleSubmit()}>{z('submit')}</FlatButton>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    locale: state.localeReducer.locale
})

export default connect(mapStateToProps,{
    sendVerificationCode,
    validateVerificationCode,
    postUser
})(Signup)