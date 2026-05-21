/*const num = [2, 3, 4, 5, 6, 7];

let new_num = num.reduce((acc, item) => (acc += item), 0);
let avg = new_num / num.length;
console.log(avg);

for (let i in num) {
  console.log(i ** 2);
}

list = ["henry", "jane", "anne"];
data = [];
for (let i in list) {
  data.push(list[i]);
}
  console.log(data);

  cat={
    color:"red",
    name:"ponan",
    age:4
  }
  for(let i in cat){
    console.log(cat[i])
  }
  person={
    name:"henry"
  }

  for(let n in person){
    cap_name=person[n].slice(0,1).toUpperCase()+person[n].slice(1).toLowerCase()
  }
  console.log(cap_name)


  const cat={a:1,b:2,c:3}

  for(let i in cat){
    console.log(i,cat[i])
  }
  name=cat['a']
  console.log(name)
  const total=num.reduce((acc,item)=>acc+=item,0)
console.log(total)
*/

let num = [2, 4, 5, 6, 7];
let total = 0;
for (let i of num) {
  total += i;

  console.log(total);
}

total = num.reduce((acc, item) => (acc += item), 0);
console.log(total);
