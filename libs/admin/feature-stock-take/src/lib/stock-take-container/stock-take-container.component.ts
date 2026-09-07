import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CreateStockBatchComponent } from '../create-stock-batch/create-stock-batch.component';
import { StockTakeComponent } from '../stock-take/stock-take.component';

@Component({
    selector: 'pos-frontend-stock-take-container',
    templateUrl: './stock-take-container.component.html',
    styleUrls: ['./stock-take-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatTabsModule, CreateStockBatchComponent, StockTakeComponent]
})
export class StockTakeContainerComponent {
 
}
