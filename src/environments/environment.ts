// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  userPoolId: 'us-east-1_I8j7QGjJ6',
  clientId: '3eqta5f5265id13on6saebk5u3',
  region: 'us-east-1',
  identityPoolId: 'us-east-1:55f6747b-e647-4f0b-811e-22a7259ee28c',

  serverUrl: 'https://horizon-testnet.stellar.org',
  assetCode: 'CLPX',
  issuer: 'GAVTVJI72NZHEDWAYCTRCT2PJDISIXCG6NYAGDIBLFNIQ4ZHCAOGI76C',

  tableUser: 'dev-user',

  apiURL: 'https://wuxfz5pcjb.execute-api.us-east-1.amazonaws.com/dev',
};
