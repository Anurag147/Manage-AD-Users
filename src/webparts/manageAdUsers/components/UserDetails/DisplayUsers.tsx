import * as React from 'react';
import { showData,loadAddUsers,deleteData } from '../store/actions';
import { IApplicationState,IGraphItems } from '../Interface';
import {connect} from 'react-redux';
import { MSGraphClient } from '@microsoft/sp-http';
import styles from '../ManageAdUsers.module.scss';

export interface IStateProps {
    items: IGraphItems[];
    onShowData: (graphClient:MSGraphClient,searchTerm:string)=> {};
    onLoadAddData: () => {};
    graphClient: MSGraphClient;
    deleteData: (graphClient:MSGraphClient, id:string)=>{};
}

class Display extends React.Component<IStateProps,{}>{

    componentDidMount(){
        this.props.onShowData(this.props.graphClient,'');
    }

    private deleteUser = (id:string) => {
        if(confirm("Are you sure you want to delete this user?")){
            this.props.deleteData(this.props.graphClient,id);
        }
    }

    public render():React.ReactElement<IStateProps>{
        const divClassName = "col-xs-12";
        const allItems = this.props.items.map((item)=>{
            return (
                <div className={divClassName} style={{border:'1px solid #e8e8e8', margin:'5px', cursor:'pointer'}}>
                    <div className="col-xs-12">
                            <h2 style={{color:'#3c4573'}}>{item.displayName}</h2>
                    </div>
                    <div className="col-xs-12"><p 
                    style={{color:'#4c4e57'}}>{item.jobTitle}, {item.officeLocation}</p></div>
                    <div style={{color:'#3c4573'}}>
                        <div className="col-xs-7"><i className="fa fa-envelope"></i> {item.mail}</div>
                        <div className="col-xs-3"><i className="fa fa-phone"></i> {item.mobilePhone}</div>
                        <div className="col-xs-2" style={{textAlign:'right'}}>
                            <i style={{color:'red',marginLeft:'10px'}} 
                            className="fa fa-trash" onClick={()=>{this.deleteUser(item.id)}}></i>
                        </div>
                    </div>
                    <div className="col-xs-12" style={{height:'10px'}}>
                    </div>
                </div>
            );
        });

        return (
            <div className="col-xs-12">
                <div className="col-xs-10">         
                    <input 
                    onChange={(event)=>this.props.onShowData(this.props.graphClient,event.target.value)} 
                    type="text" 
                    style={{width:'100%',border:'1px solid #3c4573',height:'30px'}} 
                    placeholder="Enter Search Term"/>
                </div>
                <div className="col-xs-2">
                    <button className="btn btn-info"
                     onClick={()=>{this.props.onLoadAddData()}}>ADD USER</button>
                </div>            
                {allItems}
            </div>
        );
    }
}

const mapStateToProps = (state:IApplicationState) => {
    return {
        items: state.items
    };
}

const mapDispatchToProps = (dispatch:any) => {
    return{
        onShowData: (graphClient:MSGraphClient,searchTerm:string) => dispatch(showData(graphClient,searchTerm)),
        onLoadAddData: () => dispatch(loadAddUsers()),
        deleteData: (graphClient:MSGraphClient, id:string) => dispatch(deleteData(graphClient,id))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Display);

