# Forms and the containers that host them

A form has two layers:

- **Form component** in `libs/<domain>/ui`: owns the `FormGroup`, validation and markup. It takes an optional entity to edit and emits a typed value. It knows nothing about the store, router or drawer, which is why one form serves both the create drawer and the update page.
- **Container** in `libs/admin/feature-<domain>`: injects the store, passes `loading` down, and turns `submitted` into a store call whose callback closes the drawer or navigates.

## Form component

```ts
// libs/things/ui/src/lib/thing-form/thing-form.component.ts
import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { ThingEntity } from '@pos-frontend/things/data-access';

/** What the form emits: only the fields the user edits, never id or audit fields. */
export type ThingFormValue = Pick<ThingEntity, 'name' | 'code' | 'price'>;

@Component({
  selector: 'pos-frontend-thing-form',
  templateUrl: './thing-form.component.html',
  styleUrl: './thing-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
})
export class ThingFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly thing = input<ThingEntity>();
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<ThingFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    code: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
  });

  constructor() {
    // Edit mode: reset() rather than patchValue() so the form is also pristine/untouched again.
    effect(() => {
      const thing = this.thing();
      if (thing) {
        this.form.reset({ name: thing.name, code: thing.code, price: thing.price });
      }
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}
```

Rules behind this shape:

- **`NonNullableFormBuilder`, never `FormBuilder`.** Lint bans `inject(FormBuilder)`. With the non-nullable builder, `reset()` returns each control to its initial value instead of `null`, and `getRawValue()` is typed exactly (`{ name: string; code: string; price: number }`), so it can be emitted as `ThingFormValue` without a cast.
- **Nullable or union controls need an explicit type.** Use `this.fb.control<number | null>(null, Validators.required)` for a select that starts empty, and `this.fb.control<string[]>([])` for multi-selects. Otherwise the type is inferred from the initial value.
- **Nested structures** use `this.fb.group({...})` inside the group and `this.fb.array([...])` for line items. A line-item row factory is a private method returning `this.fb.group({...})`.
- **Access controls through `form.controls.name`**, never `form.get('name')`. The string form is banned by lint and loses the type. For a read-heavy template, alias with `protected readonly controls = this.form.controls;`.
- **Validators live in TypeScript**, not as `required`/`maxlength` attributes. The attributes add a second validator, and the TS side is the one that's typed and testable. `MatInput` picks up `Validators.required` for `aria-required` on its own. Custom validators go in `@pos-frontend/shared/utils` (`validators.ts`).
- **Emit a form-value type, not the entity.** The form doesn't own `id`, `createdAt` and so on. The update container merges the id back in, so an edit form can't accidentally send a stale audit field.
- **No `output<any>()`.** Name outputs `submitted`/`cancelled`, not `formValue`/`closeModal`.
- **`loading` disables submit**, and the container feeds it from the store's call state (`createLoading`, `updateLoading`).

## Form template

The form is a real `<form>` with `(ngSubmit)`, so Enter submits and the submit button is `type="submit"` inside it. Labels follow the existing visual pattern: an external `<label for>` with a required marker above a `mat-form-field`.

```html
<form class="thing-form" [formGroup]="form" (ngSubmit)="submit()">
  <div class="field">
    <label class="field-label" for="thing-name">Name<span class="required-marker">*</span></label>
    <mat-form-field class="full-width" subscriptSizing="dynamic">
      <input id="thing-name" matInput type="text" formControlName="name" />
      @if (form.controls.name.hasError('required')) {
        <mat-error>Name is required</mat-error>
      } @else if (form.controls.name.hasError('maxlength')) {
        <mat-error>Name must be 100 characters or fewer</mat-error>
      }
    </mat-form-field>
  </div>

  <div class="field">
    <label class="field-label" for="thing-code">Code<span class="required-marker">*</span></label>
    <mat-form-field class="full-width" subscriptSizing="dynamic">
      <input id="thing-code" matInput type="text" formControlName="code" />
      @if (form.controls.code.hasError('required')) {
        <mat-error>Code is required</mat-error>
      }
    </mat-form-field>
  </div>

  <div class="field">
    <label class="field-label" for="thing-price">Price<span class="required-marker">*</span></label>
    <mat-form-field class="full-width" subscriptSizing="dynamic">
      <input id="thing-price" matInput type="number" min="0" formControlName="price" />
      @if (form.controls.price.hasError('min')) {
        <mat-error>Price cannot be negative</mat-error>
      }
    </mat-form-field>
  </div>

  <div class="mt-4 flex justify-end gap-2">
    <button type="button" mat-stroked-button [disabled]="loading()" (click)="cancelled.emit()">Cancel</button>
    <button type="submit" mat-flat-button [disabled]="loading()">
      @if (loading()) {
        <mat-spinner diameter="18" />
      } @else {
        {{ submitLabel() }}
      }
    </button>
  </div>
</form>
```

`mat-error` only shows once the control is touched, and `markAllAsTouched()` in `submit()` makes every error appear on a failed submit.

