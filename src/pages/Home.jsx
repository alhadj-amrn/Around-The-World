import { useEffect, useState } from "react";
import CountryList from "../Components/CountryList";
import Header from "../Components/Header";
import RegionMenu from "../Components/RegionMenu";
import SearchInput from "../Components/SearchInput";
import ShowMessage from "../Components/showmessage";
import { useFetchData } from "../useFetchData";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const {
    result,
    isLoading,
    iserror,
    FilteredCountries,
    SetFilteredCountries,
  } = useFetchData();
  const applyFilters = (countries, region, search) => {
    let filtered = countries;

    if (region !== "All Regions") {
      filtered = filtered.filter((country) => country.region === region);
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((country) =>
        country.name.official.toLowerCase().includes(search.toLowerCase())
      );
    }

    SetFilteredCountries(filtered);
  };
  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilters(CountriesList, selectedRegion, term);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    applyFilters(CountriesList, region, searchTerm);
  };

  return (
    <>
      {!isLoading && !iserror && (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between md:h-14 w-full">
            <div className="flex-1">
              <SearchInput
                CountriesList={result}
                filterCountriesList={SetFilteredCountries}
                selectedRegion={selectedRegion}
              />
            </div>
            <div className="flex-1 flex justify-center"></div>
            <div className="flex-1 flex justify-end">
              <RegionMenu
                CountriesList={result}
                filterCountriesList={SetFilteredCountries}
                searchTerm={searchTerm}
                setSelectedRegion={setSelectedRegion}
              />
            </div>
          </div>
          <CountryList data={FilteredCountries} />

          <div className="container mx-auto px-5 md:px-0">
            {iserror && <ShowMessage message="something went wrong" />}
            {isLoading && <ShowMessage message="loading countries data" />}
          </div>
        </>
      )}
    </>
  );
};
export default Home;
