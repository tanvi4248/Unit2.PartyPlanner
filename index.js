const cohort = "2310-ghp-et-web-ft-sf";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohort}/events`;


const state = {
    events: [],
};

const eventList = document.querySelector('#event-list');
const eventform = document.querySelector('#event-form');
eventform.addEventListener('submit',addEvent);

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
        console.log(state.events);
    } catch(error){
        console.log(error);
    }
}

function renderEvents(){
    console.log(state.events);
    if(!state.events){
        eventList.innerHTML = "<p>No data found!</p>"
    }

    const eventCards = state.events.map((party) => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event-card');
        const isoStr = party.date;
        const date = new Date(isoStr);
        const time = date.toTimeString();
        eventElement.innerHTML = `
        <div>Name: ${party.name}</div>
        <div>Date: ${party.date}</div>
        <div>Time: ${time} </div>
        <div>Location: ${party.location} </div>
        <div>Description: ${party.description}</div>
        `;
         //delete button
         const deleteButton = document.createElement('button')
         deleteButton.textContent = 'Delete Event'
         eventElement.append(deleteButton);
 
         deleteButton.addEventListener("click",() => deleteEvent(party.id))

         //update button
         const updateButton = document.createElement('button')
         updateButton.textContent = 'Update Event'
         eventElement.append(updateButton);
 
         updateButton.addEventListener("click",() => updateEvent(party.id))

         return eventElement;
    })
    eventList.replaceChildren(...eventCards);
}


async function addEvent(event){
    const time = eventform.time.value;
    const date = eventform.date.value;
    const datecombine = `${time} ${date}`;
    const newdate = new Date(datecombine);
    const fdate = newdate.toISOString();
    event.preventDefault();
    try{
    const response = await fetch(API_URL,{
        method: 'POST',
        headers: {"content-type" : "application/json"},
        body: JSON.stringify({
            name: eventform.name.value,
            description: eventform.description.value,
            date: fdate,
            location: eventform.location.value,
        }),
    });
    if(!response.ok){
        throw new Error("Failed to create event");
    }
    render();
 }catch(error){
    console.error(error);
 }
}

//delete
async function deleteEvent(id){
    try{
        const response = await fetch(`${API_URL}/${id}`,{
            method: "DELETE",
        })
        render()
    }catch(error){
        console.error(error);
    }
}

//update
async function updateEvent(id){
    const time = eventform.time.value;
    const date = eventform.date.value;
    const datecombine = `${time} ${date}`;
    const newdate = new Date(datecombine);
    const fdate = newdate.toISOString();
    try{
    const response = await fetch(`${API_URL}/${id}`,{
        method: 'PUT',
        headers: {"content-type" : "application/json"},
        body: JSON.stringify({
            name: eventform.name.value,
            description: eventform.description.value,
            date: fdate,
            location: eventform.location.value,
        }),
    });
    if(!response.ok){
        throw new Error("Failed to create event");
    }
    render();
 }catch(error){
    console.error(error);
 }
}
