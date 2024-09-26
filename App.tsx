import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SceneManager from './components/SceneManager';
import ThreeScene from './components/ThreeScene';
import ThreeScene2 from './components/ThreeScene2';
import FiberScene from './components/FiberScene';
import FiberScene2 from './components/FiberScene'; // Assuming you have this

const App = () => {
  const [useThreeScenes, setUseThreeScenes] = useState(true);

  const threeScenes = [ThreeScene, ThreeScene2];
  const threeSceneNames = ['ThreeScene 1', 'ThreeScene 2'];

  const fiberScenes = [FiberScene, FiberScene2];
  const fiberSceneNames = ['FiberScene 1', 'FiberScene 2'];

  const toggleSceneType = () => {
    setUseThreeScenes(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sceneContainer}>
        {useThreeScenes ? (
          <SceneManager scenes={threeScenes} sceneNames={threeSceneNames} />
        ) : (
          <SceneManager scenes={fiberScenes} sceneNames={fiberSceneNames} />
        )}
      </View>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.button} onPress={toggleSceneType}>
          <Text style={styles.buttonText}>
            Switch to {useThreeScenes ? 'Fiber' : 'Three'} Scenes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sceneContainer: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'blue',
    textAlign: 'center',
  },
});

export default App;
