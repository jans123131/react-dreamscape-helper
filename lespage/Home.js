import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

const establishments = [
  { id: "1", name: "Poste", logo: require('../assets/poste.png') },
  { id: "2", name: "CNSS", logo: require('../assets/CNSS.png') },
  { id: "3", name: "CNAM", logo: require('../assets/CNAM.png') },
];

const Home = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const filteredEstablishments = establishments.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePress = (item) => {
    if (item.id === "1") {
      navigation.navigate("MapPoste"); // Navigation vers MapPoste
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nos établissements</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="🔍 Rechercher l'établissement..."
        placeholderTextColor="#A4A4A4"
        onChangeText={setSearch}
        value={search}
      />

      <View style={styles.listContainer}>
        {filteredEstablishments.map((item) => (
          <AnimatedCard key={item.id} item={item} onPress={() => handlePress(item)} />
        ))}
      </View>
    </View>
  );
};

const AnimatedCard = ({ item, onPress }) => {
  const [scaleAnim] = useState(new Animated.Value(0.8));


  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Image source={item.logo} style={styles.logo} />
        <Text style={styles.cardText}>{item.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Couleur de fond plus douce et moderne
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2F4F4F", // Couleur plus moderne et apaisante
    marginBottom: 30,
    textTransform: "uppercase",
    letterSpacing: 2,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  searchBar: {
    height: 45,
    width: "90%",
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    paddingHorizontal: 15,
    color: "#2F4F4F",
    marginBottom: 30,
    borderWidth: 0,
    fontSize: 16,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "95%",
    paddingHorizontal: 10,
  },
  card: {
    width: "75%",
    height: 170,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 15,
    resizeMode: "contain",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B0082", // Couleur moderne
    textTransform: "uppercase",
    letterSpacing: 1.5,
    textAlign: "center",
    fontFamily: "Roboto",
  },
});

export default Home;










 





