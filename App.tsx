import React from 'react';
import {atom, useAtom, useAtomValue, useSetAtom} from 'jotai';
import {Text, View, Button, StyleSheet} from 'react-native';

const userAtom = atom<User | null>(null);

const isUserLoggedInAtom = atom(get => !!get(userAtom));

const sleep = () => new Promise(resolve => setInterval(resolve, 1000));

type User = {
  username: string;
};

const Home = () => {
  const [user, setUser] = useAtom(userAtom);

  if (!user) {
    throw new Error('User in null');
  }

  return (
    <View style={styles.container}>
      <Text>Welcome Home {user.username}</Text>
      <Button
        title="Logout"
        onPress={async () => {
          await sleep();
          setUser(null);
        }}
      />
    </View>
  );
};

const Login = () => {
  const setUser = useSetAtom(userAtom);
  return (
    <View style={styles.container}>
      <Text>Welcome To Login</Text>
      <Button
        title="Login"
        onPress={async () => {
          await sleep();
          setUser({
            username: 'John Doe',
          });
        }}
      />
    </View>
  );
};

const App = () => {
  const isUserLoggedIn = useAtomValue(isUserLoggedInAtom);

  return isUserLoggedIn ? <Home /> : <Login />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
