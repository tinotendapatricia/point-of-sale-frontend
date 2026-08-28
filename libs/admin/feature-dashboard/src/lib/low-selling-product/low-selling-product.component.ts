import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';

@Component({
    selector: 'pos-frontend-low-selling-product',
    templateUrl: './low-selling-product.component.html',
    styleUrls: ['./low-selling-product.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class LowSellingProductComponent implements OnInit {
  //data: any[] = [];
  view: [number, number] = [700, 400];
  data: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  yAxisLabel = 'Country';
  showYAxisLabel = true;
  xAxisLabel = 'Population';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  /*onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }*/

  sales$: Observable<any[]> | undefined;

  constructor(public dashboardService: DashboardService) {
    //Object.assign(this.data);
  }

  ngOnInit(): void {
    this.getLowSellingProducts();

  }

  getLowSellingProducts() {
    this.dashboardService.getLowSelling().subscribe({
      next: (res) => {
        console.log(res)
        this.data.push({
          name: res.name,
          value: res.quantitySold,
        });
      },
    });
    console.log(this.data)
  }
}
