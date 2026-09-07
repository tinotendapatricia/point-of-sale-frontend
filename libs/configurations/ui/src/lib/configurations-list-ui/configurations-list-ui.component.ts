import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { ConfigurationsEntity } from '@pos-frontend/configurations/data-access';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'pos-frontend-configurations-list-ui',
    templateUrl: './configurations-list-ui.component.html',
    styleUrls: ['./configurations-list-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule]
})
export class ConfigurationsListUiComponent implements AfterViewInit {
  @Input() set configurationsList(value: ConfigurationsEntity[]) {
    this.dataSource.data = value ?? [];
  }
  @Input() loading = false;
  @Input() placeholderMessage = '';
  @Output() updateSelected = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly displayedColumns = ['stationNumber', 'stationName', 'printerName', 'copies', 'createdBy', 'createdAt', 'actions'];
  readonly pageSizeOptions = [10, 25, 50];
  readonly dataSource = new MatTableDataSource<ConfigurationsEntity>([]);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
