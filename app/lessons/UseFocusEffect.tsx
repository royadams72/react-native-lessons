import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";

export default function AlbumDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [lastOpened, setLastOpened] = useState("");

  useFocusEffect(
    useCallback(() => {
      setLastOpened(new Date().toLocaleTimeString());
      console.log("Album screen has focus");
      return () => {
        console.log("Album screen lost focus");
      };
    }, [id]),
  );

  return (
    <View>
      <Text>Album ID: {id}</Text>
      <Text>Last opened: {lastOpened}</Text>
    </View>
  );
}
