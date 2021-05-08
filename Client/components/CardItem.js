import React from 'react';
import styles from '../assets/stylesMatching'

import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from '../assets/Icon';

const CardItem = ({
  actions,
  Gender,
  image,
  matches,
  Category,
  Age,
  NickName,
  owner,
  onPressLeft,
  onPressRight,
  status,
  variant
}) => {
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const fullHeight = Dimensions.get('window').height;
  console.log(fullHeight)
  const imageStyle = [
    {
      borderRadius: 8,
      width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: (fullHeight <750) ? fullHeight/2-60 : fullHeight/2-20,
      margin: variant ? 0 : 20
    }
  ];

  const nameStyle = [
    {
      paddingTop: variant ? 0 : 0,
      paddingBottom: variant ? 5 : 7,
      color: '#363636',
      fontSize: variant ? 15 : 30,
      alignItems: "center",
      textAlign: "center"
    }
  ];
  
  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      {image[0] == 'h' && (
      <Image  source={{ uri: image }} style={imageStyle} />
      )}
      {/* MATCHES */}
      {matches && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon name="heart" /> {matches}% Match!
          </Text>
        </View>
      )}

      {/* NAME */}
      <Text style={nameStyle}>{NickName}</Text>

      {/* Gender */}
      {Gender && (
        <Text style={styles.descriptionCardItem}>Gender : {Gender}</Text>
      )}

      {/* Gender */}
      {Age && (
        <Text style={styles.descriptionCardItem}>Age : {Age}</Text>
      )}
      {/* Category */}
        {Category && (
        <Text style={styles.descriptionCardItem}>Category : {Category}</Text>
      )}
      {/* owner */}
      {owner && (

                <Text style={styles.descriptionCardItem}>Owner : {owner}  <View style={styles.status}>
                <View style={status === 'Online' ? styles.online : styles.offline} />
                <Text style={styles.statusText}>{status}</Text>
                </View>
</Text>

               
          
      )}
      {/* ACTIONS */}
      {actions && (
        <View style={styles.actionsCardItem}>
          <TouchableOpacity style={styles.miniButton}>
            <Text style={styles.star}>
              <Icon name="star" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
            <Text style={styles.like}>
              <Icon name="like" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressRight()}
          >
            <Text style={styles.dislike}>
              <Icon name="dislike" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.miniButton}>
            <Text style={styles.flash}>
              <Icon name="flash" />
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardItem;