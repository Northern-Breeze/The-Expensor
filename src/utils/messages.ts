import {backUpMessage} from './saveMessage';

interface ICapitec {
  date: string;
  read: boolean;
  body: string;
  _id: string;
  address: string;
}

interface ISMS {
  sms: ICapitec[]
}


interface IFilteredSMS {
  date: string;
  _id: string;
  amount: number;
  title: string;
  category: string;
  isRead: boolean;
  yaxis: string;
  deduct: boolean;
}

export const smsParser = (props: ISMS) => {
  const { sms } = props;
  const capitec: ICapitec[] = sms.filter((item) => item.address === '+2782004809006');
  const formattedMessages: IFilteredSMS[] = []; // we need to keep track of the proper formatted SMS
  capitec.forEach((item) => {
    const date = item.date;
    const id = item._id;
    const isRead = item.read;
    const splitMessages = item.body.split(';');
    const [first, second] = splitMessages;
    const fromSplitter = first.split('from'); // first string format Capitec: Payment RXXX from SAVINGS ACCOUNT
    const priceRegex = /^\d*(\.\d+)?$/g;
    if (
      fromSplitter.length === 2 &&
      fromSplitter[1].trim().toUpperCase() === 'SAVINGS ACCOUNT' &&
      fromSplitter[0].split(' ')[2].slice(2).match(priceRegex)
    ) {
      // check if it split on 'from' keyword and that the cost came from saving account
      const price = fromSplitter[0].split(' ')[2];
      const category = fromSplitter[0].split(' ')[1];
      const reference = second.replace('Ref', ''); // replace the keyword Ref with ''
      const regex = /[-]/g;
      formattedMessages.push({
        date: date,
        isRead: isRead,
        _id: id,
        amount: Number(price.slice(2)),
        yaxis: price.slice(2),
        title: reference.trim(),
        category: category,
        deduct: price.match(regex) ? true : false, // I don't know dangerous this is,
      });
    }
  });
  backUpMessage(formattedMessages);
  return formattedMessages;
};
