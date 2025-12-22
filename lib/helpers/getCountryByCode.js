export default function getCountryByCode(code) {
  const country = countries.filter((country) => country.value === code)[0]

  return country?.name || ''
}

const countries = [
  {
    name: 'Afghanistan',
    value: 'AF',
  },
  {
    name: 'Albania',
    value: 'AL',
  },
  {
    name: 'Algeria',
    value: 'DZ',
  },
  {
    name: 'Andorra',
    value: 'AD',
  },
  {
    name: 'Angola',
    value: 'AO',
  },
  {
    name: 'Antigua and Barbuda',
    value: 'AG',
  },
  {
    name: 'Argentina',
    value: 'AR',
  },
  {
    name: 'Armenia',
    value: 'AM',
  },
  {
    name: 'Australia',
    value: 'AU',
  },
  {
    name: 'Austria',
    value: 'AT',
  },
  {
    name: 'Azerbaijan',
    value: 'AZ',
  },
  {
    name: 'Bahamas',
    value: 'BS',
  },
  {
    name: 'Bahrain',
    value: 'BH',
  },
  {
    name: 'Bangladesh',
    value: 'BD',
  },
  {
    name: 'Barbados',
    value: 'BB',
  },
  {
    name: 'Belarus',
    value: 'BY',
  },
  {
    name: 'Belgium',
    value: 'BE',
  },
  {
    name: 'Belize',
    value: 'BZ',
  },
  {
    name: 'Benin',
    value: 'BJ',
  },
  {
    name: 'Bhutan',
    value: 'BT',
  },
  {
    name: 'Bolivia',
    value: 'BO',
  },
  {
    name: 'Bosnia and Herzegovina',
    value: 'BA',
  },
  {
    name: 'Botswana',
    value: 'BW',
  },
  {
    name: 'Brazil',
    value: 'BR',
  },
  {
    name: 'Brunei Darussalam',
    value: 'BN',
  },
  {
    name: 'Bulgaria',
    value: 'BG',
  },
  {
    name: 'Burkina Faso',
    value: 'BF',
  },
  {
    name: 'Burindi',
    value: 'BI',
  },
  {
    name: 'Cambodia',
    value: 'KH',
  },
  {
    name: 'Cameroon',
    value: 'CM',
  },
  {
    name: 'Canada',
    value: 'CA',
  },
  {
    name: 'Cape Verde',
    value: 'CV',
  },
  {
    name: 'Central African Republic',
    value: 'CF',
  },
  {
    name: 'Chad',
    value: 'TD',
  },
  {
    name: 'Chile',
    value: 'CL',
  },
  {
    name: 'China',
    value: 'CN',
  },
  {
    name: 'Colombia',
    value: 'CO',
  },
  {
    name: 'Comoros',
    value: 'KM',
  },
  {
    name: 'Congo',
    value: 'CD',
  },
  {
    name: 'Costa Rica',
    value: 'CR',
  },
  {
    name: 'Cote dIvoire',
    value: 'CI',
  },
  {
    name: 'Croatia',
    value: 'HR',
  },
  {
    name: 'Cuba',
    value: 'CU',
  },
  {
    name: 'Cyprus',
    value: 'CY',
  },
  {
    name: 'Czech Republic',
    value: 'CZ',
  },
  {
    name: 'Denmark',
    value: 'DK',
  },
  {
    name: 'Djibouti',
    value: 'DJ',
  },
  {
    name: 'Dominica',
    value: 'DM',
  },
  {
    name: 'Dominican Republic',
    value: 'DO',
  },
  {
    name: 'Ecuador',
    value: 'EC',
  },
  {
    name: 'Egypt',
    value: 'EG',
  },
  {
    name: 'El Salvador',
    value: 'SV',
  },
  {
    name: 'Equatorial Guinea',
    value: 'GQ',
  },
  {
    name: 'Eritrea',
    value: 'ER',
  },
  {
    name: 'Estonia',
    value: 'EE',
  },
  {
    name: 'Ethiopia',
    value: 'ET',
  },
  {
    name: 'Fiji',
    value: 'FJ',
  },
  {
    name: 'Finland',
    value: 'FI',
  },
  {
    name: 'France',
    value: 'FR',
  },
  {
    name: 'Gabon',
    value: 'GA',
  },
  {
    name: 'Gambia',
    value: 'GM',
  },
  {
    name: 'Georgia',
    value: 'GE',
  },
  {
    name: 'Germany',
    value: 'DE',
  },
  {
    name: 'Ghana',
    value: 'GH',
  },
  {
    name: 'Greece',
    value: 'GR',
  },
  {
    name: 'Grenada',
    value: 'GD',
  },
  {
    name: 'Guatemala',
    value: 'GT',
  },
  {
    name: 'Guinea',
    value: 'GN',
  },
  {
    name: 'Guinea-Bissau',
    value: 'GW',
  },
  {
    name: 'Guyana',
    value: 'GY',
  },
  {
    name: 'Haiti',
    value: 'HT',
  },
  {
    name: 'Holy See',
    value: 'VA',
  },
  {
    name: 'Honduras',
    value: 'HN',
  },
  {
    name: 'Hungary',
    value: 'HU',
  },
  {
    name: 'Iceland',
    value: 'IS',
  },
  {
    name: 'India',
    value: 'IN',
  },
  {
    name: 'Indonesia',
    value: 'ID',
  },
  {
    name: 'Iran',
    value: 'IR',
  },
  {
    name: 'Iraq',
    value: 'IQ',
  },
  {
    name: 'Ireland',
    value: 'IE',
  },
  {
    name: 'Israel',
    value: 'IL',
  },
  {
    name: 'Italy',
    value: 'IT',
  },
  {
    name: 'Jamaica',
    value: 'JM',
  },
  {
    name: 'Japan',
    value: 'JP',
  },
  {
    name: 'Jordan',
    value: 'JO',
  },
  {
    name: 'Kazakhstan',
    value: 'KZ',
  },
  {
    name: 'Kenya',
    value: 'KE',
  },
  {
    name: 'Kiribati',
    value: 'KI',
  },
  {
    name: 'Korea',
    value: 'KR',
  },
  {
    name: 'Kuwait',
    value: 'KW',
  },
  {
    name: 'Kyrgyzstan',
    value: 'KG',
  },
  {
    name: 'Lao PDR',
    value: 'LA',
  },
  {
    name: 'Latvia',
    value: 'LV',
  },
  {
    name: 'Leanon',
    value: 'LB',
  },
  {
    name: 'Lasotho',
    value: 'LS',
  },
  {
    name: 'Liberia',
    value: 'LR',
  },
  {
    name: 'Libya',
    value: 'LY',
  },
  {
    name: 'Liechtenstein',
    value: 'LI',
  },
  {
    name: 'Lithuania',
    value: 'LT',
  },
  {
    name: 'Luxembourg',
    value: 'LU',
  },
  {
    name: 'Macedonia',
    value: 'MK',
  },
  {
    name: 'Madagascar',
    value: 'MG',
  },
  {
    name: 'Malawi',
    value: 'MW',
  },
  {
    name: 'Malaysia',
    value: 'MY',
  },
  {
    name: 'Maldives',
    value: 'MV',
  },
  {
    name: 'Mali',
    value: 'ML',
  },
  {
    name: 'Malta',
    value: 'MT',
  },
  {
    name: 'Marshall Islands',
    value: 'MH',
  },
  {
    name: 'Mauritania',
    value: 'MR',
  },
  {
    name: 'Mauritius',
    value: 'MU',
  },
  {
    name: 'Mexico',
    value: 'MX',
  },
  {
    name: 'Micronesia',
    value: 'FM',
  },
  {
    name: 'Moldova',
    value: 'MD',
  },
  {
    name: 'Monaco',
    value: 'MC',
  },
  {
    name: 'Mongolia',
    value: 'MN',
  },
  {
    name: 'Montenegro',
    value: 'ME',
  },
  {
    name: 'Morocco',
    value: 'MA',
  },
  {
    name: 'Mozambique',
    value: 'MZ',
  },
  {
    name: 'Myanmar',
    value: 'MM',
  },
  {
    name: 'Namibia',
    value: 'NA',
  },
  {
    name: 'Nauru',
    value: 'NR',
  },
  {
    name: 'Nepal',
    value: 'NP',
  },
  {
    name: 'Netherlands',
    value: 'NL',
  },
  {
    name: 'New Zealand',
    value: 'NZ',
  },
  {
    name: 'Nicaragua',
    value: 'NI',
  },
  {
    name: 'Niger',
    value: 'NE',
  },
  {
    name: 'Nigeria',
    value: 'NG',
  },
  {
    name: 'Northern Mariana islands',
    value: 'MP',
  },
  {
    name: 'Norway',
    value: 'NO',
  },
  {
    name: 'Oman',
    value: 'OM',
  },
  {
    name: 'Pakistan',
    value: 'PK',
  },
  {
    name: 'Palau',
    value: 'PW',
  },
  {
    name: 'Palestinian Territory',
    value: 'PS',
  },
  {
    name: 'Panama',
    value: 'PA',
  },
  {
    name: 'Papua New Guinea',
    value: 'PG',
  },
  {
    name: 'Paraguay',
    value: 'PY',
  },
  {
    name: 'Peru',
    value: 'PE',
  },
  {
    name: 'Philippines',
    value: 'PH',
  },
  {
    name: 'Pitcairn',
    value: 'PN',
  },
  {
    name: 'Poland',
    value: 'PL',
  },
  {
    name: 'Portugal',
    value: 'PT',
  },
  {
    name: 'Puerto Rico',
    value: 'PR',
  },
  {
    name: 'Qatar',
    value: 'QA',
  },
  {
    name: 'Reunion',
    value: 'RE',
  },
  {
    name: 'Romania',
    value: 'RO',
  },
  {
    name: 'Russian Federation',
    value: 'RU',
  },
  {
    name: 'Rwanda',
    value: 'RW',
  },
  {
    name: 'Saint Kitts and Nevis',
    value: 'KN',
  },
  {
    name: 'Saint Luca',
    value: 'LC',
  },
  {
    name: 'Saint Vincent and Grenadines',
    value: 'VC',
  },
  {
    name: 'Samoa',
    value: 'WS',
  },
  {
    name: 'San Marino',
    value: 'SM',
  },
  {
    name: 'Sao Tome and Principe',
    value: 'ST',
  },
  {
    name: 'Saudi Arabia',
    value: 'SA',
  },
  {
    name: 'Senegal',
    value: 'SN',
  },
  {
    name: 'Serbia',
    value: 'RS',
  },
  {
    name: 'Seychelles',
    value: 'SC',
  },
  {
    name: 'Sierra Leone',
    value: 'SL',
  },
  {
    name: 'Singapore',
    value: 'SG',
  },
  {
    name: 'Slovakia',
    value: 'SK',
  },
  {
    name: 'Slovenia',
    value: 'SI',
  },
  {
    name: 'Solomon Islands',
    value: 'SB',
  },
  {
    name: 'Somalia',
    value: 'SO',
  },
  {
    name: 'South Africa',
    value: 'ZA',
  },
  {
    name: 'Spain',
    value: 'ES',
  },
  {
    name: 'Sri Lnaka',
    value: 'LK',
  },
  {
    name: 'Sudan',
    value: 'SD',
  },
  {
    name: 'Suriname',
    value: 'SR',
  },
  {
    name: 'Swaziland',
    value: 'SZ',
  },
  {
    name: 'Sweden',
    value: 'SE',
  },
  {
    name: 'Switzerland',
    value: 'CH',
  },
  {
    name: 'Syrian Arab Republic',
    value: 'SY',
  },
  {
    name: 'Taiwan',
    value: 'TW',
  },
  {
    name: 'Tajikistan',
    value: 'TJ',
  },
  {
    name: 'Tanzania',
    value: 'TZ',
  },
  {
    name: 'Thailand',
    value: 'TH',
  },
  {
    name: 'Timor-Leste',
    value: 'TL',
  },
  {
    name: 'Togo',
    value: 'TG',
  },
  {
    name: 'Tonga',
    value: 'TO',
  },
  {
    name: 'Trinidad and Tobago',
    value: 'TT',
  },
  {
    name: 'Tunisia',
    value: 'TN',
  },
  {
    name: 'Turkey',
    value: 'TR',
  },
  {
    name: 'Turkmenistan',
    value: 'TM',
  },
  {
    name: 'Tuvalu',
    value: 'TV',
  },
  {
    name: 'Uganda',
    value: 'UG',
  },
  {
    name: 'Ukraine',
    value: 'UA',
  },
  {
    name: 'United Arab Emirates',
    value: 'AE',
  },
  {
    name: 'United Kingdom',
    value: 'UK',
  },
  {
    name: 'United States',
    value: 'US',
  },
  {
    name: 'Uruguay',
    value: 'UY',
  },
  {
    name: 'Uzbekistan',
    value: 'UZ',
  },
  {
    name: 'Vanuatu',
    value: 'VU',
  },
  {
    name: 'Venezuela',
    value: 'VE',
  },
  {
    name: 'Viet Nam',
    value: 'VN',
  },
  {
    name: 'Yemen',
    value: 'YE',
  },
  {
    name: 'Zambia',
    value: 'ZM',
  },
  {
    name: 'Zimbabwe',
    value: 'ZW',
  },
]
