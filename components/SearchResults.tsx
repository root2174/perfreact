import { ProductItem } from './ProductItem'
import { useMemo } from 'react'

type Product = {
	id: number
	price: number
	name: string
}

type SearchResultsProps = {
	results: Product[]
	addToWishlist: (id: number) => void
}

export function SearchResults({ results, addToWishlist }: SearchResultsProps) {
	const totalPrice = useMemo(() => {
		return results.reduce((total, product) => {
			return total + product.price
		}, 0)
	}, [results])

	return (
		<div>
			<h2>Total price: {totalPrice}</h2>
			{results.map((product) => {
				return (
					<ProductItem
						key={product.id}
						product={product}
						addToWishlist={addToWishlist}
					/>
				)
			})}
		</div>
	)
}
