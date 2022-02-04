import fs from "fs/promises";
import path from "path";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return <p> Loading..</p>;
  }

  return {
    props: {
      products: data.products,
    },
  };
}

export default function Home(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
      <li>{products[0]["id"]}</li>
      <li>{products[0]["title"]}</li>
    </ul>
  );
}
