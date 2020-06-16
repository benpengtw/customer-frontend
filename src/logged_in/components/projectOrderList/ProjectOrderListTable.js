import React, { useCallback, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TablePagination, TableRow, withStyles, Button } from '@material-ui/core'
import EnhancedTableHead from '../../../shared/components/EnhancedTableHead'
import ColorfulChip from '../../../shared/components/ColorfulChip'
import unixToDateString from '../../../shared/functions/unixToDateString'
import HighlightedInformation from '../../../shared/components/HighlightedInformation'
import currencyPrettyPrint from '../../../shared/functions/currencyPrettyPrint'
import moment from 'moment'
const styles = (theme) => ({
  tableWrapper: {
    overflowX: 'auto',
    width: '100%',
  },
  blackBackground: {
    backgroundColor: theme.palette.primary.main,
  },
  contentWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
    width: '100%',
  },
  dBlock: {
    display: 'block !important',
  },
  dNone: {
    display: 'none !important',
  },
  firstData: {
    paddingLeft: theme.spacing(3),
  },
})

const rows = [
  {
    id: 'id',
    numeric: false,
    label: '案件編號',
  },
  {
    id: 'title',
    numeric: false,
    label: '案件名稱',
  },
  {
    id: 'amount',
    numeric: false,
    label: '投資金額',
  },
  {
    id: 'totalAmount',
    numeric: false,
    label: '案件募資總額',
  },
  {
    id: 'irr',
    numeric: false,
    label: '年化報酬率',
  },
  {
    id: 'endDate',
    numeric: false,
    label: '案件結束日期',
  },
  {
    id: 'updatedAt',
    numeric: false,
    label: '交易時間',
  },
]
const thousands_separators = (num) => {
  let num_parts = num
    //.toFixed(2)
    .toString()
    .split('.')
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return num_parts.join('.')
}
const rowsPerPage = 25
const preventDefault = (event) => event.preventDefault()
function ProjectOrderListTable(props) {
  const { theme, classes, projectOrderList } = props
  const [page, setPage] = useState(0)
  const printCurrency = (currency, amount, transactionCheckUrl) => {
    switch (currency) {
      case 'USDT':
        return (
          <Fragment>
            <ColorfulChip label={`${amount} USDT`} color={'#37b8b5'} />
            <Button href={transactionCheckUrl} color="secondary">
              交易詳細資料
            </Button>
          </Fragment>
        )
      case 'TWD':
        return <ColorfulChip label={`${amount} TWD`} color={'#82b4e5'} />
      default:
        return null
    }
  }

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page)
    },
    [setPage]
  )

  if (projectOrderList.length > 0) {
    return (
      <div className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={projectOrderList.length} rows={rows} />
          <TableBody>
            {projectOrderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction, index) => (
              <TableRow hover tabIndex={-1} key={index}>
                <TableCell component="th" scope="row" className={classes.firstData}>
                  {transaction.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {transaction.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {printCurrency(transaction.currency, transaction.amount, transaction.transactionCheckUrl)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {thousands_separators(transaction.totalAmount)} 元
                </TableCell>
                <TableCell component="th" scope="row">
                  {transaction.irr.toFixed(2)}%
                </TableCell>
                <TableCell component="th" scope="row">
                  {transaction.endDate ? transaction.endDate.slice(0, 10) : ''}
                </TableCell>
                <TableCell component="th" scope="row">
                  {transaction.updatedAt ? moment(transaction.updatedAt).format('YYYY-MM-DD hh:mm:ss') : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={projectOrderList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          classes={{
            select: classes.dNone,
            selectIcon: classes.dNone,
            actions: projectOrderList.length > 0 ? classes.dBlock : classes.dNone,
            caption: projectOrderList.length > 0 ? classes.dBlock : classes.dNone,
          }}
          labelRowsPerPage=""
        />
      </div>
    )
  }
  return (
    <div className={classes.contentWrapper}>
      <HighlightedInformation>No transactions received yet.</HighlightedInformation>
    </div>
  )
}

ProjectOrderListTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  projectOrderList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default withStyles(styles, { withTheme: true })(ProjectOrderListTable)
