import { Environment } from "../models/Environment";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment: Environment = {
  production: false,
  endpoint_uri: 'http://localhost',
  mapbox_access_token: 'pk.eyJ1Ijoiam9yZHlpanNzZWxzdGlqbiIsImEiOiJjamVlNnlveHowemxzMnhrdGFmbWNxNGpxIn0.39_Zn_DJ3DhP0ZShOfprVw'
};
