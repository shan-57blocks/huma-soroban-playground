/* eslint-disable @typescript-eslint/no-unused-vars */

import { setPoolSettings } from './pool';
import { approveBorrower } from './poolCredit';
import { approveLender } from './trancheVault';

(async () => {
  // await setPoolSettings();
  //   await approveLender();
  await approveBorrower();
})();
