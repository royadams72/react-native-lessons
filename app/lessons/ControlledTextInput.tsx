import { ThemedText } from "@/components/themed-text";
import { styles } from "@/styles/styles";
import { useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";

const albums = [
  { id: "1", artist: "Michael Jackson", title: "Thriller" },
  { id: "2", artist: "Prince", title: "Purple Rain" },
  { id: "3", artist: "Amy Winehouse", title: "Back to Black" },
];

export default function AlbumList() {
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLowerCase();
  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(normalizedSearch) ||
      album.artist.toLowerCase().includes(normalizedSearch),
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search albums"
        placeholderTextColor="#bbb"
        autoCapitalize="none"
        autoCorrect={false}
        style={fileStyles.input}
      />

      <FlatList
        keyExtractor={(filteredAlbums) => filteredAlbums.id}
        data={filteredAlbums}
        renderItem={({ item }) => (
          <View style={styles.copyContainer}>
            <ThemedText style={styles.copy}>{item.title}</ThemedText>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.copyContainer}>
            <ThemedText style={styles.copy}>No Albums found</ThemedText>
          </View>
        }
      ></FlatList>
    </View>
  );
}

const fileStyles = StyleSheet.create({
  input: {
    borderColor: "#cccccc",
    borderRadius: 8,
    borderWidth: 1,
    color: "#ffffff",
    marginHorizontal: 5,
    padding: 12,
  },
});
