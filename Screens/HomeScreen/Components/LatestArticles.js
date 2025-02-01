import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const FoodMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    fetch('http://192.168.1.53:5002/api/foods')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCardPress = (item) => {
    navigation.navigate('FoodDetail', { foodId: item.id_food });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t('LatestArticles.NearbyFood')}</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id_food} 
            onPress={() => handleCardPress(item)}
            style={styles.cardWrapper}
          >
            <Card style={styles.foodCard}>
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: `http://192.168.1.53:5002/api/${item.images[0]}` }} 
                  style={styles.foodImage} 
                />
                <View style={styles.tagContainer}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{item.type_food}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.foodContent}>
                <Text style={styles.foodName}>{item.name_food}</Text>
                <View style={styles.statsContainer}>
                  <Text style={styles.statsText}>{item.availability.country_availability}</Text>
                  <Text style={styles.statsText}>•</Text>
                  <Text style={styles.statsText}>{item.availability.adresse_availability}</Text>
                </View>
                <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Icon name="food-variant" size={12.6} color="#4CAF50" />
                    <Text style={styles.infoText}>{item.actualquantity_food} {item.quantitytype_food}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Icon name="map-marker" size={12.6} color="#4CAF50" />
                    <Text style={styles.infoText}>1 km</Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.cookingTime}>{item.prepTime}</Text>
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 11, // scaled down from 16
  },
  scrollViewContent: {
    paddingRight: 14, // scaled down from 16
  },
  sectionTitle: {
    fontSize: 21, // scaled down from 24
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 14, // scaled down from 16
  },
  cardWrapper: {
    marginRight: 14, // scaled down from 16
  },
  foodCard: {
    width: 252, // scaled down from 280
    borderRadius: 11, // scaled down from 12
    elevation: 3, // scaled down from 4
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  foodImage: {
    width: '100%',
    height: 162, // scaled down from 180
    resizeMode: 'cover',
  },
  tagContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  tag: {
    backgroundColor: 'rgba(151,58,127,0.9)',
    paddingHorizontal: 11, // scaled down from 12
    paddingVertical: 5, // scaled down from 6
    borderRadius: 14, // scaled down from 16
  },
  tagText: {
    color: '#fff',
    fontSize: 10.8, // scaled down from 12
    fontWeight: '600',
  },
  foodContent: {
    padding: 14, // scaled down from 16
  },
  foodName: {
    fontSize: 16.2, // scaled down from 18
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 7, // scaled down from 8
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // scaled down from 12
  },
  statsText: {
    fontSize: 10.8, // scaled down from 12
    color: '#666',
    marginRight: 7, // scaled down from 8
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 4,
    fontSize: 12.6, // scaled down from 14
    color: '#666',
  },
  timeContainer: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 7, // scaled down from 8
    paddingVertical: 4, // kept the same
    borderRadius: 11, // scaled down from 12
  },
  cookingTime: {
    fontSize: 10.8, // scaled down from 12
    color: '#666',
  },
});

export default FoodMenu;
