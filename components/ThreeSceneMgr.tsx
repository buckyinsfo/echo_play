import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ThreeScene from './ThreeScene';
import ThreeScene2 from './ThreeScene2';

const ThreeSceneMgr = () => {
  const [useThreeScene, setUseThreeScene] = useState(true);

  useEffect(() => {
    console.log(
      `Current ThreeScene: ${useThreeScene ? 'ThreeScene' : 'ThreeScene2'}`,
    );
  }, [useThreeScene]);

  const toggleScene = () => {
    setUseThreeScene(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sceneContainer}>
        {useThreeScene ? <ThreeScene /> : <ThreeScene2 />}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleScene}>
          <Text style={styles.buttonText}>
            Switch to ThreeScene {useThreeScene ? '2' : '1'}
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

export default ThreeSceneMgr;
