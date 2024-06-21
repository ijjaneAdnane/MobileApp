import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Voyages = () => {
  const [voyages, setVoyages] = useState([]);
  const [newVoyage, setNewVoyage] = useState({ destination: '', dateDepart: '', dureeSejour: '', prix: '' });
  const fetchVoyages = async () => {
    try {
      const response = await fetch('http://192.168.0.154:8080/api/voyages');
      const data = await response.json();
      setVoyages(data);
    } catch (error) {
      console.error('Error fetching voyages:', error);
    }
  };

  useEffect(() => {
    fetchVoyages();
  }, []);
  const addVoyage = async () => {
    try {
      const response = await fetch('http://192.168.0.154:8080/api/voyages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVoyage),
      });
      const data = await response.json();
      setVoyages([...voyages, data]);
      setNewVoyage({ destination: '', dateDepart: '', dureeSejour: '', prix: '' });
    } catch (error) {
      console.error('Error adding voyage:', error);
    }
  };
  const deleteVoyage = async (id) => {
    try {
      await fetch('http://192.168.0.154:8080/api/voyages', {
        method: 'DELETE',
      });
      setVoyages(voyages.filter(voyage => voyage.id !== id));
    } catch (error) {
      console.error('Error deleting voyage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Voyages</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Destination"
          value={newVoyage.destination}
          onChangeText={(text) => setNewVoyage({ ...newVoyage, destination: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Date de départ"
          value={newVoyage.dateDepart}
          onChangeText={(text) => setNewVoyage({ ...newVoyage, dateDepart: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Durée du séjour (jours)"
          keyboardType="numeric"
          value={newVoyage.dureeSejour}
          onChangeText={(text) => setNewVoyage({ ...newVoyage, dureeSejour: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Prix"
          keyboardType="numeric"
          value={newVoyage.prix}
          onChangeText={(text) => setNewVoyage({ ...newVoyage, prix: text })}
        />
        <Button title="Ajouter Voyage" onPress={addVoyage} />
      </View>
      <FlatList
        data={voyages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.voyageItem}>
            <Text>Destination: {item.destination}</Text>
            <Text>Date de départ: {item.dateDepart}</Text>
            <Text>Durée: {item.dureeSejour} jours</Text>
            <Text>Prix: {item.prix} €</Text>
            <TouchableOpacity onPress={() => deleteVoyage(item.id)}>
              <Text style={styles.actionButton}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  voyageItem: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  actionButton: {
    color: 'red',
    marginTop: 5,
  },
});

export default Voyages;
