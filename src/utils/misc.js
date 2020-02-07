import _ from 'lodash'

export const promiseReject = value => new Promise((resolve, reject) => reject(value))

export const checkTheStringThenTruncate = (string, charLimit) => {
    const truncate = _.truncate
    return truncate(string, {
        length: charLimit,
        separator: /,?\.* +/
    })
}