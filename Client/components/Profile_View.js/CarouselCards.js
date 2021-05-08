import React from 'react'
import { View , StyleSheet} from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'



const data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt",
      imgUrl: "https://picsum.photos/id/11/200/300"
    },
    {
      title: "In turpis",
      body: "Aenean ut ",
      imgUrl: "https://picsum.photos/id/10/200/300"
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ull",
      imgUrl: "https://picsum.photos/id/12/200/300"
    }
  ]

const CarouselCards = ({pets}) => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  const pets_Info = pets

  return (
      <View >
      <Carousel
      style={styles.container}
      
        layout="stack"
        layoutCardOffset={9}
        ref={isCarousel}
        data={pets_Info}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={pets_Info.length}
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