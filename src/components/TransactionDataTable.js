import React, {useEffect, useState} from "react";
import { ScrollView } from "react-native";
import { DataTable } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

const TransactionDataTable = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [transactions, setTransactions] = useState([]);


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

    let transaction2 = {}
    transaction2.name = "Payday"
    transaction2.cost = 100.12
    transaction2.date = ""
    transaction2.expenditure = false
    tempTransactions.push(transaction2);

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
      transactions.map((transaction, index) => {
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
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label={"1-2 of 6"}
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