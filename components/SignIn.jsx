import React, { useState } from "react";
import { Text,
        StyleSheet,
        View,
        TextInput,
        Pressable,
        Dimensions,
        Alert} from "react-native";

import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const { width } = Dimensions.get("window");

const SignIn = ({navigation}) => {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const handleSignup = () =>{
    navigation.replace('create')
  }

  const handleMonitor = () =>{
    navigation.replace('monitor')
  }
  const fetchData = async () => {
    if(!email ||!password) {
        Alert.alert('Please provide email or password fields')
        return
    }
    try {
        const querySnapshot = await getDocs(collection(db, "userinfo"));
        let userExist = false
        querySnapshot.forEach(doc =>{
          const userData = doc.data()
          if(userData.email === email && userData.password === password) {
            userExist = true
            handleMonitor()
            Alert.alert('Succesfully login')
          }
        })
        if (!userExist) {
          Alert.alert('User does not exist')
        }
      } catch(e) {
        Alert.alert('Error encounter ',e)
      }  
  }

  return (
    <View style={styles.container}>
        <View style={styles.frame}>
            <Text style={styles.signIn}>Sign In</Text>
            <TextInput style={styles.txtemail} value={email}
             onChangeText={(email)=>{setEmail(email)}}
            placeholder="Email address" multiline={false} />
        </View>

        <View style={styles.passwordWrapper}>
          <TextInput style={styles.password} value={password}
           onChangeText={(password)=>{setPassword(password)}}
           placeholder="Password" secureTextEntry={true} />
        </View>
        
        <View style={styles.bottomSection}>
            <Pressable style={styles.submitButton} onPress={fetchData}>
                <Text style={styles.submitText}>Submit</Text>
            </Pressable>
            <View style={styles.dontHaveAccountYetParent}>
                <Text style={styles.dontHaveAccount}>Don’t have an account yet?</Text>
                <Pressable style={styles.create} onPress={handleSignup}>
                    <Text style={styles.createOne}>Create one!</Text>
                </Pressable>
            </View>
        </View>

    </View>
  )
}

export default SignIn

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
      
})