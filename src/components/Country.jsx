import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import Borders from "./Borders";

const Country = () => {
  let { countryname } = useParams();
  const [country, setCountry] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // UseState variable to change the param name delivered from <Borders/> component
  const [changeParam, setChangeParam] = useState(countryname);

  let ApiSingleCountry = `https://restcountries.com/v3.1/name/${changeParam}?fullText=true`;

  // Actualiza la URL de la API con el nuevo parámetro que recibe desde <Borders/>
  const updateParam = () => {
    ApiSingleCountry = `https://restcountries.com/v3.1/name/${changeParam}?fullText=true`;
  };
  updateParam();

  // Fetch detales del país
  useEffect(() => {
    const SingleCountry = async () => {
      try {
        const res = await fetch(ApiSingleCountry);

        if (!res.ok) {
          const errorMsg = {
            err: true,
            status: res.status,
            statusText: !res.statusText ? "Ocurrió un error" : res.statusText,
          };

          throw errorMsg;
        }
        const data = await res.json();
        setIsPending(false);
        setCountry(data);
        setError({ err: false });
      } catch (err) {
        console.log(err);
        setIsPending(true);
        setError(error);
      }
    };
    SingleCountry();
  }, [changeParam]);

  return (
    <div className='container-fluid-1440 margin-top-lg '>
      <Link className='button fs-small padding-inline-md' to='/'>
        <i className='fa-solid fa-arrow-left '></i> Back
      </Link>

      {isPending === true ? (
        <Loader />
      ) : (
        country.map((el, index) => (
          <article
            className='details flex ai-center margin-top-md padding-bottom-xl'
            key={index}>
            <div className='details-img'>
              <img src={el.flags.svg} alt={el.name.common} />
            </div>
            <div className='details-info '>
              <h2 className='fs-x-large ff-sans-x-bold margin-bottom-md'>
                {el.name.common}
              </h2>
              <div className='flex'>
                <div>
                  {el.name.official ? (
                    <p className='margin-bottom-xs'>
                      <span className='ff-sans-bold'>Native Name: </span>{" "}
                      {el.name.official}
                    </p>
                  ) : (
                    <p></p>
                  )}

                  <p className='margin-bottom-xs'>
                    <span className='ff-sans-bold'>Population: </span>
                    {el.population.toLocaleString()}
                  </p>
                  <p className='margin-bottom-xs'>
                    <span className='ff-sans-bold'>Region: </span>
                    {el.continents}
                  </p>
                  <p className='margin-bottom-xs'>
                    <span className='ff-sans-bold'>Sub Region: </span>
                    {el.subregion}
                  </p>
                  <p className='margin-bottom-sm'>
                    <span className='ff-sans-bold'>Capital: </span>
                    {el.capital}
                  </p>
                </div>
                <div>
                  <p className='margin-bottom-xs'>
                    <span className='ff-sans-bold'>Top Level Domain: </span>
                    {el.tld}
                  </p>
                  <p className='margin-bottom-xs'>
                    <span className='ff-sans-bold'>Currencies: </span>
                    {Object.values(el.currencies)[0].name}
                  </p>
                  <p className='margin-bottom-xs'>
                    <span className='ff-sans-bold'>Languages: </span>
                    {Object.values(el.languages).map((language, index) => {
                      return <span key={index}>{language}, </span>;
                    })}
                  </p>
                </div>
              </div>
              {el.borders ? (
                <div className=' margin-top-md'>
                  <span className='ff-sans-bold'>Border Countries: </span>
                  <div className='borders margin-top-sm  fs-small'>
                    {el.borders.map((borderCode, index) => {
                      return (
                        <Borders
                          key={index}
                          borderCode={borderCode}
                          setChangeParam={setChangeParam}
                          updateParam={updateParam}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </article>
        ))
      )}
    </div>
  );
};

export default Country;
