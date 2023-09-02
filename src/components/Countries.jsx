import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import CountriesFilter from "./CountriesFilter";
import CountriesSearch from "./CountriesSearch";
import Error from "./Error";

const Countries = () => {
  // UseState variables to fetch all countries
  const [countries, setCountries] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // UseState variable to change the Api url for the differents endpoints
  let initialValue = "all";
  const [endpoint, setEndpoint] = useState(initialValue);
  let ApiCountries = `https://restcountries.com/v3.1/${endpoint}`;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Fetch countries
  useEffect(() => {
    const AllCountries = async () => {
      try {
        const res = await fetch(ApiCountries);

        if (!res.ok) {
          let err = new Error("Error en la petición");
          err.status = res.status || "00";
          err.statusText = res.statusText || "Ocurrio un error";
          throw err;
        }
        const data = await res.json();
        setIsPending(false);
        setCountries(data);
      } catch (error) {
        setIsPending(true);
        setError(error);
      }
    };
    AllCountries();
  }, [endpoint]);

  // Render all countries
  return (
    <section>
      <div className='container-fluid-1440 margin-top-lg margin-bottom-lg'>
        <form className='flex jc-space-between' onSubmit={handleSubmit}>
          <CountriesSearch
            endpoint={endpoint}
            setEndpoint={setEndpoint}
            initialValue={initialValue}
            error={error}
          />
          <CountriesFilter
            endpoint={endpoint}
            setEndpoint={setEndpoint}
            initialValue={initialValue}
            error={error}
          />
        </form>
      </div>
      <div className='container-fluid-1440 grid margin-top-md padding-bottom-xl'>
        {isPending === true ? (
          <Loader />
        ) : (
          countries.map((el, index) => (
            <article className='card' key={index}>
              <Link to={`countries/${el.name.common}`}>
                <div>
                  <img src={el.flags.svg} alt={el.name.common} />
                  <div className='card__info'>
                    <h2 className='fs-large ff-sans-bold margin-bottom-sm'>
                      {el.name.common}
                    </h2>
                    <p className='margin-bottom-xs'>
                      <span className='ff-sans-bold'>Polupation: </span>
                      {el.population.toLocaleString()}
                    </p>
                    <p className='margin-bottom-xs'>
                      <span className='ff-sans-bold'>Region: </span>
                      {el.continents}
                    </p>
                    <p className='margin-bottom-xs'>
                      <span className='ff-sans-bold'>Capital: </span>
                      {el.capital}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default Countries;
