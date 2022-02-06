import fs from "fs/promises";
import path from "path";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "labtests.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return <p> Loading..</p>;
  }

  return {
    props: {
      labTestsList: data,
    },
  };
}

export default function Home(props) {
  const { labTestsList } = props;
  return (
    <ul>
      {labTestsList.map((test) => (
        <li key={test.profille_id}>{test.profile_name}</li>
      ))}
      <li>{labTestsList[0]["profile_id"]}</li>
      <li>{labTestsList[0]["profile_name"]}</li>
    </ul>
  );
}
