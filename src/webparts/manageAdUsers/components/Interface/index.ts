import { MSGraphClient } from '@microsoft/sp-http';

export interface IManageAdUsersProps {
  description: string;
  graphClient: MSGraphClient;
  isAddEnabled:boolean;
}

export enum actionTypes{
    SHOW_DATA,
    LOAD_ADD,
    CHANGE_DATA,
    ERROR,
    DELETE_USER,
}

export interface IAction{
    type: actionTypes;
    data: any;
}

export interface IGraphItems {
    displayName:string;
    mail:string;
    jobTitle:string;
    mobilePhone: string;
    officeLocation: string;
    id: string;
    userPrincipalName:string;
}

export interface IApplicationState {
    items:IGraphItems[],
    isAddEnabled:boolean;
    addItem:GraphUser;
    isAddValid: boolean;
}

export interface GraphUser {
    accountEnabled: boolean;
    displayName: string;
    mailNickname: string;
    userPrincipalName: string;
    passwordProfile: PasswordProfile;
    jobTitle:string;
    mobilePhone: string;
    officeLocation: string;
    mail:string;
}
export interface PasswordProfile {
    forceChangePasswordNextSignIn: boolean;
    password: string;
}
