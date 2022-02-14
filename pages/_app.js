import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { FavoritesContextProvider } from "../store/favorites-context";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <FavoritesContextProvider>
        <Component {...pageProps} />
      </FavoritesContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
