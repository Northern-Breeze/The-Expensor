import * as React from 'react';
import {Dimensions, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const {width} = Dimensions.get('window');

export default function Graph(props) {
  const {xAxis, yAxis} = props;
  if (!xAxis && !yAxis) {
    return <View />;
  }
  return (
    <BarChart
      data={{
        labels: xAxis,
        datasets: [
          {
            data: yAxis,
          },
        ],
      }}
      width={width}
      height={220}
      yAxisLabel="R"
      chartConfig={{
        backgroundGradientFrom: 'rgba(9,185,182,1)',
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: 'rgba(9,185,182,1)',
        backgroundColor: '#fff',
        decimalPlaces: 2,
        color: (opacity = 0.1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 0.4) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          marginVertical: 2,
          borderRadius: 0,
          color: '#fff',
          backgroundColor: 'rgba(18,160,115,1)',
        },
      }}
      verticalLabelRotation={90}
    />
  );
}
