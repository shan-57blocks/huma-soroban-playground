/* eslint-disable @typescript-eslint/no-unused-vars */

import { setPoolSettings } from './pool';
import { approveLender } from './trancheVault';

(async () => {
  await setPoolSettings();
  //   await approveLender();
})();