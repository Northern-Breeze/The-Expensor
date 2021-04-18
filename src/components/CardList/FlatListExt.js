import * as React from 'react';
import {FlatList} from 'react-native';

export default function FlatListExt(props) {
  const {smsDataList, renderItem} = props;
  return (
    <FlatList
      data={smsDataList}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
