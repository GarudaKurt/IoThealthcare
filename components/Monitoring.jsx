import React, { useState, useEffect } from "react";
import { Text,
        StyleSheet,
        View,
        Dimensions,
        Alert,
        ScrollView } from "react-native";

import { Card, Title, Paragraph } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

import { firebaseDatabase } from './firebaseConfig';
import { ref, onValue, off } from 'firebase/database';


const { width } = Dimensions.get("window");


const Monitoring = ({navigation}) => {

  const [temperature, setTemperature] = useState(0)
  const [water, setWater] = useState('')
  const [food, setFood] = useState('')
  const [medicine, setMedicine] = useState('')
  const [fall, setFall] = useState('')
  const [timeFall, setTimeFall] = useState('')
  const [timeFood, setTimeFood] = useState('')
  const [timeMed, setTimeMed] = useState('')
  const [timeWater, setTimeWater] = useState('')

    
  const logout = () => {
    navigation.replace('login')
  }


  useEffect(() => {
    const databaseRef = ref(firebaseDatabase, 'dataInfo');

    const fetchData = (snapshot) => {
        if (snapshot.exists()) {
            const getData = snapshot.val();
            console.log('Snapshot data:', getData);

            setTemperature(getData.temperature);
            setWater(getData.water);
            setFood(getData.food);
            setMedicine(getData.medicine);
            setFall(getData.falling);

            setTimeFall(getData.timeFall);
            setTimeFood(getData.timeFood);
            setTimeWater(getData.timeWater);
            setTimeMed(getData.timeMed);

        } else {
            console.log('No data available at the specified path');
        }
    };

    const handleError = (error) => {
        console.error('Error fetching data:', error);
    };

    onValue(databaseRef, fetchData, handleError);

    return () => {
        off(databaseRef, 'value', fetchData);
    };
}, []);


  return (
    
     <View style={styles.container}>
        <View style={styles.frame}>
           <View style={styles.signInParent}>
                <Icon name="sign-out" size={20} color="black" style={{marginLeft:300}} onPress={logout} />
                <Text style={styles.title}>Monitoring</Text>
            </View>
            <Card style={styles.mainCard}>
                <ScrollView contentContainerStyle={styles.scrollContainer} vertical={true}>
                    <Card style={styles.card}>
                        <Card.Content style={styles.cartContents}>
                            <Icon name="thermometer" size={20} color="red" />
                            <Title style={styles.cartTitle}>Temperature</Title>
                            <Paragraph style={styles.cartTitle}>
                                <Text>{temperature}</Text>
                            </Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content style={styles.cartContentsWater}>
                            <Icon name="tint" size={20} color="blue" />
                            <Title style={styles.cartTitle}>Water</Title>
                            <Paragraph style={styles.cartTitle}>
                                <Text>{water}</Text>
                            </Paragraph>
                            <Paragraph style={styles.cartTitle}>
                                <Text>Time: {timeWater}</Text>
                            </Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content style={styles.cartContentsFood}>
                            <Icon name="cutlery" size={20} color="#74A685" />
                            <Title style={styles.cartTitle}>Food</Title>
                            <Paragraph style={styles.cartTitle}>
                                <Text>{food}</Text>
                            </Paragraph>
                            <Paragraph style={styles.cartTitle}>
                                <Text>Time: {timeFood}</Text>
                            </Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content style={styles.cartContentsMedicine}>
                            <Icon name="medkit" size={20} color="#053b47" />
                            <Title style={styles.cartTitle}>Medicine</Title>
                            <Paragraph style={styles.cartTitle}>
                                <Text>{medicine}</Text>
                            </Paragraph>
                            <Paragraph style={styles.cartTitle}>
                                <Text>Time: {timeMed}</Text>
                            </Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content style={styles.cartContentsFall}>
                            <Icon name="exclamation-triangle" size={20} color="yellow" />
                            <Title style={styles.cartTitle}>Fall Detection</Title>
                            <Paragraph style={styles.cartTitle}>
                                <Text>{fall}</Text>
                            </Paragraph>
                            <Paragraph style={styles.cartTitle}>
                                <Text>Time: {timeFall}</Text>
                            </Paragraph>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </Card>
        </View>

    </View>
  )
}

export default Monitoring

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#dfe4ea",
        paddingHorizontal: 20,
        paddingTop: 5,
        alignItems: "center",
    },
    frame: {
        width: "100%",
        alignItems: "center",
        paddingTop: 100,
        marginBottom: 15,
    },
    signInParent: {
        marginBottom: 15,
        alignItems: "center",
    },
    mainCard: {
        width: width - 40, 
        height: "80%",
        padding: 20,
    },
    cartContents: {
        alignItems:'center',
        fontSize: 30,
        fontWeight: "600",
        fontFamily: "sans-serif",
        backgroundColor:"#74A685",
        borderRadius: 10,
        marginBottom: 20
    },
    cartContentsWater: {
        alignItems:'center',
        fontSize: 30,
        fontWeight: "600",
        fontFamily: "sans-serif",
        backgroundColor:"#7CACBE",
        borderRadius: 10,
        marginBottom: 10
    },
    cartContentsFood: {
        alignItems:'center',
        fontSize: 30,
        fontWeight: "600",
        fontFamily: "sans-serif",
        backgroundColor:"#BCBFB1",
        borderRadius: 10,
        marginBottom: 10
    },
    cartContentsMedicine: {
        alignItems:'center',
        fontSize: 30,
        fontWeight: "600",
        fontFamily: "sans-serif",
        backgroundColor:"#FFC1A2",
        borderRadius: 10,
        marginBottom: 10
    },
    cartContentsFall: {
        alignItems:'center',
        fontSize: 30,
        fontWeight: "600",
        fontFamily: "sans-serif",
        backgroundColor:"#2D593D",
        borderRadius: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 40,
        fontWeight: "600",
        fontFamily: "sans-serif",
        color: "#2F2F2F",
        textAlign: "left",
        marginBottom: 30,
    },
    title: {
        fontSize: 40,
        fontWeight: "600",
        fontFamily: "sans-serif",
        color: "#2F2F2F",
        textAlign: "left",
        marginBottom: 30,
    },
    cartTitle: {
        fontSize: 20,
        color: "#fff"
    }
})