import {providers} from '../constants/providers';
import {CAPITEC, FNB, NEDBANK, TYMEBANK} from '../interface/provder';
import {ISMS} from '../interface/sms';

type Provider = CAPITEC | TYMEBANK | FNB | NEDBANK;

export const smsParser = (sms: ISMS[], key: Provider) => {
  let smsData: ISMS[] = [];
  switch (key) {
    case 'TYMEBANK':
      smsData = sms.filter((item) => item.address === providers['TYMEBANK']);
    default:
      break;
  }
  return smsData;
};
