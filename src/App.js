import logo from './logo.svg';
import './App.css';
import Homepage from './components/homepage/search';
import Search from './components/homepage/search';
import ErrorBoundary from './error-handling/ErrorBoundary';
import { useEffect, useState } from 'react';
import Allbook from './components/homepage/allbook';
import axios from 'axios';

function App() {
	const [data, setData] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	//to load a default data
	useEffect(() => {
		setLoading(true);
		const fetchPosts = async () => {
			setLoading(true);
			const res = await axios.get('http://openlibrary.org/search.json?author=tolkien');
			setData(res.data);
			setLoading(false);
		};

		fetchPosts();
	}, []);

	if (loading) {
		return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
	}

	if (error) {
		return <pre>{JSON.stringify(error, null, 2)}</pre>;
	}

	if (!data.docs) {
		return null;
	}

	let x = data.docs;
	let y = data.docs;
	//for the on page search 
	const searchHandler = (search) => {
		setSearch(search);
		setSearchResults();
		if (search !== "") {
			const newBooksList = y.filter((i) => {
				return Object.values(i)
					.join(" ")
					.toLowerCase()
					.includes(search.toLowerCase());
			});

			setSearchResults(newBooksList);
		}
		else {
			setSearchResults(y);
		}

	};

	//when an search entry is not found on the on page search user can do search by clicking on the submit button.
	const onsubmit = () => {
		setSearchResults();
		const fetchPosts = async () => {
			setLoading(true);
			const res = await axios.get('http://openlibrary.org/search.json?q=' + search);
			setData(res.data);
			setLoading(false);
			setSearchResults(res.data.docs);
		};
		fetchPosts();
	}

	return (
		<div className="container">
			<Search term={search} searchKeyword={searchHandler} onsubmit={onsubmit} />
			<ErrorBoundary>
				<Allbook search={search} searchResults={searchResults} x={x}></Allbook>
			</ErrorBoundary>
		</div>
	);
}

export default App;
