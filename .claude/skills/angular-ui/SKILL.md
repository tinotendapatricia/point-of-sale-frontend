---
name: angular-ui
description: Build Angular UI for this POS workspace so it passes the repo's strict ESLint on the first run. Covers the component class layout (member order, inject(), signal inputs and outputs, OnPush), template rules, list pages on the shared BmgTable (`pos-frontend-table`), typed reactive form components, and the create/update container pages that connect a form to a SignalStore and the DrawerService. Use this skill whenever the user asks to create, scaffold, refactor, clean up or lint-fix a component, list/table/grid page, form, create/edit/update screen, drawer panel or feature page in libs/*/ui or libs/admin|client/feature-*, even if they don't say "skill". It pairs with the data-access skill: data-access builds the store, this one builds the screens that use it.
---

# Angular UI for pos-frontend

Screens here are split into three kinds of component. Each has a fixed shape, and all of them must pass the rules in `tools/angular.mjs`. Much of the existing code **doesn't pass yet**: it uses `FormBuilder`, `output<any>()`, `styleUrls: [...]`, `ChangeDetectionStrategy.Eager` and inline `style="color: green"`. Don't copy those patterns from neighbouring files. Follow this skill. When you touch an old component, bring it up to this shape.

| Kind | Lives in | Knows about | Example |
|---|---|---|---|
| **Form** (presentational) | `libs/<domain>/ui` | inputs/outputs only, no store, router or drawer | `CategoryFormComponent` |
| **Container** (create/update) | `libs/admin/feature-<domain>` | store, router, `DrawerRef` | `CreateCategoryComponent` |
| **List page** | `libs/admin/feature-<domain>` | store, `DrawerService`, `BmgTable` | `CategoriesListComponent` |

The `ui` lib may import the domain's `data-access` for **types only** (`import type { CategoryEntity } ...`). Injecting the store belongs in the feature lib.

Detailed recipes:
- `references/table.md`: list pages on `BmgTable` (columns, cell templates, pagination, empty state, drawer create).
- `references/forms.md`: typed form components plus the create/update containers that host them.

Read the one you need before writing code. Read both for a full CRUD section.

## Component class anatomy

Every component uses the same decorator and member order, so readers always know where to look.

```ts
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'pos-frontend-thing-list',          // element, kebab-case, pos-frontend- prefix
  templateUrl: './thing-list.component.html',    // relative, './' prefix
  styleUrl: './thing-list.component.scss',       // singular string, omit if there are no styles
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [/* only what the template uses */],
})
export class ThingListComponent {
  // 1. Dependencies: inject(), never constructor params
  private readonly router = inject(Router);
  protected readonly thingStore = inject(ThingStore);

  // 2. Inputs: public API, signal-based
  readonly thing = input<ThingEntity>();
  readonly loading = input(false);

  // 3. Outputs: output<T>() with a concrete type, never any
  readonly submitted = output<ThingFormValue>();

  // 4. View/content queries: signal-based
  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');

  // 5. Local state and store-derived signals
  protected readonly selectedId = signal<string | number | null>(null);
  protected readonly loadingList = this.thingStore.getPaginatedLoading;

  // 6. Derived values: computed(), plus the form group for form components
  protected readonly columns = computed<TableColumnDef[]>(() => [/* ... */]);

  // 7. Constructor: effects and initial loads only
  constructor() {
    this.thingStore.getPaginatedThings({ page: 0, size: 10 });
  }

  // 8. Template-facing handlers: protected
  protected edit(id: string | number): void { /* ... */ }

  // 9. Private helpers
  private reload(): void { /* ... */ }
}
```

Why each rule holds (the rule names are in `tools/angular.mjs`):

