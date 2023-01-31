import axios from 'axios';
// import { GET_LOAN_BACK_PREFIX, GET_LOAN_PREFIX, SEND_OFFER_PREFIX, SERVER_URL } from '../default/url';

export const getRequest = async (url) => {
    try {
        const res = await axios.get(url);
        // console.log('getRequest log - 1 : ', res.data);
        return { result: true, data: res.data };
    } catch (error) {
        // console.error('getRequest log - 2 : ', { result: false, error: error });
        return { result: false, error: error.message };
    }
}

export const postRequest = async (url, data) => {
    try {
        const res = await axios.post(url, data);
        // console.log('getRequest log - 1 : ', res.data);
        return { result: true, data: res.data };
    } catch (error) {
        // console.error('getRequest log - 2 : ', { result: false, error: error });
        return { result: false, error: error.message };
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// export const sendCreateLoanRequest = async (accountId_s, tokenId_s, serialNum_s, imgUrl_s, duration_s, billPrice_s, serverFee_s) => {
//     console.log('sendCreateLoanRequest log - 1 : ', accountId_s, tokenId_s, serialNum_s, imgUrl_s, duration_s, billPrice_s, serverFee_s);
//     try {
//         const sendOfferResult = await postRequest(SERVER_URL + SEND_OFFER_PREFIX, {
//             a: btoa(accountId_s),
//             b: btoa(tokenId_s),
//             c: btoa(serialNum_s),
//             d: btoa(imgUrl_s),
//             e: btoa(duration_s),
//             f: btoa(billPrice_s),
//             g: btoa(serverFee_s),
//         });

//         return sendOfferResult.data;
//     } catch (error) {
//         return { result: false, error: error.message };
//     }
// }

// export const getLoanRequest = async (accountId_g) => {
//     console.log('getLoanRequest log - 1 : ', accountId_g);
//     try {
//         const getLoanResult = await getRequest(SERVER_URL + GET_LOAN_PREFIX + '?a=' + btoa(accountId_g));
//         return getLoanResult.data;
//     } catch (error) {
//         return { result: false, error: error.message };
//     }
// }

// export const getLoanBackRequest = async (accountId_g, tokenId_g, serialNum_g) => {
//     console.log('getLoanBackRequest log - 1 : ', accountId_g, tokenId_g, serialNum_g);
//     try {
//         const getBackRequest = await postRequest(SERVER_URL + GET_LOAN_BACK_PREFIX, {
//             a: btoa(accountId_g),
//             b: btoa(tokenId_g),
//             c: btoa(serialNum_g),
//         });

//         return getBackRequest.data;
//     } catch (error) {
//         return { result: false, error: error.message };
//     }
// }