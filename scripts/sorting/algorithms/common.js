const swap = (arr, x1, x2) => {
    let temp = arr[x1];
    arr[x1] = arr[x2];
    arr[x2] = temp;
}

const checkArrLen = (arr1, arr2) => {
    if (arr1.length == arr2.length) return true
    return false
}