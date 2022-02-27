export type AddProductToWishlistProps = {
	onAddToWishlist: () => void
	onRequestClose: () => void
}

export function AddProductToWishlist({
	onAddToWishlist,
	onRequestClose
}: AddProductToWishlistProps) {
	return (
		<div>
			<span>
				Deseja adicionar aos favoritos?
				<button onClick={onAddToWishlist}>Yes</button>
				<button onClick={onRequestClose}>No</button>
			</span>
		</div>
	)
}
