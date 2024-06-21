import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ nom: '', description: '', prix: '' });

  const fetchActivities = async () => {
    try {
      const response = await fetch('http://192.168.0.154:8080/api/activités');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const addActivity = async () => {
    try {
      const response = await fetch('http://192.168.0.154:8080/api/activités', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newActivity),
      });
      if (response.ok) {
        fetchActivities();
        setNewActivity({ nom: '', description: '', prix: '' });
      } else {
        console.error('Failed to add activity');
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const deleteActivity = async (id) => {
    try {
      const response = await fetch(`http://192.168.0.154:8080/api/activités/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchActivities();
      } else {
        console.error('Failed to delete activity');
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const updateActivity = async (id) => {
    try {
      const response = await fetch(`http://192.168.0.1548080/api/activités/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newActivity),
      });
      if (response.ok) {
        fetchActivities();
        setNewActivity({ nom: '', description: '', prix: '' });
      } else {
        console.error('Failed to update activity');
      }
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Activités</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nom de l'activité"
          value={newActivity.nom}
          onChangeText={(text) => setNewActivity({ ...newActivity, nom: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newActivity.description}
          onChangeText={(text) => setNewActivity({ ...newActivity, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Prix"
          keyboardType="numeric"
          value={newActivity.prix}
          onChangeText={(text) => setNewActivity({ ...newActivity, prix: text })}
        />
        <Button title="Ajouter Activité" onPress={addActivity} />
      </View>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.activityItem}>
            <Text>{item.nom}</Text>
            <Text>{item.description}</Text>
            <Text>Prix: {item.prix} €</Text>
            <TouchableOpacity onPress={() => deleteActivity(item.id)}>
              <Text style={styles.actionButton}>Supprimer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateActivity(item.id)}>
              <Text style={styles.actionButton}>Modifier</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  activityItem: {
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

export default Activities;
