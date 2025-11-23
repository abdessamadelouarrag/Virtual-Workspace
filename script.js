const sectionForm = document.querySelector(".form-worker");
const btnAdd = document.getElementById("add-new-worker");
const btnExperience = document.querySelector(".btn-add-experience");
const imageUrl = document.querySelector('#imageUrl');
const imagePreview = document.querySelector("#imagePreview");
const placeholderText = document.querySelector("#placeholderText");
const bordCreate = document.querySelector(".place-workers");
const formExperience = document.querySelector(".form-experience");
const subForm = document.querySelector("#form-sub");
// let assignedWorkers = []

//for stock info workers
let infoWorker = [];

//for stor function 
let newDevF;

//btn for add new worker
btnAdd.addEventListener('click', () => {
    sectionForm.classList.remove("hidden")
})

//for close form if i click in body with out this form
document.body.addEventListener('click', (e) => {
    if (e.target === sectionForm) {
        closeForm();
    }
});

//function close form after click inside
function closeForm() {
    sectionForm.classList.add("hidden");
    const form = sectionForm.querySelector("form");
    formExperience.innerHTML = '';
    form.reset();
    imagePreview.src = '';
    imagePreview.classList.add("hidden");
    placeholderText.classList.remove("hidden");
}

//for show url image in image preview
imageUrl.addEventListener('input', () => {
    const url = imageUrl.value.trim();

    if (url) {
        imagePreview.src = url;
        imagePreview.classList.remove("hidden");
        placeholderText.classList.add("hidden")
    }
    else {
        imagePreview.src = '';
        imagePreview.classList.add("hidden");
        placeholderText.classList.remove("hidden");
    }
})

//btn for add experience in popup
btnExperience.addEventListener('click', () => {

    const newExp = document.createElement("div");

    newExp.className = "form-new-exp"

    newExp.innerHTML = `<div class="form-exper bg-blue-900/10 border-2 rounded-2xl p-3 mt-6">
                        <div class="flex justify-between">
                            <h1 class="text-2xl font-semibold mb-6">Ajouter une Expérience</h1>
                            <button class="btn-supp-exp text-red-600 uppercase font-bold" type="button">supprimer</button>
                        </div>
    
                        <label class="flex flex-col mt-2">
                            <span class="text-sm font-medium mb-2">Poste occupé</span>
                            <input name="poste" type="text" required placeholder="Ex : Développeur IT"
                                class="post-exp px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </label>
    
                        <label class="flex flex-col mt-4">
                            <span class="text-sm font-medium mb-2">Date de début</span>
                            <input name="date_debut" type="date" id="date-start" required
                                class="datestar-exp px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </label>
    
                        <label class="flex flex-col mt-4">
                            <span class="text-sm font-medium mb-2">Date de fin</span>
                            <input name="date_fin" type="date" id="date-end"
                                class="dateend-exp px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </label>
                    </div>`

    formExperience.append(newExp);

    //part for delet form of experience 
    let supBtns = document.querySelectorAll('.btn-supp-exp')
    supBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.parentElement.parentElement.remove()
        })
    })
})

//all i need to take inputs from the form
const inputNom = document.querySelector("#nom-worker");
const inputPrenom = document.querySelector("#prenom-worker");
const emailWorker = document.querySelector("#email-worker");
const imageWorker = document.querySelector("#imageUrl");
const roleWorker = document.querySelector("#role-worker");

