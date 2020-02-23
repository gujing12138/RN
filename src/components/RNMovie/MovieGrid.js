import React from 'react'
import { Image, Text, View, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import MvGridStars from './MvGrid/MvGridStars'
class MovieGrid extends React.Component {
    render() {
        return (
            <ScrollView style={{flex:1}}
            >
                <View style={{ flexDirection: 'row', width: '100%', paddingLeft:8,paddingRight:8, flexWrap: 'wrap' }}>
                    {this.props.movieGrids.map((item, index) => this.renderGrid(item, index))}
                </View>
            </ScrollView>
        )
    }

    renderGrid = (item, index) => {
        return (
            <TouchableHighlight
                underlayColor="#fff"
                onPress={() => Actions.moviedetail({ id: item.id })}
                key={item.id}
                style={(index + 1) % 3 === 0 ? styles.movieList2 : styles.movieList1}
            >
                <View style={{width: '100%',alignItems:'center'}}>
                    <Image source={{ uri: item.images.large }} style={{ width: '100%', height: 135, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}></Image>
                    <Text style={{ color: 'white',fontSize:14,marginTop:3,height:36 }}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', height:'15%',marginTop:5}}>
                        <View style={{width:'50%'}}>
                        <MvGridStars  rating={item.rating.average}></MvGridStars>
                        </View>
                        <Text style={{ color: 'yellow', fontSize: 14, marginLeft: 5,marginTop:-5 }}>{item.rating.average}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    movieList1: {
        width: '32%',
        height: 195,
        marginRight: '2%',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#917efc',
        marginTop: 10
    },
    movieList2: {
        width: '32%',
        height: 195,
        marginRight: 0,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#917efc',
        marginTop: 10
    }

})
export default MovieGrid;