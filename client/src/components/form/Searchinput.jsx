import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Popover } from "antd";

export default function SearchInput() {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();
  const cont = (
    <div>
      <p>Search any luxiours in old and new style furniture</p>
    </div>
  );

  const submission = async (e) => {
    e.preventDefault();
    if (!search.keywords.trim()) return;

    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/product/search/${encodeURIComponent(
          search.keywords
        )}`
      );
      setSearch({ ...search, results: data.products });
      navigate("/search");
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div>
      <form className="d-flex" onSubmit={submission} role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search for products..."
          aria-label="Search"
          value={search.keywords}
          onChange={(e) => setSearch({ ...search, keywords: e.target.value })}
        />
        <Popover content={cont}>
          <button className="btn btn-outline-dark shadow-sm" type="submit">
            Search
          </button>
        </Popover>
      </form>
    </div>
  );
}
