import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';
import { ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
    selector: 'pos-frontend-adjustment-vs-batch',
    templateUrl: './adjustment-vs-batch.component.html',
    styleUrls: ['./adjustment-vs-batch.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReportsFormComponent]
})
export class AdjustmentVsBatchComponent implements OnDestroy {


  loading=false;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(private reportsService: ReportsService) {}
 

  getPdf(details:any) {
    this.loading=true
    this.sub1 = this.reportsService.getCurrentStockListings().subscribe({
      next:()=>{
        this.loading = false
      },
      error:()=>{
        this.loading = false
      }
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

}

