import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(4,170,164,1)',
    borderRadius: 20,
    marginHorizontal: 10,
    width: width - 20,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginVertical: 10,
  },
  iconContainer: {
    paddingVertical: 30,
    paddingHorizontal: 30,
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
    fontSize: 16,
    color: '#fff',
  },
  categoryContainer: {
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
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  green: {color: '#0000FF'},
  red: {color: '#FF0000'},
});

export default styles;
