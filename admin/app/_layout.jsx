import { Slot } from "expo-router";
import Header from "../src/components/Header";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useCachedResources from "../src/hooks/useCachedResources";

const theme = {
  ...DefaultTheme,
  roundness: 10, // Change this value to modify the size
};

const HomeLayout = () => {
  const fontsLoaded = useCachedResources();
  return (
    <>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <Header />
          <Slot />
        </PaperProvider>
      </Provider>
    </>
  );
};

export default HomeLayout;
