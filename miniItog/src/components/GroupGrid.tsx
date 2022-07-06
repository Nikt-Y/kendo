import React from "react";

import {
    Grid,
    GridColumn as Column,
    GridDataStateChangeEvent,
    GridExpandChangeEvent,
    GridToolbar,
} from "@progress/kendo-react-grid";

import { DataResult, process, State } from "@progress/kendo-data-query";
import { getGroupIds, setExpandedState, setGroupIds } from "@progress/kendo-react-data-tools";

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

const initialDataState: State = {
    take: 10,
    skip: 0,
    group: [],
};

const processWithGroups = (data: any[], dataState: State) => {
    const newDataState = process(data, dataState);

    setGroupIds({ data: newDataState.data, group: dataState.group });

    return newDataState;
};

//props: data, columns, rowClick, addRecord
const GroupGrid = (props: any) => {
    const [dataState, setDataState] = React.useState<State>(initialDataState);
    const [resultState, setResultState] = React.useState<DataResult>(
        processWithGroups(props.data, initialDataState)
    );
    const [collapsedState, setCollapsedState] = React.useState<string[]>([]);
    const [stateColumns, setStateColumns] = React.useState<Array<columnInterface>>(props.columns);

    const onDataStateChange = React.useCallback(
        (event: GridDataStateChangeEvent) => {
            const newDataState = processWithGroups(props.data, event.dataState);

            setDataState(event.dataState);
            setResultState(newDataState);
        },
        []
    );

    const onGroupsToggle = React.useCallback(() => {
        const dataStateWithoutPaging = processWithGroups(props.data, {
            group: dataState.group,
        });

        setCollapsedState(
            collapsedState.length
                ? []
                : getGroupIds({ data: dataStateWithoutPaging.data })
        );
    }, [collapsedState, dataState]);

    const newData = setExpandedState({
        data: resultState.data,
        collapsedIds: collapsedState,
    });

    return (
        <Grid
            data={newData}
            pageable={{ pageSizes: true }}
            groupable={true}
            total={resultState.total}
            onDataStateChange={onDataStateChange}
            {...dataState}
            sortable={true}
            filterable={true}
            onRowClick={props.rowClick}
            expandField="expanded"
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
                    <button
                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                        onClick={onGroupsToggle}
                        style={{marginLeft: "15px"}}
                    >
                        {collapsedState.length ? "Expand" : "Collapse"} Groups
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

export default GroupGrid;