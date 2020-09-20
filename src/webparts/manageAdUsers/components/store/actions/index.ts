import { MSGraphClient } from '@microsoft/sp-http';
import {IAction,IGraphItems,actionTypes, GraphUser} from '../../Interface';

export const showData = (graphClient: MSGraphClient)=> {
    return dispatch => {
      graphClient
      .api('/users?$select=displayName,mail,jobTitle,mobilePhone,officeLocation,id,userPrincipalName')
      .get((error: any, users: any, rawResponse?: any) => {
        if(users!=null)
            dispatch(postDataSuccess(users.value));
      });
    }
    
};

export const postData = (graphClient: MSGraphClient, user: GraphUser)=> {
  return dispatch => {
    graphClient
    .api('/users')
    .post(user)
    .then(()=>{
      alert('User Created Successfully');
      dispatch(loadAddUsers());
    })
    .catch(error=>{
      alert('An Error has occurred: '+error);
      dispatch(loadAddUsers());
    });
  }
};

export const deleteData = (graphClient: MSGraphClient, id: string)=> {
  return dispatch => {
    graphClient
    .api('/users/'+id)
    .delete()
    .then(()=>{
      alert('User Deleted Successfully');
      dispatch(showData(graphClient));
    })
    .catch(error=>{
      alert('An Error has occurred: '+error);
      dispatch(showData(graphClient));
    });
  }
};

export const postDataSuccess = (payload:IGraphItems[]):IAction => {
    return {
            type:actionTypes.SHOW_DATA,
            data:payload
        };
}

export const loadAddUsers = ():IAction => {
    return {
      type:actionTypes.LOAD_ADD,
      data:null
    };
}

export const changeData = (payload:any):IAction => {
  return {
    type:actionTypes.CHANGE_DATA,
    data:payload
  };
}

export const onError = ():IAction => {
  return {
    type:actionTypes.ERROR,
    data:null
  };
}
