import { HashConnect, HashConnectTypes, MessageTypes } from 'hashconnect';
import React, { useEffect, useState } from 'react';
import {
    AccountId,
    TokenId,
    NftId,
    AccountAllowanceApproveTransaction,
} from '@hashgraph/sdk';

import { NETWORK_TYPE } from '../default/value';

//Type declarations
interface SaveData {
    topic: string;
    pairingString: string;
    privateKey: string;
    pairedWalletData: HashConnectTypes.WalletMetadata | null;
    pairedAccounts: string[];
    netWork?: string;
    id?: string;
    accountIds?: string[];
}

type Networks = 'testnet' | 'mainnet' | 'previewnet';


interface PropsType {
    children: React.ReactNode;
    hashConnect: HashConnect;
    netWork: Networks;
    metaData?: HashConnectTypes.AppMetadata;
    debug?: boolean;
}

export interface HashConnectProviderAPI {
    connect: () => void;
    disconnect: () => void;
    tokenTransfer: () => void;
    walletData: SaveData;
    netWork: Networks;
    metaData?: HashConnectTypes.AppMetadata;
    installedExtensions: HashConnectTypes.WalletMetadata | null;
}

// const availableExtensions: HashConnectTypes.WalletMetadata[] = [];

const INITIAL_SAVE_DATA: SaveData = {
    topic: '',
    pairingString: '',
    privateKey: '',
    pairedAccounts: [],
    pairedWalletData: null,
};

let APP_CONFIG: HashConnectTypes.AppMetadata = {
    name: 'SAVAGE SAILOR CLUB',
    description: 'SAVAGE SAILOR CLUB',
    icon: 'http://localhost:3000/images/logo.png',
};

const loadLocalData = (): null | SaveData => {
    let foundData = localStorage.getItem('hashConnectData');
    if (foundData) {
        const saveData: SaveData = JSON.parse(foundData);
        // setSaveData(saveData);
        return saveData;
    } else return null;
};

export const HashConnectAPIContext =
    React.createContext < HashConnectProviderAPI > ({
        connect: () => null,
        disconnect: () => null,
        tokenTransfer: () => null,
        walletData: INITIAL_SAVE_DATA,
        netWork: NETWORK_TYPE,
        installedExtensions: null,
    });

