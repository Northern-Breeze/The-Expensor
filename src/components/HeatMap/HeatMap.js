import React from 'react';
import {Dimensions} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';

const {width} = Dimensions.get('window');

export default function HeatMap(props) {
  const {data} = props;
  const [heat, setHeat] = React.useState([]);

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

    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i].date);
      const dateFormatted = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      // Push to temp
      temp.push(dateFormatted);
    }

    const value = counter(temp);
    setHeat(value);
  }, [data]);
  function formatDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }
  return (
    <ContributionGraph
      values={heat}
      endDate={formatDate()}
      numDays={110}
      width={width}
      height={220}
      chartConfig={{
        backgroundGradientFrom: 'rgba(9,185,182,1)',
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: 'rgba(9,185,182,1)',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
    />
  );
}
