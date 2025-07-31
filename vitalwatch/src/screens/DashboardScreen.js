import React, { useState, useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchLatestVitals } from '../services/api';
import { useAuth } from '../context/AuthContext';

const DashboardScreen = () => {
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadVitals = async () => {
      try {
        const data = await fetchLatestVitals();
        setVitals(data);
        setError(null);
      } catch (err) {
        setError('Failed to load vital signs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadVitals();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await loadVitals();
    } finally {
      setRefreshing(false);
    }
  }, []);

  const chartData = useMemo(() => {
    const labels = vitals.slice(-6).map((_, index) => {
      const time = new Date(currentTime.getTime() - (5 - index) * 60000);
      return time.getHours().toString().padStart(2, '0') + ':' + 
             time.getMinutes().toString().padStart(2, '0');
    });
    const heartRateData = vitals.slice(-6).map(v => v.heartRate);
    const spo2Data = vitals.slice(-6).map(v => v.spo2);

    return {
      labels,
      heartRate: heartRateData,
      spo2: spo2Data,
    };
  }, [vitals]);

  const latestVitals = useMemo(() => {
    if (vitals.length === 0) return { heartRate: '--', spo2: '--' };
    const latest = vitals[vitals.length - 1];
    return {
      heartRate: latest.heartRate.toString(),
      spo2: latest.spo2.toString(),
    };
  }, [vitals]);

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
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#6200ee']}
          tintColor="#6200ee"
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.email || 'User'}!</Text>
        <Text style={styles.subtitle}>Here's your health overview</Text>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Heart Rate</Text>
          <Text style={styles.metricValue}>{latestVitals.heartRate}</Text>
          <Text style={styles.metricUnit}>BPM</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Blood Oxygen</Text>
          <Text style={styles.metricValue}>{latestVitals.spo2}</Text>
          <Text style={styles.metricUnit}>%</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Heart Rate Trend</Text>
        <LineChart
          data={{
            labels: chartData.labels,
            datasets: [{
              data: chartData.heartRate,
            }],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
        />

        <Text style={styles.chartTitle}>Blood Oxygen Trend</Text>
        <LineChart
          data={{
            labels: chartData.labels,
            datasets: [{
              data: chartData.spo2,
            }],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  header: {
    padding: 20,
    backgroundColor: '#6200ee',
  },
  greeting: {
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
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    margin: 5,
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
  metricLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  metricUnit: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  chartContainer: {
    padding: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
});

export default DashboardScreen;