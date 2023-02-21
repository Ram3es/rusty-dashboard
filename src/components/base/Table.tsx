import { useEffect } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { Header } from '../../types/Table'

const Table = ({
  columns,
  data,
  isHeaderHidden = false,
  itemsNumberOnPage = 5
}: {
  columns: Header[]
  data: Array<Record<string, any>>
  isHeaderHidden?: boolean
  itemsNumberOnPage?: number
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    pageOptions,
    state,
    gotoPage,
    setPageSize,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: itemsNumberOnPage }
    },
    useFilters,
    useSortBy,
    usePagination
  )

  const { pageIndex } = state

  useEffect(() => {
    setPageSize(itemsNumberOnPage)
  }, [itemsNumberOnPage])

  return (
    <>
      <table
        {...getTableProps()}
        className="border-separate border-spacing-y-2 mb-6"
      >
        <thead className={`${isHeaderHidden ? 'hidden' : ''}`}>
          {headerGroups.map((headerGroup, index: number) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={`head-row-${index}`}
            >
              {headerGroup.headers.map((column: any, index: number) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={`head-col-${index}`}
                  className="py-2 px-3 text-gray-6 text-xs text-start font-normal"
                >
                  <span className="flex gap-1">
                    {column.render('header')}
                    {column.isSorted === true
                      ? (
                          column.isSortedDesc === true
                            ? (
                        <svg
                          width="9"
                          height="16"
                          viewBox="0 0 9 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.91069 5.96155C1.10361 5.96155 0.629017 5.05474 1.08902 4.39159L3.32103 1.17386C3.71671 0.60344 4.55898 0.599855 4.95949 1.16689L7.2323 4.38461C7.70017 5.047 7.22647 5.96155 6.41551 5.96155H1.91069Z"
                            fill="#475A76"
                          />
                          <path
                            d="M1.91069 9.53845C1.10361 9.53845 0.629017 10.4453 1.08902 11.1084L3.32103 14.3261C3.71671 14.8966 4.55898 14.9001 4.95949 14.3331L7.2323 11.1154C7.70017 10.453 7.22647 9.53845 6.41551 9.53845H1.91069Z"
                            fill="#FFC701"
                          />
                        </svg>
                              )
                            : (
                        <svg
                          width="9"
                          height="16"
                          viewBox="0 0 9 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.91069 5.96155C1.10361 5.96155 0.629017 5.05474 1.08902 4.39159L3.32103 1.17386C3.71671 0.60344 4.55898 0.599855 4.95949 1.16689L7.2323 4.38461C7.70017 5.047 7.22647 5.96155 6.41551 5.96155H1.91069Z"
                            fill="#FFC701"
                          />
                          <path
                            d="M1.91069 9.53845C1.10361 9.53845 0.629017 10.4453 1.08902 11.1084L3.32103 14.3261C3.71671 14.8966 4.55898 14.9001 4.95949 14.3331L7.2323 11.1154C7.70017 10.453 7.22647 9.53845 6.41551 9.53845H1.91069Z"
                            fill="#475A76"
                          />
                        </svg>
                              )
                        )
                      : (
                          ''
                        )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index: number) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                key={`body-row-${index}`}
                className="bg-dark-1f"
              >
                {row.cells.map((cell, index: number) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={`body-col-${index}`}
                      className="py-2 px-3 text-gray-6 text-sm text-start font-medium"
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {pageOptions.length > 1
        ? (
        <div className="flex gap-5">
          <div className="flex gap-2">
            {Array.from({ length: pageOptions.length }, (v, i) => i).map(
              (value: number, i: number) => {
                return (
                  <button
                    className={`${
                      pageIndex === value
                        ? 'bg-yellow-f text-black'
                        : 'bg-dark-1f text-gray-6'
                    } text-sm flex w-8 h-8 items-center justify-center rounded`}
                    key={i}
                    onClick={() => gotoPage(value)}
                    disabled={pageIndex === value}
                  >
                    {value + 1}
                  </button>
                )
              }
            )}
          </div>
          <button
            className="text-yellow-f"
            onClick={() => gotoPage(pageOptions.length - 1)}
          >
            Last
          </button>
        </div>
          )
        : (
            ''
          )}
    </>
  )
}

export default Table
