process.on("message", (msg) => {
      let contador = parseInt(msg)
      process.send(calculo(contador))
      process.exit()
  });
  
function calculo(cantidad) {
    let counts = {};
    let arr = [];
    for (let i = 0; i < cantidad; i++) {
      arr.push(Math.floor(Math.random() * 1001));
    }
    for (const num of arr) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts;
  }

process.send('ready')