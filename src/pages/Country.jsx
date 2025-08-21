import { Link, useParams } from "react-router-dom";
import ShowMessage from "../Components/showmessage";
import { useFetchData } from "../useFetchData";

const Country = () => {
  const { country } = useParams();
  const { result, isLoading, isError } = useFetchData(country);

  if (isError) return <ShowMessage message="something went wrong" />;
  if (isLoading) return <ShowMessage message="loading countries data" />;

  const countryData = result[0]; // ✅ take first element

  if (!countryData) return <ShowMessage message="No country found" />;

  return (
    <div className="container mx-auto px-5 md:px-0">
      <Link
        className="mb-16 inline-block rounded-md bg-white p-3 md:mb-20"
        to="/"
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="call-made">
            <path
              id="Shape"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.8922 3.53553L7.07071 4.71405L3.18162 8.60313L18.0309 8.60313L18.0309 10.253L3.18162 10.253L7.07071 14.1421L5.8922 15.3206L-0.000355655 9.42809L5.8922 3.53553Z"
              fill="#111827"
            />
          </g>
        </svg>
      </Link>

      <div className="grid gap-11 lg:grid-cols-2 lg:gap-36">
        <img
          className="w-full"
          src={countryData.flags.svg}
          alt={countryData.flags.alt || countryData.name.common}
        />
        <div>
          <h1 className="mb-4 text-3xl font-extrabold lg:mb-7">
            {countryData.name.common}
          </h1>
          <div className="flex flex-col gap-8 md:gap-40 lg:flex-row">
            <div className="flex flex-col gap-5">
              <p>
                <span className="font-semibold">Population: </span>
                <span className="font-light">
                  {countryData.population.toLocaleString()}
                </span>
              </p>

              <p>
                <span className="font-semibold">Region: </span>
                <span>{countryData.region}</span>
              </p>

              <p>
                <span className="font-semibold">Sub Region: </span>
                <span>{countryData.subregion || "N/A"}</span>
              </p>

              <p>
                <span className="font-semibold">Capital: </span>
                <span>{countryData.capital?.[0] || "N/A"}</span>
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <p>
                <span className="font-semibold">Top Level Domain: </span>
                <span>{countryData.tld?.[0] || "N/A"}</span>
              </p>

              <p>
                <span className="font-semibold">Currencies: </span>
                <span className="font-thin">
                  {countryData.currencies
                    ? Object.values(countryData.currencies)
                        .map((c) => c.name)
                        .join(", ")
                    : "N/A"}
                </span>
              </p>

              <p>
                <span className="font-semibold">Languages: </span>
                <span className="font-thin">
                  {countryData.languages
                    ? Object.values(countryData.languages).join(", ")
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
