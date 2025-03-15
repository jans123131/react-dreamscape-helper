
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SPACING } from '../theme/spacing';

const StatistiqueScreen = () => {
  const stats = [
    { value: '500+', label: 'Revendeur' },
    { value: '2500T', label: 'Dattes Exportées' },
    { value: '200+', label: 'Producteur Affiliés' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.header}>Statistiques</Text>
          
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
          
          <Text style={styles.description}>
            Ces statistiques illustrent notre impact dans l'industrie des dattes.
            Avec plus de 500 revendeurs partenaires, 2500 tonnes de dattes exportées,
            et plus de 200 producteurs affiliés, nous sommes fiers de notre contribution
            à l'économie locale et à la promotion des produits tunisiens à l'international.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: SPACING.lg,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.xl,
    marginLeft: '5%', // Adding 5% left margin for mobile
  },
  statItem: {
    alignItems: 'center',
    padding: SPACING.md,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e63946',
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginTop: SPACING.md,
    textAlign: 'justify',
  },
});

export default StatistiqueScreen;
