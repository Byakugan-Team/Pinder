import React from 'react';
import styles from '../assets/stylesMatching'

import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from '../assets/Icon';

const CardItem = ({
  actions,
  description,
  image,
  matches,
  name,
  onPressLeft,
  onPressRight,
  status,
  variant
}) => {
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const imageStyle = [
    {
      borderRadius: 8,
      width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: variant ? 170 : 350,
      margin: variant ? 0 : 20
    }
  ];

  const nameStyle = [
    {
      paddingTop: variant ? 10 : 15,
      paddingBottom: variant ? 5 : 7,
      color: '#363636',
      fontSize: variant ? 15 : 30
    }
  ];
console.log(image)
  return (
    <View style={stylesFriend.containerCardItem} >
      {/* IMAGE */}
      <Image source={{ uri: image }} style={imageStyle} />



      {/* NAME */}
      <Text style={nameStyle}>{name}</Text>

      {/* STATUS */}
      {status && (
        <View style={stylesFriend.status}>
          <View style={status === 'Online' ? stylesFriend.online : stylesFriend.offline} />
          <Text style={stylesFriend.statusText}>{status}</Text>
        </View>
      )}

  
    </View>
  );
};
var stylesFriend= StyleSheet.create({
    containerCardItem: {
		backgroundColor: 'white',
		borderRadius: 8,
		alignItems: "center",
		margin: 10,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: 'black',
		shadowOffset: { height: 0, width: 0 },
    paddingBottom:20
	},
    status: {
		paddingBottom: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	statusText: {
		color:  "#757E90",
		fontSize: 12
	},
    online: {
		width: 6,
		height: 6,
		backgroundColor: "#46A575",
		borderRadius: 3,
		marginRight: 4
	},
	offline: {
		width: 6,
		height: 6,
		backgroundColor: "#D04949",
		borderRadius: 3,
		marginRight: 4
	}
})
export default CardItem;