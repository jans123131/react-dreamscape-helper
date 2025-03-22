import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const Fiche = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { agency } = route.params || {};

  if (!agency) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucune agence sélectionnée</Text>
      </View>
    );
  }
 

  return (
    <View style={styles.container}>
      {/* Flèche de retour */}
      

      <Text style={styles.title}>Fiche de l'Agence</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nom :</Text>
        <Text style={styles.value}>{agency.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Région :</Text>
        <Text style={styles.value}>{agency.region}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Délégation :</Text>
        <Text style={styles.value}>{agency.delegation}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Latitude :</Text>
        <Text style={styles.value}>{agency.latitude}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Longitude :</Text>
        <Text style={styles.value}>{agency.longitude}</Text>
      </View>

      {/* Boutons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={() => navigation.navigate("MesTickets")}
        >
          <Text style={styles.buttonText}>Confirmer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 60, backgroundColor: "#f4f4f4", justifyContent: "center" },
  backArrow: { position: "absolute", top: 20, left: 20, padding: 10 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 50 },
  infoContainer: { flexDirection: "row", marginBottom: 10, alignItems: "center" },
  label: { fontWeight: "bold", fontSize: 16, width: 100 },
  value: { fontSize: 16, flex: 1 },
  errorText: { fontSize: 18, color: "red", textAlign: "center" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 50 },
  confirmButton: { backgroundColor: "green", padding: 12, borderRadius: 5, flex: 1, marginRight: 10, alignItems: "center" },
  backButton: { backgroundColor: "#007bff", padding: 12, borderRadius: 5, flex: 1, marginLeft: 10, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default Fiche;







