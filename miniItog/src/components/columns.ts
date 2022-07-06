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

const columns: Array<columnInterface> = [
    {
        title: 'Product Id',
        field: 'ProductID',
        show: true,
        filter: 'numeric'
    },
    {
        title: 'Product Name',
        field: 'ProductName',
        show: true,
        filter: 'text'
    },
    {
        title: 'Quantity Per Unit',
        field: 'QuantityPerUnit',
        show: true,
        filter: 'numeric'
    },
    {
        title: 'Unit Price',
        field: 'UnitPrice',
        show: true,
        filter: 'numeric'
    },
    {
        title: 'Units In Stock',
        field: 'UnitsInStock',
        show: true,
        filter: 'numeric'
    },
    {
        title: 'Discontinued',
        field: 'Discontinued',
        show: false,
        filter: 'boolean'
    }
];

export default columns;