import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ nbCarMin, onChange }) {

  return (
    <form onSubmit={onChange} className="rounded-l-full rounded-r-full text-2xl border border-black py-1 px-6 my-8 mx-auto max-w-3xl grid grid-cols-[1fr_auto]">
      <input className="border-0 bg-transparent focus:outline-0 w-full" type="search" placeholder="Search" name="search" aria-label="Search" minLength={nbCarMin} />
      <button>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}
SearchBar.propTypes = {
  nbCarMin: PropTypes.number
}
export default SearchBar;
