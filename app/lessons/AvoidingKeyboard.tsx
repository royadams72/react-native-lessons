import { StyleSheet, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
/** */

const AddAlbumScreen = () => {
  const placeholderTextColor = "#333";

  return (
    /**
     * <KeyboardAvoidingView> rom react-native-keyboard-controller adjusts its height, position or padding while the keyboard is open.
     * You must use <KeyboardProvider> near the top of the app. which watches and provides keyboard state for the application.
     * KeyboardAwareScrollView uses that information to keep the focused input visible.
     */
    <KeyboardAwareScrollView
      style={fileStyles.screen}
      contentContainerStyle={fileStyles.form}
      keyboardShouldPersistTaps="handled"
      bottomOffset={150}
    >
      {/* <View style={styles.copyContainer}>
          <ThemedText>AvoidingKeyboard</ThemedText>
        </View> */}
      <TextInput
        style={fileStyles.input}
        placeholder="Album title"
        placeholderTextColor={placeholderTextColor}
      />
      <TextInput
        style={fileStyles.input}
        placeholder="Artist"
        placeholderTextColor={placeholderTextColor}
      />
      <TextInput
        style={fileStyles.input}
        placeholder="Release Year"
        placeholderTextColor={placeholderTextColor}
      />
      <TextInput
        style={[fileStyles.input, fileStyles.notes]}
        placeholder="Notes"
        placeholderTextColor={placeholderTextColor}
        multiline
      />
      <TextInput
        style={[fileStyles.input, fileStyles.notes]}
        placeholder="Notes"
        placeholderTextColor={placeholderTextColor}
        multiline
      />
    </KeyboardAwareScrollView>
  );
};

export default AddAlbumScreen;

const fileStyles = StyleSheet.create({
  form: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 8,
    fontSize: 20,
    color: "#ccc",
  },
  notes: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  screen: {
    flex: 1,
    backgroundColor: "#555",
  },
});
