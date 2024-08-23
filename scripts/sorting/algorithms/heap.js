//Modified from https://www.geeksforgeeks.org/heap-sort/

const heapSort = (data) => {
    let color_arr = data.colors;
    let sorting_arr = data.sorting;
    if (!checkArrLen(color_arr, sorting_arr)) return null
    let n = color_arr.length;
    let steps = [];
    for (let i = Math.floor(n/2)-1; i>= 0; i--) {
        heapify(color_arr, sorting_arr, n, i, steps)
    }
    for (i =n-1; i>0; i--){
        swap(color_arr, 0, i)
        swap(sorting_arr, 0, i)
        steps.push({color: [...color_arr], sorting: [...sorting_arr]})
        heapify(color_arr, sorting_arr, i, 0, steps)
    }
    return steps
}

const heapify = (col, sort, n, i, steps) => {
    let largest = i;
    let l = 2*i+1;
    let r = 2*i+2;

    if (l<n && sort[l] > sort[largest]){
        largest = l;
    }
    if (r<n && sort[r] > sort[largest]){
        largest = r;
    }
    if (largest != i){
        swap(col, i, largest)
        swap(sort, i, largest)
        steps.push({color: [...col], sorting: [...sort]})
        heapify(col, sort, n, largest, steps)
    }
}