import React from "react";
import { Dimensions } from "react-native";
import { BarChart } from 'react-native-chart-kit'

const ExpenditureGraph = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          data: [ 20, 45, 28, 80, 99, 43 ]
        }]
      }
      const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
      }

    return ( 
        <BarChart
        style={{marginVertical: 8, borderRadius: 16}}
        data={data}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={chartConfig}
/>
    );
   

};

export default ExpenditureGraph;