import { ThemedText } from "@/components/themed-text";
import { styles } from "@/styles/styles";
import { View } from "react-native";

const DebounceComp = () => {
  let i = 0;
  const increment = () => {
    i++;
  };
  /**
   * A debounce function that is a function factory, which means it returns a function
   * It returns a setTimeout function which calls increment (func)
   * When debounce is initialised const debounceIncrement = debounce(...
   * It creates the timeout var once and remembers it, as it's within the closure
   * When it's called debounceIncrement();
   * It returns the timeout with the func
   * when called before the wait has finished, it cancels the previous timeout and starts a new one
   * So i++ will execute when the timer reaches 100ms
   * The timeout var always remembers the previous value
   */
  const debounce = (func: () => void, wait: number, ...args: any[]) => {
    let timeout: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func, wait);
    };
  };
  const debounceIncrement = debounce(increment, 100, "left");
  debounceIncrement();
  return (
    <View style={styles.copyContainer}>
      <ThemedText>This is a debounce test</ThemedText>
    </View>
  );
};

export default DebounceComp;
