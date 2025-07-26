import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  StatusBar,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const [loadingText, setLoadingText] = useState('Initializing health system...');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  // Animation values
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoRotation = useRef(new Animated.Value(-180)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const appNameOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const loadingSectionOpacity = useRef(new Animated.Value(0)).current;
  const loadingProgress = useRef(new Animated.Value(0)).current;
  const heartbeatScale = useRef(new Animated.Value(1)).current;
  const versionOpacity = useRef(new Animated.Value(0)).current;
  const fadeOutOpacity = useRef(new Animated.Value(1)).current;
  
  // Pulse ring animations
  const pulseRing1 = useRef(new Animated.Value(1)).current;
  const pulseRing2 = useRef(new Animated.Value(1)).current;
  const pulseRing3 = useRef(new Animated.Value(1)).current;
  const pulseOpacity1 = useRef(new Animated.Value(0.4)).current;
  const pulseOpacity2 = useRef(new Animated.Value(0.4)).current;
  const pulseOpacity3 = useRef(new Animated.Value(0.4)).current;
  
  // Floating icons
  const floatingIcons = useRef([
    { translateY: new Animated.Value(height), rotate: new Animated.Value(0), opacity: new Animated.Value(0) },
    { translateY: new Animated.Value(height), rotate: new Animated.Value(0), opacity: new Animated.Value(0) },
    { translateY: new Animated.Value(height), rotate: new Animated.Value(0), opacity: new Animated.Value(0) },
    { translateY: new Animated.Value(height), rotate: new Animated.Value(0), opacity: new Animated.Value(0) },
    { translateY: new Animated.Value(height), rotate: new Animated.Value(0), opacity: new Animated.Value(0) },
    { translateY: new Animated.Value(height), rotate: new Animated.Value(0), opacity: new Animated.Value(0) },
    { translateY: new Animated.Value(height), rotate: new Animated.Value(0), opacity: new Animated.Value(0) },
  ]).current;

  const loadingTexts = [
    'Initializing health system...',
    'Connecting to sensors...',
    'Calibrating performance metrics...',
    'Loading dashboard...',
    'System ready!'
  ];

  // More masculine health/fitness icons
  const healthIcons = ['💪', '🏃‍♂️', '⚡', '🔥', '🎯', '🏋️‍♂️', '🚀'];
  const iconPositions = [
    { left: width * 0.15 },
    { left: width * 0.25 },
    { left: width * 0.35 },
    { left: width * 0.50 },
    { left: width * 0.65 },
    { left: width * 0.75 },
    { left: width * 0.85 },
  ];

  const { user } = useAuth();

  useEffect(() => {
    startAnimations();
    
    // Navigate to the appropriate screen after animations
    const timer = setTimeout(() => {
      navigation.replace(user ? 'MainApp' : 'SignUp');
    }, 4200); // Slightly extended to ensure smooth completion

    return () => clearTimeout(timer);
  }, [navigation, user]);

  const startAnimations = () => {
    // Logo entrance animation
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1200,
        easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
        useNativeDriver: true,
      }),
      Animated.timing(logoRotation, {
        toValue: 0,
        duration: 1200,
        easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // App name animation
    setTimeout(() => {
      Animated.timing(appNameOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, 400);

    // Tagline animation
    setTimeout(() => {
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, 600);

    // Loading section animation
    setTimeout(() => {
      Animated.timing(loadingSectionOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, 900);

    // Version info animation
    setTimeout(() => {
      Animated.timing(versionOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 1800);

    // FIXED: Synchronized loading progress and text animation
    setTimeout(() => {
      // Start loading progress animation - 2.0 seconds duration (5 texts * 400ms each)
      Animated.timing(loadingProgress, {
        toValue: 1,
        duration: 2000, // Exactly matches the text update duration
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: false,
      }).start();
      
      // Start loading text updates - perfectly synchronized
      startLoadingTextAnimation();
    }, 900);

    // Start heartbeat animation
    startHeartbeatAnimation();
    
    // Start pulse ring animations
    startPulseAnimations();
    
    // Start floating icons
    startFloatingIconsAnimation();
    
    // FIXED: Fade out starts AFTER both loading bar and text complete
    setTimeout(() => {
      Animated.timing(fadeOutOpacity, {
        toValue: 0,
        duration: 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, 3100); // 900ms (loading section start) + 2000ms (loading duration) + 200ms buffer
  };

  const startHeartbeatAnimation = () => {
    const heartbeat = () => {
      Animated.sequence([
        Animated.timing(heartbeatScale, {
          toValue: 1.15,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatScale, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => heartbeat());
    };
    setTimeout(heartbeat, 1200);
  };

  const startPulseAnimations = () => {
    const createPulseAnimation = (scale, opacity, delay) => {
      const pulse = () => {
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 2.2,
            duration: 2200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 2200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start(() => {
          scale.setValue(1);
          opacity.setValue(0.4);
          pulse();
        });
      };
      setTimeout(pulse, delay);
    };

    createPulseAnimation(pulseRing1, pulseOpacity1, 0);
    createPulseAnimation(pulseRing2, pulseOpacity2, 400);
    createPulseAnimation(pulseRing3, pulseOpacity3, 800);
  };

  const startFloatingIconsAnimation = () => {
    floatingIcons.forEach((icon, index) => {
      const duration = 3500 + Math.random() * 1500;
      const delay = Math.random() * 1500;
      
      const floatAnimation = () => {
        Animated.parallel([
          Animated.timing(icon.translateY, {
            toValue: -120,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(icon.rotate, {
            toValue: 360,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(icon.opacity, {
              toValue: 0.4,
              duration: duration * 0.1,
              useNativeDriver: true,
            }),
            Animated.timing(icon.opacity, {
              toValue: 0.4,
              duration: duration * 0.8,
              useNativeDriver: true,
            }),
            Animated.timing(icon.opacity, {
              toValue: 0,
              duration: duration * 0.1,
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => {
          icon.translateY.setValue(height);
          icon.rotate.setValue(0);
          icon.opacity.setValue(0);
          setTimeout(floatAnimation, Math.random() * 800);
        });
      };
      
      setTimeout(floatAnimation, delay);
    });
  };

  const startLoadingTextAnimation = () => {
    // FIXED: Synchronized text updates with loading bar
    const textInterval = setInterval(() => {
      setCurrentTextIndex(prevIndex => {
        if (prevIndex < loadingTexts.length - 1) {
          const newIndex = prevIndex + 1;
          setLoadingText(loadingTexts[newIndex]);
          return newIndex;
        } else {
          clearInterval(textInterval);
          return prevIndex;
        }
      });
    }, 400); // 400ms * 5 texts = 2000ms total (matches loading bar duration exactly)
  };

  const logoRotationInterpolate = logoRotation.interpolate({
    inputRange: [-180, 0],
    outputRange: ['-180deg', '0deg'],
  });

  const progressWidth = loadingProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        angle={135}
        style={styles.gradient}
      >
        <Animated.View style={[styles.container, { opacity: fadeOutOpacity }]}>
          {/* Floating Health Icons */}
          {floatingIcons.map((icon, index) => (
            <Animated.View
              key={index}
              style={[
                styles.floatingIcon,
                iconPositions[index],
                {
                  transform: [
                    { translateY: icon.translateY },
                    { rotate: icon.rotate.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg'],
                      })
                    }
                  ],
                  opacity: icon.opacity,
                }
              ]}
            >
              <Text style={styles.floatingIconText}>{healthIcons[index]}</Text>
            </Animated.View>
          ))}

          {/* Pulse Rings */}
          <View style={styles.pulseContainer}>
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  transform: [{ scale: pulseRing1 }],
                  opacity: pulseOpacity1,
                }
              ]}
            />
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  transform: [{ scale: pulseRing2 }],
                  opacity: pulseOpacity2,
                }
              ]}
            />
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  transform: [{ scale: pulseRing3 }],
                  opacity: pulseOpacity3,
                }
              ]}
            />
          </View>

          {/* Main Content */}
          <View style={styles.splashContainer}>
            <View style={styles.logoContainer}>
              <Animated.View
                style={[
                  styles.logoCircle,
                  {
                    transform: [
                      { scale: logoScale },
                      { rotate: logoRotationInterpolate }
                    ],
                    opacity: logoOpacity,
                  }
                ]}
              >
                <Animated.Text
                  style={[
                    styles.logoIcon,
                    {
                      transform: [{ scale: heartbeatScale }]
                    }
                  ]}
                >
                  💪
                </Animated.Text>
              </Animated.View>
              
              <Animated.Text
                style={[styles.appName, { opacity: appNameOpacity }]}
              >
                VitalWatch
              </Animated.Text>
              
              <Animated.Text
                style={[styles.appTagline, { opacity: taglineOpacity }]}
              >
                Performance Tracking
              </Animated.Text>
            </View>

            <Animated.View
              style={[styles.loadingSection, { opacity: loadingSectionOpacity }]}
            >
              <View style={styles.loadingBarContainer}>
                <Animated.View
                  style={[styles.loadingBar, { width: progressWidth }]}
                />
              </View>
              <Text style={styles.loadingText}>{loadingText}</Text>
            </Animated.View>
          </View>

          <Animated.Text
            style={[styles.versionInfo, { opacity: versionOpacity }]}
          >
            Version 2.1.0 • Pro Edition
          </Animated.Text>
        </Animated.View>
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
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 130,
    height: 130,
    backgroundColor: 'rgba(0, 174, 255, 0.15)',
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(0, 174, 255, 0.3)',
    shadowColor: '#00aeff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  logoIcon: {
    fontSize: 52,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -1.5,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 174, 255, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  appTagline: {
    fontSize: 16,
    color: 'rgba(0, 174, 255, 0.9)',
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  loadingSection: {
    alignItems: 'center',
  },
  loadingBarContainer: {
    width: 220,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 174, 255, 0.2)',
  },
  loadingBar: {
    height: '100%',
    backgroundColor: '#00aeff',
    borderRadius: 3,
    shadowColor: '#00aeff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  loadingText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  floatingIcon: {
    position: 'absolute',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingIconText: {
    fontSize: 28,
  },
  pulseContainer: {
    position: 'absolute',
    top: height / 2 - 65,
    left: width / 2 - 65,
    width: 130,
    height: 130,
  },
  pulseRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 130,
    height: 130,
    borderWidth: 2,
    borderColor: 'rgba(0, 174, 255, 0.3)',
    borderRadius: 65,
  },
  versionInfo: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

export default SplashScreen;