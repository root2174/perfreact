# PerfReact

This is a simple NextJS app that I used to study performance of React components.

## How React rerender works

1. React creates a new version of the component
2. It uses the new version to compare with the old one
3. If there is any difference, it rerenders the component

## The memo function

```js
import { memo } from 'react'

type ProductItemProps = {
	product: {
		id: number
		price: number
		name: string
	}
}

function ProductItemComponent({ product }: ProductItemProps) {
	return (
		<div>
			{product.name} - <strong>{product.price}</strong>
		</div>
	)
}

// The second argument is a function that returns a boolean. If the function
// returns true, the component will be re-rendered.
export const ProductItem = memo(
	ProductItemComponent,
	(prevProps, nextProps) => {
		return Object.is(prevProps.product, nextProps.product)
	}
)
```

The memo function receives two parameters:

1. The component to be memoized.
2. A function that returns a boolean. If the function returns true, the component will be re-rendered.

### When to use

1. Pure functional components: components that do not depend or modify the state of variables outside their scope.
2. Renders too often.
3. Re-renders with the same props.
4. The performance gains are significant when the component is medium or large size.

## useMemo

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Returns a memoized value.

Pass a “create” function and an array of dependencies. useMemo will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.

Use cases:
1. Heavy calculations.
2. Reference equality. (e.g. pass some information to children.)

## useCallback

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

Returns a memoized callback.

Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).

useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).

Use it when you want to pass a callback to a child component.

## Data Formating

ALWAYS format data when you fetch it from the server, not inside the component (return or render function)

## Dynamic import 

```js

export function Hello() {
  return <p>Hello!</p>
}

----------------------------------------------

import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() =>
  import('../components/hello').then((mod) => mod.Hello)
)

function Home() {

  async function showFormattedDate() {
    const { format } = await import('date-fns')

    format(new Date(), 'yyyy-MM-dd')
  }

  return (
    <div>
      <Header />
      <DynamicComponent />
      <p>HOME PAGE is here!</p>
    </div>
  )
}

export default Home
```

See [Dynamic import](https://nextjs.org/docs/advanced-features/dynamic-import).

Use this when you want to import a component or function from a module only when the user is going to see it/use it.

## Virtualization

If your app has a large structure of lists, tables, take a look at this lib: 
[react-virtualized](https://github.com/bvaughn/react-virtualized)

