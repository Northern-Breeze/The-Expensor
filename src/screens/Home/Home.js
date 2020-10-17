import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import styles from './Home.styles';
import {
    LineChart
  } from "react-native-chart-kit";
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.plot}>
                <View style={styles.header}>
                    <View style={styles.infoHeader}>
                        <View style={styles.headerTitle}>
                            <Text style={styles.headerTitleText}>Reports</Text>
                        </View>
                    </View>
                    <View style={styles.toggleControls}>
                        <TouchableOpacity style={styles.textContainerD} activeOpacity={0.7}>
                            <Text style={styles.controlTextD}>Daily</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textContainerW} activeOpacity={0.7}>
                            <Text style={styles.controlTextW}>Weekly</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textContainerD} activeOpacity={0.7}>
                            <Text style={styles.controlTextM}>Monthly</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.graph}>
                    <LineChart
                        data={{
                        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        datasets: [
                            {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                            }
                        ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        yAxisLabel="R"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                        backgroundColor: "#fff",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#000"
                        }
                        }}
                        bezier
                        style={{
                        marginVertical: 8,
                        borderRadius: 16
                        }}
                    />
                </View>
                <View style={styles.transactions}>
                    <View style={styles.transactionHeader}>
                        <View style={styles.transactionTextContainer}>
                            <Text style={styles.transactionText}>
                                Transactions
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.orderByTextContainer} activeOpacity={0.7}>
                            <View style={styles.controlAction}>
                                <Text style={styles.orderByText}>
                                    order by
                                </Text>
                            </View>
                            <View style={styles.controlAction}>
                                <FontAwesome5 name="question-circle" size={20} color="#000" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.iconContainer}>
                            <FontAwesome5 name="angry" size={30} color="red" />
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.cardInfoContainer}>
                                <View style={styles.referenceContainer}>
                                    <Text style={styles.reference}>Mr Delivery N Cape Town</Text>
                                </View>
                                <View style={styles.cartigoryContainer}>
                                    <Text>Purchase</Text>
                                </View>
                            </View>
                            <View style={styles.amountContainer}>
                                <Text style={styles.amount}>
                                    -R 200
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
