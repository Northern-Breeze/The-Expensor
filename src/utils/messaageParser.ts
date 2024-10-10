import {ParsedSMS} from '../interface/parsed-sms';
import {CAPITEC, TYMEBANK, FNB, NEDBANK} from '../interface/provder';
import {ISMS} from '../interface/sms';

type ParserType = CAPITEC | TYMEBANK | FNB | NEDBANK;

export default function messageParser(
  type: ParserType,
  sms: ISMS[],
): ParsedSMS[] {
  switch (type) {
    case 'CAPITEC':
      // capitec parser
      return typeCapitectParser(sms);
    case 'TYMEBANK':
      // tymebank parser
      return typeBankParser(sms);
    default:
      return [];
  }
}

function typeBankParser(sms: ISMS[]): ParsedSMS[] {
  return [];
}

function typeCapitectParser(sms: ISMS[]): ParsedSMS[] {
  const formattedMessages: ISMS[] = []; // we need to keep track of the proper formatted SMS

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
      const price = fromSplitter[0].split(' ')[2];
      const category = fromSplitter[0].split(' ')[1];
      const reference = second.replace('Ref', ''); // replace the keyword Ref with ''
      const regex = /[-]/g;
    }
  });
  return [];
}
