import fs from "fs/promises";
import path from "path";
import { useEffect, useState, Fragment } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

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
  const [stocks, setStocks] = useState("");
  let amountsInput;

  const handleChange = (e, i) => {
    const { value, name } = e.target;
    console.log("name", name);
    console.log("value", value);
    const newSales = [...sales];
    newSales[i] = {
      ...newSales[i],
      [name]: value,
    };
    console.log("newSales", newSales);
    sales = newSales;
    console.log("sales", sales);
    return sales;
  };
  return (
    <Fragment>
      <p>
        Type to filter the list:{" "}
        <input
          id="filter"
          name="filter"
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </p>

      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Test Name</Th>
            <Th>Amounts In Stock</Th>
          </Tr>
          {sales
            .filter((f) => f.profileName.indexOf(filter) > -1)
            .map((f, index) => (
              <Tr key={f.id}>
                <Th>{f.profileName}</Th>
                <Th>
                  <input
                    type="number"
                    name="amountsInStock"
                    id="amountsInStock"
                    value={amountsInput}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Th>
              </Tr>
            ))}
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Fragment>
  );
}

export default FilterComponentLocal;
