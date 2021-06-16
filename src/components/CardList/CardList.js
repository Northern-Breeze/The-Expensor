import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ellipse from '../../utils/elipse';

import styles from './Card.style';

export default function ({item}) {
  const {title, category, deduct, amount, isRead} = item;

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
            <Text style={styles.reference}>{ellipse(title)}</Text>
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.amount}>{category}</Text>
            <Text
              style={[
                styles.amount,
                {color: deduct ? styles.red : styles.green},
              ]}>
              R {amount}
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
}
