import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MesTickets = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.noTicketsText}>Aucun ticket disponible</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",  // Centrer le contenu verticalement
    alignItems: "center",      // Centrer le contenu horizontalement
    backgroundColor: "#f4f4f4",
  },
  noTicketsText: {
    fontSize: 18,
    textAlign: "center",
    color: "gray",
  },
});

export default MesTickets;















