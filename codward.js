// function positiveSum(arr) {
//     let sum = 0;
//   for (let i = 0; i< arr.length; i++){
//     if (arr[i] > 0){
//         sum += arr[i];
//     }
//   }
//   return sum
//   }


// function saleHotdogs(n) {
//   let price;
//   if (n < 5) {
//     price = n * 5; 
//   } else if (n >= 5 && n < 10) {
//     price = n * 4;
//   } else {
//     price = n * 3;
//   }

//   return price;
// }

// function replace(s) {
//   return s.replace(/[aeiou]/gi, '')
// }

// function squareSum(numbers){
// return numbers.reduce(function(sum,num){
//   return num*num+ sum
// },0)
// };


// let arr=[1,1,2,3]
// function removeduplicate(arr){
//   return a.filter((item, index) => a.indexOf(item) === index);
// }
// console.log(removeduplicate(arr));


// function take(arr,n){
//   return arr.slice(n,0)
// }


// function DNAStrand(dna){
//   var table = {
//     C : 'G',
//     G : 'C',
//     A : 'T',
//     T : 'A'
//   };
    
//   return dna.split('').map(function(cv) {
//     return table[cv]; 
//   }).join('');
// }


// function DNAStrand(dna){
//   var table={
//     C:'G',
//     G:'C',
//     A:'T',
//     T:'A'
//   };
//   return dna.split('').map(function(rslt){
//     return table(rslt)
//   }).join('')
// }


// function solve(s){
//   let lowerC = 0;
//   let upperC = 0;
//   for( let i = 0;i<s.length;i++){
//     if( s[i] == s[i].toUpperCase()){
//       upperC++;
//     }
//     else{
//       lowerC++;
//     }
//   }
//   return lowerC >= upperC ? s.toLowerCase() : s.toUpperCase()
// }


// function position(letter) {
//     if (letter.length !== 1 || !/[a-zA-Z]/.test(letter)) {
//       return "Please enter a single letter.";
//     }
  
//     const position = letter.toLowerCase().charCodeAt(0) - 96;
//     return `Position of alphabet: ${position}`;
//   }


// function sumDigits(number) {
//   var i=0;
//   var sum=0;
//   number=Math.abs(number)
//   while(number!=0)
//   {
//       sum+=number%10
//       number=Math.floor(number/10)
//   }
//   return sum
// }


// String.prototype.isUpperCase = function() {
//   if(string=== string.isUpperCase()){
//     return true;
//   }
//   else{
//     return false;
//   }
// };


// function domain(url){
//   url= url.toString().replace('https://','').replace('https://','').replace('.www','')
//   return url.split('.')[0];
// }


// function updateLight(current) {
// if (current === 'green'){
//     current = 'yellow';
// }
// else if(current==='yellow'){
//     current='red';
// }else if(current==='red'){
//     current='green';
// }else{}
// return current;
// }

// function unusualFive() {
//     let c= "hello";
//     return c.split().length();
//     }


// function gimme (triplet) {
//     const sorted = triplet.slice().sorted((a,b)=>a-b);
//     const middilevalue= sorted[1];
//     return triplet.indexOf(middilevalue);
//    }


// function openOrSenior(data){
// return (([age,handicap])=>{
//     if(age>55 &&handicap>7 ){
//         return Open ;
//     }
//     else{
//         return Senior;
//     }
// })
// }

// function stairsIn20(s){
//     let oneYrTotl=s.reduce((total, dailyStairs)=>total+dailyStairs,0);
//       let twentyYrEstmt=oneYrTotl*20;
//   return twentyYrEstmt;
//   }

// function wordsToMarks(string){
//     let sum = 0;
//     for (let i = 0; i < string.length; i++) {
//       if (string.charAt(i) == "a") {
//       sum += 1
//       } else if (string.charAt(i) == "b") {
//       sum += 2
//       } else if (string.charAt(i) == "c") {
//       sum += 3
//       } else if (string.charAt(i) == "d") {
//       sum += 4
//       } else if (string.charAt(i) == "e") {
//       sum += 5
//       } else if (string.charAt(i) == "f") {
//       sum += 6
//       } else if (string.charAt(i) == "g") {
//       sum += 7
//       } else if (string.charAt(i) == "h") {
//       sum += 8
//       } else if (string.charAt(i) == "i") {
//       sum += 9
//       } else if (string.charAt(i) == "j") {
//       sum += 10
//       } else if (string.charAt(i) == "k") {
//       sum += 11
//       } else if (string.charAt(i) == "l") {
//       sum += 12
//       } else if (string.charAt(i) == "m") {
//       sum += 13
//       } else if (string.charAt(i) == "n") {
//       sum += 14
//       } else if (string.charAt(i) == "o") {
//       sum += 15
//       } else if (string.charAt(i) == "p") {
//       sum += 16
//       } else if (string.charAt(i) == "q") {
//       sum += 17
//       } else if (string.charAt(i) == "r") {
//       sum += 18
//       } else if (string.charAt(i) == "s") {
//       sum += 19
//       } else if (string.charAt(i) == "t") {
//       sum += 20
//       } else if (string.charAt(i) == "u") {
//       sum += 21
//       } else if (string.charAt(i) == "v") {
//       sum += 22
//       } else if (string.charAt(i) == "w") {
//       sum += 23
//       } else if (string.charAt(i) == "x") {
//       sum += 24
//       } else if (string.charAt(i) == "y") {
//       sum += 25
//       } else if (string.charAt(i) == "z") {
//       sum += 26
//       }
//       }
    
//     return sum
//     }