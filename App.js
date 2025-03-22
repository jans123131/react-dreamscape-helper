
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  View, 
  Image, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Import screens from existing project
import Home from "./lespage/Home.js"; 
import Logo from "./lespage/logo.js";
import MesTickets from "./lespage/mestickets.js";
import Services from "./lespage/services.js";
import MapPoste from "./lespage/MapPoste.js"; 
import Fiche from "./lespage/fiche.js";

const Stack = createStackNavigator();

// Main App component with simplified navigation
function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          cardStyle: { backgroundColor: '#ffffff' }
        }}
      >
        <Stack.Screen name="Logo" component={Logo} />
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen 
          name="MesTickets" 
          component={MesTickets} 
          options={{ 
            headerShown: true, 
            title: "Mes Tickets",
            headerStyle: {
              backgroundColor: '#9b87f5',
              elevation: 0,
              shadowOpacity: 0
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} 
        />
        <Stack.Screen 
          name="Services" 
          component={Services} 
          options={{ 
            headerShown: true, 
            title: "Nos Services",
            headerStyle: {
              backgroundColor: '#9b87f5',
              elevation: 0,
              shadowOpacity: 0
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} 
        />
        <Stack.Screen 
          name="MapPoste" 
          component={MapPoste} 
          options={{ 
            headerShown: true, 
            title: "Map Poste",
            headerStyle: {
              backgroundColor: '#9b87f5',
              elevation: 0,
              shadowOpacity: 0
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} 
        />
        <Stack.Screen 
          name="Fiche" 
          component={Fiche} 
          options={{ 
            headerShown: true, 
            title: "Fiche",
            headerStyle: {
              backgroundColor: '#9b87f5',
              elevation: 0,
              shadowOpacity: 0
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Main Navigator with improved design
function MainNavigator({ navigation }) {
  const [activeTab, setActiveTab] = useState('home');

  const navigateTo = (screen, tab) => {
    setActiveTab(tab);
    if (screen !== 'Main') {
      navigation.navigate(screen);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#9b87f5', '#7E69AB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Image 
            source={require("./assets/ticket.png")} 
            style={styles.logo} 
          />
          <Text style={styles.title}>Ticket App</Text>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Home navigation={navigation} />
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Contact Us</Text>
            <View style={styles.footerItem}>
              <Ionicons name="call-outline" size={16} color="#9b87f5" />
              <Text style={styles.footerText}>+216 12 345 678</Text>
            </View>
            <View style={styles.footerItem}>
              <Ionicons name="mail-outline" size={16} color="#9b87f5" />
              <Text style={styles.footerText}>contact@ticketapp.com</Text>
            </View>
            <View style={styles.footerItem}>
              <Ionicons name="location-outline" size={16} color="#9b87f5" />
              <Text style={styles.footerText}>Tunis, Tunisia</Text>
            </View>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Quick Links</Text>
            <TouchableOpacity style={styles.footerItem} onPress={() => navigateTo('Services', 'services')}>
              <Ionicons name="information-circle-outline" size={16} color="#9b87f5" />
              <Text style={styles.footerText}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerItem} onPress={() => navigateTo('MesTickets', 'tickets')}>
              <Ionicons name="ticket-outline" size={16} color="#9b87f5" />
              <Text style={styles.footerText}>Support</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.copyright}>© 2023 Ticket App. All rights reserved.</Text>
      </View>
      
      <View style={styles.menuContainer}>
        <View style={styles.menu}>
          <TouchableOpacity
            style={[styles.menuItem, activeTab === 'home' && styles.activeMenuItem]}
            onPress={() => navigateTo('Main', 'home')}
          >
            <View style={styles.menuIcon}>
              <Ionicons 
                name="home-outline" 
                size={22}
                color={activeTab === 'home' ? '#9b87f5' : '#8A898C'} 
              />
            </View>
            <Text style={[styles.menuText, activeTab === 'home' && styles.activeMenuText]}>
              Accueil
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, activeTab === 'tickets' && styles.activeMenuItem]}
            onPress={() => navigateTo('MesTickets', 'tickets')}
          >
            <View style={styles.menuIcon}>
              <Ionicons 
                name="ticket-outline" 
                size={22}
                color={activeTab === 'tickets' ? '#9b87f5' : '#8A898C'} 
              />
            </View>
            <Text style={[styles.menuText, activeTab === 'tickets' && styles.activeMenuText]}>
              Mes Tickets
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, activeTab === 'services' && styles.activeMenuItem]}
            onPress={() => navigateTo('Services', 'services')}
          >
            <View style={styles.menuIcon}>
              <Ionicons 
                name="grid-outline" 
                size={22}
                color={activeTab === 'services' ? '#9b87f5' : '#8A898C'} 
              />
            </View>
            <Text style={[styles.menuText, activeTab === 'services' && styles.activeMenuText]}>
              Services
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Enhanced Styles with footer and improved navigation
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerGradient: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: "contain",
    tintColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "#F6F6F7",
  },
  footer: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  footerSection: {
    flex: 1,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  copyright: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },
  menuContainer: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  menu: {
    flexDirection: "row",
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
  },
  menuItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  activeMenuItem: {
    borderTopWidth: 0,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 12,
    color: "#8A898C",
    marginTop: 4,
  },
  activeMenuText: {
    color: "#9b87f5",
    fontWeight: "600",
  },
});

export default App;
