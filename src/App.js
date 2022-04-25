import logo from './logo.svg';
import './App.css';
import Homepage from './components/homepage/search';
import Search from './components/homepage/search';
import ErrorBoundary from './error-handling/ErrorBoundary';
import { useEffect, useState } from 'react';
import Allbook from './components/homepage/allbook';
import axios from 'axios';
import Loading from './components/loading/loading';
import Background from './background';

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
		return <Loading></Loading>;
	}

	if (error) {
		return <pre>{JSON.stringify(error, null, 2)}</pre>;
	}

	if (!data.docs) {
		return null;
	}
	//for the on page search 
	const searchHandler = (search) => {
		setSearch(search);
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

		<div>
			 <div class="context">
				<Search term={search} searchKeyword={searchHandler} onsubmit={onsubmit} />
				<ErrorBoundary>
					<Allbook search={search} searchResults={searchResults} allData={data.docs}></Allbook>
				</ErrorBoundary>
				</div>
			<Background></Background>
		</div>
	);
}

export default App;
