import { GridRowClickEvent } from '@progress/kendo-react-grid';
import { Splitter, SplitterOnChangeEvent } from "@progress/kendo-react-layout";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import React from 'react';

import './styles/App.scss';

import MyGrid from './components/MyGrid';
import MyGridServ from './components/MyGridServ';
import GroupGrid from './components/GroupGrid';
import EditForm from "./components/editForm";

import columns from "./components/columns";
import products from "./products.json";

import { Product } from "./interfaces";


//props: data, paging{skip: number, take: number}, initialSort{field: string, dir: string}
function App() {
  // разделение таблицы и формы
  const [nestedPanes, setNestedPanes] = React.useState<Array<any>>([
    { size: 1000, resizable: true, collapsible: true },
    { resizable: true, collapsible: true },
  ]);
  const onNestedChange = (event: SplitterOnChangeEvent) => {
    setNestedPanes(event.newState);
  };

  // tabstrip
  const [selected, setSelected] = React.useState<number>(0);
  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };

  // Редактирование базы данных
  const [data, setData] = React.useState<Array<Product>>(products);
  const [editItem, setEditItem] = React.useState<Product>(data[0]);

  const rowClick = (event: GridRowClickEvent) => {
    setEditItem(event.dataItem);
  };

  const addRecord = () => {
    const newRecord = { ProductID: data.length + 1 };

    setData([newRecord, ...data]);
    setEditItem(newRecord);
  };

  const updateItem = (product: Product) => {
    let newData = data.map((item) => {
      if (product.ProductID === item.ProductID) {
        item = { ...product };
      }
      return item;
    });
    setEditItem(product);
    setData(newData);
  };

  const deleteItem = (product: Product) => {
    let newData = data.filter(item => item.ProductID !== product.ProductID);
    setEditItem(product);
    setData(newData);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Табличка</h1>
      </div>

      <Splitter
        style={{ height: 900 }}
        panes={nestedPanes}
        orientation={"vertical"}
        onChange={onNestedChange}
      >
        <div className="table">
          {/* <MyGridServ paging={{skip:0, take:8}}/> */}
          {/* <MyGrid data={data} columns={columns} paging={{ skip: 0, take: 8 }} rowClick={rowClick} addRecord={addRecord} /> */}
          <GroupGrid data={data} columns={columns} rowClick={rowClick} addRecord={addRecord} />
        </div>

        <div className="form">
          <TabStrip selected={selected} onSelect={handleSelect}>
            <TabStripTab title="Tab 1 Title">
              <EditForm onSubmit={updateItem} onDelete={deleteItem} item={editItem} />
              {JSON.stringify(editItem, null, 2)}
            </TabStripTab>
            <TabStripTab title="Tab 2 Title">
              <p>Tab 2 Content</p>
            </TabStripTab>
            <TabStripTab title="Tab 3 Title">
              <p>Tab 3 Content</p>
            </TabStripTab>
          </TabStrip>
        </div>
      </Splitter>
    </div>
  );
}

export default App;
