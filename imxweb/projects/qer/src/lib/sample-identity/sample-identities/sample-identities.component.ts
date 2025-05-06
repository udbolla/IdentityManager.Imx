import { Component, OnInit } from '@angular/core';
import {EuiLoadingService} from '@elemental-ui/core';
import {CollectionLoadParameters, DisplayColumns, EntitySchema, IClientProperty, ValType} from 'imx-qbm-dbts';
import { DataSourceToolbarFilter, DataSourceToolbarSettings } from 'qbm';
import { QerApiService } from '../../qer-api-client.service';
import { OverlayRef } from '@angular/cdk/overlay';

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
  private filterOptions: DataSourceToolbarFilter[];

  constructor(private readonly qerApiClient: QerApiService,private readonly busyService: EuiLoadingService) {
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
  public async onSearch(keywords: string): Promise<void> {
    this.navigationState.StartIndex = 0;
    this.navigationState.search = keywords;
    await this.navigate();
  }
  public async ngOnInit(): Promise<void> {
    this.filterOptions = (await this.qerApiClient.client.portal_person_all_datamodel_get())?.Filters;
    await this.navigate();
  }

  public async onNavigationStateChanged(newState?: CollectionLoadParameters): Promise<void> {
    if (newState) {
      this.navigationState = newState;
    }
    await this.navigate();
  }

  private async navigate(): Promise<void> {
    let busyIndicator: OverlayRef = this.busyService.show();
    try {
    const data = await this.qerApiClient.typedClient.PortalPersonAll.Get(this.navigationState);

    this.dstSettings = {
      displayedColumns: this.displayedColumns,
      dataSource: data,
      entitySchema: this.schema,
      navigationState: this.navigationState,
      filters: this.filterOptions,
    };
  } finally {
    this.busyService.hide(busyIndicator);
  }
}
}