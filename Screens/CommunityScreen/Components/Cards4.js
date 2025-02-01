import React from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  Image 
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

export default function Cards4() {
  const { width } = useWindowDimensions();
  const categories = ['Food', 'Clothes', 'Books', 'Electronics', 'Furniture', 'Others'];
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.actionGrid}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.gridItem}>
              <Icon name="gift" size={30} color="#893571" />
              <Text>{t('CommunityActions.Give')}</Text> //Give
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem}>
              <Icon name="hand-heart" size={30} color="#893571" />
              <Text>{t('CommunityActions.Support')}</Text> //Support
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.gridItem}>
              <Icon name="post" size={30} color="#893571" />
              <Text>{t('CommunityActions.Post')}</Text> //Post
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem}>
              <Icon name="account-group" size={30} color="#893571" />
              <Text>{t('CommunityActions.Join')}</Text> //Join
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
            placeholder={t('CommunityActions.NeedAnything')}
            placeholderTextColor="#666"
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.categoryButton}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Donation Items List */}
        <View style={styles.contentList}>
          {[1, 2, 3].map((item) => (
            <Card key={item} style={styles.donationCard}>
              <Image
                source={{ uri: 'https://brownliving.in/cdn/shop/articles/food-donation-services-988981_600x.jpg?v=1703200384' }}
                style={styles.donationImage}
              />
              <Card.Content>  
                <Text style={styles.cardTitle}>Food Donation Drive</Text> // Food Donation Drive
                
                <View style={styles.infoRow}>
                  <Icon name="map-marker" size={16} color="#666" />
                  <Text style={styles.infoText}>Downtown Community Center</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Icon name="food" size={16} color="#666" />
                  <Text style={styles.infoText}>Required: Rice, Canned Foods</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Icon name="package-variant" size={16} color="#666" />
                  <Text style={styles.infoText}>Quantity Needed: 100 kg</Text>
                </View>

                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progress, { width: '45%' }]} />
                  </View>
                  <Text style={styles.progressText}>45% collected</Text>
                </View>

                <TouchableOpacity style={styles.donateButton}>
                  <Text style={styles.donateButtonText}>Donate Now</Text>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  actionGrid: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  gridItem: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    width: '45%',
    elevation: 2,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    elevation: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    maxHeight: 32,
  },
  categoryButton: {
    backgroundColor: '#893571',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  contentList: {
    padding: 16,
  },
  donationCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    overflow: 'hidden',
  },
  donationImage: {
    width: '100%',
    height: 150,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  progress: {
    height: '100%',
    backgroundColor: '#893571',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  donateButton: {
    backgroundColor: '#893571',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  donateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
