import { useContext } from "react";
import { Fragment } from "react";
import FavoritesContext from "../store/favorites-context";

function ContextDemo(props) {
  const meetups = [
    {
      id: "m1",
      title: "title of m1",
      description: "description of m1",
    },
    {
      id: "m2",
      title: "title of m2",
      description: "description of m2",
    },
    {
      id: "m3",
      title: "title of m3",
      description: "description of m3",
    },
  ];

  const favoritesCtx = useContext(FavoritesContext);

  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavorite() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
      });
    }
  }

  function clickHandler(id) {
    const meetup = meetups.find((meetup) => meetup.id === id);
    favoritesCtx.addFavorite(meetup);
  }

  return (
    <Fragment>
      <ul>
        {meetups.map((meetup) => (
          <li key={meetup.id}>
            {meetup.title}- {meetup.description}
            <button onClick={clickHandler(meetup.id)}>add favorite</button>
          </li>
        ))}
      </ul>
      <p>favorite: {itemIsFavorite}</p>
    </Fragment>
  ); // for example
}

export default ContextDemo;