//part submit of form
subForm.addEventListener('click', (e) => {

    //remove default of submit refrech page
    e.preventDefault();
    //regex for inputs in the form
    const nomRegex = /^[A-Za-z]{3,}$/;
    const prenomRegex = /^[A-Za-z]{3,}$/;
    const roleRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    const imageurlRegex = /^https?:\/\//;

    //all inputs in the room
    const nom = inputNom.value.trim();
    const prenom = inputPrenom.value.trim();
    const email = emailWorker.value.trim();
    const role = roleWorker.value.trim();
    const imagE = imageWorker.value.trim();

    const nameError = document.querySelector(".name-error");
    const prenomError = document.querySelector(".prenom-error");
    const emailError = document.querySelector(".email-error");
    const photoError = document.querySelector(".photo-error");
    const roleError = document.querySelector(".role-error");


    //conditions of all regex
    if (!nomRegex.test(nom)) {
        nameError.classList.remove("hidden");
        return;
    }
    if (!prenomRegex.test(prenom)) {
        prenomError.classList.remove("hidden");
        return;
    }
    if (!emailRegex.test(email)) {
        emailError.classList.remove("hidden");
        return;
    }
    if (!imageurlRegex.test(imagE)) {
        photoError.classList.remove("hidden");
        return;
    }
    if (!roleRegex.test(role)) {
        roleError.classList.remove("hidden");
        return;
    }

    //arrzy for stock experiences of workers
    let experienceWorker = [];

    const formExperiences = document.querySelectorAll(".form-exper");

    formExperiences.forEach(expDiv => {
        const poste = expDiv.querySelector(".post-exp").value;
        const dateStartExp = expDiv.querySelector("#date-start").value;
        const dateEndExp = expDiv.querySelector("#date-end").value;

        if (dateStartExp > dateEndExp || dateStartExp == dateEndExp) {
            alert("date start is incorrect!!!")
            dateStartExp.value = "";
            dateStartExp.focus();
            return;
        }
        //push all experiences to the array experienceWorker
        experienceWorker.push({ poste, dateStartExp, dateEndExp });
    });

    //for take all info from the form global and form experiences
    const workers = {
        id: Date.now(),
        room : null,
        nom,
        prenom,
        email,
        imagE,
        role: roleWorker.value,
        experience: experienceWorker,
    }

    //push the infoss
    infoWorker.push(workers);

    //part create new div for show info worker in right bar
    const newDiv = document.createElement('div');
    newDiv.id = workers.id
    newDiv.className =
        "newOne flex justify-around items-center gap-4 mt-3 p-4 w-full max-w-md cursor-pointer rounded-xl shadow-lg border border-gray-700 bg-gray-600 hover:bg-gray-500";
    newDiv.innerHTML = `
    <img 
        src="${workers.imagE}" 
        class="w-10 h-10 object-cover rounded-xl border border-gray-300"
    />
    <div class="grid gap-1">
        <h5 class="text-[12px] font-semibold text-white">NOM : 
            <span class="font-normal text-gray-300">${workers.nom}</span>
        </h5> 

        <h5 class="text-[12px] font-semibold text-white">ROLE : 
            <span class="font-normal text-gray-300">${workers.role}</span>
        </h5>
    </div>
    `;
    bordCreate.append(newDiv);

    newDevF = function (id) {
        //find elem with same id
        let worker = infoWorker.find((ele) => ele.id == id)

        const infoPopup = document.createElement("div");

        let expPart = ``;

        worker.experience.forEach(exp => {
            expPart += `
        <br>
        <h3 class="col-span-4 text-center font-bold text-white text-lg uppercase mt-4">Expériences</h3>
        <div class="expCard border-2 border-gray-700 flex flex-wrap bg-gradient-to-r from-gray-500 to-black rounded-xl p-4 shadow-lg hover:from-gray-600 hover:to-gray-900 transition-all duration-300">
            <div class="experience text-sm mt-3 text-white">
                <p><span class="font-semibold text-gray-300">Poste :</span> ${exp.poste}</p>
                <p><span class="font-semibold text-gray-300">Début :</span> ${exp.dateStartExp}</p>
                <p><span class="font-semibold text-gray-300">Fin :</span> ${exp.dateEndExp}</p>
            </div>
        </div>
    `;
        });

        infoPopup.innerHTML = `
    <div class="all-info-popup w-full max-w-lg rounded-2xl shadow-xl p-4 h-[60vh] overflow-scroll [scrollbar-width:none] border-4 border-black/30 bg-gradient-to-b from-gray-600 to-black">
        <div class="grid grid-cols-[1fr 2fr] gap-5 p-5">

            <img src="${worker.imagE}" alt="Worker image" class="w-28 h-28 object-cover rounded-xl shadow-md border-amber-300/50 border-4">

            <div class="infos gap-2 text-sm col-span-1 rounded-xl shadow-lg p-3 bg-gray-800 border-[2px] border-gray-700 text-white">
                <div class="border-b-2 border-gray-600 mb-3">
                    <h3 class="font-bold text-center text-white"><i class="fas fa-person"></i> INFO GLOBAL</h3>
                </div>
                <h5><span class="font-semibold text-gray-300">Nom :</span> ${worker.nom}</h5>
                <h5><span class="font-semibold text-gray-300">Prénom :</span> ${worker.prenom}</h5>
                <h5><span class="font-semibold text-gray-300">Rôle :</span> ${worker.role}</h5>
                <h5><span class="font-semibold text-gray-300">Email :</span> ${worker.email}</h5>
            </div>

            <div class="col-span-2">
                ${expPart || `<p class="text-gray-300 text-center mt-4">No Experiences</p>`}
            </div>

        </div>
    </div>
`;


    const sectionPopup = document.querySelector(".info-popup");
    sectionPopup.innerHTML = '';
    sectionPopup.classList.remove("hidden");
    sectionPopup.append(infoPopup);

    //for hidden section after click inside
    document.body.addEventListener('click', (e) => {
        if (e.target === sectionPopup) {
            sectionPopup.classList.add("hidden");
        }
    });
    };

    //show info worker after return to side bar
    newDiv.addEventListener('click', () => {
        newDevF(newDiv.id);
    })

    //reset form and hidden after submit
    formExperience.innerHTML = ``;
    sectionForm.classList.add("hidden");
    sectionForm.querySelector("form").reset()
    imagePreview.src = '';
    imagePreview.classList.add("hidden");
    placeholderText.classList.remove("hidden")
})
//all i need to show workers and add in his rooms
const roombtnConfirence = document.querySelector(".btn-add-confirence");
const roombtnServeurs = document.querySelector(".btn-add-serveurs");
const roombtnSecurite = document.querySelector(".btn-add-securite");
const roombtnReseption = document.querySelector(".btn-add-reseption");
const roombtnPersonnel = document.querySelector(".btn-add-personnel");
const roombtnArchives = document.querySelector(".btn-add-archives");

