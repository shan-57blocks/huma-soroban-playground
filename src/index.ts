/* eslint-disable @typescript-eslint/no-unused-vars */

import { getUnderlyingToken, setPoolSettings } from './pool';
import { approveBorrower } from './poolCredit';
import { approveLender } from './trancheVault';

(async () => {
  await getUnderlyingToken();
  // await setPoolSettings();
  //   await approveLender();
  // await approveBorrower();
})();
