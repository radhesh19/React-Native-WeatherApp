import React from 'react';
import {View, StyleSheet, Image, Modal} from 'react-native';
import LottieView from 'lottie-react-native';
const Header = (props) => {
  return (
    <Modal visible={true}>
      <View style={styles.container}>
        <LottieView
         style={styles.lodingImg}
          source={require('../Assets/splashyloader.json')}
          autoPlay
          loop
          ref={animation => {
            animation = animation;
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lodingImg: {
    height: 100,
    width: 100,
  },
});

export default Header;
