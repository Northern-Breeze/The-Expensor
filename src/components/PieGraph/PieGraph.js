import * as React from 'react';
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

  const counter = (a) => {
    let count = {};
    let temp = [];
    const plotdata = [];
    a.forEach(function (i) {
      count[i.name] = (count[i.name] || 0) + 1;
    });
    Object.keys(count).forEach((item) => {
      plotdata.push({name: item, count: count[item]});
    });

    a.forEach((item, index) => {
      if (plotdata[index]) {
        if (item.name === plotdata[index].name) {
          temp.push({
            name: ellipse(item.name),
            color: item.color,
            population: item.population * plotdata[index].count,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          });
        }
      }
    });
    return temp;
  };

  React.useEffect(() => {
    if (pieData) {
      const alldata = [];
      pieData.forEach((item, index) => {
        alldata.push({
          name: item.title,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          population: Math.round(item.amount),
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        });
      });
      const value = counter(alldata);
      setPieList(value);
    }
  }, [pieData]);

  return (
    <PieChart
      data={pieList}
      width={width}
      height={220}
      chartConfig={{
        backgroundColor: 'rgba(9,185,182,1)',
        backgroundGradientFrom: 'rgba(9,185,182,1)',
        backgroundGradientTo: 'rgba(9,185,182,1)',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      accessor="population"
      backgroundColor="rgba(9,185,182,1)"
      paddingLeft="15"
      absolute
    />
  );
}
