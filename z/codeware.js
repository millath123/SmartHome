function queueTime(customers, n) {
    let tills = new Array(n).fill(0); 
  
    for (let i = 0; i < customers.length; i++) {
      let minLoadTill = tills.indexOf(Math.min(...tills)); 
      tills[minLoadTill] += customers[i]; 
    }
  
    return Math.max(...tills); 
  }
  