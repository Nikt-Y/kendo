import React from "react";
import { DataResult, process, State } from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn as Column,
  GridDataStateChangeEvent,
  GridToolbar,
  GridItemChangeEvent,
  GridRowClickEvent,
} from "@progress/kendo-react-grid";
import { Form } from "@progress/kendo-react-form";

import { CustomColumnMenu } from "./customColumnMenu";

import products from "./products.json";
import columns from "./columns";
import { columnInterface } from "./interfaces";
import { Product } from "./interfaces";
import EditForm from "./editForm";

const createDataState = (dataState: State) => {
  return {
    result: process(products.slice(0), dataState),
    dataState: dataState,
  };
};

const TestGrid = () => {
  let initialState = createDataState({
    take: 8,
    skip: 0,
  });

  const [result, setResult] = React.useState<DataResult>(initialState.result);
  const [dataState, setDataState] = React.useState<State>(
    initialState.dataState
  );
  const [stateColumns, setStateColumns] =
    React.useState<Array<columnInterface>>(columns);

  const dataStateChange = (event: GridDataStateChangeEvent) => {
    let updatedState = createDataState(event.dataState);
    setResult(updatedState.result);
    setDataState(updatedState.dataState);
  };

  const onColumnsSubmit = (columnsState: Array<columnInterface>) => {
    setStateColumns(columnsState);
  };

  // edit
  const [form, setForm] = React.useState<Form>()
  const [data, setData] = React.useState<Array<Product>>(products);
  const [editItem, setEditItem] = React.useState<Product>(products[0]);

  const rowClick = (event: GridRowClickEvent) => {
    setEditItem(event.dataItem);
    console.log(event.dataItem.ProductID);
  };

  const handleSubmit = (event: Product) => {
    let newData = data.map((item) => {
      if (event.ProductID === item.ProductID) {
        item = { ...event };
      }
      return item;
    });
    setData(newData);
  };

  // add
  const addRecord = () => {
    const newRecord = { ProductID: data.length + 1 };

    setData([newRecord, ...data]);
    setEditItem(newRecord);
  };

  return (
    <div>
      <Grid
        data={result}
        {...dataState}
        onDataStateChange={dataStateChange}
        sortable={true}
        pageable={true}
        pageSize={8}
        onRowClick={rowClick}
      >
        <GridToolbar>
          <div>
            <button
              title="Add new"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={addRecord}
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
                columnMenu={(props) => (
                  <CustomColumnMenu
                    {...props}
                    columns={stateColumns}
                    onColumnsSubmit={onColumnsSubmit}
                  />
                )}
              />
            )
        )}
      </Grid>
      <div className="formochka">
        <h1>{editItem.ProductName}</h1>
        <EditForm
          onSubmit={handleSubmit}
          item={editItem}
        />
      </div>
    </div>
  );
};

export default TestGrid;