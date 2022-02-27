module.exports = () => {
	const data = {
		products: []
	}

	for (let i = 0; i < 1000; i++) {
		data.products.push({
			id: i + 1,
			name: `Product ${i}`,
			description: `Description of product ${i}`,
			price: i * 10
		})
	}

	return data
}
