const container=document.querySelector(".movie-container");
const seats=document.querySelectorAll(".row .seat:not(.occupied)");
const count=document.getElementById("count");
const total=document.getElementById("total");
const movieSelect=document.querySelector(".movies");

let ticketPrice=+movieSelect.value;

const updateSelectedCount=()=>{
    const selectedSeats=document.querySelectorAll(".row .seat.selected");
  
    const selectedSeatCount=selectedSeats.length;

    count.innerText=selectedSeatCount;
    total.innerText=selectedSeatCount*ticketPrice;

    saveData();

}

container.addEventListener("click",(e)=>{
    if(e.target.classList.contains("seat")&&
    !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");
            updateSelectedCount();
            
    }
})
movieSelect.addEventListener("change",e=>{
    ticketPrice=+e.target.value;
    updateSelectedCount();
   
})
const saveData=()=>{
   const selectedSeats=document.querySelectorAll(".row .seat.selected");

   const seatIndex=[...selectedSeats].map(seat=>[...seats].indexOf(seat));

   const data={
    seats:seatIndex,
    movieIndex:movieSelect.selectedIndex
   }
   localStorage.setItem("movieData",JSON.stringify(data));
}
const getData=()=>{
const data=JSON.parse(localStorage.getItem("movieData"));

if(data!==null){
    seats.forEach((seat,index)=>{
        if(data.seats.includes(index)){
            seat.classList.add("selected");
        }
    })
    movieSelect.selectedIndex=data.movieIndex;
    ticketPrice=+movieSelect.value;

}
}
getData();
updateSelectedCount();
