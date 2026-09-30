---
name: data-access
description: Generate the Angular data-access layer for a resource  format, made up of the model file, a service that wraps the shared ApiService with one method per backend endpoint, an NgRx SignalStore (withCallState, withDevtools, withReset, rxMethod, and toasts), and a service spec. Use this skill whenever the user asks to create, scaffold, add, or extend an Angular service, store, SignalStore, model, entity, or data-access layer for a resource, gives a list of backend endpoints to wire up, or asks for "the service/store for products/customers/etc.", even if they don't say the word "skill".
---

# Angular data-access layer

Every resource gets the same three files, so a developer can open any feature and immediately know where things are. The layers have strict jobs:

- **Model:** types only.
- **Service:** a thin map of the backend API. It calls the shared `ApiService`, returns Observables, and holds no state.
- **Store:** owns state, loading and error tracking, toasts, and success callbacks. Components talk to the store, not the service.

Export the model, service, and store from the feature's `data-access/src/lib` folder from the index file. 
Remove anything which is not any of the above files, and don't add any extra files like a module or index barrel. The workspace's `tsconfig.base.json` paths already make the files importable without an index.

## What to gather first

Work these out from the user's message, the open files, or the repo. Only ask about what you truly can't infer:

1. **Resource name.** It gives the entity (`ProductEntity`), service (`ProductService`), store (`ProductStore`), and base path (`/products`).
2. **Entity fields.** Get them from the backend DTO or the user. If the model file already exists, import from it and add only the missing types.
3. **Endpoints.** For each one: HTTP method, path, request body, and response shape. Use paths exactly as the backend defines them, including trailing slashes (`/products/create/`), because normalising them silently breaks calls.
4. **Location and scopes.** Put the files in the feature's data-access folder, following the existing structure. Check `tsconfig.base.json` paths for the import scopes. The defaults are `ApiService` and `Page` from `@pos-frontend/shared/data-access`, and `BaseEntity`, `ToastService` and `RxMethodInputWithCallback` from `@pos-frontend/core`.

If the user gives only a resource name and no endpoints, generate the standard CRUD set and say which endpoints you assumed.

## File layout

```
<feature>/data-access/src/lib/
├── <singular>.model.ts          # ProductsEntity, filters, request types
├── <singular>.service.ts        # ProductsService
└── <singular>.store.ts          # ProductStore
```

File names should be singular (`product.service.ts`) while the entity and service class are  singular (`ProductEntity`, `ProductService`) and the store is singular (`ProductStore`). 

## 1. Model (`assets/model.template.ts`)

- The entity is `export interface <Plural>Entity extends BaseEntity`. `BaseEntity` supplies `id`, so don't redeclare it.
- Keep nested helper types (like `Period`) unexported when only the model uses them, and export them if another file needs them.
- Add a `<Singular>Filters` interface with all fields optional for the paginated endpoint.
- Give payloads that aren't the full entity their own request type (`UpdateCostRequest`). If the fields aren't known, add the known ones with a `// TODO: confirm fields with backend` comment. Never use `any`.

## 2. Service (`assets/service.template.ts`)

- Use `@Injectable({ providedIn: 'root' })` with `private readonly apiService = inject(ApiService);`. The workspace lint config enforces `prefer-inject` and `prefer-readonly`, so don't use constructor injection.
- Every method returns the `apiService` call directly: no `subscribe`, `pipe`, or `catchError`.
- Always pass the response type (`get<Page<ProductsEntity>>`, `post<ProductsEntity>`).
- `HttpParams` `fromObject` rejects `undefined` values. Before adding the template's local `toParams` helper, search the shared data-access lib for an existing one (`toHttpParams`, `buildParams`, or similar) and use that if it exists.

Methods go in this order:

| Order | Method | HTTP | Path pattern | Returns |
|---|---|---|---|---|
| 1 | `getPaginated<Plural>(filters?)` | GET | `/<resource>/paginated` | `Page<Entity>` |
| 2 | `create<Singular>(details)` | POST | `/<resource>/create/` | `Entity` |
| 3 | custom actions, e.g. `break<Singular>(details)` | as given | as given | as given |
| 4 | `get<Singular>(id: string \| number)` | GET | `/<resource>/${id}` | `Entity` |
| 5 | `update<Singular>(details)` | PUT | `/<resource>/update/${details.id}` | `Entity` |
| 6 | other updates, e.g. `updateCost(details)` | as given | as given | as given |
| 7 | `delete<Singular>(id: string \| number)` | DELETE | `/<resource>/${id}` | as ApiService returns |
| 8 | `getAll<Plural>()` | GET | `/<resource>/all` | `Entity[]` |

Name custom actions verb-first, after what the backend does (`breakProduct`, `approveLoan`), not after the HTTP method.

## 3. Store (`assets/store.template.ts`)

Follow the template exactly. Its structure is:

**Features in this order:** `{ providedIn: 'root' }`, `withState<State>(initialState)`, `withDevtools('<plural, lowercase>')`, `withReset()`, `withCallState({ collections: [...] })`, `withComputed`, `withMethods`.

**State** always has three keys: `<singular>` (selected item, `| undefined`), `<plural>` (full list, `[]`), and `<plural>Page` (`Page<Entity> | undefined`). `withComputed` derives `paginated<Plural>` (`page.content ?? []`) and `total<Plural>` (`page.totalElements ?? 0`).

**Call-state collections** map to store methods like this:

| Store method | Collection |
|---|---|
| `getPaginated<Plural>` | `getPaginated` |
| `getAll<Plural>` | `getMany` |
| `get<Singular>` | `getOne` |
| `create<Singular>` | `create` |
| `update<Singular>` | `update` |
| custom action, e.g. `break<Singular>` | the verb, e.g. `break` |
| secondary updates (`updateCost`, `updatePrice`) | `update` |
| `delete<Singular>` | `delete` |

Secondary updates share `update` in the existing code. If the UI can run two of them at the same time (for example a cost and a price dialog open together), give each its own collection so one spinner doesn't reflect the other's state, and mention that choice to the user.

**Method rules:**
- Each store method is an `rxMethod` that calls the matching service method, and list methods in the template's order.
- **Reads** (`getPaginated`, `getAll`, `get`) use `switchMap`, because a newer request should cancel the stale one. They show no toast and take no callback. Their inputs are `<Singular>Filters | void`, `void`, and `{ id: string | number }` respectively.
- **Writes** (create, update, custom actions, delete) use `exhaustMap`, so a double-click can't submit twice. Their input is `RxMethodInputWithCallback<T>`, where `T` is exactly the service method's parameter type (for example `UpdateCostRequest`, not the entity). On success they patch state, call `toast.success('<Entity> <past-tense verb> successfully')`, then call `request.callback()`. On error they call `setError` and `toast.warning('Failed to <verb> <entity>')`.
- Every method sets `setLoading(collection)` in a `tap` first, then `setLoaded` or `setError` inside `tapResponse`.
- Delete patches `{ <singular>: undefined }`, clearing the selected item.
- Store the returned entity as the selected item after writes (`{ product }`).


## Before finishing

Check the generated code against this list:

- The file and class names follow the singular/plural convention above.
- There is no `any` and no constructor injection.
- Type-only imports use `import type`, which the workspace lint config requires.
- The service returns the `apiService` calls directly, and every service method has a matching store method and spec test.
- Reads use `switchMap`, writes use `exhaustMap`, and every write toasts and calls its callback.
- Each store write's input type matches the service parameter type.

Then tell the user which endpoints were assumed rather than given, and which request types have TODO fields.