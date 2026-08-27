import { ChangeDetectorRef, Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { CategoriesEntity, CategoriesFacade } from '@pos-frontend/categories/data-access';

@Component({
    selector: 'pos-frontend-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CategoriesListComponent {
  public isUpdate = false;
  public isCreate = false;
  public isChangeStatus = false;
  public selectedCategorie!: CategoriesEntity;

  constructor(
    public categoriesFacade: CategoriesFacade,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {}

  public getCategorieList(state: ClrDatagridStateInterface) {
    this.categoriesFacade.getPaginatedCategories(state);
  }

  refresh(isRefresh?: boolean) {
    this.isUpdate = false;
    this.isCreate = false;
    this.isChangeStatus = false;
    this.getCategorieList({}) 
  }

  updateCategorie(categorie: CategoriesEntity) {
    this.router.navigate(['./update-categorie', categorie.id], {
      relativeTo: this.route,
    });
  }

  viewCategorie(categorie: CategoriesEntity) {
    this.categoriesFacade.getCategorie(categorie.id)
    this.router.navigate(['./categorie-details', categorie.id], {
      relativeTo: this.route,
    });
  }

  changeCategorieStatus(categorie: CategoriesEntity) {
    this.selectedCategorie = categorie;
    this.isChangeStatus = true;
  }

  viewCategorieAuthorities(categorieId: any) {
    this.router.navigate(['./view-categorie', categorieId], {
      relativeTo: this.route,
    });
  }
}
