import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { UserContext } from '../Contexts/UserContext';

export const Home = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if (!user.isLogged) {
      navigation.navigate("Login");
    }
  });

  const hanleLogout = () => {
    setUser({
      isLogged: false,
      username: null,
      token: null
    });
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messenger - {user.username}</Text>
      <Button title="Logout" onPress={() => hanleLogout()} />

      <Text style={{ fontSize: '15px', color: 'blue' }}>
        Bài tập: Đọc danh sách các user friends trong database & hiển thị dạng list gồm image, fullname, latest chat date <br />
        Sinh viên làm tiếp :)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 25,
    justifyContent: 'center'
  },
  title: {
    fontSize: "35px"
  }
});