# Product Dashboard — Angular Training Reference Project

Reference solution for the **24-Hour Angular for Vue.js Developers** training (17–25 Oct 2026).
Each lab in the training plan has its own branch, so you can jump to any point, compare your
work with the reference, or catch up if you fall behind.

## Branches

| Branch | Session | Lab |
|---|---|---|
| `lab-00-start` | before S1 | Fresh `ng new` project (starting point) |
| `day1-components` | Day 1 (alt) | 9 reusable components: inputs, outputs, @if/@for/@switch, composed into a catalog page |
| `lab-01-app-shell` | S1 · Sat 17 Oct | Product Dashboard application shell |
| `lab-02-components` | S2 · Sun 18 Oct | Product List → Product Card → Product Details |
| `lab-03-signals-cart` | S2 · Sun 18 Oct | Reactive Shopping Cart (signals) |
| `lab-04-services-di` | S3 · Mon 19 Oct | ProductService, CartService, NotificationService |
| `lab-05-routing` | S4 · Tue 20 Oct | Routing, guards, lazy loading, query params |
| `lab-06-forms` | S5 · Wed 21 Oct | Login (template-driven) + Create/Edit Product (reactive) |
| `lab-07-http` | S6 · Thu 22 Oct | REST API, interceptors, global error handling |
| `lab-08-rxjs-search` | S7 · Fri 23 Oct | Debounced search with cancellation |
| `lab-09-rxjs-combine` | S8 · Sat 24 Oct | Dashboard stats (forkJoin) + combined filters (combineLatest) |
| `lab-10-state` | S8 · Sat 24 Oct | Shared User & Cart state (signal stores) |
| `lab-11a-architecture` | S8 · Sat 24 Oct | Feature-based structure, smart/presentational, environments |
| `lab-11b-loading-errors` | S9 · Sun 25 Oct | Global loading indicator, loading/error/empty pattern |
| `lab-11c-onpush-tests-build` | S9 · Sun 25 Oct | OnPush, `@defer`, unit tests, production build |
| `final-project` (= `main`) | S9 · Sun 25 Oct | Completed mini Product Management application |

```bash
git switch lab-05-routing          # jump to a lab
git diff lab-04-services-di lab-05-routing --stat   # see what a lab changed
```

## Requirements

- Node.js 22 LTS (22.12+) or 20.19+
- Angular CLI 21: `npm install -g @angular/cli@21`

## Run

```bash
npm install            # if npm 10 fails with "reading 'edgesOut'": npm install --legacy-peer-deps
npm start              # http://localhost:4200
```

From `lab-07-http` onwards the app talks to a mock REST API. Start it in a second terminal:

```bash
npm run api            # json-server on http://localhost:3000 (500 ms simulated latency)
```

Login: any username works. The username `admin` gets the admin role (from `lab-10-state`).

## Test and build

```bash
npm test -- --watch=false
npm run build
```
