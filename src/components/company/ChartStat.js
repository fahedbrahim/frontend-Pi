import axios from 'axios';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';



const COLORS = ['#0088FE', '#00C49F'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export default class ChartStat extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

  constructor(props) {
    super(props);
    this.state = {
      providers : 0, 
deliveries : 0,
      data :  [
        {
          name: 'Group A ', value :  0}, 
          {name: 'Group B ', value: 0},
        ], 


      }
    }

componentWillMount() {
  console.log("avanttttttttt"); 
  axios.post(`/livraison/getNombreByProvider`, {
    id: JSON.parse(localStorage.getItem("userInfo")).id,
  }).then((res) => {
    this.state.providers = res.data.provider; 
    
    console.log("Providers",this.state.providers); 
  

  axios.get("/livraison/getNombreBylivraison").then((res) => {
    this.state.deliveries = res.data.livraisonn;
    console.log("deliveries",this.state.deliveries);
  

 this.setState({
  data :  [
    {
      name: 'Group A ', value :  this.state.providers}, 
      {name: 'Group B ', value:  this.state.deliveries},
    ], 
 });
}
);
});
    console.log("sss", this.state.data);
    };
  
  

  render() {
    return (
      <> 
      <h3> provider statistics
  compared
  to deliveries</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={ this.state.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            { this.state.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          </PieChart>

        <div style={{color: "#00C49F "}}> <h4> deliveries </h4></div>
        <div> <h4 style={{color: "#0088FE"}}> Providers </h4></div>
        </> 
    );
  }
}
