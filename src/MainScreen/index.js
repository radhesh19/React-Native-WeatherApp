import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {fetchData} from '../Redux/Action/dataAction.js';
import styles from './styles'; // External Stylesheet
import LottieView from 'lottie-react-native';



const MainScreen = (props) => {
  const lottieRef = useRef(null);
  const [isAnimated, setAnimated] = useState(true);
  const weatherData = useSelector((state) => state);
  const dispatch = useDispatch();

  // Fetch Current Location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      if (info.coords) {
        let payload = {
          lat: info.coords.latitude,
          lon: info.coords.longitude,
        };
        dispatch(fetchData(payload));
      }
    });
  };

  // Hooks methods
  useEffect(() => {
    setAnimated(true);
    getCurrentLocation();
    // lottieRef.current.play();
  }, []);

  useEffect(() => {
    if (weatherData.onLoad == false && isAnimated == true) {
      setTimeout(() => {
        // lottieRef.current.pause();
        setAnimated(false);
      }, 3000);
    }
  }, [weatherData]);


  //Forcast List item
  const renderList = ({item, index}) => {
    return (
      <View style={styles.cards}>
        <View style={styles.innerCard}>
          <Text style={styles.days}>{item.day}</Text>
          <Text style={styles.date}>{item.date} </Text>
          <Text style={styles.max_min}>
            Wind Speed:- {item.wind.speed} m/s
          </Text>
        </View>
        <View style={styles.tempView}>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            }}
          />
          <Text style={styles.tempTxt}>
            {item.main.temp.toFixed(1) + '\u2103'}
          </Text>
          <Text style={styles.max_min}>
            {item.main.temp_min.toFixed(1) + '\u2103' +" - "+ item.main.temp_max.toFixed(1) + '\u2103'}
          </Text>
        </View>
      </View>
    );
  };

  // Header
  const headerComponent = () => {
    let cityDetails = weatherData.city ? weatherData.city : null;
    return (
      <View style={styles.city}>
        <LottieView
          resizeMode="cover"
          style={styles.weatherCloud}
          source={require('../Assets/nightmoon.json')}
          autoPlay
          loop
        />
        {cityDetails && (
          <View style={styles.detailsContainer}>
            <Text style={styles.cityTxt}>{cityDetails.name}</Text>
            <Text style={styles.country}>
              {cityDetails.country}
              {'\n'}
              {cityDetails.coord.lat + ',' + cityDetails.coord.lon}{' '}
            </Text>
          </View>
        )}
      </View>
    );
  };

  // retry function
  const onRetry=()=>{
    setAnimated(true);
    getCurrentLocation();
  }

  return (
    <>
      <View style={styles.container}>
        {weatherData.isError == false && (
          <FlatList
            data={weatherData.data}
            renderItem={renderList}
            ListHeaderComponent={headerComponent}
            ListHeaderComponentStyle={styles.listHeader}
          />
        )}

        {weatherData.isError == true && (
          <View style={styles.errorConatiner}>
            <Text style={styles.errorTxt}>Someting Went Wrong...</Text>
            <Text style={styles.msgText}>
              {weatherData.message ? weatherData.message : ''}
            </Text>
            <TouchableOpacity onPress={onRetry} style={styles.retryBtn}>
              <Text style={styles.retryTxt}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {isAnimated && (
          <View style={styles.loaderView}>
            <LottieView
              style={styles.lodingImg}
              source={require('../Assets/splashyloader.json')}
              // ref={lottieRef}
              autoPlay
            />
          </View>
        )}
      </View>
    </>
  );
};

export default MainScreen;
