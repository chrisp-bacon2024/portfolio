//Modified from https://www.geeksforgeeks.org/selection-sort-algorithm-2/

const selectionSort = (data) => {
    let color_arr = data.colors;
    let sorting_arr = data.sorting;
    let i, j, min_idx;
    let steps = [];
    if (!checkArrLen(color_arr, sorting_arr)) return null
    for (i=0; i<color_arr.length - 1; i++){
        min_idx = i;
        for (j=i+1; j<color_arr.length; j++){
            if (sorting_arr[j] < sorting_arr[min_idx]){
                min_idx = j;
            }
        }
        swap(color_arr, min_idx, i);
        swap(sorting_arr, min_idx, i);
        steps.push({color: [...color_arr], sorting: [...sorting_arr]})
    }
    return steps
}