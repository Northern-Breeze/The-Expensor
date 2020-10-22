import React from 'react'
import { View, Text, Dimensions , Platform, PermissionsAndroid, FlatList} from 'react-native'
import styles from './Home.styles';
import { LineChart, BarChart } from "react-native-chart-kit";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SmsAndroid from "react-native-get-sms-android";
import { useStoreActions } from 'easy-peasy';

const { height, width } = Dimensions.get('window');

export default function Home() {
    const [minDate, setMinDate] = React.useState('');
    const [maxDate, setMaxDate] = React.useState('');
    const [smsDataList, setSmsDataList] = React.useState([]);
    const [yAxis, setYaxes] = React.useState([]);
    const [xAxis, setXaxis] = React.useState([]);
    const [pieData, setPieData] = React.useState([]);
    const [plotKind, setPlotKind] = React.useState('bar');
    const setBalance = useStoreActions((action) => action.setCurrentBalance)
    const filterSms = (data) => {
        const sms = []
        data.forEach((item) => {
            if(item.address === '+2782004809006'){
                const _id = item._id;
                const date = item.date;
                let title = item.body.split(';')[1];
                let amount = item.body.split(';')[2];
                let cartigory = item.body.split(';')[0];
                let deduct = 0;
                let account = "";
                let yaxis = 0;
                let currentAmount = 0;
                if(title !== undefined && amount !== undefined && cartigory !== undefined){
                    // Slice the first 5 charectors
                    title = title.slice(5);
                    cartigory = cartigory.split(" ");
                    
                    // purchase or not
                    if(cartigory[1] === "Cash"){
                        currentAmount = amount.slice(6)
                        yaxis = cartigory[3].slice(2);
                        account = `${cartigory[5]} ${cartigory[6]}`
                        amount = cartigory[3];
                        deduct = cartigory[3][0] === "-" ? true : false;
                        cartigory = `${cartigory[1]}  ${cartigory[2]}`;
                        const isRead = item.read;
                        setBalance(currentAmount);
                        sms.push({
                            _id,
                            date,
                            title,
                            cartigory,
                            deduct,
                            amount,
                            account,
                            yaxis,
                            isRead
                        })
                    }
                    if(cartigory[1] === "Purchase" || cartigory === "Payment"){
                        currentAmount = amount.slice(6)
                        yaxis = cartigory[2].slice(2);
                        account = `${cartigory[4]} ${cartigory[5]}`
                        amount = cartigory[2];
                        deduct = cartigory[2][0] === "-" ? true : false;
                        cartigory = cartigory[1]
                        const isRead = item.read;
                        setBalance(currentAmount)
                        sms.push({
                            _id,
                            date,
                            title,
                            cartigory,
                            deduct,
                            amount,
                            account,
                            yaxis,
                            isRead
                        })
                    }
                }
            }
        })
        setSmsDataList(sms)
    }

    const listSMS = () => {
        const filter = {
            box: "inbox",
            maxCount: 30
        };
        if(minDate !== ""){
            filter.minDate = minDate;
        }
        if(maxDate !== ""){
            filter.maxDate = maxDate
        }
        SmsAndroid.list(
            JSON.stringify(filter),
            fail => {
                console.log("Failed with this error" + fail);
            },
            (count, smsList) => {
                const arr = JSON.parse(smsList);
                // console.log(arr);
                filterSms(arr);
                // setSmsDataList(arr);
            }
        )
    }

    const requestPermissions = async () => {
        let granted = {};
        try {
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_SMS,
                {
                    title: "The Expensor Requires Read Permission to SMS",
                    message: "The Expensor SMS Finance App need access to display data",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use SMS features");
              } else {
                console.log("SMS permission denied");
              }
        } catch (error) {
            console.log(error)
        }
    }
    const checkAppPermissions = async () => {
        if(Platform.OS === "android"){
            try{
                if (!(await checkPermissions())) {
                    await requestPermissions();
                  }
                if (await checkPermissions()) {
                    listSMS();
                }
            }catch(error){
                    console.error(e);
            }
        }
    }
    const checkPermissions = async () => {
        let hasPermissions = false;
        try {
            hasPermissions = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.READ_SMS
            )
            if(!hasPermissions) return false;
            return true;
        } catch (error) {
            console.log(error)
        }
    }

    const makeWeek = () => {
        let week = [];
        const date = new Date();
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        if(days[date.getDay()] === 'Thu'){
            week = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"]
        }
        if(days[date.getDay()] === 'Fri'){
            week = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
        }
        if(days[date.getDay()] === 'Sat'){
            week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",]
        }
        if(days[date.getDay()] === 'Sun'){
            week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        }
        if(days[date.getDay()] === 'Mon'){
            week = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"]
        }
        if(days[date.getDay()] === 'Tue'){
            week = ["Wed", "Thu","Fri", "Sat", "Sun", "Mon", "Tue"]
        }
        if(days[date.getDay()] === 'Wen'){
            week = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"]
        }
        return week;
    }

    const makeOrder = () => {
        let week = {};
        const date = new Date();
        const days = ['Fri','Sat','Sun','Mon','Tue','Wen','Thu'];

        if(days[date.getDay()] === 'Thu'){
            week = { 'Fri': 0, 'Sat': 0, 'Sun': 0, 'Mon': 0, 'Tue': 0, 'Wen': 0, 'Thu': 0}
        }
        if(days[date.getDay()] === 'Fri'){
            week = { 'Sat': 0, 'Sun': 0, 'Mon': 0, 'Tue': 0, 'Wen': 0, 'Thu': 0, 'Fri': 0}
        }
        if(days[date.getDay()] === 'Sat'){
            week =  { 'Sun': 0, 'Mon': 0, 'Tue': 0, 'Wen': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0}
        }
        if(days[date.getDay()] === 'Sun'){
            week = { 'Mon': 0, 'Tue': 0, 'Wen': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0,  'Sun': 0}
        }
        if(days[date.getDay()] === 'Mon'){
            week = { 'Tue': 0, 'Wen': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0,  'Sun': 0, 'Mon': 0}
        }
        if(days[date.getDay()] === 'Tue'){
            week = { 'Wen': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0,  'Sun': 0, 'Mon': 0,  'Tue': 0}
        }
        if(days[date.getDay()] === 'Wen'){
            week = { 'Thu': 0, 'Fri': 0, 'Sat': 0,  'Sun': 0, 'Mon': 0,  'Tue': 0,  'Wen': 0}
        }
        return week;
    }

    React.useEffect(() => {
        const x = [];
        const y = [];
        const week = [new Date().getDate() - 6,new Date().getDate() - 5,new Date().getDate() - 4, new Date().getDate() - 3, new Date().getDate() - 2, new Date().getDate() - 1, new Date().getDate() - 0 ];
        let dates = {'Fri': 0, 'Sat': 0, 'Sun': 0, 'Mon': 0, 'Tue': 0, 'Wen': 0, 'Thu': 0};
        // let dates = makeOrder();
        if(smsDataList){
            smsDataList.forEach((item, index) => {
                if(index <= 6){
                    // console.log(new Date(item.date).getDate());
                    if(new Date(item.date).getDay() === 0){
                        dates.Sun += Number(item.yaxis);
                    }
                    if(new Date(item.date).getDay() === 1){
                        dates.Mon += Number(item.yaxis);
                    }
                    if(new Date(item.date).getDay() === 2){
                        dates.Tue += Number(item.yaxis);
                    }
                    if(new Date(item.date).getDay() === 3){
                        dates.Wen += Number(item.yaxis);
                    }
                    if(new Date(item.date).getDay() === 4){
                        dates.Thu += Number(item.yaxis);
                    }
                    if(new Date(item.date).getDay() === 5){
                        dates.Fri += Number(item.yaxis);
                    }
                    if(new Date(item.date).getDay() === 6){
                        dates.Sat += Number(item.yaxis);
                    }
                    // y.push(item.yaxis);
                    x.push(new Date(item.date).getDate())
                }
            });
           
            Object.keys(dates).forEach(item => {
                y.push(dates[item])
            })
            setXaxis(makeWeek());
            setYaxes(y);
        }
    },[smsDataList]);

    React.useEffect(() => {
        checkAppPermissions();
    },[]);

    const elipse = (string) => {
        if(string.length > 29){
            return string.substr(0, 29 - 1) + '...'
        }
        return string;
    }


    const plotSwitcher = (plot) => {
        switch(plot){
            case 'bar':
                return (
                    <BarChart
                            style={{
                                marginVertical: 2,
                                borderRadius: 0,
                            }}
                            data={{
                                labels: xAxis,
                                datasets: [
                                {
                                    data: yAxis
                                }
                                ]
                            }}
                            width={width}
                            height={220}
                            yAxisLabel="R"
                            chartConfig={{
                                backgroundColor: "#ffa726",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 2, 
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                }}
                            verticalLabelRotation={30}
                    />
                );
            case 'pie':
                return (
                    <View>
                        <Text>
                            Pie
                        </Text>
                    </View>
                )
            default:
                return(
                    <BarChart
                    style={{
                        marginVertical: 2,
                        borderRadius: 0,
                    }}
                    data={{
                        labels: xAxis,
                        datasets: [
                        {
                            data: yAxis
                        }
                        ]
                    }}
                    width={width}
                    height={220}
                    yAxisLabel="R"
                    chartConfig={{
                        backgroundColor: "blue",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                    verticalLabelRotation={30}
            />
                );
        }
    }

    const renderItem = ({ item }) => {
        const { title, cartigory, deduct, amount, isRead} = item;

        return (
            <View style={styles.card}>
            <View style={styles.iconContainer}>
                <FontAwesome5 name={deduct ? "angry": "smile-beam"} size={30} color={deduct ? "red": "green"} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.cardInfoContainer}>
                    <View style={styles.referenceContainer}>
                        <Text style={styles.reference}>{elipse(title)}</Text>
                    </View>
                    <View style={styles.cartigoryContainer}>
                        <Text style={styles.amount}>{cartigory}</Text>
                        <Text style={[styles.amount, {color: deduct ? "red": "green"}]}>
                            {amount}
                        </Text>
                        <Ionicons name={"md-mail-unread-outline"} size={20} color={isRead ? "black" : "green"} />
                    </View>
                </View>
                <View style={styles.amountContainer}>
                </View>
            </View>
        </View>
        )
    }
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
                            <Text style={styles.controlTextD}>BarChat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textContainerW} activeOpacity={0.7}>
                            <Text style={styles.controlTextW}>PieChart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textContainerM} activeOpacity={0.7}>
                            <Text style={styles.controlTextM}>Heat Map(new)</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                   {
                       yAxis.length !== 0 && yAxis !== 0 && (
                            plotSwitcher(plotKind)
                       )
                   }
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
                                <Feather name="settings" size={20} color="#640fdb" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        smsDataList.length !== 0 ? (
                            <FlatList
                            data={smsDataList}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        ) : (
                            <View><Text>Empty</Text></View>
                        )
                    }
                </View>
            </View>
        </View>
    )
}
