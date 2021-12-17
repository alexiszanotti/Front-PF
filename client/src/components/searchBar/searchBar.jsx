import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { searchProducts } from "../../Redux/Actions";
import Styles from "./searchBar.css";

export default function SearchBar({setCurrentPage}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = e => {
    e.preventDefault(e);
    setName(e.target.value);
  };

  useEffect(() => {
    setCurrentPage(1);
    dispatch(searchProducts(name));
  }, [dispatch, name, setCurrentPage]);


  return (
    <div>
      <form className={Styles.form}>
        <button className={Styles.button} type='submit'>
          <SearchIcon />
        </button>
        <input
          className={Styles.input}
          onChange={e => handleInputChange(e)}
          type='text'
          name='text'
          placeholder='Buscar...'
          color="secondary"
        />
      </form>
    </div>
  );
}
