//Modified from https://www.geeksforgeeks.org/merge-sort/

const mergeSort = (data) => {
    let color_arr = data.colors;
    let sorting_arr = data.sorting;
    if (!checkArrLen(color_arr, sorting_arr)) return null
    let steps = [];
    ms(color_arr, sorting_arr, 0, color_arr.length-1, steps)
    return steps
}

const merge = (col, sort, l, m, r, steps) => {
    let l1 = m - l + 1;
    let l2 = r - m;

    let sort_arr1 = new Array(l1);
    let color_arr1 = new Array(l1);
    let sort_arr2 = new Array(l2);
    let color_arr2 = new Array(l2);

    for (let i=0; i<l1; i++){
        sort_arr1[i] = sort[l+i];
        color_arr1[i] = col[l+i];
    };
    for (let i=0; i<l2; i++){
        sort_arr2[i] = sort[m+1+i];
        color_arr2[i] = col[m+1+i];
    };

    let i=0, j=0, k=l;

    while (i < l1 && j < l2){
        if (sort_arr1[i] < sort_arr2[j]){
            sort[k] = sort_arr1[i];
            col[k] = color_arr1[i];
            steps.push({color: [...col], sorting: [...sort]});
            i++;
        } else {
            sort[k] = sort_arr2[j];
            col[k] = color_arr2[j];
            steps.push({color: [...col], sorting: [...sort]});
            j++;
        };
        k++;
    };

    while (i<l1){
        sort[k] = sort_arr1[i]
        col[k] = color_arr1[i]
        steps.push({color: [...col], sorting: [...sort]})
        i++;
        k++;
    };
    while (j<l2){
        sort[k] = sort_arr2[j]
        col[k] = color_arr2[j]
        steps.push({color: [...col], sorting: [...sort]})
        j++;
        k++;
    };
};

const ms = (col, sort, left, right, steps) => {
    if (left>=right) return;

    let middle = left + parseInt((right-left)/2);

    ms(col, sort, left, middle, steps);
    ms(col, sort, middle+1, right, steps);

    merge(col, sort, left, middle, right, steps);
};