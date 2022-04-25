import * as React from 'react';
import {PieChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import ellipse from '../../utils/elipse';
const {width} = Dimensions.get('window');

interface IProps {
  pieData: {
    date: string;
    _id: string;
    amount: number;
    title: string;
    category: string;
    isRead: boolean;
    yaxis: string;
    deduct: boolean;
  }[]
}

interface PieList {name: string; color: string; population: number; legendFontColor: string; legendFontSize: number;}

export default function PieGraph(props: IProps) {
  const {pieData} = props;
  const [pieList, setPieList] = React.useState<PieList[]>([]);
  const mounted = React.useRef(true);

  React.useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const counter = (a: { name: string, population: number }[]) => {
    let count: any = {};
    let temp = [];
    const plotdata: {name: string, count: any}[] = [];
    a.forEach(function (i: { name: string }) {
      count[i.name] = (count[i.name] || 0) + 1;
    });
    Object.keys(count).forEach((item) => {
      plotdata.push({name: item, count: count[item]});
    });

    for (let index = 0; index < a.length; index++) {
      if (index < 8) {
        if (plotdata[index] && a[index].name === plotdata[index].name) {
          temp.push({
            name: ellipse(a[index].name),
            color: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
              Math.random() * 255,
            )},${Math.floor(Math.random() * 255)})`,
            population: a[index].population * plotdata[index].count,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          });
        } else {
          temp.push({
            name: ellipse(a[index].name),
            color: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
              Math.random() * 255,
            )},${Math.floor(Math.random() * 255)})`,
            population: a[index].population * 1,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          });
        }
      }
    }
    return temp;
  };

  React.useEffect(() => {
    if (pieData) {
      const alldata: {name: string, color: string, population: number, legendFontColor: string, legendFontSize: number }[] = [];
      pieData.forEach((item) => {
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
