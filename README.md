# somoto

> A SolidJS port for [Sonner](https://github.com/emilkowalski/sonner).

For demonstration, please visit The [site](https://oc1s.github.io/somo/).

## Quick start

### Install:

```bash
npm i somoto
# or
yarn add somoto
# or
pnpm add somoto
# or
bun add smoto
```

### Usage:

```jsx
import { Toaster, toast } from 'somoto';

function App() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast('Toast for you!')}>Give me a toast</button>
    </div>
  );
}
```

## Documentation

Find API references in the [doc](https://oc1s.github.io/somo/getting-started/).
