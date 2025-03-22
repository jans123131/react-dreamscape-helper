import React, { useEffect, useState } from "react";  
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import agencies from "../data/agencie";

const MapPoste = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDelegation, setSelectedDelegation] = useState("");
  const [mapRegion, setMapRegion] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      } else {
        console.log("Permission refusée");
      }
    };
    requestLocationPermission();
  }, []); // Demande de permission uniquement au premier rendu

  // Mise à jour de la carte dès que userLocation change
  useEffect(() => {
    if (userLocation) {
      setMapRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
  }, [userLocation]);

  const filteredRegions = Array.from(new Set(agencies.map(agency => agency.region)));
  const filteredDelegations = selectedRegion ? 
    Array.from(new Set(agencies.filter(agency => agency.region === selectedRegion).map(agency => agency.delegation))) 
    : [];

  useEffect(() => {
    if (selectedRegion) {
      const regionAgencies = agencies.filter(agency => agency.region === selectedRegion);
      if (regionAgencies.length > 0) {
        setMapRegion({
          latitude: regionAgencies[0].latitude,
          longitude: regionAgencies[0].longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        });
      }
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedDelegation) {
      const delegationAgencies = agencies.filter(agency => agency.delegation === selectedDelegation);
      if (delegationAgencies.length > 0) {
        const avgLat = delegationAgencies.reduce((sum, agency) => sum + agency.latitude, 0) / delegationAgencies.length;
        const avgLng = delegationAgencies.reduce((sum, agency) => sum + agency.longitude, 0) / delegationAgencies.length;
        setMapRegion({
          latitude: avgLat,
          longitude: avgLng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      }
    }
  }, [selectedDelegation]);

  // Trouver l'agence sélectionnée
  const selectedAgency = agencies.find(
    agency => agency.region === selectedRegion && agency.delegation === selectedDelegation
  );

  return (
    <View style={styles.container}>
      

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Sélectionnez votre région et votre bureau de poste</Text>

        <Picker
          selectedValue={selectedRegion}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedRegion(itemValue);
            setSelectedDelegation("");
          }}
        >
          <Picker.Item label="Sélectionnez une gouvernance" value="" />
          {filteredRegions.map((region, index) => (
            <Picker.Item key={`region-${index}`} label={region} value={region} />
          ))}
        </Picker>

        {selectedRegion && (
          <Picker
            selectedValue={selectedDelegation}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedDelegation(itemValue)}
          >
            <Picker.Item label="Sélectionnez un bureau de poste" value="" />
            {filteredDelegations.map((delegation, index) => (
              <Picker.Item key={`delegation-${index}`} label={delegation} value={delegation} />
            ))}
          </Picker>
        )}
      </View>

      {mapRegion && (
        <>
          <MapView style={styles.map} region={mapRegion}>
            {agencies
              .filter(agency => !selectedRegion || agency.region === selectedRegion)
              .filter(agency => !selectedDelegation || agency.delegation === selectedDelegation)
              .map(agency => (
                <Marker
                  key={agency.id}
                  coordinate={{ latitude: agency.latitude, longitude: agency.longitude }}
                  title={agency.name}
                  description="Agence postale"
                  pinColor="red"
                />
              ))}

            {userLocation && (
              <Marker
                coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
                title="Votre Position"
                description="Actuelle"
                pinColor="blue"
              />
            )}
          </MapView>

          {/* Bouton Prendre Ticket */}
          <TouchableOpacity 
            style={styles.ticketButton} 
            onPress={() => {
              if (selectedAgency) {
                navigation.navigate("Fiche", { agency: selectedAgency });
              } else {
                alert("Veuillez sélectionner une agence.");
              }
            }}
          >
            <Text style={styles.ticketButtonText}>Prendre Ticket</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backArrow: { position: 'absolute', top: 40, left: 20, zIndex: 10 },
  formContainer: { padding: 20, marginTop: '3%' },
  formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  picker: { height: 50, width: "100%" },
  map: { flex: 1 },
  ticketButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  ticketButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default MapPoste;
























