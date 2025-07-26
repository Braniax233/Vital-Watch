import React, { useMemo, useState } from 'react';
import { Platform } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const FitnessTipsScreen = () => {
  const [selectedTip, setSelectedTip] = useState(null);
  const fitnessCategories = useMemo(() => [
    {
      title: 'Dynamic Warm-up Routine',
      description: 'Prepare your body with dynamic stretches and mobility exercises',
      image: require('../../assets/warmup.svg'),
      content: [
        '1. Arm circles - 10 forward, 10 backward',
        '2. Leg swings - 10 each leg',
        '3. Hip rotations - 10 each direction',
        '4. Jumping jacks - 20 reps',
        '5. High knees - 30 seconds'
      ]
    },
    {
      title: 'Stay Hydrated During Workouts',
      description: 'Proper hydration for performance, endurance, and safety',
      image: require('../../assets/hydration.svg'),
      content: [
        '1. Drink 16-20 oz water 2-3 hours before exercise',
        '2. Sip 7-10 oz water every 10-20 minutes during workout',
        '3. Post-workout: 16-24 oz water for every pound lost',
        '4. Monitor urine color - should be light yellow',
        '5. Consider electrolyte drinks for intense workouts'
      ]
    },
    {
      title: 'Essential Cool-down Stretches',
      description: 'Important stretching exercises for post-workout recovery',
      image: require('../../assets/stretching.svg'),
      content: [
        '1. Quad stretch - 30 seconds each leg',
        '2. Hamstring stretch - 30 seconds each leg',
        '3. Child\'s pose - 1 minute',
        '4. Cat-cow stretch - 10 repetitions',
        '5. Shoulder rolls - 10 forward, 10 backward'
      ]
    },
    {
      title: 'Fueling Your Fitness',
      description: 'Optimize your nutrition for better workout results',
      image: require('../../assets/nutrition.svg'),
      content: [
        '1. Pre-workout: Complex carbs + lean protein',
        '2. Post-workout: Protein within 30 minutes',
        '3. Stay hydrated throughout the day',
        '4. Include healthy fats in your diet',
        '5. Time your meals properly'
      ]
    },
  ], []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fitness Tips</Text>
        <Text style={styles.subtitle}>Expert advice for better health</Text>
      </View>

      <View style={styles.featuredTipContainer}>
        <Image
          source={require('../../assets/featured-tip.svg')}
          style={styles.featuredImage}
        />
        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle}>Today's Featured Tip</Text>
          <Text style={styles.featuredDescription}>
            Morning stretches to boost your energy and flexibility
          </Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Routine</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        {fitnessCategories.map((category, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.categoryCard}
            onPress={() => setSelectedTip(selectedTip === index ? null : index)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <View style={styles.categoryContent}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
              {selectedTip === index && (
                <View style={styles.tipContent}>
                  {category.content.map((item, i) => (
                    <Text key={i} style={styles.tipItem}>{item}</Text>
                  ))}
                </View>
              )}
              <Text style={styles.readMore}>
                {selectedTip === index ? 'Show Less ↑' : 'Read More ↓'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.dailyTipContainer}>
        <Text style={styles.dailyTipTitle}>Daily Health Tip</Text>
        <View style={styles.dailyTipCard}>
          <Text style={styles.dailyTipText}>
            "Remember to take regular breaks during long periods of sitting. Stand up,
            stretch, and move around for better circulation."
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  featuredTipContainer: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  featuredImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  featuredContent: {
    padding: 20,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  viewButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    padding: 20,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  categoryImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  categoryContent: {
    padding: 15,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  readMore: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  dailyTipContainer: {
    padding: 20,
    marginBottom: 20,
  },
  dailyTipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  dailyTipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  dailyTipText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  tipContent: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tipItem: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    paddingLeft: 10,
  },
});

export default FitnessTipsScreen;