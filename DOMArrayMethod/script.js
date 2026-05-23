const main=document.getElementById("main");
const addUserBtn=document.getElementById("add_user");
const doubleBtn=document.getElementById("double");
const showMillionairesBtn=document.getElementById("show_millionaires");
const sortBtn=document.getElementById("sort");
const calculateWealthBtn=document.getElementById("calculate_wealth");

let data=[];



const getRandomUser=async()=>{
    const res=await fetch("https://randomuser.me/api");
    const data=await res.json();

    const user=data.results[0];

    const newUser={
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()*1000000)
    }
    addData(newUser)
}
const addData=(obj)=>{
    data.push(obj);
    updateDOM();
}
const doubleMoney=()=>{
    data=data.map((user)=>{
        return {...user , money:user.money*2};

    })
    updateDOM();
}
const sortBYRichest=()=>{
    data.sort((a,b)=>b.money-a.money);

    updateDOM();
}
const showMillionaires=()=>{
    data=data.filter((user)=>user.money>1000000);
    updateDOM();

}
const calculateWealth=()=>{
    const wealth=data.reduce((acc,user)=>(
        acc+=user.money),0);

    const wealthEl=document.createElement("div");
    wealthEl.innerHTML=`<h3>Total Wealth: <strong>$${wealth.toFixed(2)}</strong></h3>`;
    main.appendChild(wealthEl);
}

const updateDOM=(providedData=data)=>{
main.innerHTML='<h2><strong>Person</strong>Wealth</h2>'
providedData.forEach((item)=>{
    const element=document.createElement("div");
    element.classList.add("person");
    element.innerHTML=`<strong>${item.name}</strong>$${item.money.toFixed(2)}`;
    main.appendChild(element);
})
}
addUserBtn.addEventListener("click",getRandomUser);
doubleBtn.addEventListener("click",doubleMoney);
sortBtn.addEventListener("click",sortBYRichest);
showMillionairesBtn.addEventListener("click",showMillionaires);
calculateWealthBtn.addEventListener("click",calculateWealth);
getRandomUser();
getRandomUser();
getRandomUser();

