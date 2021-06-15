import React from 'react';
import {PieChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import ellipse from '../../utils/elipse';
const {width} = Dimensions.get('window');

export default function PieGraph(data) {
  const {pieData} = data;
  const [pieList, setPieList] = React.useState([]);
  const mounted = React.useRef(true);

  React.useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (pieData) {
      const temp = [];
      pieData.forEach((item, index) => {
        if (index <= 5) {
          temp.push({
            name: ellipse(item.title, 12),
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            population: Math.round(item.amount),
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          });
        }
      });
      setPieList(temp);
    }
  }, [pieData]);

  return (
    <PieChart
      data={pieList}
      width={width}
      height={220}
      chartConfig={{
        backgroundColor: '#ffa726',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
      absolute
    />
  );
}
