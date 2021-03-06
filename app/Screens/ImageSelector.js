import React from 'react';
import { ImageEditor, Image, View, TouchableOpacity, StyleSheet, Text, FlatList, ScrollView, StatusBar } from 'react-native';
import { ImagePicker } from 'expo';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Button, Icon } from 'react-native-elements';

export default class ImageSelector extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      image: null
    }
  }

  render() {
    const { image } = this.state;

    return (

    <View style={styles.container}>

      <TouchableOpacity onPress={this._pickImage}>

        <Icon
          name='picture'
          type='simple-line-icon'
          size={23}
          iconStyle={styles.button}
        />

      </TouchableOpacity>

    </View>

    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    
    if (result.cancelled) {
      console.log('Image selection canceled');
      return;
    }

    let resizedUri = await new Promise((resolve, reject) => {
      ImageEditor.cropImage(result.uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: { width: 50, height: 50 },
          resizeMode: 'contain',
        },
        (uri) => resolve(uri),
        () => reject(),
      );
    });

    this.setState({ image: resizedUri });
  };
}

//Touch up design later.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    height: 100,
    width: 100,
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10
  }
})