- **Standalone + OnPush** (`prefer-standalone`, `prefer-on-push-component-change-detection`). There's no `standalone: true` flag to add because standalone is the default. `Eager` and `Default` both fail lint.
- **`inject()` over constructor DI** (`prefer-inject`). Keep the constructor for `effect()` and kicking off loads. `ngOnInit` is fine too, but then implement `OnInit` (`use-lifecycle-interface`), don't make it `async` (`no-async-lifecycle-method`), and don't leave it empty.
- **Signals everywhere** (`prefer-signals`, `prefer-output-emitter-ref`). Use `input()`, `input.required()`, `model()`, `output()`, `viewChild()` and `contentChild()`, never `@Input`, `@Output`, `@ViewChild` or `EventEmitter`. Read signals as calls in templates, `loading()` not `loading` (`no-uncalled-signals`).
- **`readonly` on every field** (`prefer-readonly`, `prefer-output-readonly`). Signals and forms are mutated through methods, not reassigned.
- **Visibility.** Use `protected` for anything only the template uses, no modifier on inputs and outputs (they're public API), and `private` for everything else. Template-only members then can't be called from outside the component.
- **Output names** describe what happened: `submitted`, `cancelled`, `page`, `actioned`. Don't prefix with `on` and don't reuse native event names (`click`, `submit`, `change`).
- **Types.** No `any` (`no-explicit-any`). Use inline type imports (`import { type Foo, Bar } from ...`, per `consistent-type-imports`). Use `as` casts, never object-literal casts (`consistent-type-assertions`). Import operators from `'rxjs'`, not `'rxjs/operators'`.
- **Promises.** `router.navigate()` returns a promise, so prefix it with `void` when you don't await it (`no-floating-promises`).
- **Inline limits.** Inline templates may be at most 5 lines and inline styles at most 10 (`component-max-inline-declarations`). Anything larger goes in `.html`/`.scss`. `styles` must be a single template string, not an array (`consistent-component-styles`).

## Template rules

These apply to every `.html` file:

- Use built-in control flow: `@if`, `@for (x of xs(); track x.id)`, `@switch`, and `@empty` when a list can be empty (`prefer-control-flow`, `prefer-at-empty`). Don't import `NgIf` or `NgFor`, since lint bans those imports.
- Self-close elements that have no content: `<mat-spinner diameter="18" />`, `<pos-frontend-thing-form ... />` (`prefer-self-closing-tags`).
- Give every `<button>` an explicit `type="button"` or `type="submit"` (`button-has-type`).
- No inline `style="..."` (`no-inline-styles`). Use Tailwind classes (Tailwind is configured per app), a class in the component's scss, or a `[style.x]` binding for dynamic values. Icon colours go through a class such as `class="text-green-600"`, not `style="color: green"`.
- No `{{ }}` inside attribute values. Use `[attr.aria-label]="..."` or a property binding (`no-interpolation-in-attributes`). For mixed strings, use a template literal: ``[title]="`Edit ${row.name}`"`` (`prefer-template-literal`).
- Use `===`/`!==` (`template/eqeqeq`), no `$any()` (`template/no-any`), no `!(obs$ | async)`.
- Keep conditions simple. An `@if` is limited to about 4 boolean terms, so move anything bigger into a `computed()` with a good name.
- Attribute order (lint warns): structural directive → `#ref` → plain attributes → `[inputs]` → `[(two-way)]` → `(outputs)`.
- Accessibility (`templateAccessibility` preset): every form control needs an associated `<label for>` or `<mat-label>`, icon-only buttons need `aria-label`, and clickable non-button elements need key handlers and focus. Prefer a real `<button>`.

## Selectors

Components use elements with the prefix, e.g. `pos-frontend-category-form`. Directives use camelCase attributes, e.g. `[posFrontendBadge]`. File names and class names follow Nx defaults: `category-form.component.ts` exporting `CategoryFormComponent`.

## Specs

Specs don't use the real store. Provide a plain object that looks like the store: signals become zero-arg functions, and methods become `jest.fn()` or no-ops. List only the members the component touches:

```ts
providers: [
  provideRouter([]),
  provideNoopAnimations(),
  { provide: ThingStore, useValue: { paginatedThings: () => [], totalThings: () => 0, getPaginatedLoading: () => false, getPaginatedThings: jest.fn() } },
],
```

A presentational form spec needs no store at all. Set inputs with `fixture.componentRef.setInput('thing', {...})` and assert on emitted outputs. Spec files are allowed non-null assertions and floating promises.

## Workflow

1. Work out which kinds you need (form, container, list) and read the matching reference file.
2. Check the domain's `data-access` for the entity type and the store member names: the call-state collections (`createLoading`, `getPaginatedLoading`, ...) and computed values like `paginated<X>` and `total<X>`. Don't guess them. If the store doesn't exist yet, the data-access skill builds it.
3. Write the components, specs and routes. Export new `ui` components from the lib's `src/index.ts`, and import everything through `@pos-frontend/...` aliases.
4. Verify:
   ```bash
   npx nx lint <project>
   npx nx test <project>
   ```
   If you edited an existing component, fix all of its lint errors, not only the ones on lines you changed. Run `npx nx show projects` if you're unsure of a project name. Then tell the user what you verified.
