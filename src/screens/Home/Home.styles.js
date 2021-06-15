import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  plot: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  headerTitleText: {
    color: '#640fdb',
    fontSize: 20,
  },
  toggleControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  textContainerD: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 20,
    marginHorizontal: 3,
    borderRadius: 20,
    backgroundColor: '#6e6d6b',
  },
  textContainerW: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 20,
    marginHorizontal: 3,
    borderRadius: 20,
    backgroundColor: '#d1d0cd',
    borderColor: '#6e6d6b',
    borderWidth: 1,
  },
  textContainerM: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 20,
    marginHorizontal: 3,
    borderRadius: 20,
    backgroundColor: '#d1d0cd',
    borderColor: '#6e6d6b',
    borderWidth: 1,
  },
  controlTextD: {
    color: '#fff',
  },
  controlTextW: {
    color: '#fff',
  },
  controlTextM: {
    color: '#fff',
  },
  transactions: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionTextContainer: {
    marginLeft: 5,
  },
  transactionText: {
    color: '#640fdb',
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderByTextContainer: {
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlAction: {
    marginRight: 8,
  },
  orderByText: {
    color: '#640fdb',
    fontSize: 13,
  },
  listContainer: {
    flex: 1,
    marginVertical: 10,
  },
  iconContainer: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: '#fc8c03',
    borderRadius: 20,
    height: 85,
    width: 90,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    right: -5,
  },
  cardInfoContainer: {
    flexDirection: 'column',
    padding: 10,
    marginRight: 10,
  },
  referenceContainer: {
    paddingVertical: 2,
  },
  reference: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  cartigoryContainer: {
    flexDirection: 'row',
    paddingVertical: 2,
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  amount: {
    fontSize: 17,
    color: '#000',
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default styles;
