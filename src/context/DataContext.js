import { createContext, useState, useEffect } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import { format } from "date-fns";
// import api from "../api/posts";
// import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post?.body?.toLowerCase().includes(search.toLowerCase()) ||
        post?.title?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse()); // Ensure state updates
  }, [posts, search]); // Add dependencies

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
