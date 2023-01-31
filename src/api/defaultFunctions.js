export const base64ToUtf8 = (base64Str_b) => {
    // create a buffer
    const _buff = Buffer.from(base64Str_b, 'base64');

    // decode buffer as UTF-8
    const _utf8Str = _buff.toString('utf-8');

    return _utf8Str;
}

export const convertRealValue = (value_c, decimal_c) => {
    return value_c * 10 ** decimal_c;
}