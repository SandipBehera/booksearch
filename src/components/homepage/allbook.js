import axios from "axios";
import React, { useState } from "react";
import ErrorBoundary from "../../error-handling/ErrorBoundary";
import Pagination from "../pagination/paginate";
import Authorbooks from "./Authorbooks";
import "./sidebar.scss";

function Allbook({ search, searchResults, loading, x }) {
    let gdata = [];
    const [colsize, setColsize] = useState('col-md-12');
    const [showsiebar, setshowsidebar] = useState("open");
    const [styl, setStyle] = useState("menu");
    const [authorname, SetAuthorname] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    if (loading) {
        return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
    }
    //check if any search key are entred or not
    if (search.length < 1) {
        gdata = x;
    }
    else {
        gdata = searchResults;
    }
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = gdata.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    //show or hide authors sidebar by clicking on the Author name in the list
    const sidebar = (author) => {

        switch (showsiebar) {
            case "open":
                setshowsidebar("close");
                setStyle("menu active");
                const fetchPosts = async () => {
                    const res = await axios.get('https://openlibrary.org/search/authors.json?q=' + author);
                    SetAuthorname(res.data);
                };

                fetchPosts();
                document.getElementById("mySidenav").style.width = "250px";
                document.getElementById("main").style.marginLeft = "250px";
                break;
            case "close":
                setshowsidebar("open");
                setStyle("nomenu");
                SetAuthorname("");
                document.getElementById("mySidenav").style.width = "0px";
                document.getElementById("main").style.marginLeft = "0px";
                break;
        }
    }
    console.log(authorname);
    return (
        <div className="container">
            <div id="mySidenav" class="sidenav">
                <ErrorBoundary>
                    {authorname != "" ? (
                        <Authorbooks authorname={authorname} impstyle={styl}></Authorbooks>
                    ) : (
                        <div>
                            &nbsp;
                        </div>

                    )}

                </ErrorBoundary>
            </div>
            <div id="main">

                <ul className="list">
                    {currentPosts.map((item, i) => {
                        return (
                            <li key={i} className="list-item card">
                                <i className="fa fa-book"></i>
                                &nbsp;
                                {item.title}<br />
                                {item.author_name.length > 2 ? (
                                    <p style={{ fontSize: "12px" }}>Author:
                                        {item.author_name.map((author, j) =>
                                            <a href='javascript:void(0)' style={{ color: "white" }} onClick={() => sidebar(author)} key={j}>
                                                {author},
                                            </a>
                                        )}
                                    </p>
                                ) : (
                                    <p style={{ fontSize: "12px" }}>Author:
                                        <a href='javascript:void(0)' style={{ color: "white" }} onClick={() => sidebar(item.author_name)}>
                                            {item.author_name}
                                        </a>
                                    </p>
                                )}
                                <p style={{ fontSize: "12px" }}>{item.lcc_sort}</p>
                            </li>
                        );
                    })}
                </ul>
                <Pagination postsPerPage={postsPerPage} totalPosts={gdata.length} paginate={paginate}></Pagination>
            </div>
        </div>
    );

}
export default Allbook;