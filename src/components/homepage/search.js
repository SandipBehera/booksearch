import React, { useEffect, useState } from "react";

import ErrorBoundary from "../../error-handling/ErrorBoundary";
import search from '../../images/search (1).png';
import Allbook from "./allbook";

function Search({ term, searchKeyword,onsubmit }) {
    function handleSearch(e) {
		searchKeyword(e.target.value);
	}
	function searchSubmit(e){
		e.preventDefault(); 
		onsubmit();
	}
	return (
		<div className="center" style={{marginTop:"1%"}}>
			<form onSubmit={searchSubmit}>
			<input
				className="input-field"
				type="text"
				value={term}
				placeholder="Enter the book name"
				onChange={handleSearch}
			></input>
			<button type="submit" className="btn btn-success m-lg-auto-1">Search</button>
		</form>
		</div>
	);
}
export default Search;