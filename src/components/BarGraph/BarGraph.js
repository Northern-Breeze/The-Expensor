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
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2,
        color: (opacity = 0.6) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          marginVertical: 2,
          borderRadius: 0,
          backgroundColor: '#fff',
        },
      }}
      verticalLabelRotation={30}
    />
  );
}
