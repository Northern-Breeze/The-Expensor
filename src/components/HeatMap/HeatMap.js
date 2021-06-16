import React from 'react';
import {Dimensions} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';

const {width} = Dimensions.get('window');

export default function HeatMap(props) {
  const {data} = props;
  const [heat, setHeat] = React.useState([]);
  const [maximum, setMaximum] = React.useState('');

  const counter = (a) => {
    let count = {};
    const heatmap = [];
    a.forEach(function (i) {
      count[i] = (count[i] || 0) + 1;
    });
    Object.keys(count).forEach((item) => {
      heatmap.push({date: item, count: count[item]});
    });
    return heatmap;
  };
  React.useEffect(() => {
    const temp = [];
    data.forEach((item) => {
      // make a date
      const date = new Date(item.date);
      const dateFormatted = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      // Push to temp
      temp.push(dateFormatted);
    });

    const value = counter(temp);
    setHeat(value);
    console.log(value);
  }, [data]);

  React.useEffect(() => {
    const date = new Date();
    const dateFormatted = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    setMaximum(dateFormatted);
  }, []);

  return (
    <ContributionGraph
      values={heat}
      endDate={new Date()}
      numDays={110}
      width={width}
      height={220}
      chartConfig={{
        backgroundColor: 'blue',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
    />
  );
}
