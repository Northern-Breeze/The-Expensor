import * as React from 'react';
import {View, Text, Platform, PermissionsAndroid, FlatList} from 'react-native';
import styles from './Home.styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import SmsAndroid from 'react-native-get-sms-android';

import BarGraph from '../../components/BarGraph';
import PieGraph from '../../components/PieGraph';
import HeatMap from '../../components/HeatMap';

// helper function
import {smsParser} from '../../utils/messages';
import makeWeek from '../../helpers/makeWeek';
import makeOrder from '../../helpers/makeOrder';

interface SMSDataList {
  date: string;
  _id: string;
  amount: number;
  title: string;
  category: string;
  isRead: boolean;
  yaxis: string;
  deduct: boolean;
}

export default function Home() {
  const [smsDataList, setSmsDataList] = React.useState<SMSDataList[]>([]);
  const [yAxis, setYaxes] = React.useState<number[]>([]);
  const [xAxis, setXaxis] = React.useState<string[]>([]);
  const [plotKind, setPlotKind] = React.useState('bar');

  const denied = React.useRef(false);

  const listSMS = React.useCallback(() => {
    const filter: {
      box: string;
    } = {
      box: 'inbox',
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail: boolean) => {
        console.error('Failed with this error' + fail);
      },
      (count: number, smsList: any) => {
        const arr = JSON.parse(smsList);
        const data = smsParser(arr, 'TYMEBANK');
        // setSmsDataList(data);
      },
    );
  }, []);

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
        // access allowed
        console.log('ACCESS_GRANTED');
      } else {
        // access denied
        console.log('ACCESS_DENIED');
        denied.current = true;
      }
    } catch (error) {
      console.error(error);
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

  React.useEffect(() => {
    async function checkAppPermissions() {
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
    }
    checkAppPermissions();
  }, [listSMS]);

  React.useEffect(() => {
    return () => {
      denied.current = false;
    };
  });

  const plotSwitcher = (plot: string) => {
    switch (plot) {
      case 'bar':
        return <BarGraph xAxis={xAxis} yAxis={yAxis} />;
      case 'pie':
        return <PieGraph pieData={smsDataList} />;
      case 'heat':
        return <HeatMap data={smsDataList} />;
      default:
        return <BarGraph xAxis={xAxis} yAxis={yAxis} />;
    }
  };

  const switchTo = (part: string) => {
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
              style={[
                styles.textContainerD,
                plotKind === 'bar' ? styles.notSelected : styles.selected,
              ]}
              activeOpacity={0.7}
              onPress={() => switchTo('bar')}>
              <Text style={styles.controlTextD}>BarChat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.textContainerW,
                plotKind === 'pie' ? styles.notSelected : styles.selected,
              ]}
              activeOpacity={0.7}
              onPress={() => switchTo('pie')}>
              <Text style={styles.controlTextW}>PieChart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.textContainerM,
                plotKind === 'heat' ? styles.notSelected : styles.selected,
              ]}
              activeOpacity={0.7}
              onPress={() => switchTo('heat')}>
              <Text style={styles.controlTextM}>Heat Map</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
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
        </View>
      </View>
    </View>
  );
}
