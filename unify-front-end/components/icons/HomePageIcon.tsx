import React from "react";
import { View, Image, ImageStyle, StyleProp } from "react-native";

interface CustomIconProps {
  name: string;
  color: string;
  focused: boolean;
}

const CustomHomeIcon: React.FC<CustomIconProps> = ({ color, focused }) => (
  <Image
    source={
      focused
        ? require("../../assets/images/HomePageFocused.png")
        : require("../../assets/images/HomePage.png")
    }
    style={{ tintColor: color, width: 24, height: 24 } as StyleProp<ImageStyle>}
  />
);

export default CustomHomeIcon;
