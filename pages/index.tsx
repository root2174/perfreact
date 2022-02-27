import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../components/SearchResults'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	const [search, setSearch] = useState('')
	const [results, setResults] = useState([])

	async function handleSearch(event: FormEvent) {
		event.preventDefault()

		if (!search.trim()) return

		const response = await fetch('http://localhost:3333/products?q=' + search)
		const data = await response.json()

		setResults(data)
	}

	const addToWithList = useCallback(async (id: number) => {
		console.log(id)
	}, [])

	return (
		<div className={styles.container}>
			<h1>Search</h1>

			<form onSubmit={handleSearch}>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button type="submit">Buscar</button>
			</form>

			<SearchResults results={results} addToWishlist={addToWithList} />
		</div>
	)
}

export default Home
