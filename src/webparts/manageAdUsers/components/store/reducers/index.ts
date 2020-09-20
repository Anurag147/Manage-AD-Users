import {IAction,actionTypes,IApplicationState, IGraphItems} from '../../Interface';
import {Reducer} from 'redux';

const initialState:IApplicationState = {
    items:[],
    isAddEnabled:false,
    addItem:{
        accountEnabled:true,
        displayName:'',
        mailNickname:'',
        userPrincipalName:'',
        passwordProfile:{
            password:'',
            forceChangePasswordNextSignIn:false
        },
        jobTitle:'',
        mobilePhone:'',
        officeLocation:'',
        mail:''
    },
    isAddValid:true
};

export const ApplicationReducer: Reducer<IApplicationState> = (state: IApplicationState = initialState, action:IAction) => 
{
    if(action.type==actionTypes.SHOW_DATA){
        let newState:IApplicationState = {...state};
        newState.items=action.data;
        return newState;
    }
    if(action.type==actionTypes.ERROR){
        let newState:IApplicationState = {...state};
        newState.isAddValid=false;
        return newState;
    }
    if(action.type==actionTypes.LOAD_ADD){
        let newState:IApplicationState = {...state};
        newState.isAddEnabled=!newState.isAddEnabled;
        newState.addItem.displayName='';
        newState.addItem.jobTitle='';
        newState.addItem.mail='';
        newState.addItem.mailNickname='';
        newState.addItem.mobilePhone='';
        newState.addItem.officeLocation='';
        newState.addItem.passwordProfile.password='';
        newState.addItem.userPrincipalName='';
        newState.isAddValid=true;
        return newState;
    }
    if(action.type==actionTypes.CHANGE_DATA){
        let newState:IApplicationState = {...state};
        if(action.data.field == 'DISPLAY'){
            newState.addItem.displayName = action.data.value;
        }
        if(action.data.field == 'NICK'){
            newState.addItem.mailNickname = action.data.value;
        } 
        if(action.data.field == 'MAIL'){
            newState.addItem.mail = action.data.value;
        } 
        if(action.data.field == 'NAME'){
            newState.addItem.userPrincipalName = action.data.value;
        } 
        if(action.data.field == 'PASSWORD'){
            newState.addItem.passwordProfile.password = action.data.value;
        }
        if(action.data.field == 'DESIGNATION'){
            newState.addItem.jobTitle = action.data.value;
        }
        if(action.data.field == 'PHONE'){
            newState.addItem.mobilePhone = action.data.value;
        }
        if(action.data.field == 'LOCATION'){
            newState.addItem.officeLocation = action.data.value;
        }
        newState.isAddValid=true;
        return newState;
    }
    return state; 
} 