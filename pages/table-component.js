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

function TableComponentPage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState("");
  const [stocks, setStocks] = useState("");

  function changeSingleItemStocks(stocks, id) {
    const salesItemValue = {
      id: id + 1,
      profileName: sales[id].profileName,
      amountsInStock: stocks,
    };
    sales[id] = salesItemValue;
    setSales(sales);
  }

  function handleroom(event, id) {
    const { value } = event.target;
    setStocks((stocks) =>
      stocks.map((listItem, index) =>
        index === id ? { ...listItem, stocks: value } : listItem
      )
    );
  }

  useEffect(() => {
    setIsLoading(true);
    fetch("http://197.45.107.206/api2/integration/tests")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);

        const transformedSales = [];
        for (const key in data.slice(0, 144)) {
          transformedSales.push({
            id: data[key].profile_id,
            profileName: data[key].profile_name,
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
            .map((f) => (
              <Tr key={f.id}>
                <Th>{f.profileName}</Th>
                <Th>
                  <input
                    type="number"
                    name="amountsInStock"
                    id="amountsInStock"
                    value={stocks}
                    onChange={(event) => handleroom(event, i)}
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
export default TableComponentPage;

/*

 
*/
