import { TemplateRef } from '@angular/core';

export interface TableColumnDef {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  template?: TemplateRef<unknown>;
}