//all divs rooms
const roomOfConfirence = document.querySelector("#salle-confirence");
const roomOfServeurs = document.querySelector("#salle-serveurs");
const roomOfSecurite = document.querySelector("#salle-securite");
const roomOfReseption = document.querySelector("#salle-reseption");
const roomOfPersonnel = document.querySelector("#salle-personnel");
const roomOfArchives = document.querySelector("#salle-archives");

//function card added in rooms
function card(i) {
    const worker = infoWorker[i];

    const cardDiv = document.createElement("div");
    cardDiv.className = "card-room flex gap-2 p-1 w-[120px] h-[40px] rounded-xl shadow-md border border-gray-700 bg-gray-600 hover:bg-gray-500 items-center";

    cardDiv.innerHTML = `
        <img src="${worker.imagE}" class="w-6 h-6 rounded-lg border border-gray-300 object-cover">
        <div class="flex flex-col">
            <h5 class="font-semibold text-[8px] text-white">${worker.nom} ${worker.prenom}</h5>
            <h5 class="text-[7px] text-gray-300">${worker.role}</h5>
            <h5 class="text-[7px] text-gray-300">${worker.room}</h5>
        </div>
        <button class="delete-worker-room text-red-500 font-bold ml-auto hover:text-red-700 transition-colors duration-200">X</button>
    `;

    cardDiv.querySelector(".delete-worker-room").addEventListener('click', () => {
        cardDiv.remove();

        //part dyal narj3 worker l sidebar 
        const newWorkerSideBar = document.createElement("div");
        newWorkerSideBar.className = "newOne flex justify-around items-center gap-4 mt-3 p-4 w-full max-w-md cursor-pointer rounded-xl shadow-lg border border-gray-700 bg-gray-600 hover:bg-gray-500";
        newWorkerSideBar.id = worker.id
        newWorkerSideBar.innerHTML = `
        <img src="${worker.imagE}" class="w-10 h-10 object-cover rounded-xl border border-gray-300"/>
        <div class="grid gap-1">
            <h5 class="text-[12px] font-semibold text-white">NOM : 
                <span class="font-normal text-gray-300">${worker.nom}</span>
            </h5> 

            <h5 class="text-[12px] font-semibold text-white">ROLE : 
                <span class="font-normal text-gray-300">${worker.role}</span>
            </h5>
        </div>
        `;
        bordCreate.appendChild(newWorkerSideBar);
        infoWorker.push(worker);

        newWorkerSideBar.addEventListener('click', () => {
            newDevF(worker.id);
        })

    })
    return cardDiv;
}

//function check limit in rooms
function checkLimit(container){

    if(container.children.length >= 5){
        return false;
    }
    return true;
}

//function to show workers in his roomes
function ShowInRoom(infoWorker, i, container) {

    const showWorkers = document.querySelector(".workers");

    let showWorker = `
    <div class="flex items-center gap-4 p-4 rounded-2xl border border-gray-700 bg-gray-500 shadow-md hover:shadow-lg hover:from-gray-600 hover:to-gray-900 transition-all duration-300 m-2">

        <button class="btn-add-to-room bg-green-600 text-[8px] rounded-2xl text-white p-2 hover:bg-green-700 transition-colors duration-200">ADD</button>

        <img src="${infoWorker[i].imagE}" 
            class="w-14 h-14 object-cover rounded-xl border border-gray-300">

        <div class="flex flex-col gap-1">
            <h5 class="text-[13px] font-semibold text-white">NOM : <span class="font-normal text-gray-300">${infoWorker[i].nom}</span></h5>
            <h5 class="text-[13px] font-semibold text-white">ROLE : <span class="font-normal text-gray-300">${infoWorker[i].role}</span></h5>
        </div>
    </div>
`;

    const tesOne = document.createElement("div");
    tesOne.className = "w-full place-self-center"
    tesOne.id = infoWorker[i].id
    tesOne.innerHTML = `
                <div class="m-2">
                    ${showWorker}
                </div>`
    const sectionWorkers = document.querySelector(".section-workers")
    sectionWorkers.classList.remove("hidden");
    showWorkers.append(tesOne);

    //btn close show workers
    const iconeCloseShow = document.querySelector("#close-showworkers")

    iconeCloseShow.addEventListener('click', () => {
        sectionWorkers.classList.add("hidden");
    })
    tesOne.querySelector(".btn-add-to-room").addEventListener("click", () => {
        
        // for check if false (limite) and stop
        if(checkLimit(container) == false){
            alert("Vous avez depass la limite ! ")
            return;
        }

        infoWorker[i].room = container.id 
        container.append(card(i)); // add card to room
        tesOne.remove();
        //to remove worker after add in room in sidebar
        const sideBar = document.getElementById(infoWorker[i].id);

        if (sideBar) {
            sideBar.remove();
        }
        //to remove element 1 in array infoworker
        infoWorker.splice(i, 1);
        //for close section workers after add in room
        sectionWorkers.classList.add("hidden")
    });
}

