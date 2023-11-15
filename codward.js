// function positiveSum(arr) {
//     let sum = 0;
//   for (let i = 0; i< arr.length; i++){
//     if (arr[i] > 0){
//         sum += arr[i];
//     }
//   }
//   return sum
//   }

function saleHotdogs(n) {
  let price;

  if (n < 5) {
    price = n * 5; 
  } else if (n >= 5 && n < 10) {
    price = n * 4;
  } else {
    price = n * 3;
  }

  return price;
}