//Modified from https://www.geeksforgeeks.org/bubble-sort-algorithm/

const bubbleSort = (data) => {
    let color_arr = data.colors;
    let sorting_arr = data.sorting;
    if (!checkArrLen(color_arr, sorting_arr)) return null

    const steps = [];
    for (var i = 0; i < sorting_arr.length; i++) {
        // Last i elements are already in place  
        for (var j = 0; j < (sorting_arr.length - i - 1); j++) {
            // Checking if the item at present iteration 
            // is greater than the next iteration
            if (sorting_arr[j] > sorting_arr[j + 1]) {
                // If the condition is true
                // then swap them
                swap(color_arr, j, j+1)
                swap(sorting_arr, j, j+1)
                steps.push({color: [...color_arr], sorting: [...sorting_arr]})
            }
        }
    }
    return steps
}