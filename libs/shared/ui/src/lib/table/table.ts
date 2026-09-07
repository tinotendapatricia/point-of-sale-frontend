import { LowerCasePipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input, output, viewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableColumnDef } from './table.types';

@Component({
  selector: 'pos-frontend-table, [pos-frontend-table]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ MatTableModule, MatPaginator, NgTemplateOutlet, MatCard, MatIcon, LowerCasePipe, MatButton],
  templateUrl: './table.html',
  styles: [
    `
      :host {
        display: block;
        mat-card {
          .mat-mdc-table,
          .mat-mdc-paginator {
            background-color: var(--card);
          }
        }
      }
    `,
  ],
})
export class BmgTable<T> {
  public readonly loading = input<boolean>(false);
  public readonly paginated = input<boolean>(false);
  public readonly tplPagination = input<boolean>(false);
  public readonly caption = input<string>('Data');
  public readonly data = input.required<MatTableDataSource<T>>();
  public readonly columns = input.required<TableColumnDef[]>();
  public readonly total = input<number>(0);
  public readonly footer = input<boolean>(false);
  public readonly type = input<'default' | 'card'>('card');
  public readonly action = input<boolean>(false);

  public readonly page = output<PageEvent>();
  public readonly actioned = output<void>();

  protected readonly paginator = viewChild<MatPaginator>(MatPaginator);

  protected readonly dataSource = computed(() => {
    const source = this.data();
    if (this.loading() && !source.data.length) {
      return new MatTableDataSource<T>(Array.from({ length: 10 }));
    }
    return source;
  });

  protected readonly displayedColumns = computed(() => this.columns().map(def => def.key));

  constructor() {
    // Wire the data source's built-in paginator once the view query resolves.
    // Kept out of the dataSource computed so that computed stays a pure derivation.
    effect(() => {
      const paginator = this.paginator();
      if (this.tplPagination() && paginator) {
        this.data().paginator = paginator;
      }
    });
  }
}
