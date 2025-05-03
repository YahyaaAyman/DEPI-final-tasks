function hamada () {
  
  if(!hamada.cache){
    hamada.cache = {};
  }


if (num in hamada.cache) {
  console.log(`the value from chache ${num}`);
  return hamada.cache[num];
}

console.log(`calculating for ${num}`);
const result = num + 1;
hamada.cache[num] = result;
return result;
}