import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ellipse from '../../utils/elipse';

import styles from './Card.style';

interface IProps {
  item: {
    date: string;
    _id: string;
    amount: number;
    title: string;
    category: string;
    isRead: boolean;
    yaxis: string;
    deduct: boolean;
  }
}

export default function (props: IProps) {
  const { item } = props;
  const {title, category, deduct, amount, isRead} = item;

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <FontAwesome5
          name={deduct ? 'angry' : 'smile-beam'}
          size={30}
          color="black"
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.cardInfoContainer}>
          <View style={styles.referenceContainer}>
            <Text style={styles.reference}>{ellipse(title)}</Text>
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.amount}>{category}</Text>
            <Text style={[styles.amount]}>R {amount}</Text>
            <Ionicons
              name={'md-mail-unread-outline'}
              size={20}
              color={isRead ? 'black' : 'blue'}
            />
          </View>
        </View>
        <View style={styles.amountContainer} />
      </View>
    </View>
  );
}
