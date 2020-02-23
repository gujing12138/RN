import React from 'react';
import { Image, Text, View, StyleSheet, TouchableHighlight, Dimensions, } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { Actions } from 'react-native-router-flux'
import MvSwiperStars from './MvSwiper/MvSwiperStars'
const BannerWidth = Dimensions.get('window').width;

class MovieSwiper extends React.Component {
    render() {
        return (
            <View style={styles.swipe} >
                <Carousel
                    autoplay
                    loop
                    index={1}
                    pageSize={BannerWidth}
                    pageIndicatorContainerStyle={{ position: "absolute", right: 20, }}
                    style={{ flex: 1 }}
                >
                    {this.props.movies.map((movie, index) => this.renderPage(movie, index))}
                </Carousel>
            </View>
        )
    }
    renderPage = (item) => {
        return (
            <TouchableHighlight underlayColor="#fff" onPress={() => Actions.moviedetail({ id: item.id })}>
                <View key={item.id} style={styles.imagebox}>
                    <View style={{ height: '100%', flex: 2, marginLeft: 150, backgroundColor: 'red' }}>
                        <Text style={styles.movieTitle}>{item.title}</Text>
                        <Image style={styles.imgs} source={{ uri: item.directors[0].avatars.small }} />
                        <Text style={{ color: 'white', marginLeft: 40, marginTop: -25, fontSize: 14 }}>{item.directors[0].name}</Text>
                        <Text style={{ marginTop: 10, color: 'white', fontSize: 14, width: '90%' }}>
                            主演:{item.casts.length > 0 ? item.casts[0].name : ""} {item.casts.length > 1 ? item.casts[1].name : ""} {item.casts.length > 2 ? item.casts[2].name : ""}{item.casts.length > 3 ? item.casts[3].name : ""}
                        </Text>
                        <Text style={styles.wodrstyle}>{item.collect_count} 看过</Text>
                        <View style={{ width: '50%', marginTop: 10 }}>
                            <MvSwiperStars style={{ width: '60%' }} rating={item.rating.average}></MvSwiperStars>
                        </View>
                        <Text style={{ color: 'yellow', marginLeft: 110 }}>{item.rating.average}</Text>
                    </View>
                    <Image style={styles.lunboimg} source={{ uri: item.images.large }} alt=''></Image>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    imagebox: {
        width: '95%',
        marginLeft: 10,
        height: 200,
        backgroundColor: '#917efc',
        borderRadius: 6,
        marginTop: 10,
    },
    lunboimg: {
        height: 180,
        width: 120,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    imgs: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginTop: 10,
    },
    movieTitle: {
        color: 'white',
        fontSize: 18,
        marginTop: 15,
    },
    wodrstyle: {
        color: 'white',
        marginTop: 10,
        fontSize: 14,
    }
});

export default MovieSwiper;
