import { useContext } from "react";

import FavoritesContext from "../../store/favorites-context";

function MeetupItem(props) {
  const favoritesCtx = useContext(FavoritesContext);

  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address,
      });
    }
  }

  return (
    <li>
      <div>
        <img src={props.image} alt={props.title} />
      </div>
      <div>
        <h3>{props.title}</h3>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </div>
      <div>
        <button onClick={toggleFavoriteStatusHandler}>
          {itemIsFavorite ? "Remove from Favorites" : "To Favorites"}
        </button>
      </div>
    </li>
  );
}

export default MeetupItem;
