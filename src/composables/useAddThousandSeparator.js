const useAddThousandSeparator = (number) => {
    let numString = String(number);
    let chars = numString.split('');

    let result = '';

    for (let i = chars.length - 1, count = 0; i >= 0; i--, count++) {
        // Insert a dot every three characters (except for the first character)
        if (count > 0 && count % 3 === 0) {
            result = '.' + result; // Add a dot
        }
        result = chars[i] + result; // Add the character to the result
    }

    return result;
};

export default useAddThousandSeparator;
