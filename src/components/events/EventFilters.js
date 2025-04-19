
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { FONT_SIZE } from '../../theme/typography';

const EventFilters = ({ 
  selectedRegion,
  setSelectedRegion, 
  priceRange, 
  setPriceRange,
  regions,
  onClose 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtres</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Région</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.regionsScroll}>
          {regions.map((region) => (
            <TouchableOpacity
              key={region}
              style={[
                styles.regionChip,
                selectedRegion === region && styles.selectedRegionChip
              ]}
              onPress={() => setSelectedRegion(region)}
            >
              <Text style={[
                styles.regionText,
                selectedRegion === region && styles.selectedRegionText
              ]}>
                {region}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prix maximum (TND)</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={200}
          step={5}
          value={priceRange}
          onValueChange={setPriceRange}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor={COLORS.gray_light}
          thumbTintColor={COLORS.primary}
        />
        <Text style={styles.priceText}>{priceRange} TND</Text>
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Appliquer les filtres</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: 15,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
    color: COLORS.primary_dark,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    color: COLORS.gray,
  },
  regionsScroll: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  regionChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.light_gray,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  selectedRegionChip: {
    backgroundColor: COLORS.primary,
  },
  regionText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
  },
  selectedRegionText: {
    color: COLORS.white,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  priceText: {
    textAlign: 'center',
    fontSize: FONT_SIZE.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
});

export default EventFilters;
