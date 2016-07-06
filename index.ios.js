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
  View,
  Image
} from 'react-native';

var MOCKED_MOVIES_DATA = [
  {title: '标题', year: '2015', posters: {thumbnail: 'http://cdn1.w3cplus.com/cdn/farfuture/vASELk4rEEi3sIfp7M39ptVoCX2BfOdSQhYKvXhh5lU/mtime:1341237505/sites/default/files/box-shadow3.png'}},
  {title: '标题', year: '2015', posters: {thumbnail: 'http://cdn1.w3cplus.com/cdn/farfuture/vASELk4rEEi3sIfp7M39ptVoCX2BfOdSQhYKvXhh5lU/mtime:1341237505/sites/default/files/box-shadow3.png'}},
];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';



class SampleAppMovies extends Component {
  constructor(props) {
      super(props);   //这一句不能省略，照抄即可
      this.state = {
        movies: null,  //这里放你自己定义的state变量及初始值
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
              movies: responseData.movies,
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
        <View style={styles.container}>
          <Image
            source={{uri: movie.posters.thumbnail}}
            style={styles.thumbnail}
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

    if(!this.state.movies){
      return this.renderLoadingView();
    }

    var movie = this.state.movies[0];
    return this.renderMovie(movie);
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
    flex:1,
    color: '#333333',
    alignItems:'center',
  },
  year: {
    flex:1,
    color: '#666666',
    alignItems:'center',
  },
  rightcontainer:{
    flex:1,
    backgroundColor:'#ffffff',
    flexDirection:'column',
  }
});

AppRegistry.registerComponent('SampleAppMovies', () => SampleAppMovies);
