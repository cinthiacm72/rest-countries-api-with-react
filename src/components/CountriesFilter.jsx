import React from "react";

const CountriesFilter = ({ setEndpoint, initialValue }) => {
  const regions = [
    {
      name: "Filter by Region",
    },
    {
      name: "Europe",
    },
    {
      name: "Asia",
    },
    {
      name: "Africa",
    },
    {
      name: "Oceania",
    },
    {
      name: "Americas",
    },
    {
      name: "Antarctic",
    },
  ];

  const selectFilter = (e) => {
    let regionSelected = e.target.value;
    if (regionSelected === "Filter by Region") {
      regionSelected = "All";
      setEndpoint(initialValue);
    } else {
      setEndpoint(`region/${regionSelected}`);
    }
  };
  return (
    <>
      <select onChange={selectFilter} name='regions' id='regions'>
        {regions.map((region, index) => (
          <option key={index} value={region.name}>
            {region.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default CountriesFilter;
