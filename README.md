# mobilityware-data-grid

## Install

```sh
npm install mobilityware-data-grid
```

`mobilityware-data-grid` is published as ECMAScript modules for evergreen browsers / bundlers, and CommonJS for server-side rendering / Jest.

## Quick start

```jsx
import "mobilityware-data-grid/lib/styles.css";

import DataGrid from "mobilityware-data-grid";

const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
];

const rows = [
  { id: 0, title: "Example" },
  { id: 1, title: "Demo" },
];

function App() {
  return <DataGrid columns={columns} rows={rows} />;
}
```

## API

### Components

#### `<DataGrid />`

##### Props

###### `columns: readonly Column<R, SR>[]`

See [`Column`](#column).

An array describing the grid's columns.

:warning: Passing a new `columns` array will trigger a re-render for the whole grid, avoid changing it as much as possible for optimal performance.

###### `rows: readonly R[]`

An array of rows, the rows data can be of any type.

###### `topSummaryRows?: Maybe<readonly SR[]>`

###### `bottomSummaryRows?: Maybe<readonly SR[]>`

An optional array of summary rows, usually used to display total values for example.

###### `rowKeyGetter?: Maybe<(row: R) => K>`

A function returning a unique key/identifier per row. `rowKeyGetter` is required for row selection to work.

```tsx
import DataGrid from "mobilityware-data-grid";

interface Row {
  id: number;
  name: string;
}

function rowKeyGetter(row: Row) {
  return row.id;
}

function MyGrid() {
  return <DataGrid columns={columns} rows={rows} rowKeyGetter={rowKeyGetter} />;
}
```

:bulb: While optional, setting this prop is recommended for optimal performance as the returned value is used to set the `key` prop on the row elements.

###### `onRowsChange?: Maybe<(rows: R[], data: RowsChangeData<R, SR>) => void>`

A function receiving row updates.
The first parameter is a new rows array with both the updated rows and the other untouched rows.
The second parameter is an object with an `indexes` array highlighting which rows have changed by their index, and the `column` where the change happened.

```tsx
import { useState } from "react";
import DataGrid from "mobilityware-data-grid";

function MyGrid() {
  const [rows, setRows] = useState(initialRows);

  return <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />;
}
```

###### `rowHeight?: Maybe<number | ((row: R) => number)>`

**Default:** `35` pixels

Either a number defining the height of row in pixels, or a function returning dynamic row heights.

###### `headerRowHeight?: Maybe<number>`

**Default:** `35` pixels

A number defining the height of the header row.

###### `summaryRowHeight?: Maybe<number>`

**Default:** `35` pixels

A number defining the height of summary rows.

###### `selectedRows?: Maybe<ReadonlySet<K>>`

###### `onSelectedRowsChange?: Maybe<(selectedRows: Set<K>) => void>`

###### `sortColumns?: Maybe<readonly SortColumn[]>`

###### `onSortColumnsChange?: Maybe<(sortColumns: SortColumn[]) => void>`

###### `defaultColumnOptions?: Maybe<DefaultColumnOptions<R, SR>>`

###### `groupBy?: Maybe<readonly string[]>`

###### `rowGrouper?: Maybe<(rows: readonly R[], columnKey: string) => Record<string, readonly R[]>>`

###### `expandedGroupIds?: Maybe<ReadonlySet<unknown>>`

###### `onExpandedGroupIdsChange?: Maybe<(expandedGroupIds: Set<unknown>) => void>`

###### `onFill?: Maybe<(event: FillEvent<R>) => R>`

###### `onCopy?: Maybe<(event: CopyEvent<R>) => void>`

###### `onPaste?: Maybe<(event: PasteEvent<R>) => R>`

###### `onCellClick?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>`

###### `onCellDoubleClick?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>`

###### `onCellContextMenu?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>`

###### `onCellKeyDown?: Maybe<(args: CellKeyDownArgs<R, SR>, event: CellKeyboardEvent) => void>`

###### `onSelectedCellChange?: Maybe<(args: CellSelectArgs<R, SR>) => void>;`

Triggered when the selected cell is changed.

Arguments:

- `args.rowIdx`: `number` - row index
- `args.row`: `R` - row object of the currently selected cell
- `args.column`: `CalculatedColumn<TRow, TSummaryRow>` - column object of the currently selected cell

###### `onScroll?: Maybe<(event: React.UIEvent<HTMLDivElement>) => void>`

###### `onColumnResize?: Maybe<(idx: number, width: number) => void>`

###### `enableVirtualization?: Maybe<boolean>`

###### `renderers?: Maybe<Renderers<R, SR>>`

This prop can be used to override the internal renderers. The prop accepts an object of type

```tsx
interface Renderers<TRow, TSummaryRow> {
  renderCheckbox?: Maybe<(props: RenderCheckboxProps) => ReactNode>;
  renderRow?: Maybe<(key: Key, props: RenderRowProps<TRow, TSummaryRow>) => ReactNode>;
  renderSortStatus?: Maybe<(props: RenderSortStatusProps) => ReactNode>;
  noRowsFallback?: Maybe<ReactNode>;
}
```

For example, the default `<Row />` component can be wrapped via the `renderRow` prop to add context providers or tweak props

```tsx
import DataGrid, { RenderRowProps, Row } from "mobilityware-data-grid";

function myRowRenderer(key: React.Key, props: RenderRowProps<Row>) {
  return (
    <MyContext.Provider key={key} value={123}>
      <Row {...props} />
    </MyContext.Provider>
  );
}

function MyGrid() {
  return <DataGrid columns={columns} rows={rows} renderers={{ renderRow: myRowRenderer }} />;
}
```

:warning: To prevent all rows from being unmounted on re-renders, make sure to pass a static or memoized component to `renderRow`.

###### `rowClass?: Maybe<(row: R) => Maybe<string>>`

##### `direction?: Maybe<'ltr' | 'rtl'>`

This property sets the text direction of the grid, it defaults to `'ltr'` (left-to-right). Setting `direction` to `'rtl'` has the following effects:

- Columns flow from right to left
- Frozen columns are pinned on the right
- Column resize handle is shown on the left edge of the column
- Scrollbar is moved to the left

###### `className?: string | undefined`

###### `style?: CSSProperties | undefined`

###### `'aria-label'?: string | undefined`

###### `'aria-labelledby'?: string | undefined`

###### `'aria-describedby'?: string | undefined`

###### `'data-testid'?: Maybe<string>`

#### `<TextEditor />`

##### Props

See [`RenderEditCellProps`](#rendereditcellprops)

#### `<Row />`

See [`renderers`](#renderers-mayberenderersr-sr)

##### Props

See [`RenderRowProps`](#renderrowprops)

The `ref` prop is supported.

#### `<SortableHeaderCell />`

##### Props

###### `onSort: (ctrlClick: boolean) => void`

###### `sortDirection: SortDirection | undefined`

###### `priority: number | undefined`

###### `tabIndex: number`

###### `children: React.ReactNode`

#### `<ValueFormatter />`

##### Props

See [`FormatterProps`](#formatterprops)

#### `<SelectCellFormatter />`

##### Props

###### `value: boolean`

###### `tabIndex: number`

###### `disabled?: boolean | undefined`

###### `onChange: (value: boolean, isShiftClick: boolean) => void`

###### `onClick?: MouseEventHandler<T> | undefined`

###### `'aria-label'?: string | undefined`

###### `'aria-labelledby'?: string | undefined`

#### `<ToggleGroupFormatter />`

##### Props

See [`RenderGroupCellProps`](#rendergroupcellprops)

### Hooks

#### `useRowSelection<R>(): [boolean, (selectRowEvent: SelectRowEvent<R>) => void]`

### Other

#### `SelectColumn: Column<any, any>`

#### `SELECT_COLUMN_KEY = 'select-row'`

### Types

#### `Column`

#### `DataGridHandle`

#### `RenderEditCellProps`

#### `RenderCellProps`

#### `RenderGroupCellProps`

#### `RenderRowProps`

### Generics

- `R`, `TRow`: Row type
- `SR`, `TSummaryRow`: Summary row type
- `K`: Row key type
