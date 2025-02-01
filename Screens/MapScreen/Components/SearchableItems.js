import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const SearchableItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // To show loader during data fetch

  // ** Function to fetch data **
  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.53:5002/api/foods'); // Replace with your API endpoint
      const data = await response.json();

      // Formatting data for display
      const formattedData = data.map((item) => ({
        id: item.id_food,
        name: item.name_food,
        description: item.description_food,
        type: item.type_food,
        imageUrl: `http://192.168.1.53:5002/api/${item.images[0]}`, // Dynamic image URL from API
        distance: '2.0',
        deliveryTime: '20-30',
        favorite: false,
        isOpen: true,
      }));

      setMenuItems(formattedData);
      setIsLoading(false); // Stop the loader once data is loaded
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  // ** Fetch data once when component mounts **
  useEffect(() => {
    fetchData();
  }, []);

  // ** Fetch data every time component comes into view **
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        {/* Dynamic Image with lazy loading */}
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.carouselImage}
          PlaceholderContent={<ActivityIndicator color="#893571" />} // Lazy-loading placeholder
        />
        {/* Favorite Button */}
        <TouchableOpacity style={styles.favoriteButton}>
          <MaterialIcons name="favorite" size={20} color="#893571" />
        </TouchableOpacity>
        {/* Open/Closed Badge */}
        <View style={[styles.openBadge, !item.isOpen && styles.closedBadge]}>
          <Text style={item.isOpen ? styles.openText : styles.closedText}>
            {item.type}
          </Text>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.footerContainer}>
          <View style={styles.distanceContainer}>
            <MaterialIcons name="location-on" size={14} color="#893571" />
            <Text style={styles.distance}>{item.distance} km</Text>
          </View>
          <View style={styles.deliveryContainer}>
            <MaterialIcons name="delivery-dining" size={14} color="green" />
            <Text style={styles.deliveryTime}>{item.deliveryTime} mins</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // If data is loading, show a loader
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#893571" />
        <Text>Loading menu items...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={menuItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 8,
  },
  itemContainer: {
    width: 180, // Fixed dimensions
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    elevation: 3,
  },
  openBadge: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 3,
  },
  closedBadge: {
    backgroundColor: '#FF5252',
  },
  openText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  closedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2D3436',
  },
  description: {
    fontSize: 12,
    color: '#636E72',
    marginBottom: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    marginLeft: 3,
    fontSize: 12,
    color: '#636E72',
  },
  deliveryTime: {
    marginLeft: 3,
    fontSize: 12,
    color: '#636E72',
  },
});

export default SearchableItems;
