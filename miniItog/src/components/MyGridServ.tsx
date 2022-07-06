import React from "react";

import {
    Grid,
    GridColumn as Column,
    GridDataStateChangeEvent,
  } from "@progress/kendo-react-grid";
  import { DataLoader } from "./data-loader";
  import { DataResult, State } from "@progress/kendo-data-query";
  
  //props: total: number, paging{skip: number, take: number},
  const MyGridServ = (props: any) => {
    const [myData, setMyData] = React.useState<DataResult>({
      data: [],
      total: 0,
    });
    const [dataState, setDataState] = React.useState<State>({
        take: props.paging.take,
        skip: props.paging.skip,
    });
  
    const dataStateChange = (e: GridDataStateChangeEvent) => {
      setDataState(e.dataState);
    };
  
    const dataReceived = (myNewData: DataResult) => {
      setMyData(myNewData);
    };
  
    return (
      <div>
        <Grid
          filterable={true}
          sortable={true}
          pageable={true}
          {...dataState}
          data={myData}
          onDataStateChange={dataStateChange}
        >
          <Column field="ProductID" filter="numeric" title="Id" />
          <Column field="ProductName" title="Name" />
          <Column
            field="UnitPrice"
            filter="numeric"
            format="{0:c}"
            title="Price"
          />
          <Column field="UnitsInStock" filter="numeric" title="In stock" />
        </Grid>
  
        <DataLoader dataState={dataState} onDataReceived={dataReceived} />
      </div>
    );
  };

export default MyGridServ;