export default function HashConnectProvider({
    children,
    hashConnect,
    metaData,
    netWork,
    debug,
}: PropsType) {
    //Saving Wallet Details in Ustate
    const [saveData, SetSaveData] = useState < SaveData > (INITIAL_SAVE_DATA);
    const [installedExtensions, setInstalledExtensions] =
        useState < HashConnectTypes.WalletMetadata | null > (null);

    //? Initialize the package in mount
    const initializeHashConnect = async () => {
        // console.log('initializeHashConnect');

        const saveData = INITIAL_SAVE_DATA;
        const localData = loadLocalData();
        // console.log('Glinton HashConnect Test >>>>> localData :', localData);
        try {
            if (!localData) {
                if (debug) console.log('===Local data not found.=====');

                //first init and store the private for later
                // console.log('Glinton HashConnect Test >>>>> APP_CONFIG :', APP_CONFIG);
                let initData = await hashConnect.init(APP_CONFIG);
                saveData.privateKey = initData.privKey;
                // console.log('initData privkey', saveData.privateKey);

                //then connect, storing the new topic for later
                const state = await hashConnect.connect();
                saveData.topic = state.topic;

                //generate a pairing string, which you can display and generate a QR code from
                saveData.pairingString = hashConnect.generatePairingString(state, netWork, false);

                //find any supported local wallets
                hashConnect.findLocalWallets();
            } else {
                console.log('====Local data found====', localData);

                console.log('====localData to save1====');

                await SetSaveData((prevData) => ({ ...prevData, ...localData }));

                await hashConnect.init(APP_CONFIG, localData.privateKey);
                await hashConnect.connect(localData.topic, localData.pairedWalletData!);
            }
        } catch (error) {
            // console.log(error);
        } finally {
            if (localData) {
                SetSaveData((prevData) => ({ ...prevData, ...localData }));
            } else {
                console.log('************************ saveData 1 : ', saveData);
                SetSaveData((prevData) => ({ ...prevData, ...saveData }));
            }
            if (debug) console.log('====Wallet details updated to state====');
        }
    };

    const saveDataInLocalStorage = async (data: MessageTypes.ApprovePairing) => {
        if (debug) console.info('===============Saving to localstorage::=============');
        console.log('************************ saveData 3 : ', saveData);
        console.log('************************ data : ', data);
        const { metadata, ...restData } = data;
        SetSaveData((prevSaveData) => {
            prevSaveData.pairedWalletData = metadata;
            return { ...prevSaveData, ...restData };
        });
        data['privateKey'] = saveData.privateKey;
        data['pairingString'] = saveData.pairingString;
        data['pairedWalletData'] = metadata;
        console.log('************************ hashConnectData : ', data);
        let dataToSave = JSON.stringify(data);
        localStorage.setItem('hashConnectData', dataToSave);
    };

    // const additionalAccountResponseEventHandler = (
    //   data: MessageTypes.AdditionalAccountResponse
    // ) => {
    //   // if (debug) console.debug('=====additionalAccountResponseEvent======', data);
    //   // Do a thing
    // };

    const foundExtensionEventHandler = (
        data: HashConnectTypes.WalletMetadata
    ) => {
        if (debug) console.debug('====foundExtensionEvent====', data);
        // Do a thing
        setInstalledExtensions(data);
    };

    const pairingEventHandler = (data: MessageTypes.ApprovePairing) => {
        if (debug) console.log('====pairingEvent:::Wallet connected=====', data);
        console.log('************************ saveData 2 : ', saveData);
        // Save Data to localStorage
        saveDataInLocalStorage(data);
    };

    useEffect(() => {
        initializeAll();
    }, []);

    const initializeAll = () => {
        //Intialize the setup
        initializeHashConnect();

        // Attach event handlers
        // hashConnect.additionalAccountResponseEvent.on(
        //   additionalAccountResponseEventHandler
        // );
        hashConnect.foundExtensionEvent.on(foundExtensionEventHandler);
        hashConnect.pairingEvent.on(pairingEventHandler);

        return () => {
            // Detach existing handlers
            // hashConnect.additionalAccountResponseEvent.off(
            //   additionalAccountResponseEventHandler
            // );
            hashConnect.foundExtensionEvent.off(foundExtensionEventHandler);
            hashConnect.pairingEvent.off(pairingEventHandler);
        };
    };

    const connect = () => {
        if (installedExtensions) {
            if (debug) console.log('Pairing String::', saveData.pairingString);
            // console.log('Glinton HashConnect Test >>>>> saveData.pairingString :', saveData.pairingString);
            hashConnect.connectToLocalWallet(saveData.pairingString);
        } else {
            // if (debug) console.log('====No Extension is not in browser====');
            return 'wallet not installed';
        }
    };

    const disconnect = async () => {
        // console.log('Glinton log >>>>> disconnect function called!');
        await SetSaveData(INITIAL_SAVE_DATA);
        // await SetInfo([]);
        let foundData = localStorage.getItem('hashConnectData');
        if (foundData)
            localStorage.removeItem('hashConnectData');
        initializeAll();
    };

    const allowanceTransaction = async (receiverId_a, hbarAmount_a, ftId_a, ftAmount_a, nftId_a, serialNum_a) => {
        console.log('allowanceTransaction log - 1 : ', receiverId_a, hbarAmount_a, ftId_a, ftAmount_a, nftId_a, serialNum_a);

        try {
            const accountId = saveData.accountIds[0];
            const provider = hashConnect.getProvider(netWork, saveData.topic, accountId);
            const signer = hashConnect.getSigner(provider);
            const receiverId = AccountId.fromString(receiverId_a);

            let allowanceTx = new AccountAllowanceApproveTransaction();
            if (hbarAmount_a > 0) {
                allowanceTx.approveHbarAllowance(accountId, receiverId, hbarAmount_a);
            }
            if (ftAmount_a > 0) {
                const ftId = TokenId.fromString(ftId_a);
                console.log('allowanceTransaction log - 2 : ', ftId_a, ftAmount_a);
                allowanceTx.approveTokenAllowance(ftId, accountId, receiverId, parseInt(ftAmount_a));
            }
            if (serialNum_a > 0) {
                const nft = new NftId(TokenId.fromString(nftId_a), serialNum_a);
                allowanceTx.approveTokenNftAllowance(nft, accountId, receiverId);
            }
            const allowanceFreeze = await allowanceTx.freezeWithSigner(signer);
            const allowanceSign = await allowanceFreeze.signWithSigner(signer);
            const allowanceSubmit = await allowanceSign.executeWithSigner(signer);
            const allowanceRx = await provider.getTransactionReceipt(allowanceSubmit.transactionId);

            if (allowanceRx.status._code !== 22)
                return { result: false, error: 'Transaction failed!' };

            return { result: true };
        } catch (error) {
            return { result: false, error: error.message };
        }
    }

    return (
        <HashConnectAPIContext.Provider
            value={{
                walletData: saveData,
                installedExtensions,
                connect,
                disconnect,
                allowanceTransaction,
            }}>
            {children}
        </HashConnectAPIContext.Provider>
    );
}

const defaultProps: Partial<PropsType> = {
    metaData: {
        name: 'SAVAGE SAILOR CLUB',
        description: 'SAVAGE SAILOR CLUB',
        icon: 'http://localhost:3000/images/logo.png',
    },
    netWork: NETWORK_TYPE,
    debug: false,
};

HashConnectProvider.defaultProps = defaultProps;

export function useHashConnect() {
    const value = React.useContext(HashConnectAPIContext);
    return value;
}