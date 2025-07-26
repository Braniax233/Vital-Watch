import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6C63FF', '#3B3B98']}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Track your heart, unlock your potential.</Text>
          <Image
            source={require('../../assets/splash-icon.png')}
            style={styles.illustration}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.buttonText}>Get Started →</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'contain',
    marginTop: height * 0.05,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  illustration: {
    width: width * 0.8,
    height: height * 0.3,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#6C63FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;