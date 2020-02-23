import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableHighlight, ActivityIndicator,RefreshControl } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base'
import MovieSwiper from '../../components/RNMovie/MovieSwiper.js'
import MovieGrid from '../../components/RNMovie/MovieGrid'

class Movie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      refreshing: false,
      movies: [],
      movieGrids: [],
      nowPage: 1, // 当前的页码
      pageSize: 15, // 每页显示的记录条数
    }
  }

  // 列表
  getMovies() {
    const start = (this.state.nowPage - 1) * this.state.pageSize
    const url = `https://douban.uieee.com/v2/movie/coming_soon?start=${start}&count=${this.state.pageSize}`
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          resolve(data)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  // 根据页码获取电影列表
  getMoviesByPage() {
    const start = (this.state.nowPage - 1) * this.state.pageSize
    const url = `https://douban.uieee.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${start}&count=${this.state.pageSize}`
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          resolve(data)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  componentDidMount() {
    Promise.all([this.getMovies(), this.getMoviesByPage()])
      .then(list => {
        console.log(list)
        const movieGrids = list[0].subjects.filter((item, index) => {
          if (index <= 16) {
            return true
          }
          return false;
        })
        const movies = list[1].subjects.filter((item, index) => {
          if (index <= 4) {
            return true
          }
          return false
        })
        this.setState({
          loading: false,
          movies: this.state.movies.concat(movies),
          movieGrids: this.state.movieGrids.concat(movieGrids),
        })
      })
  }

  // 下拉刷新
  _onRefresh = () => {
    this.setState({refreshing: true});
    Promise.all([this.getMovies(), this.getMoviesByPage()])
      .then(list => {
        console.log(list)
        const movieGrids = list[0].subjects.filter((item, index) => {
          if (index <= 16) {
            return true
          }
          return false;
        })
        const movies = list[1].subjects.filter((item, index) => {
          if (index <= 4) {
            return true
          }
          return false
        })
        this.setState({
          refreshing: false,
          movies: this.state.movies.concat(movies),
          movieGrids: this.state.movieGrids.concat(movieGrids),
        })
      })
  }

  render() {
    return (
      <Container style={{ width: '100%', height: '100%', flex: 1 }} >
        <Header style={{ backgroundColor: '#917efc' }}>
          <Left>
            <Button transparent>
              <Icon name='film' />
            </Button>
          </Left>
          <Body style={{ paddingLeft: 100 }}>
            <Title>电影</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => Actions.MovieSearch()}>
              <Icon name='search' />
            </Button>
          </Right>
        </Header>
        {this.state.loading ? (<ActivityIndicator size="large" color="#FF9A6A" />) : (
          <ScrollView
            stickyHeaderIndices={[1]}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <MovieSwiper movies={this.state.movies}></MovieSwiper>
            <View style={styles.containers}>
              <View style={styles.bangdan}>

                <TouchableHighlight style={styles.box} onPress={() => Actions.MovieListTop()}>
                  <View style={{ width: '100%', height: '100%' }} >
                    <View style={{
                      width: 46, height: 46, borderWidth: 1, borderColor: '#fe5b90', borderRadius: 23, backgroundColor: '#fe5b90',
                      alignItems: 'center', marginLeft: '25%', paddingTop: 5, marginTop: 2, alignItems: 'center',
                    }}>
                      <Icon type="FontAwesome" name="line-chart" style={{ fontSize: 25, color: 'white' }} />
                    </View>
                    <Text style={{ textAlign: 'center', color: 'white', marginBottom: 5, width: '100%', height: 20 }}>Top250</Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight style={styles.box} onPress={() => Actions.MovieListkoubei()}>
                  <View style={{ width: '100%', height: '100%' }} >
                    <View style={{
                      width: 46, height: 46, borderWidth: 1, borderColor: '#ffb518', borderRadius: 23, backgroundColor: '#ffb518',
                      alignItems: 'center', marginLeft: '25%', paddingTop: 5, marginTop: 2, alignItems: 'center'
                    }}>
                      <Icon type="FontAwesome" name="thumbs-up" style={{ fontSize: 25, color: 'white' }} />
                    </View>
                    <Text style={{ textAlign: 'center', color: 'white', marginBottom: 5, width: '100%', height: 20 }}>口碑榜</Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight style={styles.box} onPress={() => Actions.MovieListBeimei()}>
                  <View style={{ width: '100%', height: '100%' }} >
                    <View style={{
                      width: 46, height: 46, borderWidth: 1, borderColor: '#b37cfe', borderRadius: 23, backgroundColor: '#b37cfe',
                      alignItems: 'center', marginLeft: '25%', paddingTop: 5, marginTop: 2, alignItems: 'center',
                    }}>
                      <Icon type="FontAwesome" name="globe" style={{ fontSize: 28, color: 'white' }} />
                    </View>
                    <Text style={{ textAlign: 'center', color: 'white', marginBottom: 5, width: '100%', height: 20 }}>北美票房榜</Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight style={styles.box} onPress={() => Actions.MovieListNew()}>
                  <View style={{ width: '100%', height: '100%' }}>
                    <View style={{
                      width: 46, height: 46, borderWidth: 1, borderColor: '#00c5fd', borderRadius: 23, backgroundColor: '#00c5fd',
                      alignItems: 'center', marginLeft: '25%', paddingTop: 5, marginTop: 2, alignItems: 'center',
                    }}>
                      <Icon type="FontAwesome" name="video-camera" style={{ fontSize: 25, color: 'white' }} />
                    </View>
                    <Text style={{ textAlign: 'center', color: 'white', marginBottom: 5, width: '100%', height: 20 }}>新片榜</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>

            <View style={{ flex: 1, marginTop: 5, paddingBottom: 10 }}>
              <MovieGrid movieGrids={this.state.movieGrids}></MovieGrid>
            </View>
          </ScrollView>
        )}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: '100%',
  },
  containers: {
    width: '96%',
    height: 90,
    marginLeft: '2%',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  contents: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    width: '25%',
  },
  bangdan: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    backgroundColor: '#917efc',
    marginTop: 2,
    borderRadius: 10,
    height: 90
  },
  box: {
    width: '25%',
    height: '100%',
  },
  icon: {
    fontSize: 25,
    color: 'gray'
  },
  renderIcon: {
    fontSize: 25,
    color: '#FF9A6A'
  },
})
export default Movie