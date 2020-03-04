/**
 *
 * iZ³ | IZZZIO blockchain - https://izzz.io
 *
 * Contract version control system
 * Version control contract
 */

class vcsContract extends Contract {

    get contract() {
        return {
            name: 'VCSContract',
            owner: this._getContractOwner(),
            type: 'service',
        };
    }

    /**
     * Initialization
     */
    init() {

        //Storage
        this._contractsData = new BlockchainMap('contractsData');

        //VersionChanged Event                                            contractAddress    newVersion
        this._VersionChanged = new Event('VersionChanged', 'number', 'number');

        //Initialize other params
        super.init();

    }

    /**
     * First call
     */
    deploy() {
        super.deploy();
        //Change contract owner to caller
        this._changeOwner();
    }


    /**
     * Returns contract source
     * @param {Number} contractAddress
     * @returns {string}
     */
    getContractSource(contractAddress) {

        contractAddress = Number(contractAddress);

        if(!this._contractsData[contractAddress]) {
            return JSON.stringify({source: '', version: 0, prevSrc: ''});
        }

        return JSON.stringify(this._contractsData[contractAddress]);
    }

    /**
     * Deploy new contract version
     * @param {Number} contractAddress
     * @param {string} newSource
     */
    deployContract(contractAddress, newSource) {
        this.assertOwnership('This contract can be called only from owner');

        contractAddress = Number(contractAddress);
        newSource = String(newSource);

        if(!this._contractsData[contractAddress]) {
            this._contractsData[contractAddress] = {source: '', version: 0, prevSrc: ''};
        }

        this._contractsData[contractAddress] = {
            prevSrc: this._contractsData[contractAddress].source,
            source: newSource,
            version: this._contractsData[contractAddress].version + 1
        };

        this._VersionChanged.emit(contractAddress, this._contractsData[contractAddress].version);

    }


}

global.registerContract(vcsContract);