//Modified from https://www.geeksforgeeks.org/quick-sort-algorithm/

const quickSort = (data) => {
    let color_arr = data.colors;
    let sorting_arr = data.sorting;
    if (!checkArrLen(color_arr, sorting_arr)) return null
    let steps = [];
    qs(color_arr, sorting_arr, 0, sorting_arr.length-1, steps)
    return steps
}

const partition = (col, sort, low, high, steps) => {
    let pivot = sort[high];
    let i = low - 1;
    for (let j=low; j<= high-1; j++){
        if (sort[j] < pivot) {
            i++;
            swap(col, i, j)
            swap(sort, i, j)
            steps.push({color: [...col], sorting: [...sort]})
        }
    }
    swap(col, i+1, high)
    swap(sort, i+1, high)
    steps.push({color: [...col], sorting: [...sort]})
    return i+1;
}

const qs = (col, sort, low, high, steps) => {
    if (low >= high) return;
    let pi = partition(col, sort, low, high, steps)

    qs(col, sort, low, pi-1, steps)
    qs(col, sort, pi+1, high, steps)
}