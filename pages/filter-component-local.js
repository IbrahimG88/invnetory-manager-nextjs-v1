import fs from "fs/promises";
import path from "path";
import { useEffect, useState, Fragment } from "react";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "labtests.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: data[key].profile_id,
      profileName: data[key].profile_name, // data[key].profile_name is from the http request data, profileName is a new any name, will be used in the map object
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
  };
}

function FilterComponentLocal(props) {
  const { sales } = props;
  const [filter, setFilter] = useState("");

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

export default FilterComponentLocal;
