import * as React from 'react';
import styles from '../ManageAdUsers.module.scss';
import {changeData,postData,loadAddUsers,onError} from '../store/actions';
import {connect} from 'react-redux';
import { GraphUser, IApplicationState } from '../Interface';
import { MSGraphClient } from '@microsoft/sp-http';

export interface IStateProps {
    changeData: (payload:any) => {};
    addItem: GraphUser;
    postData: (graphClient: MSGraphClient, payload:GraphUser) => {};
    graphClient: MSGraphClient;
    loadAddUsers: ()=>{};
    isAddValid:boolean;
    onError: ()=>{};
}

class AddUser extends React.Component<IStateProps,{}>{

    private onFormFieldChange = (event,inputIdentifier:string) => {
        var data={
            value: event.target.value,
            field: inputIdentifier
        }
        this.props.changeData(data);
    };

    private onSubmit = () => {
        if(this.props.addItem.displayName == ''||
        this.props.addItem.jobTitle == ''||
        this.props.addItem.mail == ''||
        this.props.addItem.mailNickname == ''||
        this.props.addItem.mobilePhone == ''||
        this.props.addItem.officeLocation == ''||
        this.props.addItem.userPrincipalName == ''||
        this.props.addItem.passwordProfile.password == ''){
            this.props.onError();
        }
        else{
            this.props.postData(this.props.graphClient, this.props.addItem);
        }
    }

    public render():React.ReactElement<IStateProps>{
        var errorMessage = null;
        if(!this.props.isAddValid){
            errorMessage = <div className="col-md-12 alert alert-danger" role="alert">Please fill all mandatory fields before submitting the request.</div>
        }
        return (
            <div style={{ marginBottom: '20px'}}>
                    <div style={{backgroundColor:'#3c73c7',height:'25px'}}>
                                <div className={styles.FeedTitle}>
                                    ADD USER
                                </div>
                    </div>
                    <div className= "col-md-12" style={{backgroundColor:'white',border:'1px solid #e3e8e8'}}>
                        <div className="col-md-12" style={{marginTop:'10px'}}>
                            <div className="col-md-3">
                                <label style={{fontWeight:'bold'}}>Display Name <label style={{color:'red'}}>*</label></label>
                            </div>
                            <div className="col-md-9">
                                <input onChange={(event)=>{this.onFormFieldChange(event,'DISPLAY')}} style={{width:'100%'}} type="text" defaultValue={this.props.addItem.displayName} ></input>
                            </div>
                        </div>
                        <div className="col-md-12" style={{marginTop:'10px'}}>
                            <div className="col-md-3">
                                <label style={{fontWeight:'bold'}}>Mail Nick Name <label style={{color:'red'}}>*</label></label>
                            </div>
                            <div className="col-md-9">
                                <input onChange={(event)=>{this.onFormFieldChange(event,'NICK')}} style={{width:'100%'}} type="text" defaultValue={this.props.addItem.mailNickname}></input>
                            </div>
                        </div> 
                        <div className="col-md-12" style={{marginTop:'10px'}}>
                            <div className="col-md-3">
                                <label style={{fontWeight:'bold'}}>Mail ID <label style={{color:'red'}}>*</label></label>
                            </div>
                            <div className="col-md-9">
                                <input onChange={(event)=>{this.onFormFieldChange(event,'MAIL')}} style={{width:'100%'}} type="text" defaultValue={this.props.addItem.mailNickname}></input>
                            </div>
                        </div>                      
                        <div className="col-md-12" style={{marginTop:'10px'}}>
                            <div className="col-md-3">
                                <label style={{fontWeight:'bold'}}>Principal Name <label style={{color:'red'}}>*</label></label>
                            </div>
                            <div className="col-md-9">
                                <input onChange={(event)=>{this.onFormFieldChange(event,'NAME')}} style={{width:'100%'}} type="text" defaultValue={this.props.addItem.userPrincipalName}></input>
                            </div>
                        </div>
                        <div className="col-md-12" style={{marginTop:'10px'}}>
                            <div className="col-md-3">
                                <label style={{fontWeight:'bold'}}>Designation <label style={{color:'red'}}>*</label></label>
                            </div>
                            <div className="col-md-9">
                                <input onChange={(event)=>{this.onFormFieldChange(event,'DESIGNATION')}} style={{width:'100%'}} type="text" defaultValue={this.props.addItem.jobTitle}></input>
                            </div>
                        </div>
                        <div className="col-md-12" style={{marginTop:'10px'}}>
                            <div className="col-md-3">
                                <label style={{fontWeight:'bold'}}>Phone <label style={{color:'red'}}>*</label></label>
                            </div>
                            <div className="col-md-9">
                                <input onChange={(event)=>{this.onFormFieldChange(event,'PHONE')}} style={{width:'100%'}} type="text" defaultValue={this.props.addItem.mobilePhone}></input>
                            </div>
                        </div>
                        <div className="col-md-12" style={{marginTop:'10px'}}>
                            <div className="col-md-3">
                                <label style={{fontWeight:'bold'}}>Office Location <label style={{color:'red'}}>*</label></label>
                            </div>
                            <div className="col-md-9">
                                <input onChange={(event)=>{this.onFormFieldChange(event,'LOCATION')}} style={{width:'100%'}} type="text" defaultValue={this.props.addItem.officeLocation}></input>
                            </div>
                        </div>
                        <div className="col-md-12" style={{marginTop:'10px'}}>
                            <div className="col-md-3">
                                <label style={{fontWeight:'bold'}}>Password <label style={{color:'red'}}>*</label></label>
                            </div>
                            <div className="col-md-9">
                                <input onChange={(event)=>{this.onFormFieldChange(event,'PASSWORD')}} style={{width:'100%'}} type="password" defaultValue={this.props.addItem.passwordProfile.password}></input>
                            </div>
                        </div>
                       
                        <div className="col-md-12" style={{marginTop:'10px',marginBottom:'10px'}}>
                            <div className="col-md-8">
                            </div>
                            <div className="col-md-2">
                                <button type="button" onClick = {()=>this.onSubmit()} className="btn btn-primary" style={{marginLeft:'10px',marginTop:'5px'}}>Submit</button>
                            </div>
                            <div className="col-md-2">
                                <button type="button" className="btn btn-primary" style={{marginLeft:'10px',marginTop:'5px'}} onClick={()=>this.props.loadAddUsers()}>Cancel</button>
                            </div>                           
                        </div>  
                       {errorMessage}
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state:IApplicationState) => {
    return {
       addItem: state.addItem,
       isAddValid: state.isAddValid
    };
}

const mapDispatchToProps = (dispatch:any) => {
    return{
        changeData: (payload:any) => dispatch(changeData(payload)),
        postData: (graphClient: MSGraphClient, payload: GraphUser) => dispatch(postData(graphClient, payload)),
        loadAddUsers:()=>dispatch(loadAddUsers()),
        onError:()=>dispatch(onError())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(AddUser);