//Modified from https://www.geeksforgeeks.org/timsort/

let MINMERGE = 32;

const timSort = (data) => {
    let color_arr = data.colors;
    let sorting_arr = data.sorting;
    if (!checkArrLen(color_arr, sorting_arr)) return null
    let steps = [];
    let minR = minRLength(MINMERGE);

    for (let i=0; i<color_arr.length; i+=minR){
        insertionSortTim(color_arr, sorting_arr, i, Math.min( 
            (i + MINMERGE - 1), (color_arr.length - 1)), steps);
    }

    for (let size=minR; size < color_arr.length; size = 2 *size)
    {
        for (let l = 0; l < color_arr.length; l += 2*size){
            let m = l + size - 1;
            let r = Math.min((l + 2 * size - 1), (color_arr.length - 1));

            if (m < r){
                mergeTim(color_arr, sorting_arr, l, m, r, steps)
            }
        }
    }
    return steps
}

const minRLength = (n) => { 
    let r = 0; 
    while (n >= MINMERGE) 
    { 
        r |= (n & 1); 
        n >>= 1; 
    } 
    return n + r; 
} 

const insertionSortTim = (col, sort, left, right, steps) => {
    for (let i = left+1; i<=right; i++){
        let sort_temp = sort[i]
        let col_temp = col[i]
        let j = i-1;

        while (j>=left && sort[j] > sort_temp){
            sort[j+1] = sort[j];
            col[j+1] = col[j];
            steps.push({color: [...col], sorting: [...sort]});
            j--;
        }
        sort[j+1] = sort_temp;
        col[j+1] = col_temp;
        steps.push({color: [...col], sorting: [...sort]});
    }
}

const mergeTim = (col, sort, l, m, r, steps) => {
    let len1 = m - l + 1, len2 = r - m;
    let col_left = new Array(len1);
    let sort_left = new Array(len1);
    let col_right = new Array(len2);
    let sort_right = new Array(len2);

    for (let x=0; x < len1; x++){
        col_left[x] = col[l + x]
        sort_left[x] = sort[l + x];
    }
    for (let x = 0; x < len2; x++){
        col_right[x] = col[m + 1 + x]
        sort_right[x] = sort[m + 1 + x]
    }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < len1 && j < len2){
        if (sort_left[i] <= sort_right[j]){
            sort[k] = sort_left[i];
            col[k] = col_left[i];
            steps.push({color: [...col], sorting: [...sort]});
            i++;
        } else {
            sort[k] = sort_right[j];
            col[k] = col_right[j];
            steps.push({color: [...col], sorting: [...sort]});
            j++;
        }
        k++;
    }
    while (i < len1){
        sort[k] = sort_left[i];
        col[k] = col_left[i];
        steps.push({color: [...col], sorting: [...sort]});
        i++;
        k++;
    }
    while (j < len2){
        sort[k] = sort_right[j];
        col[k] = col_right[j];
        steps.push({color: [...col], sorting: [...sort]});
        j++;
        k++;
    }
}