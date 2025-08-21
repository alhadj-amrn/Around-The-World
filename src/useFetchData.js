import { useEffect, useState } from "react";

export const useFetchData = (country) => {
  const [result, Setresult] = useState([]);
  const [FilteredCountries, SetFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iserror, setIsError] = useState(false);

  useEffect(() => {
    if (country) {
      // If a specific country is requested → always fetch from API
      fetchDataFromAPI();
    } else {
      // If no country → try loading from cache first
      fetchDataFromLocalStorage();
    }
  }, [country]); // re-run when "country" changes

  const fetchDataFromAPI = () => {
    setIsLoading(true);
    let url =
      "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region";

    if (country) {
      url = `https://restcountries.com/v3.1/name/${encodeURIComponent(
        country
      )}?fields=name,flags,population,capital,region,subregion,tld,currencies,languages`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (country) {
          // One country → just use API result (no localStorage)
          data = [data[0]];
          Setresult(data);
          SetFilteredCountries(data);
        } else {
          // All countries → cache in localStorage
          Setresult(data);
          SetFilteredCountries(data);
          localStorage.setItem("countries", JSON.stringify(data));
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchDataFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("countries"));
    if (data) {
      Setresult(data);
      SetFilteredCountries(data);
    } else {
      fetchDataFromAPI();
    }
  };

  return {
    result,
    isLoading,
    iserror,
    FilteredCountries,
    SetFilteredCountries,
  };
};
