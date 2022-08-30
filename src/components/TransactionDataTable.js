import React, {useEffect, useState} from "react";
import { ScrollView } from "react-native";
import { DataTable } from 'react-native-paper';

const optionsPerPage = [6, 4, 2];

const TransactionDataTable = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [transactions, setTransactions] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, transactions.length);

  useEffect(() => {
    // This is where it will query the firebase database to grab all current transactions. For now, it will just set it up manually
    // Transactions are transaction name (string), cost (float), date (datetime), expenditure (bool)

    let transaction = {}
    let tempTransactions = []
    transaction.name = "Potato yeet yeet yett"
    transaction.cost = 3.21
    transaction.date = ""
    transaction.expenditure = true
    tempTransactions.push(transaction);

    let transaction1 = {}
    transaction1.name = "Grape"
    transaction1.cost = 6.29
    transaction1.date = ""
    transaction1.expenditure = true
    tempTransactions.push(transaction1);

    var transaction2 = {}
    transaction2.name = "Payday"
    transaction2.cost = 100.12
    transaction2.date = ""
    transaction2.expenditure = false
    tempTransactions.push(transaction2);

    transaction2 = {}
    transaction2.name = "Payday"
    transaction2.cost = 100.12
    transaction2.date = ""
    transaction2.expenditure = false
    tempTransactions.push(transaction2);

    transaction2 = {}
    transaction2.name = "Payday"
    transaction2.cost = 100.12
    transaction2.date = ""
    transaction2.expenditure = false
    tempTransactions.push(transaction2);

    transaction2 = {}
    transaction2.name = "Payday"
    transaction2.cost = 100.12
    transaction2.date = ""
    transaction2.expenditure = false
    tempTransactions.push(transaction2);

    transaction2 = {}
    transaction2.name = "Payday"
    transaction2.cost = 100.12
    transaction2.date = ""
    transaction2.expenditure = false
    tempTransactions.push(transaction2);

    // transaction2 = {}
    // transaction2.name = "Payday"
    // transaction2.cost = 100.12
    // transaction2.date = ""
    // transaction2.expenditure = false
    // tempTransactions.push(transaction2);

    // transaction2 = {}
    // transaction2.name = "Payday"
    // transaction2.cost = 100.12
    // transaction2.date = ""
    // transaction2.expenditure = false
    // tempTransactions.push(transaction2);

    setNumberOfPages(Math.round(tempTransactions.length / itemsPerPage))

    setTransactions(tempTransactions);
  }, []);



  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable >
      <DataTable.Header>
        <DataTable.Title textStyle={{fontSize: 18}} style={{flex: 2}}>Transaction</DataTable.Title>
        <DataTable.Title textStyle={{fontSize: 18}} style={{flex: 1}}>Cost</DataTable.Title>
        <DataTable.Title sortDirection="descending" textStyle={{fontSize: 18}} style={{flex: 1}}>Date</DataTable.Title>
      </DataTable.Header>

      {

      transactions.slice(
        page * itemsPerPage,
        page * itemsPerPage + itemsPerPage
      )
      .map((transaction, index) => {
            return (
              <DataTable.Row key={index} style={[!transaction.expenditure ? {backgroundColor: '#85bb65'} : {backgroundColor: '#bb4b4b'}, {marginBottom: 2, flexDirection:'row'}]}>
                <DataTable.Cell textStyle={{fontSize: 18}} style={{paddingRight: 2, flex: 2}}>{transaction.name}</DataTable.Cell>
                <DataTable.Cell textStyle={{fontSize: 18}} style={{flex: 1}}>{transaction.cost}</DataTable.Cell>
                <DataTable.Cell textStyle={{fontSize: 18}} style={{flex: 1}}>{transaction.date}</DataTable.Cell>
              </DataTable.Row>
            );
          })
        }

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(transactions.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${transactions.length}`}
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
        style={{alignSelf: 'flex-start'}}
      />
    </DataTable>
  );
}

export default TransactionDataTable;