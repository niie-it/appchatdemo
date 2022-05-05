import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { UserContext } from '../Contexts/UserContext';
import { app } from '../firebase/firebase';

export const Login = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);

  const [email, setEmail] = useState('hienlth@gmail.com');
  const [password, setPassword] = useState('123456');
  const [message, setMessage] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const onPress = () => {
    // Check validation username/password

    const auth = getAuth();
    const db = getFirestore(app);

    //ref docs: https://firebase.google.com/docs/auth/web/password-auth

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        // Read user data from firestore
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef)
          .then((res) => {
            if (res.exists()) {
              //set global state
              setUser({
                isLogged: true,
                username: res.data().fullName,
                token: null //Lấy từ API
              });
              navigation.navigate("Home");
            } else {
              console.log("Document not found")
            }
          })
          .catch((err) => console.log(err.message));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{
        uri: 'http://cdn.onlinewebfonts.com/svg/img_337531.png'
      }} />
      <TextInput
        style={styles.input}
        placeholder="Input email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Input password"
        value={password}
        onChangeText={setPassword}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text>LOGIN</Text>
      </TouchableOpacity>

      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    height: 100,
    width: 100,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 7
  },
});