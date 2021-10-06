import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

export default function DataTable(props) {
  const [data, setData] = React.useState([]);
  const [columnData, setColumnData] = React.useState([]);

  //Fetch ColumnDetal and related Rows using api from https://docs.spacexdata.com/#5fcdb875-914f-4aef-a932-254397cf147a
  React.useMemo(async () => {
    //Fetching data according  to Tab clicked
    if (props.index === 0) {
      await axios
        .get("https://api.spacexdata.com/v3/capsules?id=true")
        .then((res) => {
          const fieldArray = [];

          //Adding Column Head dynamicly according to data; that is fetching from API

          for (let i = 0; i < 6; i++) {
            const fieldVal = {
              field: Object.keys(res.data[0])[i],
              headerName: Object.keys(res.data[0])[i],
              width: 130,
            };
            fieldArray.push(fieldVal);
          }
          setColumnData(fieldArray);

          setData(res.data);
        })
        .catch((err) => {
          alert("Something Went Wrong");
          setColumnData([]);

          setData([]);
        });
      //Fetching data according  to Tab clicked
    } else if (props.index === 1) {
      await axios
        .get("https://api.spacexdata.com/v3/ships?id=true")
        .then((res) => {
          const fieldArray = [];
          //Adding Column Head dynamicly according to data; that is fetching from API

          for (let i = 0; i < 5; i++) {
            const fieldVal = {
              field: Object.keys(res.data[0])[i],
              headerName: Object.keys(res.data[0])[i],
              width: 130,
            };
            fieldArray.push(fieldVal);
          }
          setColumnData(fieldArray);

          setData(res.data);
        })
        .catch((err) => {
          alert("Something Went Wrong");
          setColumnData([]);

          setData([]);
        });
    } else {
      //Fetching data according  to Tab clicked
      await axios
        .get("https://api.spacexdata.com/v3/rockets?id=true")
        .then((res) => {
          const fieldArray = [];

          for (let i = 0; i < 6; i++) {
            const fieldVal = {
              field: Object.keys(res.data[0])[i],
              headerName: Object.keys(res.data[0])[i],
              width: 130,
            };
            fieldArray.push(fieldVal);
          }
          setColumnData(fieldArray);
          setData(res.data);
        })
        .catch((err) => {
          alert("Something Went Wrong");
          setColumnData([]);

          setData([]);
        });
    }
  }, [props]);
  //Displaying Table with data that we are fetching from api  according to clicked tab index
  return (
    <div style={{ height: 400, width: "100%" }}>
      {props.index === 0 && (
        <h1 style={{ marginTop: -10, color: "#7e3636" }}>Capsules List</h1>
      )}
      {props.index === 1 && (
        <h1 style={{ marginTop: -10, color: "#295429" }}>Ship List</h1>
      )}
      {props.index === 2 && (
        <h1 style={{ marginTop: -10, color: "#4c4cc6" }}>Rockets List</h1>
      )}
      <DataGrid
        rows={data}
        columns={columnData}
        pageSize={5}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
