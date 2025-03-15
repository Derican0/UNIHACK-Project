import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ChallengeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Challenge Screen</Text>
      
      <View style={styles.challengeContainer}>
        <Text style={styles.challengeTitle}>Choose difficulty:</Text>
        
        <TouchableOpacity 
          style={[styles.challengeButton, { backgroundColor: '#27ae60' }]}
          onPress={() => navigation.navigate('Camera', { difficulty: 'easy' })}
        >
          <Text style={styles.buttonText}>Easy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.challengeButton, { backgroundColor: '#f39c12' }]}
          onPress={() => navigation.navigate('Camera', { difficulty: 'medium' })}
        >
          <Text style={styles.buttonText}>Medium</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.challengeButton, { backgroundColor: '#c0392b' }]}
          onPress={() => navigation.navigate('Camera', { difficulty: 'hard' })}
        >
          <Text style={styles.buttonText}>Hard</Text>
        </TouchableOpacity>
      </View>
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
  challengeContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  challengeButton: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChallengeScreen;