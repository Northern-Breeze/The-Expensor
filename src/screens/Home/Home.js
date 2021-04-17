import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import styles from './Home.styles';
import {LineChart} from 'react-native-chart-kit';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SmsAndroid from 'react-native-get-sms-android';
import {useStoreActions} from 'easy-peasy';

const {height} = Dimensions.get('window');

export default function Home() {
  const [minDate, setMinDate] = React.useState('');
  const [maxDate, setMaxDate] = React.useState('');
  const [smsDataList, setSmsDataList] = React.useState([]);
  const [yAxis, setYaxes] = React.useState([]);
  const [xAxis, setXaxis] = React.useState([]);
  const setBalance = useStoreActions((action) => action.setCurrentBalance);
  const filterSms = (data) => {
    const sms = [];
    data.forEach((item) => {
      if (item.address === '+2782004809006') {
        const _id = item._id;
        const date = item.date;
        let title = item.body.split(';')[1];
        let amount = item.body.split(';')[2];
        let cartigory = item.body.split(';')[0];
        let deduct = 0;
        let account = '';
        let yaxis = 0;
        let currentAmount = 0;
        if (
          title !== undefined &&
          amount !== undefined &&
          cartigory !== undefined
        ) {
          // some are undefined
          title = title.slice(5);
          cartigory = cartigory.split(' ');
          currentAmount = amount.slice(6);
          amount = cartigory[2];
          yaxis = cartigory[2].slice(2);
          deduct = cartigory[2][0] === '-' ? true : false;
          account = `${cartigory[4]} ${cartigory[5]}`;
          cartigory = cartigory[1];
          const isRead = item.read;
          setBalance(currentAmount);
          sms.push({
            _id,
            date,
            title,
            amount,
            cartigory,
            deduct,
            amount,
            account,
            yaxis,
            isRead,
          });
        }
      }
    });
    setSmsDataList(sms);
  };

  const listSMS = () => {
    const filter = {
      box: 'inbox',
      maxCount: 30,
    };
    if (minDate !== '') {
      filter.minDate = minDate;
    }
    if (maxDate !== '') {
      filter.maxDate = maxDate;
    }
    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed with this error' + fail);
      },
      (count, smsList) => {
        const arr = JSON.parse(smsList);
        // console.log(arr);
        filterSms(arr);
        // setSmsDataList(arr);
      },
    );
  };

  const requestPermissions = async () => {
    let granted = {};
    try {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'The Expensor Requires Read Permission to SMS',
          message: 'The Expensor SMS Finance App need access to display data',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use SMS features');
      } else {
        console.log('SMS permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkAppPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        if (!(await checkPermissions())) {
          await requestPermissions();
        }
        if (await checkPermissions()) {
          listSMS();
        }
      } catch (error) {
        console.error(e);
      }
    }
  };
  const checkPermissions = async () => {
    let hasPermissions = false;
    try {
      hasPermissions = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      );
      if (!hasPermissions) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const x = [];
    const y = [];
    if (smsDataList) {
      smsDataList.forEach((item, index) => {
        if (index <= 6) {
          console.log(new Date(item.date).toString());
          x.push(new Date(item.date).toString().substring(16, 21));
          y.push(item.yaxis);
        }
      });
      setXaxis(x);
      setYaxes(y);
    }
  }, [smsDataList]);

  React.useEffect(() => {
    checkAppPermissions();
  }, []);

  const elipse = (string) => {
    if (string.length > 29) {
      return string.substr(0, 29 - 1) + '...';
    }
    return string;
  };
  const renderItem = ({item}) => {
    const {title, cartigory, deduct, amount, isRead} = item;

    return (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <FontAwesome5
            name={deduct ? 'angry' : 'smile-beam'}
            size={30}
            color={deduct ? 'red' : 'green'}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.cardInfoContainer}>
            <View style={styles.referenceContainer}>
              <Text style={styles.reference}>{elipse(title)}</Text>
            </View>
            <View style={styles.cartigoryContainer}>
              <Text style={styles.amount}>{cartigory}</Text>
              <Text style={[styles.amount, {color: deduct ? 'red' : 'green'}]}>
                {amount}
              </Text>
              <Ionicons
                name={'md-mail-unread-outline'}
                size={20}
                color={isRead ? 'black' : 'green'}
              />
            </View>
          </View>
          <View style={styles.amountContainer} />
        </View>
      </View>
    );
  };
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
            <TouchableOpacity style={styles.textContainerM} activeOpacity={0.7}>
              <Text style={styles.controlTextM}>Monthly</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {yAxis.length !== 0 && yAxis !== 0 && (
            <LineChart
              data={{
                labels: xAxis,
                datasets: [
                  {
                    data: yAxis,
                  },
                ],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={height - 535}
              yAxisLabel="R"
              // yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#640fdb',
                },
              }}
              bezier
              style={{
                marginVertical: 2,
                borderRadius: 0,
              }}
            />
          )}
        </View>
        <View style={styles.transactions}>
          <View style={styles.transactionHeader}>
            <View style={styles.transactionTextContainer}>
              <Text style={styles.transactionText}>Transactions</Text>
            </View>
            <TouchableOpacity
              style={styles.orderByTextContainer}
              activeOpacity={0.7}>
              <View style={styles.controlAction}>
                <Text style={styles.orderByText}>order by</Text>
              </View>
              <View style={styles.controlAction}>
                <Feather name="settings" size={20} color="#640fdb" />
              </View>
            </TouchableOpacity>
          </View>
          {smsDataList.length !== 0 ? (
            <FlatList
              data={smsDataList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View>
              <Text>Empty</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
