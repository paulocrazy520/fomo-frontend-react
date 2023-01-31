import { getRequest } from './apiRequests'
import { IPFS_URL, MIRROR_NET_URL } from '../default/url';
import { base64ToUtf8 } from './defaultFunctions';
import { DEFAULT_SERVER_FEE_HBAR_VALUE } from '../default/value';

export const associateCheck = async (accountId_a, tokenId_a) => {
    console.log('autoAssociate log - 1 : ', accountId_a, tokenId_a);
    try {
        const associateInfo = await getRequest(`${MIRROR_NET_URL}/api/v1/accounts/${accountId_a}/tokens?token.id=${tokenId_a}`);
        console.log('autoAssociate log - 2 : ', associateInfo);

        if (!associateInfo.result)
            return { result: false, error: associateInfo.error };

        // already associated
        if (associateInfo.data.tokens?.length > 0)
            return { result: true, associated: true };

        return { result: true, associated: false };
    } catch (error) {
        return { result: false, error: error.message };
    }
}

export const getSpecificNftDataFromWallet = async (accountId_g, tokenIds_g) => {
    console.log('getSpecificNftDataFromWallet log - 1 : ', accountId_g, tokenIds_g);
    try {
        let nextLink = null;
        let newWalletNftInfo = [];

        let WNinfo = await getRequest(`${MIRROR_NET_URL}/api/v1/accounts/${accountId_g}/nfts`);
        console.log('getSpecificNftDataFromWallet log - 2 : ', WNinfo);

        if (!WNinfo.result)
            return { result: false, error: WNinfo.error };

        if (WNinfo.data.nfts.length > 0)
            nextLink = WNinfo.data.links.next;

        while (1) {
            let tempNftInfo = WNinfo.data.nfts;

            for (let i = 0; i < tempNftInfo.length; i++) {
                if (tokenIds_g.find((item) => item === tempNftInfo[i].token_id) ? true : false) {
                    const singleNftInfo = await getSingleNftInfo(tempNftInfo[i].token_id, tempNftInfo[i].serial_number);
                    console.log('getSpecificNftDataFromWallet log - 3 : ', singleNftInfo);

                    if (!singleNftInfo.result)
                        return { result: false, error: singleNftInfo.error };

                    newWalletNftInfo.push({ ...singleNftInfo.data });
                }
            }

            if (!nextLink || nextLink === null) break;

            WNinfo = await getRequest(MIRROR_NET_URL + nextLink);
            nextLink = null;

            if (!WNinfo.result)
                return { result: false, error: WNinfo.error };

            if (WNinfo.data.nfts.length > 0)
                nextLink = WNinfo.data.links.next;
        }

        return { result: true, data: newWalletNftInfo };
    } catch (error) {
        return { result: false, error: error.message };
    }
}

export const getSingleNftInfo = async (tokenId_g, serialNum_g) => {
    console.log('getSingleNftInfo log - 1 : ', tokenId_g, serialNum_g);

    try {
        let newNftInfo;

        const singleNftInfo = await getRequest(`${MIRROR_NET_URL}/api/v1/tokens/${tokenId_g}/nfts?serialNumber=${serialNum_g}`);
        console.log("getSingleNftInfo log - 1 : ", singleNftInfo);

        if (!singleNftInfo.result)
            return { result: false, error: singleNftInfo.error };

        if (singleNftInfo.data.nfts.length > 0) {
            let preMdUrl = base64ToUtf8(singleNftInfo.data.nfts[0].metadata).split("//");
            console.log("getSingleNftInfo log - 2 : ", preMdUrl);

            let metadataUrl = IPFS_URL + preMdUrl[preMdUrl.length - 1];
            let metadata = await getRequest(metadataUrl);

            if (!metadata.result)
                return { result: false, error: metadata.error };

            let preImgUrl = metadata.data.image.split("//");
            const imgUrl = IPFS_URL + preImgUrl[1];
            const tokenId = singleNftInfo.data.nfts[0].token_id;
            const serialNum = singleNftInfo.data.nfts[0].serial_number;
            const creator = metadata.data.creator;
            const name = metadata.data.name;

            newNftInfo = {
                tokenId: tokenId,
                serialNum: serialNum,
                creator: creator,
                name: name,
                imgUrl: imgUrl,
            }
        }
        return { result: true, data: newNftInfo };
    } catch (error) {
        return { result: false, error: error.message };
    }
}

export const calcServerFee = async (valueInDollar_c) => {
    console.log('calcServerFee log - 1 : ', valueInDollar_c);
    try {
        // get hbar price
        const hbarPrice = await getRequest('https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd');
        console.log('calcServerFee log - 2', hbarPrice);
        if (!hbarPrice.result)
            return DEFAULT_SERVER_FEE_HBAR_VALUE;

        console.log('sendMintOffer log - 3', hbarPrice.data["hedera-hashgraph"].usd);
        const serverFee = parseFloat(parseFloat(valueInDollar_c) / parseFloat(hbarPrice.data["hedera-hashgraph"].usd)).toFixed(3);

        return serverFee;
    } catch (error) {
        return DEFAULT_SERVER_FEE_HBAR_VALUE;
    }
}