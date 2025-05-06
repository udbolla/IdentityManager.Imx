import { Component, OnInit } from '@angular/core';
import {EuiLoadingService} from '@elemental-ui/core';
import {CollectionLoadParameters, DisplayColumns, EntitySchema, IClientProperty, ValType} from 'imx-qbm-dbts';
import { DataSourceToolbarFilter, DataSourceToolbarSettings } from 'qbm';
import { QerApiService } from '../../qer-api-client.service';

@Component({
  selector: 'CCC-sample-identities',
  templateUrl: './sample-identities.component.html',
  styleUrls: ['./sample-identities.component.scss']
})
export class SampleIdentitiesComponent implements OnInit {
  public dstSettings: DataSourceToolbarSettings;
  public readonly schema: EntitySchema;
  public readonly DisplayColumns = DisplayColumns;
  public navigationState: CollectionLoadParameters = { PageSize: 20 };

  private displayedColumns: IClientProperty[] = [];

  constructor(private readonly qerApiClient: QerApiService) {
    this.schema = this.qerApiClient.typedClient.PortalPersonAll.GetSchema();
    this.displayedColumns = [
      this.schema.Columns[DisplayColumns.DISPLAY_PROPERTYNAME],
      this.schema.Columns.DefaultEmailAddress,
      {
        ColumnName: 'viewDetailsButton',
        Type: ValType.String
      }
    ];
  }

  public async ngOnInit(): Promise<void> {
    await this.navigate();
  }

  public async onNavigationStateChanged(newState?: CollectionLoadParameters): Promise<void> {
    if (newState) {
      this.navigationState = newState;
    }
    await this.navigate();
  }

  private async navigate(): Promise<void> {
    const data = await this.qerApiClient.typedClient.PortalPersonAll.Get(this.navigationState);

    this.dstSettings = {
      displayedColumns: this.displayedColumns,
      dataSource: data,
      entitySchema: this.schema,
      navigationState: this.navigationState,
    };
  }
  public async onSearch(keywords: string): Promise<void> {
    this.navigationState.StartIndex = 0;
    this.navigationState.search = keywords;
    await this.navigate();
  }
}