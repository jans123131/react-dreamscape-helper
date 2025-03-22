// service.js

import React, { useState } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity, ScrollView } from "react-native";

// Liste des services
const services = [
  { id: "1", title: "Gestion des Fils d'Attente", description: "Réservez votre place à distance et suivez le temps d'attente en temps réel." },
  { id: "2", title: "Suivi en Temps Réel", description: "Recevez des notifications sur l'évolution du temps d'attente et soyez informé à chaque étape." },
  { id: "3", title: "Notifications et Rappels ", description: "Recevez des alertes sur l’évolution de votre ticket et soyez informé lorsque votre tour approche." },
  { id: "4", title: "Assistance via Chatbot ", description: "Un chatbot disponible  pour répondre à vos questions et vous guider dans l'utilisation de la plateforme. Posez vos questions et obtenez des réponses instantanées ." },
  { id: "5", title: "Accès Facile et Rapide", description: "Accédez à différents services publics directement depuis votre application." },
];

// Composant principal de la page des services
const Services = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💡 Nos Services</Text>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </ScrollView>
    </View>
  );
};

// Composant pour chaque service avec animation
const ServiceCard = ({ service }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Valeur initiale de l'animation (opacité)

  // Démarrer l'animation d'apparition
  Animated.timing(fadeAnim, {
    toValue: 1, // De 0 à 1 pour rendre l'élément visible
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <Text style={styles.cardTitle}>{service.title}</Text>
      <Text style={styles.cardDescription}>{service.description}</Text>
    </Animated.View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
  },
});

export default Services;
