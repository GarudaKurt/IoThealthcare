import React, { useState } from "react";
import { Text,
        StyleSheet,
        View,
        TextInput,
        Pressable,
        Dimensions,
        Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";


import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const { width } = Dimensions.get("window");

const SignUp = ({navigation}) => {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[userType, setUserType] = useState('')

  const handleSignin = () =>{
    navigation.replace('login')
  }

  const createData = async () => {
    if(!email || !password || !userType) {
      Alert.alert('Empty fields required')
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "userinfo"),  {
        email: email,
        password: password,
        usertype: userType
      })
      Alert.alert('Succesfully created!')
    } catch(e) {
      Alert.alert('Something wrong ',e)
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.frame}>
            <Text style={styles.signIn}>Sign up</Text>
            <TextInput style={styles.txtemail} value={email}
             onChangeText={(email)=>{setEmail(email)}}
             placeholder="Email address" multiline={false} />
        </View>

        <View style={styles.passwordWrapper}>
          <TextInput style={styles.password} value={password}
           onChangeText={(password)=>{setPassword(password)}}
           placeholder="Password" secureTextEntry={true} />
        </View>
        <Picker
          selectedValue={userType}
          style={styles.picker}
          onValueChange={(itemValue) => setUserType(itemValue)}
        >
          <Picker.Item label="Select User Type" value="" />
          <Picker.Item label="Family" value="Family" />
          <Picker.Item label="Health Care" value="Health Care" />
        </Picker>
        
        <View style={styles.bottomSection}>
            <Pressable style={styles.submitButton} onPress={createData}>
                <Text style={styles.submitText}>Submit</Text>
            </Pressable>
            <Pressable style={styles.goBack} onPress={handleSignin}>
                <Text style={styles.back}>Go back to SignIn ?</Text>
            </Pressable>
        </View>

    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#dfe4ea",
      paddingHorizontal: 20,
      paddingTop: 50,
      alignItems: "center",
    },
    frame: {
      width: "100%",
      alignItems: "center",
      paddingTop: 100,
      marginBottom:15,
    },
    signInParent: {
        marginBottom: 15,
        alignItems: "center",
    },
    signIn: {
        fontSize: 40,
        fontWeight: "600",
        fontFamily:"sans-serif",
        color: "#2C2C2C",
        textAlign: "left",
        marginBottom: 30,
    },
    txtemail: {
        width: width - 40,
        borderRadius: 10,
        backgroundColor: "#FFFF",
        borderStyle: "solid",
        borderColor: "#2C2C2C",
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    passwordWrapper: {
    width: width - 40,
    borderRadius: 10,
    backgroundColor: "#FFF",
    borderStyle: "solid",
    borderColor: "#2C2C2C",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 20,
    height: 50
    },
    bottomSection: {
        alignItems: "center",
    },
    submitButton: {
        width: width - 40,
        borderRadius: 5,
        backgroundColor: "#2C2C2C",
        borderWidth: 1,
        borderColor: "#FFFFF",
        color: "#FFFF",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 7,
        marginBottom: 20,
    },
    submitText: {
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "#FFF",
    },
    dontHaveAccountYetParent: {
        alignItems: "center",
    },
    dontHaveAccount: {
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "#2C2C2C",
        marginBottom: 5,
    },
    create:{
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    createOne: {
        fontSize: 20,
        fontFamily:"sans-serif",
        color: "#189AB4",
    },
    picker: {
        height: 40,
        width: width - 40,
        marginBottom: 40,
        marginVertical: 5,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#2C2C2C",
        borderRadius: 5,
        backgroundColor: "#FFF"
    },
    goBack: {
        marginTop: 3,
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
      },
      back: {
        padding: 5,
        color: "#189AB4",
        fontSize: 15
      }
})