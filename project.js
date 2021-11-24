import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActiviIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase';

export default function Register() {
  const [image, setImage] = useState(
    'images/https://cdn3.vectorstock.com/i/thumb-large/32/12/default-avatar-profile-icon-vector-39013212.jpg'
  );
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const upload = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = storage.ref().child(new Date().toString());
    const snapshoot = ref.put(blob);

    snapshoot.on(
      storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      }
    ),
      () => {
        snapshoot.snapshoot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log('This is url: ' + url);
          blob.close();
          return url;
        });
      };
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={pickImage}>
          {image && <Image source={{ uri: image }} style={styles.tinyLogo} />
        <View style={styles.inputView}>
          <TextInput style={styles.inputText} placeholder="Name" />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Phone Number"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.inputText} placeholder="City" />
        </View>
        {!uploading ? (
          <Button title="register" color="coral" onPress={upload}/>
        ) : (
          <ActiviIndicator size='large' color= 'coral' />
        )}
        <Text
          style={{
            color: 'coral',
            marginTop: 10,
            paddingHorizontal: 5,
            borderWidth: 1,
            borderColor: 'coral',
            alignSelf: 'center',
          }}>
          For cancel, Just go back
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  headerText: {
    fontSize: 16,
    marginLeft: 5,
  },

  tinyLogo: {
    marginTop: 50,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },

  inputMainView: {
    marginTop: 40,
  },

  inputView: {
    width: '100%',
    marginVertical: 10,
  },

  inputText: {
    alignSelf: 'center',
    width: '90%',
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderRadius: 3,
    borderColor: 'coral',
    fontSize: 14,
  },
});
