import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

import ImageCarousel from './components/ImageCarousel';
import FoodHeader from './components/FoodHeader';
import QuickInfo from './components/QuickInfo';
import LocationInfo from './components/LocationInfo';

const { height } = Dimensions.get('window');

const FoodDetail = ({ navigation, route }) => {
  const scrollX = new Animated.Value(0);
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { foodId } = route.params;

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.53:5002/api/foods/${foodId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch food details');
        }
        const data = await response.json();
  
        const transformedData = {
          images: data.images.map(img => `http://192.168.1.53:5002/api/${img}`),
          title: data.name_food,
          description: data.description_food,
          foodtype: data.type_food,
          expiryDate: data.cookedtime_food ? new Date(data.cookedtime_food).toLocaleDateString() : "N/A",
          allergens: data.allergens_food === "true" ? [" Allergens"] : ["No Allergens"],
          preparation: `${data.quantity_food} ${data.quantitytype_food}`,
          quantitytype_food: data.quantitytype_food,
          actualquantity_food: data.actualquantity_food,
          additionalnote: data.additionalnote_food,
          hallal: data.hallal_food === 1 ? 'Halal' : 'Not Halal',
          isfrozen: data.isfrozen_food ? 'Frozen' : 'Fresh',
          hygienneDeclaration: data.hygienne_declaration ? 'Declared' : 'Not Declared',
          dataConsent: data.data_consent ? 'Given' : 'Not Given',
          userPosted: {
            name: data.user ? `${data.user.firstname_user} ${data.user.lastname_user}` : 'Unknown',
            date: data.createdate_food ? new Date(data.createdate_food).toLocaleDateString() : "N/A",
            country: data.user?.country_user || 'Unknown'
          },
          location: data.availability
            ? {
                address: data.availability.adresse_availability,
                country: data.availability.country_availability,
                postalCode: data.availability.postalcode_availability,
                date: data.availability.date_availability ? new Date(data.availability.date_availability).toLocaleDateString() : "N/A",
                time: data.availability.time_availability,
                longitude: data.availability.longitude_availability,
                altitude: data.availability.altitude_availability,
              }
            : null,
          status: data.istaken_food ? 'Reserved' : 'Available'
        };
  
        setFoodData(transformedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchFoodDetails();
  }, [foodId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#893571" />
        <Text style={styles.loadingText}>Loading food details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle-outline" size={48} color="#ff4444" />
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!foodData) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="information-circle-outline" size={48} color="#893571" />
        <Text style={styles.errorText}>No food information available</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageCarousel images={foodData.images} scrollX={scrollX} />

      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        style={styles.headerGradient}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView 
        style={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.contentWrapper}>
          <FoodHeader 
            title={foodData.title}
            hallal={foodData.hallal}
            foodtype={foodData.foodtype}
            expiryDate={foodData.expiryDate}
          />

          <QuickInfo 
            quantity={foodData.actualquantity_food}
            quantityType={foodData.quantitytype_food}
            allergens={foodData.allergens}
            isFrozen={foodData.isfrozen}
          />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this food</Text>
            <Text style={styles.description}>{foodData.description}</Text>
          </View>

          <LocationInfo location={foodData.location} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Notes</Text>
            <Text style={styles.description}>{foodData.additionalnote}</Text>
          </View>
          
          <View style={styles.spacer} />
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            { opacity: foodData.status === 'Available' ? 1 : 0.6 }
          ]}
          disabled={foodData.status !== 'Available'}
          onPress={() => navigation.navigate('OrderFood', { foodData })}
        >
          <Text style={styles.actionButtonText}>
            {foodData.status === 'Available' ? 'Request Food' : 'Currently Reserved'}
          </Text>
          <Icon 
            name={foodData.status === 'Available' ? 'arrow-forward-outline' : 'lock-closed-outline'} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    fontFamily: 'System',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'System',
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#893571',
    borderRadius: 25,
    elevation: 3,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
  backButton: {
    position: 'absolute',
    top: StatusBar.currentHeight + 10,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: 25,
    elevation: 2,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  contentWrapper: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 15,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    fontFamily: 'System',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666',
    fontFamily: 'System',
  },
  spacer: {
    height: 20,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 10,
  },
  actionButton: {
    backgroundColor: '#893571',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 30,
    elevation: 4,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    fontFamily: 'System',
  },
});

export default FoodDetail;