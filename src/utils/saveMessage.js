import AsyncStorage from '@react-native-async-storage/async-storage';

export const backUpMessage = async (data) => {
  try {
    const unique = data.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    const json = JSON.stringify(unique);
    await AsyncStorage.setItem('data', json);
  } catch (error) {
    console.log(error);
  }
};
