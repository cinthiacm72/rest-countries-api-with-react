import React from "react";

const CountriesSearch = ({ setEndpoint, initialValue }) => {
  const searchCountry = (searchValue) => {
    if (!searchValue) {
      setEndpoint(initialValue);
    } else {
      setEndpoint(`name/${searchValue}`);
    }
  };

  return (
    <>
      <div className='form-group'>
        <input
          className=''
          type='search'
          name='search'
          id='search'
          autoComplete='off'
          placeholder='Search for a country...'
          onChange={(e) => searchCountry(e.target.value)}
        />
      </div>
    </>
  );
};

export default CountriesSearch;
