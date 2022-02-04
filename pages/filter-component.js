import { useEffect, useState, Fragment } from "react";

function FilterItemsPage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("http://197.45.107.206/api2/integration/tests", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);

        const transformedSales = [];
        for (const key in data.slice(0, 144)) {
          transformedSales.push({
            id: data[key].profile_id,
            profileName: data[key].profile_name, // data[key].profile_name is from the http request data, profileName is a new any name, will be used in the map object
          });
        }

        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading... </p>;
  }

  if (!sales) {
    return <p>No data yet</p>;
  }

  console.log(sales);

  return (
    <Fragment>
      <p>
        Type to filter the list:
        <input
          id="filter"
          name="filter"
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </p>
      <ul>
        {sales
          .filter((f) => f.profileName.indexOf(filter) > -1)
          .map((f) => (
            <li key={f.id}>{f.profileName}</li>
          ))}
      </ul>
    </Fragment>
  );
}
export default FilterItemsPage;

/*

 
*/
