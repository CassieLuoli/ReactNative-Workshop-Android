/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
  Image
} from 'react-native';

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';



class SampleAppMovies extends Component {
  constructor(props) {
      super(props);   //这一句不能省略，照抄即可
      this.state = {
        movies: null,  //这里放你自己定义的state变量及初始值
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
      };
      // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
      // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
      this.fetchData = this.fetchData.bind(this);

    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData() {
        fetch(REQUEST_URL)
          .then((response) => response.json())
          .then((responseData) => {
            // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
            this.setState({
              // movies: responseData.movies,
              dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
              loaded: true,
            });
          })
          .done();
      }

      renderLoadingView() {
        return(
          <View style={styles.container}>
          <Text>
          loading
          </Text>
          </View>
        )
      }

      renderMovie(movie) {
        return (
          <View>
        <View style={[styles.container, styles.shadow]}>
          <Image
          style={styles.thumbnail}
            source={{ uri: movie.posters.thumbnail}}
          />
          <View style={styles.rightcontainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
          </View>
        </View>
          </View>
      )

      }
  render() {

    if(!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );

  }
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    marginTop:20,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor: '#f4f4f4',
    height:120,
    padding:10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  title: {
    color: '#333333',
    fontSize:18,
    fontWeight:'bold',
    alignItems:'center',
  },
  year: {
    color: '#666666',
    alignItems:'center',
  },
  rightcontainer:{
    flex:1,
    flexDirection:'column',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  shadow: {
   shadowColor: 'black',
   shadowOpacity: 0.3,
   shadowOffset: {
     width: 0,
     height: 1
   },
   shadowRadius: 4
 },

});

AppRegistry.registerComponent('SampleAppMovies', () => SampleAppMovies);
