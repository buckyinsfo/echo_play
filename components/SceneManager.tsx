import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

type SceneManagerProps = {
  scenes: React.ComponentType[];
  sceneNames: string[];
};

const SceneManager: React.FC<SceneManagerProps> = ({ scenes, sceneNames }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  useEffect(() => {
    console.log(`Current scene: ${sceneNames[currentSceneIndex]}`);
  }, [currentSceneIndex, sceneNames]);

  const toggleScene = () => {
    setCurrentSceneIndex(prevIndex => (prevIndex + 1) % scenes.length);
  };

  const CurrentScene = scenes[currentSceneIndex];

  return (
    <View style={styles.container}>
      <View style={styles.sceneContainer}>
        <CurrentScene />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleScene}>
          <Text style={styles.buttonText}>
            Switch to {sceneNames[(currentSceneIndex + 1) % scenes.length]}
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
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'blue',
    textAlign: 'center',
  },
});

export default SceneManager;
