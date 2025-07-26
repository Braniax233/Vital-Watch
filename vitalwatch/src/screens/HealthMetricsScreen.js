import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import { fetchUserVitals } from '../services/api';
import { useAuth } from '../context/AuthContext';

const HealthMetricsScreen = () => {
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const loadUserVitals = React.useCallback(async () => {
    if (!user?.uid) return;
    
    try {
      const data = await fetchUserVitals(user.uid);
      setVitals(Object.values(data));
      setError(null);
    } catch (err) {
      setError('Failed to load health metrics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadUserVitals();
  }, [user, loadUserVitals]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await loadUserVitals();
    } finally {
      setRefreshing(false);
    }
  }, [loadUserVitals]);

  const renderVitalItem = ({ item }) => {
    const date = new Date(item.timestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <View style={styles.vitalCard}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <View style={styles.vitalRow}>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>Heart Rate</Text>
            <Text style={styles.vitalValue}>{item.heartRate} <Text style={styles.vitalUnit}>BPM</Text></Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>Blood Pressure</Text>
            <Text style={styles.vitalValue}>{item.bloodPressure}</Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>Temperature</Text>
            <Text style={styles.vitalValue}>{item.temperature} <Text style={styles.vitalUnit}>°C</Text></Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Health Metrics</Text>
        <Text style={styles.subtitle}>Recent Measurements</Text>
      </View>
      <FlatList
        data={vitals.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))}
        renderItem={renderVitalItem}
        keyExtractor={item => item.id || item.timestamp}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
  },
  listContent: {
    padding: 16,
  },
  vitalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  dateText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 12,
  },
  vitalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vitalItem: {
    flex: 1,
    alignItems: 'center',
  },
  vitalLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  vitalUnit: {
    fontSize: 12,
    color: '#666666',
    fontWeight: 'normal',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#B00020',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HealthMetricsScreen;