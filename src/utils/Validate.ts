export function isEmpty(value: any) {
    return (value === undefined || value === '' || value === null);
}

export const isEmptyObject = (value: {}) => {
    return isEmpty(value)? true : (Object.keys(value).length === 0 && value.constructor === Object);
}