import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
const ImpactContainer = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.impactContainer}>
          <LinearGradient
            colors={['#893571', '#b8658f']}
            style={styles.impactCard}
          >
            <Text style={styles.impactTitle}>{t('ImpaContainer.YourImpact')}</Text>
            <View style={styles.impactStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>2,450</Text>
                <Text style={styles.statLabel}>{t('ImpaContainer.MealsShared')}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>127</Text>
                <Text style={styles.statLabel}>{t('ImpaContainer.LivesTouched')}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>15</Text>
                <Text style={styles.statLabel}>{t('ImpaContainer.NGOsHelped')}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Second Impact Card */}
        <View style={styles.impactContainer}>
          <LinearGradient
            colors={['#893571', '#b8658f']}
            style={styles.impactCard}
          >
            <Text style={styles.impactTitle}>{t('ImpaContainer.Overall')}</Text>
            <View style={styles.impactStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3,100</Text>
                <Text style={styles.statLabel}>{t('ImpaContainer.MealsShared')}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>215</Text>
                <Text style={styles.statLabel}>{t('ImpaContainer.LivesTouched')}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>20</Text>
                <Text style={styles.statLabel}>{t('ImpaContainer.NGOsHelped')}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Indicator for the next card */}
        <View style={styles.arrowIndicator}>
          <Text style={styles.arrowText}>→</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: 32,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  impactContainer: {
    marginRight: 16, // space between cards
    width: 300, // card width
  },
  impactCard: {
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  impactTitle: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#FFF',
  },
  statDivider: {
    height: 24,
    borderLeftWidth: 1,
    borderColor: '#FFF',
  },
  arrowIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    position: 'absolute',
    top: '50%',
    right: 16,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b8658f',
    transform: [{ rotate: '90deg' }],
  },
});

export default ImpactContainer;
