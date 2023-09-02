import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Borders = ({ borderCode, setChangeParam }) => {
  const [borderName, setBorderName] = useState("");

  // Fetch border countries name to replace the codes getting from the API
  useEffect(() => {
    const GetBorderName = async () => {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${borderCode}`
      );
      const data = await res.json();
      setBorderName(data[0].name.common);
    };
    GetBorderName();
  }, [borderCode]); // Fetch a new border country name each time borderCode changes

  return (
    // Path relativo para limpiar el nombre del pais de origen que recibe desde <Country/> padre. Evitando anidamiento de paths /argentina/chile para mostrar detalles de los países limítrofes
    <Link to={`../${borderName}`} relative='path'>
      <button
        className='button'
        onClick={() => setChangeParam(`${borderName}`)}>
        {borderName}
      </button>
    </Link>
  );
};

export default Borders;
