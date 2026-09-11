# Product Catalog App

A small React Native app that shows products from the DummyJSON API, with pagination, search, and a detail screen.

## Why React Native ?
I used React Native because one codebase covers both iOS and Android, and it is the stack I have shipped apps in before.

## How to run

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go on your phone. No API key is needed.

## Stack

- React Native with Expo
- TypeScript
- React Navigation (native stack)
- `fetch` for network calls

I did not use a state management library. The app has two screens, so React hooks were enough. Redux here would be more setup than the app needs.

## Architecture

Two layers, with hooks sitting in between.

```
src/
  data/     productsApi.ts, types.ts
  hooks/    useProducts.ts, useProduct.ts
  ui/       screens/
```

**`data/`** has all the API calls and the types for what comes back. There is no React in this folder, so it can be tested on its own.

**`hooks/`** holds the state. One hook per screen: `useProducts` for the list, `useProduct` for the detail page. The hooks call the API and pass the result to the screens.

**`ui/`** has the screens. They only draw things. They never call the API and never build a URL.

### How I handle the four states

Each screen keeps its state as one value that can only be in one shape at a time:

```ts
type ProductState =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "error"; message: string }
  | { status: "success"; products: ApiProduct[] };
```

The other option is separate `isLoading`, `error` and `products` variables. But that lets you end up in states that make no sense, like loading and errored at the same time, and the screen has to check several things to work out what to show.

With one value the screen checks `status` once and draws one of four things. TypeScript helps here too: it will not let me read `state.products` until I have handled the other three cases first. So if I forget a state, the app will not build instead of showing a blank screen.

### Search

Search uses the API's search endpoint instead of filtering the products already on the phone.

The list only holds 20 products at a time out of about 200. Filtering on the phone would only search those 20 and miss the rest, and the user would have no way of knowing results were missing. That makes it a bug, not just a slower option.

The search waits 400ms after you stop typing, so typing a word sends one request instead of one per letter.

### Pagination

The API sends back a `total` with every page. The hook keeps track of how far down the list you are and stops asking for more once it reaches the total.

Loading a new page adds to what is already there. Clearing the search starts fresh instead of adding, which fixed a bug where old search results stayed stuck at the top.

Pagination is also turned off while you are searching. A search with only a few results is short enough to fit on screen, so the list thought you had scrolled to the bottom and started adding normal products underneath. I found this by searching "apple".

### Where the search bar sits

The search bar is outside the state handling, so it stays on screen while loading, on an error, and when nothing is found. At first it disappeared when a search found nothing, which meant you could not fix your own typo.

### Error messages

The screens show a simple message instead of the real error. The real one is a long native error with a file path in it, which is useful in a log but not to someone looking at a product list.

## What I did not finish

- No unit test. The API response handling and the search timing would be the first things to cover.
- No pull-to-refresh.
- No placeholder while images load, and no handling if an image fails.
- If loading a new page fails while scrolling, the whole list is replaced by the error screen. It should keep the products already loaded and only show the error for the new page.
- If a slow search result comes back after a newer one, it could still overwrite it. Cancelling the old request would fix it.
- Navigation props are typed as `any` instead of properly typed.

## AI usage

I used AI for guidance on structure and approach, for help fixing a module resolution problem, and for help writing this README.

I wrote the code myself and can explain any part of it and why it is built this way.