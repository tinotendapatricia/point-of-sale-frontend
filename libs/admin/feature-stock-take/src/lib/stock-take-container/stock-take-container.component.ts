import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StockTakeServiceService } from '@pos-frontend/stock-take/data-access';
import { ProductsFacade, ProductsService } from '@pos-frontend/products/data-access'
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective } from '@clr/angular/popover/common';
import { ClrTabsModule } from '@clr/angular/layout/tabs';
import { ClrIfActive } from '@clr/angular/utils';
import { CreateStockBatchComponent } from '../create-stock-batch/create-stock-batch.component';
import { StockTakeComponent } from '../stock-take/stock-take.component';

@Component({
    selector: 'pos-frontend-stock-take-container',
    templateUrl: './stock-take-container.component.html',
    styleUrls: ['./stock-take-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrTabsModule, ClrIfActive, CreateStockBatchComponent, StockTakeComponent]
})
export class StockTakeContainerComponent {
 
}
