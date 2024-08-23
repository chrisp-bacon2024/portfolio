//Modified from https://www.geeksforgeeks.org/insertion-sort-algorithm/

const insertionSort = (data) => {  
    let color_arr = data.colors;
    let sorting_arr = data.sorting;
    if (!checkArrLen(color_arr, sorting_arr)) return null
    let i, key, color_key, j;
    let steps = []; 
    for (i = 1; i < color_arr.length; i++) 
    {  
        key = sorting_arr[i];
        color_key = color_arr[i]  
        j = i - 1;  
  
        while (j >= 0 && sorting_arr[j] > key) 
        {  
            sorting_arr[j + 1] = sorting_arr[j];
            color_arr[j+1] = sorting_arr[j]
            steps.push({color: [...color_arr], sorting: [...sorting_arr]})  
            j = j - 1;  
        }  
        color_arr[j+1] = color_key
        sorting_arr[j + 1] = key;
        steps.push({color: [...color_arr], sorting: [...sorting_arr]})  
    }  
    return steps
}  