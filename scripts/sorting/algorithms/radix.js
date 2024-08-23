//Modified from https://www.geeksforgeeks.org/radix-sort/

"use strict";

const radixSort = (data) => {
  let color_arr = data.colors;
  let sorting_arr = data.sorting;
  if (!checkArrLen(color_arr, sorting_arr)) return null
  let steps = [];
  const maxNumber = getMax(sorting_arr)
  let color_sorted = [...color_arr]
  let sort_sorted = [...sorting_arr]

  for (let exp = 1; Math.floor(maxNumber / exp) > 0; exp *= 10){
    const sortedIteration = countSort(sort_sorted, color_sorted, exp)
    sort_sorted = sortedIteration[0]
    color_sorted = sortedIteration[1]
    steps.push({color: [...color_sorted], sorting: [...sort_sorted]})
  }

  return steps
}

const getMax = (arr) => {
  const length = arr.length;
  let mx = arr[0];
  for (let i = 1; i < length; i++) {
    if (arr[i] > mx) mx = arr[i];
  }
  return mx;
}

const countSort = (sort, col, exp) => {
  const length = sort.length
  let col_output = Array(length);
  let sort_output = Array(length);
  let count = Array(10).fill(0, 0);

  for (let i = 0; i < length; i++){
    const digit = Math.floor(sort[i] / exp) % 10;
    count[digit]++; 
  }

  for (let i=1; i<10; i++) count[i] += count[i-1];

  for (let i=length - 1; i>=0; i--){
    const digit = Math.floor(sort[i] / exp) % 10
    sort_output[count[digit] - 1] = sort[i]
    col_output[count[digit] - 1] = col[i]

    count[digit]--;
  }
  return [sort_output, col_output]

}