import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ManageAdUsersWebPartStrings';
import ManageAdUsers from './components/ManageAdUsers';
import { IManageAdUsersProps } from './components/Interface';
import { MSGraphClient } from '@microsoft/sp-http';

import {Provider} from 'react-redux';
import {createStore} from './components/store/store';

import { SPComponentLoader } from '@microsoft/sp-loader';
require('bootstrap');

export interface IManageAdUsersWebPartProps {
  description: string;
}

export default class ManageAdUsersWebPart extends BaseClientSideWebPart<IManageAdUsersWebPartProps> {

  private store: any;
  
  public constructor() {
    super();
    this.store = createStore();
  }

  public render(): void {
      
    let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);

    let fontCssURL = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    SPComponentLoader.loadCss(fontCssURL);

    this.context.msGraphClientFactory.getClient()
    .then((client: MSGraphClient): void => {
        const element = (
          <Provider store={this.store}>
            <ManageAdUsers description = {this.properties.description} 
            graphClient ={client} />
          </Provider>
        );
          ReactDom.render(element, this.domElement);
      });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