//function to show msg no worker for this room
function msgNoWorker(){
    const msgWorker = document.querySelector(".msg-no-worker");
    msgWorker.classList.remove("hidden");

    setTimeout(() => {
        msgWorker.classList.add("hidden");
    },3000)
}

/**this part for add worker in his room **/

//btn to show all can enter room confirence
roombtnConfirence.addEventListener('click', () => {
    const showWorkers = document.querySelector(".workers");
    showWorkers.innerHTML = '';

    //for know if worker aviliable
    let check = 0;

    for (let i = 0; i < infoWorker.length; i++) {
        const role = infoWorker[i].role.toLowerCase().trim();

        if (role == "it" || role == "manager" || role == "securite" || role == "nettoyage" || role == "reseption" || role == "autres") {
            ShowInRoom(infoWorker, i, roomOfConfirence)
            check = 1;
        }
    }
    if(check != 1){
        msgNoWorker();
    }
})
//btn to show all can enter room serveurs
roombtnServeurs.addEventListener('click', () => {

    const showWorkers = document.querySelector(".workers");
    showWorkers.innerHTML = '';

    //for know if worker aviliable
    let check = 0;

    for (let i = 0; i < infoWorker.length; i++) {
        const role = infoWorker[i].role.toLowerCase().trim();

        if (role == "it" || role == "manager" || role == "nettoyage") {
            ShowInRoom(infoWorker, i, roomOfServeurs);
            check = 1;
        }
    }
    if(check != 1){
        msgNoWorker();
    }
})
//btn to show all can enter room securite
roombtnSecurite.addEventListener('click', () => {

    const showWorkers = document.querySelector(".workers");
    showWorkers.innerHTML = '';

    //for know if worker aviliable
    let check = 0;

    for (let i = 0; i < infoWorker.length; i++) {
        const role = infoWorker[i].role.toLowerCase().trim();

        if (role == "manager" || role == "securite" || role == "nettoyage") {
            ShowInRoom(infoWorker, i, roomOfSecurite);
            check = 1
        }
    }
    if(check != 1){
        msgNoWorker();
    }
})
//btn to show all can enter room reseption
roombtnReseption.addEventListener('click', () => {

    const showWorkers = document.querySelector(".workers");
    showWorkers.innerHTML = '';

    //for know if worker aviliable
    let check = 0;

    for (let i = 0; i < infoWorker.length; i++) {
        const role = infoWorker[i].role.toLowerCase().trim();

        if (role == "manager" || role == "nettoyage" || role == "reseption") {
            ShowInRoom(infoWorker, i, roomOfReseption);
            check = 1;
        }
    }
    if(check != 1){
        msgNoWorker();
    }
})
//btn to show all can enter room personnel
roombtnPersonnel.addEventListener('click', () => {

    const showWorkers = document.querySelector(".workers");
    showWorkers.innerHTML = '';

    //for know if worker aviliable
    let check = 0;

    for (let i = 0; i < infoWorker.length; i++) {
        const role = infoWorker[i].role.toLowerCase().trim();

        if (role == "it" || role == "manager" || role == "securite" || role == "nettoyage" || role == "reseption" || role == "autres") {
            ShowInRoom(infoWorker, i, roomOfPersonnel);
            check = 1;
        }
    }
    if(check != 1){
        msgNoWorker();
    }
})
//btn to show all can enter room archives
roombtnArchives.addEventListener('click', () => {

    const showWorkers = document.querySelector(".workers");
    showWorkers.innerHTML = '';

    //for know if worker aviliable
    let check = 0;

    for (let i = 0; i < infoWorker.length; i++) {
        const role = infoWorker[i].role.toLowerCase().trim();

        if (role == "manager") {
            ShowInRoom(infoWorker, i, roomOfArchives);
            check = 1;
        }
    }
    if(check != 1){
        msgNoWorker();
    }
})