Selects use `<mat-select formControlName="...">` with `@for (opt of options(); track opt.id) { <mat-option [value]="opt.id">{{ opt.name }}</mat-option> }`, where the options arrive as an `input.required<Option[]>()` from the container. `ng-select` is also available for searchable selects.

Field styles go in `thing-form.component.scss`, the same block the existing forms use (`.thing-form` flex column, `.full-width`, `.field`, `.field-label`, `.required-marker`). Copy it from `libs/categories/ui/src/lib/category-form/category-form.component.scss`.

Export the component **and** `ThingFormValue` from `libs/things/ui/src/index.ts`.

## Create container: works in a drawer or as a route

```ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { injectDrawerRef } from '@pos-frontend/core';
import { ThingStore } from '@pos-frontend/things/data-access';
import { ThingFormComponent, type ThingFormValue } from '@pos-frontend/things/ui';

@Component({
  selector: 'pos-frontend-create-thing',
  template: `<pos-frontend-thing-form [loading]="submitting()" (cancelled)="close(false)" (submitted)="create($event)" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThingFormComponent],
})
export class CreateThingComponent {
  private readonly router = inject(Router);
  // null on the routed /things/new page; present when opened through DrawerService.
  private readonly drawerRef = injectDrawerRef<boolean>({ optional: true });
  private readonly thingStore = inject(ThingStore);

  protected readonly submitting = this.thingStore.createLoading;

  protected create(value: ThingFormValue): void {
    this.thingStore.createThing({ data: value, callback: () => this.close(true) });
  }

  protected close(created: boolean): void {
    if (this.drawerRef) {
      this.drawerRef.close(created);
    } else {
      void this.router.navigate(['/things']);
    }
  }
}
```

The store shows the success/failure toast and calls `callback` only on success, so the container doesn't toast or handle errors itself. If the store's create method is typed to the full entity, change the store to take the form value (see the data-access skill). Don't cast.

Set `disableClose: true` in the `drawer.open()` config only for long forms where losing input would hurt.

## Update container: loads by route id

The update page owns fetching its entity, so a hard refresh on `/things/update/42` works. The list page only navigates.

```ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ThingStore } from '@pos-frontend/things/data-access';
import { ThingFormComponent, type ThingFormValue } from '@pos-frontend/things/ui';

@Component({
  selector: 'pos-frontend-update-thing',
  templateUrl: './update-thing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardContent, ThingFormComponent],
})
export class UpdateThingComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly thingStore = inject(ThingStore);

  protected readonly submitting = this.thingStore.updateLoading;

  constructor() {
    const id = this.route.snapshot.paramMap.get('thingId');
    if (id) {
      this.thingStore.getThing({ id });
    }
  }

  protected update(value: ThingFormValue): void {
    const current = this.thingStore.thing();
    if (!current) {
      return;
    }
    this.thingStore.updateThing({
      data: { ...current, ...value },
      callback: () => void this.router.navigate(['/things']),
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/things']);
  }
}
```

```html
<mat-card>
  <mat-card-content>
    <h1 class="mb-4 text-2xl font-bold">Update Thing</h1>
    @if (thingStore.getOneLoading()) {
      <p class="text-gray-600">Loading…</p>
    } @else {
      <pos-frontend-thing-form
        submitLabel="Save"
        [loading]="submitting()"
        [thing]="thingStore.thing()"
        (cancelled)="cancel()"
        (submitted)="update($event)"
      />
    }
  </mat-card-content>
</mat-card>
```

Guard for `undefined` in the class rather than passing `thingStore.thing()!` to the form. The non-null assertion warns in lint and hides the real case where the load failed.

The app's router doesn't enable `withComponentInputBinding()`, so route params come from `ActivatedRoute`, not from `input()`.

## Routes

```ts
export const ADMIN_FEATURE_THINGS_ROUTES: Routes = [
  { path: '', component: ThingsListComponent },
  { path: 'new', component: CreateThingComponent },
  { path: 'update/:thingId', component: UpdateThingComponent },
];
```

The store is `providedIn: 'root'`, so there's no `providers:` entry here.

## Specs

```ts
// form, no providers needed beyond animations
// typed declaration, not `{...} as ThingEntity`: object-literal assertions are a lint error, specs included
const thing: ThingEntity = { id: 1, name: 'A', code: 'A1', price: 5, createdAt: '', updatedAt: '' };
fixture.componentRef.setInput('thing', thing);
fixture.detectChanges();
const emitted = jest.fn();
fixture.componentInstance.submitted.subscribe(emitted);
fixture.nativeElement.querySelector('button[type=submit]').click();
expect(emitted).toHaveBeenCalledWith({ name: 'A', code: 'A1', price: 5 });
```

For a container, mock the store with only the members it touches, e.g. `{ createLoading: () => false, createThing: jest.fn() }`, and assert that `createThing` was called with `{ data, callback: expect.any(Function) }`.
