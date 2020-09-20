import * as React from 'react';
import styles from './ManageAdUsers.module.scss';
import { IApplicationState, IManageAdUsersProps } from './Interface';
import Display from './UserDetails/DisplayUsers';
import {connect} from 'react-redux';
import AddUser from './UserDetails/AddUser';


class ManageAdUsers extends React.Component<IManageAdUsersProps, {}> {
  public render(): React.ReactElement<IManageAdUsersProps> {
    const element = this.props.isAddEnabled? <AddUser graphClient={this.props.graphClient}/>:<Display graphClient={this.props.graphClient}/>
    return <div className={styles.manageAdUsers}>{element}</div>
  }
}

const mapStateToProps = (state:IApplicationState) => {
  return {
    isAddEnabled: state.isAddEnabled
  };
}

export default connect(mapStateToProps,null)(ManageAdUsers);

