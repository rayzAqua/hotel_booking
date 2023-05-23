export const regex = (queryArr) => {
    return queryArr ? (new RegExp(queryArr.replace(/\s/g, '').split('').join('.*'))) : (".*");
}