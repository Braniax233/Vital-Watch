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
      title: 'Morning Stretches',
      description: 'Essential stretches to start your day with energy and flexibility',
      image: require('../../assets/morning stretches .jpg'),
      content: [
        '1. Cat-Cow Stretch - 10 repetitions',
        '2. Hip Flexor Stretch - 30 seconds each side',
        '3. Child\'s Pose - 1 minute',
        '4. Torso Rotation - 10 each side',
        '5. Standing Quad Stretch - 30 seconds each leg'
      ]
    },
    {
      title: 'Staying Hydrated During Workout',
      description: 'Tips for maintaining proper hydration during exercise',
      image: require('../../assets/hydration.jpg'),
      content: [
        '1. Drink water before you feel thirsty',
        '2. Take small sips throughout your workout',
        '3. Monitor your hydration levels',
        '4. Use a reusable water bottle',
        '5. Hydrate based on workout intensity'
      ]
    },
    {
      title: 'Essential Cool-down Stretches',
      description: 'Post-workout stretches for better recovery',
      image: require('../../assets/cooldown stretches.jpg'),
      content: [
        '1. Standing Quadriceps Stretch - 30 seconds each',
        '2. Seated Hamstring Stretch - 30 seconds',
        '3. Child\'s Pose - 1 minute',
        '4. Chest Stretch - 30 seconds',
        '5. Light Walking - 5 minutes'
      ]
    },
    {
      title: 'Fueling Your Fitness',
      description: 'Nutrition tips for optimal workout performance',
      image: require('../../assets/fueling fitness.jpg'),
      content: [
        '1. Eat balanced meals with protein and carbs',
        '2. Include fresh fruits and vegetables',
        '3. Stay hydrated with water',
        '4. Time your pre-workout meal',
        '5. Consider post-workout nutrition'
      ]
    },
  ], []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fitness Tips</Text>
        <Text style={styles.subtitle}>Expert advice for better health</Text>
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
    height: 250,
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