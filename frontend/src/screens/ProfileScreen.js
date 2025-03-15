import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      <View style={styles.statsContainer}>
        <Text style={styles.username}>Username</Text>
        <Text style={styles.email}>user@example.com</Text>
        
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>Total Points:</Text>
          <Text style={styles.pointsValue}>0</Text>
        </View>
        
        <View style={styles.challengesContainer}>
          <Text style={styles.challengesTitle}>Completed Challenges</Text>
          <Text style={styles.noChallenges}>No challenges completed yet</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  pointsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  pointsLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  challengesContainer: {
    marginTop: 10,
  },
  challengesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noChallenges: {
    fontStyle: 'italic',
    color: 'gray',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;