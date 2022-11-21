import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";

function ScreenVentas() {
  const [idsearch, setIdsearch] = useState('')
  const [zona, setZona] = useState('')
  const [fecha, setFecha] = useState('')
  const [venta, setVenta] = useState('')

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        alignItems: "center",
        backgroundColor: "#BCBCBC",
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Buscar Vendedor</Text>
        <TextInput
          style={[styles.inputs, { marginBottom: 30 }]}
          placeholder="Search by Id"
          onChangeText={(idsearch) => setIdsearch(idsearch)}
          value={idsearch}
          keyboardType={Number}
        />
        <TextInput
          style={styles.inputs}
          value={zona}
          placeholder="Zona"
          onChangeText={(zona) => setZona(zona)}
          keyboardType={Text}
        />
        <TextInput
          style={styles.inputs}
          value={fecha}
          placeholder="Fecha"
          onChangeText={(fecha) => setFecha(fecha)}
          keyboardType={Date}
        />
        <TextInput
          style={styles.inputs}
          value={venta}
          placeholder="Valor Venta"
          onChangeText={(venta) => setVenta(venta)}
          keyboardType={Number}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.buttons,
          { backgroundColor: "#71BA31", marginBottom: 5, width: 200 },
        ]}
        onPress={() => saveCliente()}
      >
        <Text style={{ fontSize: 22, color: "white" }}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttons,
          { backgroundColor: "#71BA31", marginBottom: 5, width: 200 },
        ]}
        onPress={() => getClientById(idsearch)}
      >
        <Text style={{ fontSize: 22, color: "white" }}>Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttons,
          { backgroundColor: "#558CCF", marginBottom: 5, width: 200 },
        ]}
        onPress={() => updateCliente(idsearch)}
      >
        <Text style={{ fontSize: 22, color: "white" }}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttons,
          { backgroundColor: "#D14842", marginBottom: 50, width: 200 },
        ]}
        onPress={() => deleteCliente(idsearch)}
      >
        <Text style={{ fontSize: 22, color: "white" }}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [idsearch, setIdsearch] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [totalComision, setTotalComision] = useState("");

  const getClientById = async (id) => {
    try {
      const url = `http://localhost:19006/api/clientes/${id}`;
      const response = await axios.get(url);
      //setData(response.data)
      setNombre(response.data.nombre);
      setCorreo(response.data.correo);
      setTotalComision(response.data.totalComision);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveCliente = async () => {
    if (!nombre.trim() || !correo.trim() || !totalComision.trim()) {
      alert("Campos invalidos");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:19006/api/clientes`, {
        nombre,
        correo,
        totalComision,
      });
      alert("Agregado correctamente ...");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCliente = async (id) => {
    if (!nombre.trim() || !correo.trim() || !totalComision.trim()) {
      alert("Campos invalidos");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:19006/clientes/${id}`,
        {
          nombre,
          correo,
          totalComision,
        }
      );
      alert("Cliente actualizado correctamente ...");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCliente = async (id) => {
    try {
      if (confirm("Está seguro de eliminar este cliente")) {
        const response = await axios.delete(
          `http://localhost:19006/api/clientes/${id}`,
          {}
        );
        alert("Cliente Eliminado exitosamente ...");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getUsers(); // Al cargar el componente por primera vez
  }, []);
  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        alignItems: "center",
        backgroundColor: "#BCBCBC",
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Buscar Vendedor</Text>
        <TextInput
          style={[styles.inputs, { marginBottom: 30 }]}
          placeholder="Search by Id"
          onChangeText={(idsearch) => setIdsearch(idsearch)}
          value={idsearch}
          keyboardType={Number}
        />
        <TextInput
          style={styles.inputs}
          value={nombre}
          placeholder="Nombre Completo"
          onChangeText={(nombre) => setNombre(nombre)}
          keyboardType={Text}
        />
        <TextInput
          style={styles.inputs}
          value={correo}
          placeholder="Correo"
          onChangeText={(correo) => setCorreo(correo)}
          keyboardType={Text}
        />
        <TextInput
          style={styles.inputs}
          value={totalComision}
          placeholder="Comision"
          onChangeText={(totalComision) => setTotalComision(totalComision)}
          keyboardType={Number}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.buttons,
          { backgroundColor: "#71BA31", marginBottom: 5, width: 200 },
        ]}
        onPress={() => saveCliente()}
      >
        <Text style={{ fontSize: 22, color: "white" }}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttons,
          { backgroundColor: "#71BA31", marginBottom: 5, width: 200 },
        ]}
        onPress={() => getClientById(idsearch)}
      >
        <Text style={{ fontSize: 22, color: "white" }}>Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttons,
          { backgroundColor: "#558CCF", marginBottom: 5, width: 200 },
        ]}
        onPress={() => updateCliente(idsearch)}
      >
        <Text style={{ fontSize: 22, color: "white" }}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttons,
          { backgroundColor: "#D14842", marginBottom: 50, width: 200 },
        ]}
        onPress={() => deleteCliente(idsearch)}
      >
        <Text style={{ fontSize: 22, color: "white" }}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Ventas" component={ScreenVentas} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ title: "Ventas" }}
        />
        <Stack.Screen name="Venta" component={ScreenVentas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  buttons: {
    borderRadius: 5,
    padding: 2,
    margin: 3,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  inputs: {
    borderBottomColor: "black",
    borderColor: "white",
    textAlign: "center",
    borderTopColor: "#BCBCBC",
    borderLeftColor: "#BCBCBC",
    borderRightColor: "#BCBCBC",
    borderWidth: 1,
    height: 30,
    width: 300,
  },
});
