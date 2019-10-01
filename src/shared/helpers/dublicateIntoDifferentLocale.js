/**
 *  dublicate value from current locale keys to different locale
 *
 */
export const dublicateIntoDifferentLocale = function (currentLocale, obj) { // eslint-disable-line
    /* eslint-disable no-param-reassign */
    const capitalizedLocale = currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
    const localeToDublicateIn = (currentLocale === 'en') ? 'Ru' : 'En';

    Object.keys(obj).forEach((key) => {
        const isKeyToDublicate = key.includes(capitalizedLocale);
        if (isKeyToDublicate) {
            const keyToDublicateIn = key.replace(`${capitalizedLocale}`, localeToDublicateIn);

            obj[keyToDublicateIn] = obj[key];
        }
    });
    /* eslint-disable no-param-reassign */
};
