import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useState,useEffect } from "react";
const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const [gdata,setgData] = useState([])
  useEffect(() => {
    fetch("http://localhost:3080/employee_complain/complaint_graph",{   method: "GET", 
    'credentials': 'include',
     headers: new Headers({
         'Accept': 'application/json',
         'Access-Control-Allow-Origin':'http://localhost:3000/',
         'Content-Type': 'application/json',
  })
  })
      .then((data) => data.json())
      .then((data) => setgData(data))
  }, [])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const convertedData = gdata.map(item => {

    return {
      "x": item.x,
      "y": parseInt(item.y)
    };
  });
  const linegraphData = [
    {
      id: "Complaint",
      color: tokens("dark").greenAccent[500],
      data: convertedData
    }
  ];
  const maxX = Math.max(...linegraphData[0].data.map(item => item.x));
  const minX = Math.min(...linegraphData[0].data.map(item => item.x));
  const allXValues = Array.from({ length: maxX - minX + 1 }, (_, index) => index + minX);
  const newData = allXValues.map(x => {
    const existingData = linegraphData[0].data.find(item => item.x === x);
    return existingData || { x, y: 0 };
  });
  linegraphData[0].data = newData;
  const newconvertedData = linegraphData.map(item => {

    return {
      "x": item.x,
      "y": parseInt(item.y)
    };
  });

  console.log(linegraphData)
  



  return (
    <ResponsiveLine
      data={linegraphData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
