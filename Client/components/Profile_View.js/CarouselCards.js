import React from 'react'
import { View , StyleSheet} from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'



const CarouselCards = ({pets}) => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  GetPetsInfo = () =>{
    fetch('http://'+server_IP+':3000/pets/GetAll/'+user_id,{
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET'
    })
    .then(async (result)=>{
        result = await result.json();
        setpets(result)
    })
    .catch((e) => console.log(e));
}



  return (
      <View >
      <Carousel
      style={styles.container}
      
        layout="stack"
        layoutCardOffset={9}
        ref={isCarousel}
        data={pets}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={pets.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>

  )
}
const styles = StyleSheet.create({
container: {

}
})


export default CarouselCards