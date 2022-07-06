import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DataResult, State, toODataString } from '@progress/kendo-data-query';

interface DataLoaderProps {
    dataState: State,
    onDataReceived: (myData: DataResult) => void
}

export const DataLoader = (props: DataLoaderProps) => {
    const baseUrl = 'https://demos.telerik.com/kendo-ui/service-v4/odata/Products?$count=true&';
    const init = { method: 'GET', accept: 'application/json', headers: {} };

    const lastSuccess = React.useRef<string>('');
    const pending = React.useRef<string>('');

    const requestDataIfNeeded = () => {
        if (pending.current || toODataString(props.dataState) === lastSuccess.current) {
            return;
        }
        pending.current = toODataString(props.dataState);
        fetch(baseUrl + pending.current, init)
            .then(response => response.json())
            .then(json => {
                lastSuccess.current = pending.current;
                pending.current = '';
                if (toODataString(props.dataState) === lastSuccess.current) {
                    props.onDataReceived.call(undefined, {
                        data: json.value,
                        total: json['@odata.count']
                    });
                } else {
                    requestDataIfNeeded();
                }
            });
    }

    requestDataIfNeeded();
    return pending.current ? <LoadingPanel /> : null;
}

const LoadingPanel = () => {
    const loadingPanel = (
        <div className="k-loading-mask">
            <span className="k-loading-text">Loading</span>
            <div className="k-loading-image" />
            <div className="k-loading-color" />
        </div>
    );

    const gridContent = document && document.querySelector('.k-grid-content');
    return gridContent ? ReactDOM.createPortal(loadingPanel, gridContent) : loadingPanel;
}

