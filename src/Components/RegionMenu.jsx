import Select from "react-select";

const options = [
  { value: "All Regions", label: "All Regions" },
  { value: "Africa", label: "Africa" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
  { value: "Americas", label: "Americas" },
];

const RegionMenu = ({
  CountriesList,
  filterCountriesList,
  searchTerm,
  setSelectedRegion,
}) => {
  const handleRegionChange = (selectedOption) => {
    const region = selectedOption.value;
    setSelectedRegion(region);

    let filtered = CountriesList;

    // filter by region
    if (region !== "All Regions") {
      filtered = filtered.filter((country) => country.region === region);
    }

    // filter by search term (if present)
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((country) =>
        country.name.official.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    filterCountriesList(filtered);
  };

  return (
    <Select
      defaultValue={options[0]}
      onChange={handleRegionChange}
      options={options}
      classNames={{
        input: () => "dark:!text-gray-100",
        singleValue: () => "dark:text-gray-100",
        control: () =>
          "flex h-12 items-center justify-between gap-12 rounded-md !border-none pl-4 pr-2 shadow dark:bg-gray-800 dark:text-gray-100 md:h-14",
        indicatorSeparator: () => "hidden",
        option: () => "hover:!text-gray-800",
        menu: () => "bg-gray-100 dark:bg-gray-800 dark:text-gray-100",
      }}
    />
  );
};

export default RegionMenu;
