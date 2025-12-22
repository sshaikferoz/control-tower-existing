npm install

to run the dashboard in development:
npm run dev

to generate production build "out" folder:
npm run export


To Deploy to dvb:
Open file .ui5deployrc and adjust the request number

` "transportNo": "DVBK9A21TR", `

run the buid/export process by running the following command:

`npm run export`

 then run the following command:

`npm run deployer -- --user MIRAJSM --pwd Abc123`

and adjust your your username/password.


deploy command::: latest
node node_modules/ui5-nwabap-deployer-cli/bin/cli.js deploy --user shaifh0d --pwd 95733@Fer

Test after deployemnt using
https://dvb.aramco.com.sa:44303/sap/bc/ui5_ui5/sap/zscm_pscct_03/index.html