import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, } from "react-native";
import moment from "moment";


export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({ item, index }) => {

    const L = item.Pictures.length;
  
  return (
    <View style={{ alignSelf: "center", alignItems: "center" }}>
      <View style={styles.container} key={index}>
        
          <Image source={{ uri: item.Pictures[L-1] }} style={styles.image} />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.header}>{item.nickname}</Text>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../../assets/Profile_View/icons8-unsplash-50.png")}
            />
            <Text style={{ fontSize: 20, color: "#757E90", fontWeight: "bold", marginLeft: 5 }}>
              {`(1/${L})`}
            </Text>
          </View>
          <Text style={styles.body}>Interest {item.body}</Text>
          <Text style={styles.body}>{item.gendre}</Text>
          <Text style={styles.body}>{item.category}</Text>
          <Text style={styles.body}>{moment(item.birth).fromNow(true)}</Text>

       
     
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    marginTop: 20,
    borderRadius: 15,
    width: ITEM_WIDTH + 70,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    alignSelf: "center",
    alignItems: "center",
    width: ITEM_WIDTH + 60,
    height: 400,
    marginTop: 5,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#F0F0F0",
  },
  header: {
    color: "#363636",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingRight: 20,
    // paddingTop: 20
  },
  body: {
    color: "#363636",
    fontSize: 20,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselCardItem;
