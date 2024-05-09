import 'dotenv/config';

import { spawn } from 'child_process';
import process from 'process';

import { Network } from '../src/utils/network';

const cmd = (...command: string[]) => {
  const p = spawn(command[0], command.slice(1));
  return new Promise((resolveFunc) => {
    p.stdout.on('data', (x) => {
      process.stdout.write(x.toString());
    });
    p.stderr.on('data', (x) => {
      process.stderr.write(x.toString());
    });
    p.on('exit', (code) => {
      resolveFunc(code);
    });
  });
};

// Typescript bindings doc: https://developers.stellar.org/docs/smart-contracts/getting-started/create-an-app#generate-an-npm-package-for-the-hello-world-contract
(async () => {
  const contracts = {
    humaConfig: 'CCXBJLHC26VJWNAH2BL6DKBJXIKGQACL2O7H5ZKVX52G47NDOZET6ABG'
    // pool: 'CDBRPZOAA4LFK72RHQ56CZNL2CUCN22CF4QUR56HLHPJSLUBH3YXCRXD',
    // poolManager: 'CAXVUZNSZ3QLU3AJELVAPWI2WPBPW62IISJRVQEQER4VVGJ2A7BDP4WM',
    // poolCredit: 'CA2BRONZXJZ5KRDQXYEPCL3BOIW7DCJFFNZ35MWMXSA3YRXUETZJ2R6D',
    // juniorTranche: 'CA47RS4Q4UPWJ3UVDZUKIKZKBR5C3W3ZHBHM62ZVRKZOF3T37HZJQD47'
  };
  const contractNames = Object.keys(contracts);
  for (let contractName of contractNames) {
    // @ts-ignore
    const contractAddress = contracts[contractName];
    if (contractName === 'juniorTranche') {
      contractName = 'trancheVault';
    }

    console.log('Starting bindings for', contractName);
    await cmd(
      'bash',
      '-c',
      `soroban contract bindings typescript --network ${Network.testnet} --output-dir packages/${contractName} --overwrite --contract-id ${contractAddress}`
    );
    await cmd(
      'bash',
      '-c',
      `yarn add @huma/${contractName}@./packages/${contractName}`
    );
    console.log('Finished bindings for', contractName);
  }
})();
