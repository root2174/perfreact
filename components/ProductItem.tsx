import { memo, useState } from 'react'
import { AddProductToWishlistProps } from './AddProductToWishList'
import dynamic from 'next/dynamic'

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() =>
	import('./AddProductToWishList').then((mod) => mod.AddProductToWishlist)
)

type ProductItemProps = {
	product: {
		id: number
		price: number
		name: string
	}
	addToWishlist: (id: number) => void
}

function ProductItemComponent({ product, addToWishlist }: ProductItemProps) {
	const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)
	return (
		<div>
			{product.name} - <strong>{product.price}</strong>
			<button onClick={() => setIsAddingToWishlist(true)}>
				Adicionar aos favoritos
			</button>
			{isAddingToWishlist && (
				<AddProductToWishlist
					onAddToWishlist={() => addToWishlist(product.id)}
					onRequestClose={() => setIsAddingToWishlist(false)}
				/>
			)}
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
