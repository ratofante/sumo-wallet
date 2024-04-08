/**
 * Format a numeric value as a currency string according to the specified locale and currency.
 * Uses the 'toLocaleString' method to format the amount as a currency string.
 * @param {number} amount - The numeric value to format as currency.
 * @param {string} [locale='en-US'] - The locale to use for formatting (e.g., 'en-US' for English (United States)).
 * @param {string} [currency='USD'] - The currency code (e.g., 'USD' for US Dollar).
 * @returns {string} The formatted currency string.
 */
const useFormatCurrency = (amount, locale = 'en-US', currency = 'USD') => {
    return amount.toLocaleString(locale, {
        style: 'currency',
        currency: currency
    });
};

export default useFormatCurrency;
