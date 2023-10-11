
// state init
const initialState = JSON.parse(localStorage.getItem("player_list")) || []

// reducer
const playerReducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_PLAYER":
            const newList= [...state]
            newList.push(action.payload)
            return newList
        default:
            return state
    }
}

// store
const {createStore} = window.Redux
const store = createStore(playerReducer)


// render redux list
const renderPlayersList = (list) => {
    if(!Array.isArray(list) || list.length ==0) {
        return
    }
    
    const ulElement = document.getElementById("listPlayers")
    if(!ulElement) return
    ulElement.innerHTML=""
    for(const player of list) {
        const li = document.createElement("li")
        li.textContent = player
        ulElement.appendChild(li)
    }
}

// render init hobby list
const initialPlayersList = store.getState()
renderPlayersList(initialPlayersList)

// handle form submit
const playerForm = document.getElementById("formId")
if(playerForm) {
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const newPlayer = document.getElementById("inputId").value
        const action = {
            type: "ADD_PLAYER",
            payload: newPlayer
        }
        store.dispatch(action)
    }
    playerForm.addEventListener("submit", handleFormSubmit)
}

// render lai giao dien
store.subscribe(() => {
    console.log("STATE UPDATE" , store.getState())
    const newPlayersList = store.getState()
    renderPlayersList(newPlayersList)

    localStorage.setItem("player_list", JSON.stringify(newPlayersList))
})

