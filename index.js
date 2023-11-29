const cohort = "2310-ghp-et-web-ft-sf";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohort}/events`;


const state = {
    events: [],
};

const eventList = document.querySelector('#event-list');

async function render(){
    await getEvents();
    renderEvents();
}
render();

async function getEvents(){
    try{
        const response = await fetch(API_URL);
        const events = await response.json();
        state.events = events.data;
//        console.log(events);
    } catch(error){
        console.log(error);
    }
}

function renderEvents(){
    if(!state.events){
        eventList.innerHTML = "<p>No data found!</p>"
    }

    state.events.map((event) => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event-card');
        const isoStr = event.date;
        const date = new Date(isoStr);
        const time = date.toTimeString();
        eventElement.innerHTML = `
        <div>Name: ${event.name}</div>
        <div>Date: ${event.date}</div>
        <div>Time: ${time} </div>
        <div>Location: ${event.location} </div>
        <div>Description: ${event.description}</div>
        `;
        eventList.appendChild(eventElement);
    })
}