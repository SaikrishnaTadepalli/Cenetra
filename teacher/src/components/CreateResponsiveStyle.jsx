import { ScaledSize, StyleProp, StyleSheet } from "react-native";

export default function CreateResponsiveStyle(webStyles, mobileStyles) {
  const web = webStyles;
  const mobile = mobileStyles;
  // Return a function that combines wraps web and mobile styles
  return (layout) => (style) => {
    if (layout.width < 768 && mobile.hasOwnProperty(style)) {
      return StyleSheet.compose(web[style], mobile[style]);
    } else {
      return web[style];
    }
  };
}
