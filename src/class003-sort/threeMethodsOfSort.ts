function swap(arr: number[], x: number, y: number) {
  const tmp = arr[x];
  arr[x] = arr[y];
  arr[y] = tmp;
}

// 选择排序
// 在 i ~ n-1 范围上，找到最小值并放在 i 位置，然后在 i+1 ~ n-1 范围上继续
function selectSort(arr: number[]) {
  if (arr == null || arr.length < 2) {
    return;
  }
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length - 1; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    swap(arr, i, minIndex);
  }
  return arr;
}

// 冒泡排序
// 在 0 ~ end 范围上，相邻位置较大的数滚下去，最大值最终来到 end 位置，然后 0 ~ end-1 范围上继续
function bubbleSort(arr: number[]) {
  if (arr == null || arr.length < 2) {
    return;
  }
  for (let end = arr.length - 1; end > 0; end--) {
    for (let j = 0; j < end; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

// 插入排序
// 在 0 ~ i 范围上已经有序，新来的数从右到左不再小的位置插入，然后继续

// function input() {
//   let arr = [];
//   if (process.argv.length > 2) {
//     for (let i = 2; i < process.argv.length; i++) {
//       arr[i - 2] = +process.argv[i];
//     }
//   } else {
//     arr = [3, 4, 5, 6, 7, 8];
//   }
// }
const theArr = [4, 5, 7, 9, 8, 3, 2, 6, 0];
console.log(selectSort(theArr));
console.log(bubbleSort(theArr));
