/**
 *
 * iZ³ | IZZZIO blockchain - https://izzz.io
 *
 * Contract version control system
 * Versioned contract loader
 */

//Deployed vcsContract address
const VERSION_CONTROL_CONTRACT_ADDRESS = '1';

let state = global.getState();

//Get contract object
let versionedContractObject = JSON.parse(contracts.callMethodRollback(VERSION_CONTROL_CONTRACT_ADDRESS, 'getContractSource', [state.contractAddress]));

if(versionedContractObject.version === 0) {
    throw new Error('VCS Contract. The contract is not deployed. Deploy new contract to versionControl: ' + VERSION_CONTROL_CONTRACT_ADDRESS + ' before starting versioned contract');
}

//Start contract source
eval(versionedContractObject.source);