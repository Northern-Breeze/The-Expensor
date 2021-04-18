import React from 'react';
import {View, Text, Platform, PermissionsAndroid, FlatList} from 'react-native';
import styles from './Home.styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SmsAndroid from 'react-native-get-sms-android';
import {useStoreActions} from 'easy-peasy';

import BarGraph from '../../components/BarGraph';
import PieGraph from '../../components/PieGraph';
import HeatMap from '../../components/HeatMap';
import CardList from '../../components/CardList/CardList';

export default function Home() {
  const [minDate, setMinDate] = React.useState('');
  const [maxDate, setMaxDate] = React.useState('');
  const [smsDataList, setSmsDataList] = React.useState([]);
  const [yAxis, setYaxes] = React.useState([]);
  const [xAxis, setXaxis] = React.useState([]);
  const [plotKind, setPlotKind] = React.useState('bar');
  const setBalanceArray = useStoreActions((action) => action.setBalanceArray);
  const filterSms = (data) => {
    const sms = [];
    data.forEach((item, index) => {
      if (item.address === '+2782004809006') {
        const _id = item._id;
        const date = item.date;
        let title = item.body.split(';')[1];
        let amount = item.body.split(';')[2];
        let category = item.body.split(';')[0];
        let deduct = 0;
        let account = '';
        let yaxis = 0;
        let currentAmount = 0;
        if (
          title !== undefined &&
          amount !== undefined &&
          category !== undefined
        ) {
          // Slice the first 5 characters
          title = title.slice(5);
          category = category.split(' ');

          // purchase or not
          if (category[1] === 'Cash') {
            currentAmount = amount.slice(6);
            yaxis = category[3].slice(2);
            account = `${category[5]} ${category[6]}`;
            amount = category[3];
            deduct = category[3][0] === '-' ? true : false;
            category = `${category[1]}  ${category[2]}`;
            const isRead = item.read;
            setBalanceArray(currentAmount);
            sms.push({
              _id,
              date,
              title,
              category: category,
              deduct,
              amount,
              account,
              yaxis,
              isRead,
            });
          }
          if (category[1] === 'Purchase' || category === 'Payment') {
            currentAmount = amount.slice(6);
            yaxis = category[2].slice(2);
            account = `${category[4]} ${category[5]}`;
            amount = category[2];
            deduct = category[2][0] === '-' ? true : false;
            category = category[1];
            const isRead = item.read;
            console.log(index, currentAmount);
            setBalanceArray(currentAmount);
            sms.push({
              _id,
              date,
              title,
              category: category,
              deduct,
              amount,
              account,
              yaxis,
              isRead,
            });
          }
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
        console.error('Failed with this error' + fail);
      },
      (count, smsList) => {
        const arr = JSON.parse(smsList);
        filterSms(arr);
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
        // eslint-disable-next-line no-alert
        alert('You can use SMS features');
      } else {
        // eslint-disable-next-line no-alert
        alert('SMS permission denied');
      }
    } catch (error) {
      console.error(error);
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
        console.error(error);
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
      console.error(error);
    }
  };

  const makeWeek = () => {
    let week = [];
    const date = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (days[date.getDay()] === 'Thu') {
      week = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
    }
    if (days[date.getDay()] === 'Fri') {
      week = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    }
    if (days[date.getDay()] === 'Sat') {
      week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
    if (days[date.getDay()] === 'Sun') {
      week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
    if (days[date.getDay()] === 'Mon') {
      week = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
    }
    if (days[date.getDay()] === 'Tue') {
      week = ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];
    }
    if (days[date.getDay()] === 'Wen') {
      week = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
    }
    return week;
  };

  const makeOrder = () => {
    let week = {};
    const date = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (days[date.getDay()] === 'Thu') {
      week = {Fri: 0, Sat: 0, Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0};
    }
    if (days[date.getDay()] === 'Fri') {
      week = {Sat: 0, Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0};
    }
    if (days[date.getDay()] === 'Sat') {
      week = {Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0};
    }
    if (days[date.getDay()] === 'Sun') {
      week = {Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0};
    }
    if (days[date.getDay()] === 'Mon') {
      week = {Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0, Mon: 0};
    }
    if (days[date.getDay()] === 'Tue') {
      week = {Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0, Mon: 0, Tue: 0};
    }
    if (days[date.getDay()] === 'Wed') {
      week = {Thu: 0, Fri: 0, Sat: 0, Sun: 0, Mon: 0, Tue: 0, Wed: 0};
    }
    return week;
  };

  React.useEffect(() => {
    const x = [];
    const y = [];
    const week = [
      new Date().getDate() - 6,
      new Date().getDate() - 5,
      new Date().getDate() - 4,
      new Date().getDate() - 3,
      new Date().getDate() - 2,
      new Date().getDate() - 1,
      new Date().getDate() - 0,
    ];
    let dates = makeOrder();
    makeOrder();
    if (smsDataList) {
      smsDataList.forEach((item, index) => {
        if (index <= 6) {
          // console.log(new Date(item.date).getDate());
          if (new Date(item.date).getDay() === 0) {
            dates.Sun += Number(item.yaxis);
          }
          if (new Date(item.date).getDay() === 1) {
            dates.Mon += Number(item.yaxis);
          }
          if (new Date(item.date).getDay() === 2) {
            dates.Tue += Number(item.yaxis);
          }
          if (new Date(item.date).getDay() === 3) {
            dates.Wen += Number(item.yaxis);
          }
          if (new Date(item.date).getDay() === 4) {
            dates.Thu += Number(item.yaxis);
          }
          if (new Date(item.date).getDay() === 5) {
            dates.Fri += Number(item.yaxis);
          }
          if (new Date(item.date).getDay() === 6) {
            dates.Sat += Number(item.yaxis);
          }
          // y.push(item.yaxis);
          x.push(new Date(item.date).getDate());
        }
      });

      Object.keys(dates).forEach((item) => {
        y.push(dates[item]);
      });
      setXaxis(makeWeek());
      setYaxes(y);
    }
  }, [smsDataList]);

  React.useEffect(() => {
    checkAppPermissions();
  }, []);

  const plotSwitcher = (plot) => {
    switch (plot) {
      case 'bar':
        return <BarGraph xAxis={xAxis} yAxis={yAxis} />;
      case 'pie':
        return <PieGraph />;
      case 'heat':
        return <HeatMap />;
      default:
        return <BarGraph xAxis={xAxis} yAxis={yAxis} />;
    }
  };

  const switchTo = (part) => {
    setPlotKind(part);
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
            <TouchableOpacity
              style={styles.textContainerD}
              activeOpacity={0.7}
              onPress={() => switchTo('bar')}>
              <Text style={styles.controlTextD}>BarChat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textContainerW}
              activeOpacity={0.7}
              onPress={() => switchTo('pie')}>
              <Text style={styles.controlTextW}>PieChart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textContainerM}
              activeOpacity={0.7}
              onPress={() => switchTo('heat')}>
              <Text style={styles.controlTextM}>Heat Map(new)</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {yAxis.length !== 0 && yAxis !== 0 && plotSwitcher(plotKind)}
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
                <Text style={styles.orderByText}>Config</Text>
              </View>
              <View style={styles.controlAction}>
                <Feather name="settings" size={20} color="#640fdb" />
              </View>
            </TouchableOpacity>
          </View>
          {smsDataList.length !== 0 ? (
            <FlatList
              data={smsDataList}
              renderItem={CardList}
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
