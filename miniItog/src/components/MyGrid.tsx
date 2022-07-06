import React from "react";

import {
  Grid,
  GridColumn as Column,
  GridDataStateChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";

import { DataResult, process, State } from "@progress/kendo-data-query";
import { CustomColumnMenu } from "./CustomColumnMenu";

interface columnInterface {
  title?: string,
  field?: string,
  show?: boolean,
  filter?: "boolean" | "numeric" | "text" | "date" | undefined,
  minWidth?: number,
  minGridWidth?: number,
  locked?: boolean,
  width?: string | number
}


//props: data, columns, paging{skip: number, take: number}, rowClick
const MyGrid = (props: any) => {
  const createDataState = (dataState: State) => {
    return {
      result: process(props.data.slice(0), dataState),
      dataState: dataState,
    };
  };

  let initialState = createDataState({
    take: props.paging.take,
    skip: props.paging.skip,
    group: [{ field: "UnitsInStock" }, { field: "ProductName" }],
  });

  const [result, setResult] = React.useState<DataResult>(initialState.result);
  const [dataState, setDataState] = React.useState<State>(initialState.dataState);
  const [stateColumns, setStateColumns] = React.useState<Array<columnInterface>>(props.columns);

  const dataStateChange = (event: GridDataStateChangeEvent) => {
    let updatedState = createDataState(event.dataState);
    setResult(updatedState.result);
    setDataState(updatedState.dataState);
  };

  const onColumnsSubmit = (columnsState: Array<columnInterface>) => {
    setStateColumns(columnsState);
  };

  return (
    <Grid
      data={result}
      {...dataState}
      onDataStateChange={dataStateChange}
      sortable={true}
      pageable={true}
      filterable={true}
      onRowClick={props.rowClick}
    >
      <GridToolbar>
        <div>
          <button
            title="Add new"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onClick={props.addRecord}
          >
            Add new
          </button>
        </div>
      </GridToolbar>
      {stateColumns.map(
          (column, idx) =>
            column.show && (
              <Column
                key={idx}
                field={column.field}
                title={column.title}
                filter={column.filter}
              />
            )
        )}
    </Grid>
  );
};

export default MyGrid;