const getCountryImageName = lan => {
  let country_image = null;

  try {
    switch (lan) {
      // 0 - 4
      case 'AF':
        country_image = require('@images/flag/Afghanistan.png');
        break;
      case 'AX':
        country_image = require('@images/flag/Aland_Islands.png');
        break;
      case 'AL':
        country_image = require('@images/flag/Albania.png');
        break;
      case 'DZ':
        country_image = require('@images/flag/Algeria.png');
        break;
      case 'AS':
        country_image = require('@images/flag/American_Samoa.png');
        break;

      // 5 - 9
      case 'AD':
        country_image = require('@images/flag/Andorra.png');
        break;
      case 'AO':
        country_image = require('@images/flag/Angola.png');
        break;
      case 'AI':
        country_image = require('@images/flag/Anguilla.png');
        break;
      case 'AQ':
        country_image = require('@images/flag/Antarctica.png');
        break;
      case 'AG':
        country_image = require('@images/flag/Antigua_and_Barbuda.png');
        break;

      // 10 - 14
      case 'AR':
        country_image = require('@images/flag/Argentina.png');
        break;
      case 'AM':
        country_image = require('@images/flag/Armenia.png');
        break;
      case 'AW':
        country_image = require('@images/flag/Aruba.png');
        break;
      case 'AU':
        country_image = require('@images/flag/Australia.png');
        break;
      case 'AT':
        country_image = require('@images/flag/Austria.png');
        break;

      // 15 - 19
      case 'AZ':
        country_image = require('@images/flag/Azerbaijan.png');
        break;
      case 'BS':
        country_image = require('@images/flag/Bahamas.png');
        break;
      case 'BH':
        country_image = require('@images/flag/Bahrain.png');
        break;
      case 'BD':
        country_image = require('@images/flag/Bangladesh.png');
        break;
      case 'BB':
        country_image = require('@images/flag/Barbados.png');
        break;

      // 20 - 24
      case 'BY':
        country_image = require('@images/flag/Belarus.png');
        break;
      case 'BE':
        country_image = require('@images/flag/Belgium.png');
        break;
      case 'BZ':
        country_image = require('@images/flag/Belize.png');
        break;
      case 'BJ':
        country_image = require('@images/flag/Benin.png');
        break;
      case 'BM':
        country_image = require('@images/flag/Bermuda.png');
        break;

      // 25 - 29
      case 'BT':
        country_image = require('@images/flag/Bhutan.png');
        break;
      case 'BO':
        country_image = require('@images/flag/Bolivia.png');
        break;
      case 'BA':
        country_image = require('@images/flag/Bosnia_and_Herzegovina.png');
        break;
      case 'BW':
        country_image = require('@images/flag/Botswana.png');
        break;
      case 'BV':
        country_image = require('@images/flag/Bouvet_Island.png');
        break;

      // 30 - 34
      case 'BR':
        country_image = require('@images/flag/Brazil.png');
        break;
      case 'IO':
        country_image = require('@images/flag/British_Indian_Ocean.png');
        break;
      case 'VG':
        country_image = require('@images/flag/British_Virgin_Islan.png');
        break;
      case 'BN':
        country_image = require('@images/flag/Brunei.png');
        break;
      case 'BG':
        country_image = require('@images/flag/Bulgaria.png');
        break;

      // 30 - 34
      case 'BR':
        country_image = require('@images/flag/Brazil.png');
        break;
      case 'IO':
        country_image = require('@images/flag/Bolivia.png');
        break;
      case 'VG':
        country_image = require('@images/flag/Bosnia_and_Herzegovina.png');
        break;
      case 'BN':
        country_image = require('@images/flag/Brunei.png');
        break;
      case 'BG':
        country_image = require('@images/flag/Bulgaria.png');
        break;

      // 35 - 39
      case 'BF':
        country_image = require('@images/flag/Burkina_Faso.png');
        break;
      case 'BI':
        country_image = require('@images/flag/Burundi.png');
        break;
      case 'KH':
        country_image = require('@images/flag/Cambodia.png');
        break;
      case 'CM':
        country_image = require('@images/flag/Cameroon.png');
        break;
      case 'CA':
        country_image = require('@images/flag/Canada.png');
        break;

      // 40 - 44
      case 'CV':
        country_image = require('@images/flag/Cape_Verde.png');
        break;
      case 'BQ':
        country_image = require('@images/flag/Caribbean_Netherland.png');
        break;
      case 'KY':
        country_image = require('@images/flag/Cayman_Islands.png');
        break;
      case 'CF':
        country_image = require('@images/flag/Central_African_Republic.png');
        break;
      case 'TD':
        country_image = require('@images/flag/Chad.png');
        break;

      // 45 - 49
      case 'CL':
        country_image = require('@images/flag/Chile.png');
        break;
      case 'CN':
        country_image = require('@images/flag/China.png');
        break;
      case 'CX':
        country_image = require('@images/flag/Christmas_Island.png');
        break;
      case 'CC':
        country_image = require('@images/flag/Cocos_Keeling_Island.png');
        break;
      case 'CO':
        country_image = require('@images/flag/Colombia.png');
        break;

      // 50 - 54
      case 'KM':
        country_image = require('@images/flag/Comoros.png');
        break;
      case 'CG':
        country_image = require('@images/flag/Congo.png');
        break;
      case 'CD':
        country_image = require('@images/flag/Congo.png');
        break;
      case 'CK':
        country_image = require('@images/flag/Cook_Islands.png');
        break;
      case 'CR':
        country_image = require('@images/flag/Costa_Rica.png');
        break;

      // 55 - 59
      case 'CI':
        country_image = require('@images/flag/Cote_d_Ivoire.png');
        break;
      case 'HR':
        country_image = require('@images/flag/Croatia.png');
        break;
      case 'CU':
        country_image = require('@images/flag/Cuba.png');
        break;
      case 'CW':
        country_image = require('@images/flag/Curacao.png');
        break;
      case 'CY':
        country_image = require('@images/flag/Cyprus.png');
        break;

      // 60 - 64
      case 'CZ':
        country_image = require('@images/flag/Czech_Republic.png');
        break;
      case 'DK':
        country_image = require('@images/flag/Denmark.png');
        break;
      case 'DJ':
        country_image = require('@images/flag/Djibouti.png');
        break;
      case 'DM':
        country_image = require('@images/flag/Dominica.png');
        break;
      case 'DO':
        country_image = require('@images/flag/Dominican_Republic.png');
        break;

      // 65 - 69
      case 'EC':
        country_image = require('@images/flag/Ecuador.png');
        break;
      case 'EG':
        country_image = require('@images/flag/Egypt.png');
        break;
      case 'SV':
        country_image = require('@images/flag/El_Salvador.png');
        break;
      case 'GQ':
        country_image = require('@images/flag/Equatorial_Guinea.png');
        break;
      case 'ER':
        country_image = require('@images/flag/Eritrea.png');
        break;

      // 70 - 74
      case 'EE':
        country_image = require('@images/flag/Estonia.png');
        break;
      case 'ET':
        country_image = require('@images/flag/Ethiopia.png');
        break;
      case 'FK':
        country_image = require('@images/flag/Falkland_Islands.png');
        break;
      case 'FO':
        country_image = require('@images/flag/Faroe_Islands.png');
        break;
      case 'FJ':
        country_image = require('@images/flag/Fiji.png');
        break;

      // 75 - 79
      case 'FI':
        country_image = require('@images/flag/Finland.png');
        break;
      case 'FR':
        country_image = require('@images/flag/France.png');
        break;
      case 'GF':
        country_image = require('@images/flag/French_Guiana.png');
        break;
      case 'PF':
        country_image = require('@images/flag/French_Polynesia.png');
        break;
      case 'TF':
        country_image = require('@images/flag/french_southern_territories.png');
        break;

      // 80 - 84
      case 'GA':
        country_image = require('@images/flag/Gabon.png');
        break;
      case 'GM':
        country_image = require('@images/flag/Gambia.png');
        break;
      case 'GE':
        country_image = require('@images/flag/Georgia.png');
        break;
      case 'DE':
        country_image = require('@images/flag/Germany.png');
        break;
      case 'GH':
        country_image = require('@images/flag/Ghana.png');
        break;

      // 85 - 89
      case 'GI':
        country_image = require('@images/flag/Gibraltar.png');
        break;
      case 'GR':
        country_image = require('@images/flag/Greece.png');
        break;
      case 'GL':
        country_image = require('@images/flag/Greenland.png');
        break;
      case 'GD':
        country_image = require('@images/flag/Grenada.png');
        break;
      case 'GP':
        country_image = require('@images/flag/Guadeloupe.png');
        break;

      // 90 - 94
      case 'GU':
        country_image = require('@images/flag/Guam.png');
        break;
      case 'GT':
        country_image = require('@images/flag/Guatemala.png');
        break;
      case 'GG':
        country_image = require('@images/flag/Guernsey.png');
        break;
      case 'GN':
        country_image = require('@images/flag/Guinea.png');
        break;
      case 'GW':
        country_image = require('@images/flag/Guinea-Bissau.png');
        break;

      // 95 - 99
      case 'GY':
        country_image = require('@images/flag/Guyana.png');
        break;
      case 'HT':
        country_image = require('@images/flag/Haiti.png');
        break;
      case 'HM':
        country_image = require('@images/flag/Heard_McDonald_Island.png');
        break;
      case 'HN':
        country_image = require('@images/flag/Honduras.png');
        break;
      case 'HK':
        country_image = require('@images/flag/Hong_Kong.png');
        break;

      // 100 - 104
      case 'HU':
        country_image = require('@images/flag/Hungary.png');
        break;
      case 'IS':
        country_image = require('@images/flag/Iceland.png');
        break;
      case 'IN':
        country_image = require('@images/flag/India.png');
        break;
      case 'ID':
        country_image = require('@images/flag/Indonesia.png');
        break;
      case 'IR':
        country_image = require('@images/flag/Iran.png');
        break;

      // 105 - 109
      case 'IQ':
        country_image = require('@images/flag/Iraq.png');
        break;
      case 'IE':
        country_image = require('@images/flag/Ireland.png');
        break;
      case 'IM':
        country_image = require('@images/flag/Isle_of_Man.png');
        break;
      case 'IL':
        country_image = require('@images/flag/Israel.png');
        break;
      case 'IT':
        country_image = require('@images/flag/Italy.png');
        break;

      // 110 - 114
      case 'JM':
        country_image = require('@images/flag/Jamaica.png');
        break;
      case 'JP':
        country_image = require('@images/flag/Japan.png');
        break;
      case 'JE':
        country_image = require('@images/flag/Jersey.png');
        break;
      case 'JO':
        country_image = require('@images/flag/Jordan.png');
        break;
      case 'KZ':
        country_image = require('@images/flag/Kazakhstan.png');
        break;

      // 115 - 119
      case 'KE':
        country_image = require('@images/flag/Kenya.png');
        break;
      case 'KI':
        country_image = require('@images/flag/Kiribati.png');
        break;
      case 'KW':
        country_image = require('@images/flag/Kuwait.png');
        break;
      case 'KG':
        country_image = require('@images/flag/Kyrgyzstan.png');
        break;
      case 'LA':
        country_image = require('@images/flag/Laos.png');
        break;

      // 120 - 124
      case 'LV':
        country_image = require('@images/flag/Latvia.png');
        break;
      case 'LB':
        country_image = require('@images/flag/Lebanon.png');
        break;
      case 'LS':
        country_image = require('@images/flag/Lesotho.png');
        break;
      case 'LR':
        country_image = require('@images/flag/Liberia.png');
        break;
      case 'LY':
        country_image = require('@images/flag/Libya.png');
        break;

      // 125 - 129
      case 'LI':
        country_image = require('@images/flag/Liechtenstein.png');
        break;
      case 'LT':
        country_image = require('@images/flag/Lithuania.png');
        break;
      case 'LU':
        country_image = require('@images/flag/Luxembourg.png');
        break;
      case 'MO':
        country_image = require('@images/flag/Macau.png');
        break;
      case 'MK':
        country_image = require('@images/flag/Macedonia.png');
        break;

      // 130 - 134
      case 'MG':
        country_image = require('@images/flag/Madagascar.png');
        break;
      case 'MW':
        country_image = require('@images/flag/Malawi.png');
        break;
      case 'MY':
        country_image = require('@images/flag/Malaysia.png');
        break;
      case 'MV':
        country_image = require('@images/flag/Maldives.png');
        break;
      case 'ML':
        country_image = require('@images/flag/Mali.png');
        break;

      // 135 - 139
      case 'MT':
        country_image = require('@images/flag/Malta.png');
        break;
      case 'MH':
        country_image = require('@images/flag/Marshall_Islands.png');
        break;
      case 'MQ':
        country_image = require('@images/flag/Martinique.png');
        break;
      case 'MR':
        country_image = require('@images/flag/Mauritania.png');
        break;
      case 'MU':
        country_image = require('@images/flag/Mauritius.png');
        break;

      // 140 - 144
      case 'YT':
        country_image = require('@images/flag/Mayotte.png');
        break;
      case 'MX':
        country_image = require('@images/flag/Mexico.png');
        break;
      case 'FM':
        country_image = require('@images/flag/Micronesia.png');
        break;
      case 'MD':
        country_image = require('@images/flag/Moldova.png');
        break;
      case 'MC':
        country_image = require('@images/flag/Monaco.png');
        break;

      // 145 - 149
      case 'MN':
        country_image = require('@images/flag/Mongolia.png');
        break;
      case 'ME':
        country_image = require('@images/flag/Montenegro.png');
        break;
      case 'MS':
        country_image = require('@images/flag/Montserrat.png');
        break;
      case 'MA':
        country_image = require('@images/flag/Morocco.png');
        break;
      case 'MZ':
        country_image = require('@images/flag/Mozambique.png');
        break;

      // 150 - 154
      case 'MM':
        country_image = require('@images/flag/Myanmar.png');
        break;
      case 'NA':
        country_image = require('@images/flag/Namibia.png');
        break;
      case 'NR':
        country_image = require('@images/flag/Nauru.png');
        break;
      case 'NP':
        country_image = require('@images/flag/Nepal.png');
        break;
      case 'NL':
        country_image = require('@images/flag/Netherlands.png');
        break;

      // 155 - 159
      case 'NC':
        country_image = require('@images/flag/New_Caledonia.png');
        break;
      case 'NZ':
        country_image = require('@images/flag/New_Zealand.png');
        break;
      case 'NI':
        country_image = require('@images/flag/Nicaragua.png');
        break;
      case 'NE':
        country_image = require('@images/flag/Niger.png');
        break;
      case 'NG':
        country_image = require('@images/flag/Nigeria.png');
        break;

      // 160 - 164
      case 'NU':
        country_image = require('@images/flag/Niue.png');
        break;
      case 'NF':
        country_image = require('@images/flag/Norfolk_Island.png');
        break;
      case 'KP':
        country_image = require('@images/flag/North_Korea.png');
        break;
      case 'MP':
        country_image = require('@images/flag/Northern_Mariana_Island.png');
        break;
      case 'NO':
        country_image = require('@images/flag/Norway.png');
        break;

      // 165 - 169
      case 'OM':
        country_image = require('@images/flag/Oman.png');
        break;
      case 'PK':
        country_image = require('@images/flag/Pakistan.png');
        break;
      case 'PW':
        country_image = require('@images/flag/Palau.png');
        break;
      case 'PS':
        country_image = require('@images/flag/Palestine.png');
        break;
      case 'PA':
        country_image = require('@images/flag/Panama.png');
        break;

      // 170 - 174
      case 'PG':
        country_image = require('@images/flag/Papua_New_Guinea.png');
        break;
      case 'PY':
        country_image = require('@images/flag/Paraguay.png');
        break;
      case 'PE':
        country_image = require('@images/flag/Peru.png');
        break;
      case 'PH':
        country_image = require('@images/flag/Philippines.png');
        break;
      case 'PN':
        country_image = require('@images/flag/Pitcairn_Islands.png');
        break;

      // 175 - 179
      case 'PL':
        country_image = require('@images/flag/Poland.png');
        break;
      case 'PT':
        country_image = require('@images/flag/Portugal.png');
        break;
      case 'PR':
        country_image = require('@images/flag/Puerto_Rico.png');
        break;
      case 'QA':
        country_image = require('@images/flag/Qatar.png');
        break;
      case 'RE':
        country_image = require('@images/flag/Reunion.png');
        break;

      // 180 - 185
      case 'RO':
        country_image = require('@images/flag/Romania.png');
        break;
      case 'RU':
        country_image = require('@images/flag/Russia.png');
        break;
      case 'RW':
        country_image = require('@images/flag/Rwanda.png');
        break;
      case 'BL':
        country_image = require('@images/flag/Saint_Barthelemy.png');
        break;
      case 'WS':
        country_image = require('@images/flag/Samoa.png');
        break;

      // 186 - 189
      case 'SM':
        country_image = require('@images/flag/San_Marino.png');
        break;
      case 'ST':
        country_image = require('@images/flag/Sao_Tome_and_Principe.png');
        break;
      case 'SA':
        country_image = require('@images/flag/Saudi_Arabia.png');
        break;
      case 'SN':
        country_image = require('@images/flag/Senegal.png');
        break;
      case 'RS':
        country_image = require('@images/flag/Serbia.png');
        break;

      // 190 - 194
      case 'SC':
        country_image = require('@images/flag/Seychelles.png');
        break;
      case 'SL':
        country_image = require('@images/flag/Sierra_Leone.png');
        break;
      case 'SG':
        country_image = require('@images/flag/Singapore.png');
        break;
      case 'SX':
        country_image = require('@images/flag/Sint_Maarten.png');
        break;
      case 'SK':
        country_image = require('@images/flag/Slovakia.png');
        break;

      // 195 - 199
      case 'SI':
        country_image = require('@images/flag/Slovenia.png');
        break;
      case 'SB':
        country_image = require('@images/flag/Solomon_Islands.png');
        break;
      case 'SO':
        country_image = require('@images/flag/Somalia.png');
        break;
      case 'ZA':
        country_image = require('@images/flag/South_Africa.png');
        break;
      case 'GS':
        country_image = require('@images/flag/South_Georgia_Sout.png');
        break;

      // 200 - 204
      case 'KR':
        country_image = require('@images/flag/South_Korea.png');
        break;
      case 'SS':
        country_image = require('@images/flag/South_Sudan.png');
        break;
      case 'ES':
        country_image = require('@images/flag/Spain.png');
        break;
      case 'LK':
        country_image = require('@images/flag/Sri_Lanka.png');
        break;
      case 'SH':
        country_image = require('@images/flag/St_Helena.png');
        break;

      // 205 - 209
      case 'KN':
        country_image = require('@images/flag/St_Kitts_Nevis.png');
        break;
      case 'LC':
        country_image = require('@images/flag/St_Lucia.png');
        break;
      case 'MF':
        country_image = require('@images/flag/St_Martin.png');
        break;
      case 'PM':
        country_image = require('@images/flag/St_Pierre_Miquelo.png');
        break;
      case 'VC':
        country_image = require('@images/flag/St_Vincent_Grenad.png');
        break;

      // 210 - 214
      case 'SD':
        country_image = require('@images/flag/Sudan.png');
        break;
      case 'SR':
        country_image = require('@images/flag/Suriname.png');
        break;
      case 'SJ':
        country_image = require('@images/flag/Svalbard_Jan_Mayen.png');
        break;
      case 'SZ':
        country_image = require('@images/flag/Switzerland.png');
        break;
      case 'SE':
        country_image = require('@images/flag/Sweden.png');
        break;

      // 215 - 219
      case 'CH':
        country_image = require('@images/flag/Switzerland.png');
        break;
      case 'SY':
        country_image = require('@images/flag/Syria.png');
        break;
      case 'TW':
        country_image = require('@images/flag/Taiwan.png');
        break;
      case 'TJ':
        country_image = require('@images/flag/Tajikistan.png');
        break;
      case 'TZ':
        country_image = require('@images/flag/Tanzania.png');
        break;

      // 220 - 224
      case 'TH':
        country_image = require('@images/flag/Thailand.png');
        break;
      case 'TL':
        country_image = require('@images/flag/Timor_Leste.png');
        break;
      case 'TG':
        country_image = require('@images/flag/Togo.png');
        break;
      case 'TK':
        country_image = require('@images/flag/Tokelau.png');
        break;
      case 'TO':
        country_image = require('@images/flag/Tonga.png');
        break;

      // 225 - 229
      case 'TT':
        country_image = require('@images/flag/Trinidad_and_Tobago.png');
        break;
      case 'TN':
        country_image = require('@images/flag/Tunisia.png');
        break;
      case 'TR':
        country_image = require('@images/flag/Turkey.png');
        break;
      case 'TM':
        country_image = require('@images/flag/Turkmenistan.png');
        break;
      case 'TC':
        country_image = require('@images/flag/Turks_Caicos_Islan.png');
        break;

      // 230 - 234
      case 'TV':
        country_image = require('@images/flag/Tuvalu.png');
        break;
      case 'UM':
        country_image = require('@images/flag/U_S_Outlying_Island.png');
        break;
      case 'VI':
        country_image = require('@images/flag/U_S_Virgin_Islands.png');
        break;
      case 'UG':
        country_image = require('@images/flag/Uganda.png');
        break;
      case 'GB':
        country_image = require('@images/flag/UK.png');
        break;

      // 235 - 239
      case 'UA':
        country_image = require('@images/flag/Ukraine.png');
        break;
      case 'AE':
        country_image = require('@images/flag/United_Arab_Emirates.png');
        break;
      case 'UY':
        country_image = require('@images/flag/Uruguay.png');
        break;
      case 'US':
        country_image = require('@images/flag/USA.png');
        break;
      case 'UZ':
        country_image = require('@images/flag/Uzbekistan.png');
        break;

      // 240 - 244
      case 'VU':
        country_image = require('@images/flag/Vanuatu.png');
        break;
      case 'VA':
        country_image = require('@images/flag/Vatican_city.png');
        break;
      case 'VE':
        country_image = require('@images/flag/Venezuela.png');
        break;
      case 'VN':
        country_image = require('@images/flag/Vietnam.png');
        break;
      case 'WF':
        country_image = require('@images/flag/Wallis_Futuna.png');
        break;

      // 245 - 248
      case 'EH':
        country_image = require('@images/flag/Western_Sahara.png');
        break;
      case 'YE':
        country_image = require('@images/flag/Yemen.png');
        break;
      case 'ZM':
        country_image = require('@images/flag/Zambia.png');
        break;
      case 'ZW':
        country_image = require('@images/flag/Zimbabwe.png');
        break;

      default:
        country_image = image = require('@images/ios/blank.png');
        break;
    }
  } catch (e) {
    console.log(e);
    country_image = require('@images/ios/blank.png');
  }

  return country_image;
};

export default getCountryImageName;
