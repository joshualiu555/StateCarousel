import {useState, useEffect} from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import axios from "axios";

export default function App() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/states")
        .then(res => setStates(res.data))
        .catch(err => console.log(err))
  }, [])

  const renderItem = ({item}) => {
    return (
        <TouchableOpacity
          onPress={() => setSelectedState(item)}
          style={item === selectedState ? styles.selectedState : styles.state}
        >
          <Text>
            {item}
          </Text>
        </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Savings carousel test</Text>
      <FlatList
        data={states}
        renderItem={renderItem}
        keyExtractor={state => state}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray"
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 70,
    marginLeft: 20
  },
  state: {
    maxHeight: 80,
    fontFamily: "arial",
    fontSize: 15,
    marginTop: 10,
    marginLeft: 15,
    padding: 30,
    backgroundColor: "white"
  },
  selectedState: {
    maxHeight: 80,
    fontFamily: "arial",
    fontSize: 15,
    marginTop: 10,
    marginLeft: 15,
    padding: 30,
    backgroundColor: "gray"
  }
});
