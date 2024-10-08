import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  View,
  Text,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import logoImg from '../assets/adaptive-icon.png';

export const ImageComponent = () => (
  <View>
    <Image source={logoImg} style={styles.image} />
    <Image
      style={styles.image}
      source={{ uri: 'https://picsum.photos/300' } as ImageSourcePropType}
    />
  </View>
);

export const BackgroundComponent = () => (
  <ImageBackground source={logoImg} style={styles.backgroundImage}>
    <Text style={styles.imageText}>IMAGE TEXT</Text>
  </ImageBackground>
);

// cspell:disable
export const ScrollableComponent = () => (
  <ScrollView>
    <Image source={logoImg} style={styles.image} />
    <Pressable onPress={() => console.log('Text Presed')}>
      <Text>
        Lorem ipsum odor amet, consectetuer adipiscing elit. Leo leo himenaeos
        facilisi cras lorem; fermentum nascetur quisque. Orci dolor nulla
        egestas auctor cras erat . Aliquam nec sollicitudin lobortis;
        scelerisque himenaeos hac. Tempor semper gravida consequat molestie
        inceptos mauris turpis. Euismod et etiam sed rutrum risus; suspendisse
        turpis eleifend. Efficitur vulputate torquent eget, ut vulputate congue.
        Phasellus viverra aptent; nulla curabitur nam sit nam mattis. Id
        penatibus tincidunt eget elementum mollis class pulvinar pharetra.
        Habitasse sit dis nostra magnis vitae malesuada. Ultrices iaculis cras
        auctor malesuada mi mus aptent. Sodales libero auctor tincidunt
        tincidunt hac semper dis. Vel vestibulum mauris tristique ante vitae
        mattis etiam dolor. Curae viverra potenti facilisis habitant dictum est
        turpis mollis a.
      </Text>
    </Pressable>
    <Image source={logoImg} style={styles.image} />
  </ScrollView>
);
// cspell:enable

export const ButtonExample = () => (
  <Button
    title="Touch Me!"
    onPress={() => {
      console.log('Button has been pressed.');
    }}
    color="midnightblue"
  />
);

export const StatusBarExample = () => (
  <StatusBar backgroundColor={'lightgreen'} barStyle={'default'} />
);

export const ActivityIndicatorExample = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator />
    <ActivityIndicator size="large" />
    <ActivityIndicator size="small" color="#0000ff" />
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
);

const NativeComp = () => {
  const [currentComponent, setCurrentComponent] = useState(0);

  const toggleComponent = () => {
    setCurrentComponent(prev => (prev + 1) % 6);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 0:
        return <ImageComponent />;
      case 1:
        return <BackgroundComponent />;
      case 2:
        return <ScrollableComponent />;
      case 3:
        return <ButtonExample />;
      case 4:
        return <StatusBarExample />;
      case 5:
        return <ActivityIndicatorExample />;
      default:
        return <ImageComponent />;
    }
  };

  const getNextComponentName = () => {
    const names = [
      'Images',
      'Background',
      'Scrollable',
      'Button',
      'StatusBar',
      'ActivityIndicator',
    ];
    const nextIndex = (currentComponent + 1) % names.length;
    return names[nextIndex];
  };

  return (
    <View>
      {renderComponent()}
      <TouchableOpacity style={styles.button} onPress={toggleComponent}>
        <Text style={styles.buttonText}>
          Toggle to {getNextComponentName()}
        </Text>
      </TouchableOpacity>
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

export default NativeComp;
