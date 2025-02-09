import React, { useState, useRef } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";

interface CarouselItem {
  id: string;
  image: any;
  description: string;
  progress?: number; // Progress percentage (0 to 100)
}

const Carousel: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: screenWidth } = useWindowDimensions();
  const containerWidth = screenWidth - 40;
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselData: CarouselItem[] = [
    {
      id: "01",
      image: require("../../assets/images/Carousel1.png"),
      description: "Learning Progress",
      progress: 20,
    },
    {
      id: "02",
      image: require("../../assets/images/Carousel2.png"),
      description: "Workshops Near Me",
    },
    {
      id: "03",
      image: require("../../assets/images/Carousel3.png"),
      description: "News",
    },
    {
      id: "04",
      image: require("../../assets/images/Carousel4.png"),
      description: "Holiday Calendar",
    },
  ];

  // Duplicate the data to create an infinite loop effect
  const infiniteCarouselData = [
    carouselData[carouselData.length - 1], // Last item
    ...carouselData, // Original items
    carouselData[0], // First item
  ];

  // Define the height and width of each item for getItemLayout
  const ITEM_HEIGHT = 220; // Height of each carousel item
  const ITEM_WIDTH = containerWidth; // Width of each carousel item

  // getItemLayout function to calculate the offset of each item
  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  });

  // Handle scroll events
  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / ITEM_WIDTH);

    // Handle infinite scroll logic
    if (newIndex === 0) {
      // If the user scrolls to the first duplicated item, jump to the last original item
      flatListRef.current?.scrollToIndex({
        index: carouselData.length,
        animated: false,
      });
      setCurrentIndex(carouselData.length - 1);
    } else if (newIndex === infiniteCarouselData.length - 1) {
      // If the user scrolls to the last duplicated item, jump to the first original item
      flatListRef.current?.scrollToIndex({
        index: 1, // Jump to the first original item
        animated: false,
      });
      setCurrentIndex(0);
    } else {
      // Update the current index for the original items
      setCurrentIndex(newIndex - 1);
    }
  };

  // Handle scroll-to-index failures
  const handleScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    // Retry scrolling after a short delay
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    }, 50);
  };

  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => (
    <View style={[styles.itemContainer, { width: ITEM_WIDTH }]}>
      <Image source={item.image} style={styles.image} />
      <View style={{ paddingHorizontal: 14 }}>
        <Text style={styles.description}>{item.description}</Text>
        {/* Only show the progress bar for the first item */}
        {index === 1 && (
          <View style={styles.progressContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.progressText}>Completion</Text>
              <Text style={styles.percentageText}>{item.progress}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: item.progress ? `${item.progress}%` : undefined },
                ]}
              />
            </View>
          </View>
        )}
        {/* Add text for other items */}
        {index !== 1 && (
          <View style={{ marginTop: 8, flexDirection: "row", justifyContent: "space-between", paddingTop: 10 }}>
            <Text style={styles.additionalTextLeft}>
                Last Updated
            </Text>
            <Text style={styles.additionalTextRight}>
                Januarary 5, 2025
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderDotIndicators = () => {
    return carouselData.map((_, index) => {
      // Adjust the input range to account for the duplicated items
      const inputRange = [
        (index) * ITEM_WIDTH,
        (index + 1) * ITEM_WIDTH,
        (index + 2) * ITEM_WIDTH,
      ];

      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1.2, 0.8],
        extrapolate: "clamp",
      });

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
        extrapolate: "clamp",
      });

      return (
        <Animated.View
          key={index}
          style={[
            styles.dotIndicator,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        />
      );
    });
  };

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <Animated.FlatList
        ref={flatListRef}
        data={infiniteCarouselData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique keys
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false, listener: handleScroll }
        )}
        scrollEventThrottle={16}
        initialScrollIndex={1} // Start at the first original item
        getItemLayout={getItemLayout} // Provide item layout measurements
        onScrollToIndexFailed={handleScrollToIndexFailed} // Handle scroll-to-index failures
      />
      <View style={styles.dotContainer}>{renderDotIndicators()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#F9F9FB",
    borderRadius: 16,
  },
  itemContainer: {
    height: 220,
    borderRadius: 16,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    marginBottom: 12,
  },
  description: {
    fontSize: 22,
    lineHeight: 25,
    fontWeight: "500",
    color: "#343434",
    marginBottom: 8,
    textAlign: "left",
  },
  progressContainer: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 8,
  },
  progressBarContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#EBEBF9",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 8,
    alignSelf: "center",
  },
  additionalTextLeft: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5c5c5c",
    textAlign: "left",
  },
  additionalTextRight: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5c5c5c",
    textAlign: "right",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#21C759",
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    textAlign: "left",
  },
  percentageText: {
    textAlign: "right",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16
  },
  dotIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: "#000",
  },
});

export default Carousel;