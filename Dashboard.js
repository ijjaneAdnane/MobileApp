import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';

const Dashboard = ({ navigation }) => {
  return (
    <ImageBackground source={require('./assets/trav1.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>Tableau de Bord</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Voir les Hotels"
            onPress={() => navigation.navigate('Hotels')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Voir les Réservations"
            onPress={() => navigation.navigate('Reservations')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Voir les Voyages"
            onPress={() => navigation.navigate('Voyages')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Voir les Activités"
            onPress={() => navigation.navigate('Activities')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default Dashboard;
