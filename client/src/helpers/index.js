export const truncate = (input) => {
    return input?.length > 250 ? `${input.substring(0, 250)}...` : input;
}

export const isStringEmpty = (val) => {
    if (val?.length !== 0) {
        return val
    }
    else {
        return false
    }
}