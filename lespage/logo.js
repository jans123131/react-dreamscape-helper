
import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Logo({ navigation }) {
  useEffect(() => {
    // Redirige vers "Main" dès que le composant est monté
    navigation.replace("Main");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/ticket.png")} 
        style={styles.logo} 
        resizeMode="contain"
        tintColor="#9b87f5"
      />
      <Text style={styles.appName}>Ticket</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 210,
    height: 150,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#9b87f5",
  },
});
