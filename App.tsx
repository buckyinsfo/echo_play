import { View, StyleSheet, Text } from 'react-native';
import NativeComp from './components/NativeComps';
 
const App = () => {
  return (
    <View style={styles.container}>
      <NativeComp />
      <Text style={styles.text}>Open your app Bucky! right?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    padding: 60,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
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
  text: {
    color: 'white',
    marginTop: 10,
  },
});

export default App;
