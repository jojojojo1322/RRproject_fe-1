import React, {Component, useState} from 'react';
import {server} from '@context/server';
import axios from 'axios';
import {getGlobalCountry} from '@repository/utilRepository';

API = async () => {
  await getGlobalCountry()
    .then(async (response) => {
      // console.log('countryListList', response);
      // setCountry(response.data);
      return await response;
    })
    .catch(({e}) => {
      console.log('error', e);
    });
};

export const CountryListApi = async () => {
  await getGlobalCountry()
    .then(async (response) => {
      console.log('2');
      // List = response;
      return await response;
    })
    .catch(({e}) => {
      console.log('error', e);
    });
  return 'FAILED';
};

export let CL = [];

export class CLA extends Component {
  state = {
    DATA: [],
  };
  componentDidMount() {
    this.API();
  }
  val = () => {
    return this.state.DATA;
  };
  static API = async () => {
    await getGlobalCountry()
      .then((response) => {
        console.log('2');
        this.setState({
          DATA: response.data,
        });
        CL = response.data;
        return response.data;
        // List = response;
      })
      .catch(({e}) => {
        console.log('error', e);
      });
  };
  render() {
    return this.state.DATA;
  }
}

// export default CountryListApi;
export let DefineCountryList = [
  {
    id: 'AD',
    title: 'ANDORRA',
    cd: '+376',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AE',
    title: 'UNITED ARAB EMIRATES',
    cd: '+971',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AF',
    title: 'AFGHANISTAN',
    cd: '+93',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AG',
    title: 'ANTIGUA AND BARBUDA',
    cd: '+1268',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AI',
    title: 'ANGUILLA',
    cd: '+1264',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AL',
    title: 'ALBANIA',
    cd: '+355',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AM',
    title: 'ARMENIA',
    cd: '+374',
    img: require('@images/flag_afghanistan.png'),
  },

  {
    id: 'AN',
    title: 'NETHERLANDS ANTILLES',
    cd: '+599',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AO',
    title: 'ANGOLA',
    cd: '+244',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AQ',
    title: 'ANTARCTICA',
    cd: '+672',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AR',
    title: 'ARGENTINA',
    cd: '+54',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AS',
    title: 'AMERICAN SAMOA',
    cd: '+1684',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AT',
    title: 'AUSTRIA',
    cd: '+43',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AU',
    title: 'AUSTRALIA',
    cd: '+61',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AW',
    title: 'ARUBA',
    cd: '+297',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'AZ',
    title: 'AZERBAIJAN',
    cd: '+994',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BA',
    title: 'BOSNIA AND HERZEGOVINA',
    cd: '+387',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BB',
    title: 'BARBADOS',
    cd: '+1246',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BD',
    title: 'BANGLADESH',
    cd: '+880',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BE',
    title: 'BELGIUM',
    cd: '+32',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BF',
    title: 'BURKINA FASO',
    cd: '+226',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BG',
    title: 'BULGARIA',
    cd: '+359',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BH',
    title: 'BAHRAIN',
    cd: '+973',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BI',
    title: 'BURUNDI',
    cd: '+257',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BJ',
    title: 'BENIN',
    cd: '+229',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BL',
    title: 'SAINT BARTHELEMY',
    cd: '+590',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BM',
    title: 'BERMUDA',
    cd: '+1441',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BN',
    title: 'BRUNEI DARUSSALAM',
    cd: '+673',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BO',
    title: 'BOLIVIA',
    cd: '+591',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BR',
    title: 'BRAZIL',
    cd: '+55',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BS',
    title: 'BAHAMAS',
    cd: '+1242',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BT',
    title: 'BHUTAN',
    cd: '+975',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BW',
    title: 'BOTSWANA',
    cd: '+267',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BY',
    title: 'BELARUS',
    cd: '+375',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'BZ',
    title: 'BELIZE',
    cd: '+501',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CA',
    title: 'CANADA',
    cd: '+1',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CC',
    title: 'COCOS (KEELING) ISLANDS',
    cd: '+61',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CD',
    title: 'CONGO, THE DEMOCRATIC REPUBLIC OF THE',
    cd: '+243',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CF',
    title: 'CENTRAL AFRICAN REPUBLIC',
    cd: '+236',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CG',
    title: 'CONGO',
    cd: '+242',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CH',
    title: 'SWITZERLAND',
    cd: '+41',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CI',
    title: 'COTE D IVOIRE',
    cd: '+225',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CK',
    title: 'COOK ISLANDS',
    cd: '+682',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CL',
    title: 'CHILE',
    cd: '+56',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CM',
    title: 'CAMEROON',
    cd: '+237',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CN',
    title: 'CHINA',
    cd: '+86',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CO',
    title: 'COLOMBIA',
    cd: '+57',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CR',
    title: 'COSTA RICA',
    cd: '+506',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CU',
    title: 'CUBA',
    cd: '+53',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CV',
    title: 'CAPE VERDE',
    cd: '+238',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CX',
    title: 'CHRISTMAS ISLAND',
    cd: '+61',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CY',
    title: 'CYPRUS',
    cd: '+357',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'CZ',
    title: 'CZECH REPUBLIC',
    cd: '+420',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'DE',
    title: 'GERMANY',
    cd: '+49',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'DJ',
    title: 'DJIBOUTI',
    cd: '+253',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'DK',
    title: 'DENMARK',
    cd: '+45',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'DM',
    title: 'DOMINICA',
    cd: '+1767',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'DO',
    title: 'DOMINICAN REPUBLIC',
    cd: '+1809',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'DZ',
    title: 'ALGERIA',
    cd: '+213',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'EC',
    title: 'ECUADOR',
    cd: '+593',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'EE',
    title: 'ESTONIA',
    cd: '+372',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'EG',
    title: 'EGYPT',
    cd: '+20',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'ER',
    title: 'ERITREA',
    cd: '+291',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'ES',
    title: 'SPAIN',
    cd: '+34',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'ET',
    title: 'ETHIOPIA',
    cd: '+251',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'FI',
    title: 'FINLAND',
    cd: '+358',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'FJ',
    title: 'FIJI',
    cd: '+679',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'FK',
    title: 'FALKLAND ISLANDS (MALVINAS)',
    cd: '+500',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'FM',
    title: 'MICRONESIA, FEDERATED STATES OF',
    cd: '+691',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'FO',
    title: 'FAROE ISLANDS',
    cd: '+298',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'FR',
    title: 'FRANCE',
    cd: '+33',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GA',
    title: 'GABON',
    cd: '+241',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GB',
    title: 'UNITED KINGDOM',
    cd: '+44',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GD',
    title: 'GRENADA',
    cd: '+1473',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GE',
    title: 'GEORGIA',
    cd: '+995',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GH',
    title: 'GHANA',
    cd: '+233',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GI',
    title: 'GIBRALTAR',
    cd: '+350',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GL',
    title: 'GREENLAND',
    cd: '+299',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GM',
    title: 'GAMBIA',
    cd: '+220',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GN',
    title: 'GUINEA',
    cd: '+224',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GQ',
    title: 'EQUATORIAL GUINEA',
    cd: '+240',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GR',
    title: 'GREECE',
    cd: '+30',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GT',
    title: 'GUATEMALA',
    cd: '+502',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GU',
    title: 'GUAM',
    cd: '+1671',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GW',
    title: 'GUINEA-BISSAU',
    cd: '+245',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'GY',
    title: 'GUYANA',
    cd: '+592',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'HK',
    title: 'HONG KONG',
    cd: '+852',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'HN',
    title: 'HONDURAS',
    cd: '+504',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'HR',
    title: 'CROATIA',
    cd: '+385',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'HT',
    title: 'HAITI',
    cd: '+509',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'HU',
    title: 'HUNGARY',
    cd: '+36',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'ID',
    title: 'INDONESIA',
    cd: '+62',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'IE',
    title: 'IRELAND',
    cd: '+353',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'IL',
    title: 'ISRAEL',
    cd: '+972',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'IM',
    title: 'ISLE OF MAN',
    cd: '+44',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'IN',
    title: 'INDIA',
    cd: '+91',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'IQ',
    title: 'IRAQ',
    cd: '+964',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'IR',
    title: 'IRAN, ISLAMIC REPUBLIC OF',
    cd: '+98',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'IS',
    title: 'ICELAND',
    cd: '+354',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'IT',
    title: 'ITALY',
    cd: '+39',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'JM',
    title: 'JAMAICA',
    cd: '+1876',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'JO',
    title: 'JORDAN',
    cd: '+962',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'JP',
    title: 'JAPAN',
    cd: '+81',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'KE',
    title: 'KENYA',
    cd: '+254',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'KG',
    title: 'KYRGYZSTAN',
    cd: '+996',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'KH',
    title: 'CAMBODIA',
    cd: '+855',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'KI',
    title: 'KIRIBATI',
    cd: '+686',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'KM',
    title: 'COMOROS',
    cd: '+269',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'KN',
    title: 'SAINT KITTS AND NEVIS',
    cd: '+1869',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'KP',
    title: 'KOREA DEMOCRATIC PEOPLES REPUBLIC OF',
    cd: '+850',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'KR',
    title: 'KOREA REPUBLIC OF',
    cd: '+82',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'KW',
    title: 'KUWAIT',
    cd: '+965',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'KY',
    title: 'CAYMAN ISLANDS',
    cd: '+1345',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'KZ',
    title: 'KAZAKSTAN',
    cd: '+7',
    img: require('@images/flag_afghanistan.png'),
  },

  {
    id: 'LA',
    title: 'LAO PEOPLES DEMOCRATIC REPUBLIC',
    cd: '+856',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'LB',
    title: 'LEBANON',
    cd: '+961',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'LC',
    title: 'SAINT LUCIA',
    cd: '+1758',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'LI',
    title: 'LIECHTENSTEIN',
    cd: '+423',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'LK',
    title: 'SRI LANKA',
    cd: '+94',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'LR',
    title: 'LIBERIA',
    cd: '+231',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'LS',
    title: 'LESOTHO',
    cd: '+266',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'LT',
    title: 'LITHUANIA',
    cd: '+370',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'LU',
    title: 'LUXEMBOURG',
    cd: '+352',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'LV',
    title: 'LATVIA',
    cd: '+371',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'LY',
    title: 'LIBYAN ARAB JAMAHIRIYA',
    cd: '+218',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MA',
    title: 'MOROCCO',
    cd: '+212',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MC',
    title: 'MONACO',
    cd: '+377',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MD',
    title: 'MOLDOVA, REPUBLIC OF',
    cd: '+373',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'ME',
    title: 'MONTENEGRO',
    cd: '+382',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MF',
    title: 'SAINT MARTIN',
    cd: '+1599',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MG',
    title: 'MADAGASCAR',
    cd: '+261',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MH',
    title: 'MARSHALL ISLANDS',
    cd: '+692',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MK',
    title: 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF',
    cd: '+389',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'ML',
    title: 'MALI',
    cd: '+223',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MM',
    title: 'MYANMAR',
    cd: '+95',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MN',
    title: 'MONGOLIA',
    cd: '+976',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MO',
    title: 'MACAU',
    cd: '+853',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MP',
    title: 'NORTHERN MARIANA ISLANDS',
    cd: '+1670',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MR',
    title: 'MAURITANIA',
    cd: '+222',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MS',
    title: 'MONTSERRAT',
    cd: '+1664',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MT',
    title: 'MALTA',
    cd: '+356',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MU',
    title: 'MAURITIUS',
    cd: '+230',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MV',
    title: 'MALDIVES',
    cd: '+960',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MW',
    title: 'MALAWI',
    cd: '+265',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MX',
    title: 'MEXICO',
    cd: '+52',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MY',
    title: 'MALAYSIA',
    cd: '+60',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'MZ',
    title: 'MOZAMBIQUE',
    cd: '+258',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'NA',
    title: 'NAMIBIA',
    cd: '+264',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'NC',
    title: 'NEW CALEDONIA',
    cd: '+687',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'NE',
    title: 'NIGER',
    cd: '+227',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'NG',
    title: 'NIGERIA',
    cd: '+234',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'NI',
    title: 'NICARAGUA',
    cd: '+505',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'NL',
    title: 'NETHERLANDS',
    cd: '+31',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'NO',
    title: 'NORWAY',
    cd: '+47',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'NP',
    title: 'NEPAL',
    cd: '+977',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'NR',
    title: 'NAURU',
    cd: '+674',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'NU',
    title: 'NIUE',
    cd: '+683',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'NZ',
    title: 'NEW ZEALAND',
    cd: '+64',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'OM',
    title: 'OMAN',
    cd: '+968',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'PA',
    title: 'PANAMA',
    cd: '+507',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'PE',
    title: 'PERU',
    cd: '+51',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'PF',
    title: 'FRENCH POLYNESIA',
    cd: '+689',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'PG',
    title: 'PAPUA NEW GUINEA',
    cd: '+675',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'PH',
    title: 'PHILIPPINES',
    cd: '+63',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'PK',
    title: 'PAKISTAN',
    cd: '+92',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'PL',
    title: 'POLAND',
    cd: '+48',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'PM',
    title: 'SAINT PIERRE AND MIQUELON',
    cd: '+508',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'PN',
    title: 'PITCAIRN',
    cd: '+870',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'PR',
    title: 'PUERTO RICO',
    cd: '+1',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'PT',
    title: 'PORTUGAL',
    cd: '+351',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'PW',
    title: 'PALAU',
    cd: '+680',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'PY',
    title: 'PARAGUAY',
    cd: '+595',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'QA',
    title: 'QATAR',
    cd: '+974',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'RO',
    title: 'ROMANIA',
    cd: '+40',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'RS',
    title: 'SERBIA',
    cd: '+381',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'RU',
    title: 'RUSSIAN FEDERATION',
    cd: '+7',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'RW',
    title: 'RWANDA',
    cd: '+250',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SA',
    title: 'SAUDI ARABIA',
    cd: '+966',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SB',
    title: 'SOLOMON ISLANDS',
    cd: '+677',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SC',
    title: 'SEYCHELLES',
    cd: '+248',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SD',
    title: 'SUDAN',
    cd: '+249',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SE',
    title: 'SWEDEN',
    cd: '+46',
    img: require('@images/flag_afghanistan.png'),
  },

  {
    id: 'SG',
    title: 'SINGAPORE',
    cd: '+65',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SH',
    title: 'SAINT HELENA',
    cd: '+290',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SI',
    title: 'SLOVENIA',
    cd: '+386',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SK',
    title: 'SLOVAKIA',
    cd: '+421',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SL',
    title: 'SIERRA LEONE',
    cd: '+232',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SM',
    title: 'SAN MARINO',
    cd: '+378',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SN',
    title: 'SENEGAL',
    cd: '+221',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SO',
    title: 'SOMALIA',
    cd: '+252',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SR',
    title: 'SURINAME',
    cd: '+597',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'ST',
    title: 'SAO TOME AND PRINCIPE',
    cd: '+239',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SV',
    title: 'EL SALVADOR',
    cd: '+503',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SY',
    title: 'SYRIAN ARAB REPUBLIC',
    cd: '+963',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'SZ',
    title: 'SWAZILAND',
    cd: '+268',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TC',
    title: 'TURKS AND CAICOS ISLANDS',
    cd: '+1649',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TD',
    title: 'CHAD',
    cd: '+235',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TG',
    title: 'TOGO',
    cd: '+228',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TH',
    title: 'THAILAND',
    cd: '+66',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TJ',
    title: 'TAJIKISTAN',
    cd: '+992',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TK',
    title: 'TOKELAU',
    cd: '+690',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TL',
    title: 'TIMOR-LESTE',
    cd: '+670',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TM',
    title: 'TURKMENISTAN',
    cd: '+993',
    img: require('@images/flag_afghanistan.png'),
  },

  {
    id: 'TN',
    title: 'TUNISIA',
    cd: '+216',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TO',
    title: 'TONGA',
    cd: '+676',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TR',
    title: 'TURKEY',
    cd: '+90',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TT',
    title: 'TRINIDAD AND TOBAGO',
    cd: '+1868',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TV',
    title: 'TUVALU',
    cd: '+688',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TW',
    title: 'TAIWAN, PROVINCE OF CHINA',
    cd: '+886',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'TZ',
    title: 'TANZANIA, UNITED REPUBLIC OF',
    cd: '+255',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'UA',
    title: 'UKRAINE',
    cd: '+380',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'UG',
    title: 'UGANDA',
    cd: '+256',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'US',
    title: 'UNITED STATES',
    cd: '+1',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'UY',
    title: 'URUGUAY',
    cd: '+598',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'UZ',
    title: 'UZBEKISTAN',
    cd: '+998',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'VA',
    title: 'HOLY SEE (VATICAN CITY STATE)',
    cd: '+39',
    img: require('@images/flag_afghanistan.png'),
  },

  {
    id: 'VC',
    title: 'SAINT VINCENT AND THE GRENADINES',
    cd: '+1784',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'VE',
    title: 'VENEZUELA',
    cd: '+58',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'VG',
    title: 'VIRGIN ISLANDS, BRITISH',
    cd: '+1284',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'VI',
    title: 'VIRGIN ISLANDS, U.S.',
    cd: '+1340',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'VN',
    title: 'VIET NAM',
    cd: '+84',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'VU',
    title: 'VANUATU',
    cd: '+678',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'WF',
    title: 'WALLIS AND FUTUNA',
    cd: '+681',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'WS',
    title: 'SAMOA',
    cd: '+685',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'XK',
    title: 'KOSOVO',
    cd: '+381',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'YE',
    title: 'YEMEN',
    cd: '+967',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'YT',
    title: 'MAYOTTE',
    cd: '+262',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'ZA',
    title: 'SOUTH AFRICA',
    cd: '+27',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'ZM',
    title: 'ZAMBIA',
    cd: '+260',
    img: require('@images/flag_afghanistan.png'),
  },
  {
    id: 'ZW',
    title: 'ZIMBABWE',
    cd: '+263',
    img: require('@images/flag_afghanistan.png'),
  },
];
