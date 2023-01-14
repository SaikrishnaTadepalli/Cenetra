import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../../types";

const linking = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          MyList: {
            screens: {
              MyListScreen: "one",
            },
          },
          SearchRestaurant: {
            screens: {
              SearchRestaurantScreen: "two",
            },
          },
        },
      },
      SearchScreen: "modal",
      NotFound: "*",
    },
  },
};

export default linking;