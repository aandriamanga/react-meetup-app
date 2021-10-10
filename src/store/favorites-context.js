import { createContext, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoriteHandler(favoriteMeetup) {
    fetch(
      `https://react-meetup-app-520de-default-rtdb.firebaseio.com/meetups/${favoriteMeetup.id}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({ isFavorite: true }),
        header: {
          'Contebt-Type': 'application/json',
        },
      }
    );
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);
    });
  }
  function removeFavoriteHandler(meetupId) {
    fetch(
      `https://react-meetup-app-520de-default-rtdb.firebaseio.com/meetups/${meetupId}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({ isFavorite: false }),
        header: {
          'Contebt-Type': 'application/json',
        },
      }
    );

    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
    });
  }

  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  useEffect(() => {
    fetch(
      'https://react-meetup-app-520de-default-rtdb.firebaseio.com/meetups.json'
    )
      .then((response) => response.json())
      .then((data) => {
        // const favoritesMeetup = [];
        for (const key in data) {
          if (data[key].isFavorite) {
            const favoriteMeetup = {
              id: key,
              ...data[key],
            };
            // favoritesMeetup.push(favoriteMeetup);
            addFavoriteHandler(favoriteMeetup);
          }
        }
      });
  }, []);

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
