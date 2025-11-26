const sectionForm = document.querySelector(".form-worker");
const btnAdd = document.getElementById("add-new-worker");
const btnExperience = document.querySelector(".btn-add-experience");
const imageUrl = document.querySelector('#imageUrl');
const imagePreview = document.querySelector("#imagePreview");
const placeholderText = document.querySelector("#placeholderText");
const bordCreate = document.querySelector(".place-workers");
const formExperience = document.querySelector(".form-experience");
const subForm = document.querySelector("#form-sub");

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

    newExp.className = "form-new-exp";

newExp.innerHTML = `
<div class="form-exper bg-gray-800/70 backdrop-blur-md border-2 border-gray-700 
                rounded-2xl p-5 mt-6 shadow-lg hover:shadow-2xl 
                transition-all duration-300 animate-[slideFade_0.5s_ease]">

    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-white tracking-wide">Ajouter une Expérience</h1>
        <button class="btn-supp-exp text-red-500 font-bold uppercase hover:text-red-600 
                        transition-colors duration-200" type="button">supprimer</button>
    </div>

    <label class="flex flex-col mt-2">
        <span class="text-sm font-medium mb-2 text-white">Poste occupé</span>
        <input name="poste" type="text" required placeholder="Ex : Développeur IT"
            class="post-exp px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/30 
                   text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
    </label>

    <label class="flex flex-col mt-4">
        <span class="text-sm font-medium mb-2 text-white">Date de début</span>
        <input name="date_debut" type="date" id="date-start" required
            class="datestar-exp px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/30 
                   text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
    </label>

    <label class="flex flex-col mt-4">
        <span class="text-sm font-medium mb-2 text-white">Date de fin</span>
        <input name="date_fin" type="date" id="date-end"
            class="dateend-exp px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/30 
                   text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
    </label>
</div>
`;

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


const btnSkills = document.createElement("button");

    btnSkills.textContent = "Add Skills";
    btnSkills.className ="bg-red-600 p-3";
    btnSkills.setAttribute("type", "button")

    btnExperience.after(btnSkills);

    btnSkills.addEventListener('click', () => {
        const newElement = document.createElement("input");
        newElement.setAttribute("placeholder", "add skills");
        newElement.className ="skills"
        btnSkills.after(newElement);
    })

//part submit of form
subForm.addEventListener('click', (e) => {

    //remove default of submit refrech page
    e.preventDefault();
    //regex for inputs in the form
    const nomRegex = /^[A-Za-z]+$/;
    const prenomRegex = /^[A-Za-z]+$/;
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


    // conditions of all regex
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

    let arraySkills =[];
    const skills = document.querySelectorAll(".skills");

    skills.forEach(elem => {
        arraySkills.push(elem.value)
    })


    //for take all info from the form global and form experiences
    const workers = {
        id: Date.now(),
        room: null,
        nom,
        prenom,
        email,
        imagE,
        role: roleWorker.value,
        experience: experienceWorker,
        skills : arraySkills,
    }

    //push the infoss
    infoWorker.push(workers);

    //part create new div for show info worker in right bar
    const newDiv = document.createElement('div');
    newDiv.id = workers.id
    newDiv.className =
  "newOne flex items-center gap-4 mt-3 p-4 w-full max-w-md cursor-pointer " +
  "rounded-2xl shadow-xl border border-gray-700/60 bg-gray-800/60 " +
  "backdrop-blur-lg hover:bg-gray-800/80 transition-all duration-300 " +
  "hover:shadow-2xl hover:scale-[1.02] hover:border-blue-400/40 " +
  "animate-[sidebarFade_0.4s_ease]";

newDiv.innerHTML = `
    <img 
        src="${workers.imagE}" 
        class="w-12 h-12 object-cover rounded-2xl border border-gray-500/40 
               shadow-[0_0_10px_rgba(255,255,255,0.15)]"
    />

    <div class="flex flex-col leading-tight">
        <h5 class="text-[13px] font-semibold text-white tracking-wide">
            NOM :
            <span class="font-normal text-gray-300">${workers.nom}</span>
        </h5>

        <h5 class="text-[13px] font-semibold text-white tracking-wide">
            ROLE :
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
        <div class="mt-4 animate-[cardFade_0.45s_ease]">

            <h3 class="text-center font-bold text-white text-lg uppercase tracking-wide mb-3">
                Expériences
            </h3>

            <div class="expCard flex flex-col gap-3 bg-gray-800/60 backdrop-blur-md 
                        border border-gray-700 rounded-2xl p-5 shadow-xl 
                        hover:bg-gray-800/80 transition-all duration-300 
                        hover:translate-x-1 hover:shadow-2xl hover:scale-[1.02]">
                
                <p class="text-sm text-gray-300">
                    <span class="font-semibold text-white">• Poste :</span> ${exp.poste}
                </p>

                <p class="text-sm text-gray-300">
                    <span class="font-semibold text-white">• Début :</span> ${exp.dateStartExp}
                </p>

                <p class="text-sm text-gray-300">
                    <span class="font-semibold text-white">• Fin :</span> ${exp.dateEndExp}
                </p>
            </div>
        </div>
    `;
});

infoPopup.innerHTML = `
<div class="all-info-popup w-full max-w-lg rounded-2xl shadow-2xl p-5 
            h-[65vh] overflow-scroll [scrollbar-width:none] 
            bg-gradient-to-b from-gray-700 to-black border border-gray-700/50
            animate-[popupFade_0.5s_ease]">

    <div class="grid grid-cols-[1fr_2fr] gap-6">

        <!-- IMAGE -->
        <img src="${worker.imagE}" alt="Worker image" 
            class="w-32 h-32 object-cover rounded-2xl border-4 border-gray-400/40
                   shadow-lg animate-[glowPulse_2s_ease-in-out_infinite]">

        <!-- INFO GLOBAL -->
        <div class="infos text-sm rounded-2xl shadow-md p-4 
                    bg-gray-900/70 border border-gray-700 text-white 
                    animate-[cardFade_0.5s_ease]">

            <h3 class="font-bold text-center mb-3 text-white tracking-wide 
                       border-b border-gray-600 pb-2">
                <i class="fas fa-user"></i> INFO GLOBAL
            </h3>

            <h5><span class="font-semibold text-gray-300">Nom :</span> ${worker.nom}</h5>
            <h5><span class="font-semibold text-gray-300">Prénom :</span> ${worker.prenom}</h5>
            <h5><span class="font-semibold text-gray-300">Rôle :</span> ${worker.role}</h5>
            <h5><span class="font-semibold text-gray-300">Email :</span> ${worker.email}</h5>
        </div>

        <!-- EXPERIENCES -->
        <div class="col-span-2 animate-[cardFade_0.6s_ease]">
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
    cardDiv.className =
  "card-room flex items-center gap-1 lg:gap-2 mr-7 w-[70px] h-[28px] " +
  "lg:w-[100px] lg:h-[45px] rounded-xl shadow-md border " +
  "bg-gray-700/40 border-gray-600/60 backdrop-blur-md " +
  "hover:bg-gray-700/60 hover:shadow-xl hover:shadow-blue-500/20 " +
  "transition-all duration-300 animate-[miniCardFade_0.3s_ease]";

cardDiv.innerHTML = `
    <img 
        src="${worker.imagE}" 
        class="w-4 h-4 lg:w-6 lg:h-6 rounded-lg object-cover border border-gray-400/60 
        shadow-[0_0_5px_rgba(255,255,255,0.3)]"
    >

    <div class="flex flex-col leading-tight">
        <h5 class="font-semibold text-[6px] lg:text-[8px] text-white">${worker.nom}</h5>
        <h5 class="text-[5px] lg:text-[7px] text-gray-300">${worker.role}</h5>
        <h5 class="text-[5px] lg:text-[7px] text-gray-400">${worker.room}</h5>
    </div>

    <button 
        class="delete-worker-room text-red-400 font-bold ml-auto 
        hover:text-red-600 transition-all duration-200 text-[8px] lg:text-[10px]">
        ✖
    </button>
`;


    cardDiv.querySelector(".delete-worker-room").addEventListener('click', () => {
        cardDiv.remove();

        //for reste room
        worker.room = null;

        //part back worker to side bar 
        const newWorkerSideBar = document.createElement("div");
        newWorkerSideBar.className =
  "newOne flex items-center gap-4 mt-3 p-4 w-full max-w-md cursor-pointer " +
  "rounded-2xl shadow-xl border border-gray-700/60 bg-gray-800/60 " +
  "backdrop-blur-lg hover:bg-gray-800/80 transition-all duration-300 " +
  "hover:shadow-2xl hover:scale-[1.02] hover:border-blue-400/40 " +
  "animate-[sidebarFade_0.4s_ease]";

newWorkerSideBar.id = worker.id;

newWorkerSideBar.innerHTML = `
    <img 
        src="${worker.imagE}" 
        class="w-12 h-12 object-cover rounded-2xl border border-gray-500/40 
               shadow-[0_0_10px_rgba(255,255,255,0.15)]"
    />

    <div class="flex flex-col leading-tight">
        <h5 class="text-[13px] font-semibold text-white tracking-wide">
            NOM :
            <span class="font-normal text-gray-300">${worker.nom}</span>
        </h5>

        <h5 class="text-[13px] font-semibold text-white tracking-wide">
            ROLE :
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
function checkLimit(container) {

    if (container.children.length >= 5) {
        return false;
    }
    if (container.children.length > 0) {
        return true;
    }
}

//function to show workers in his roomes
function ShowInRoom(infoWorker, i, container) {

    const showWorkers = document.querySelector(".workers");

    let showWorker = `
    <div class="workerInRoom flex items-center gap-4 p-4 rounded-3xl border border-gray-700 
            bg-gradient-to-r from-gray-800 to-gray-700 shadow-xl hover:shadow-2xl 
            transition-all duration-300 m-2 animate-[slideFade_0.5s_ease] hover:scale-[1.02]">

    <!-- ADD button -->
    <button class="btn-add-to-room bg-green-600 text-[9px] rounded-2xl text-white px-3 py-1 
            hover:bg-green-500 transition-colors duration-200 shadow-sm hover:shadow-md uppercase tracking-wide font-semibold">
        ADD
    </button>

    <!-- Worker image -->
    <img src="${infoWorker[i].imagE}" 
        class="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-2xl border border-gray-400 
               shadow-inner transition-all duration-300 hover:scale-105 hover:shadow-lg"/>

    <!-- Worker info -->
    <div class="flex flex-col gap-1">
        <h5 class="text-[13px] lg:text-[14px] font-semibold text-white tracking-wide">
            NOM : <span class="font-normal text-gray-300">${infoWorker[i].nom}</span>
        </h5>
        <h5 class="text-[13px] lg:text-[14px] font-semibold text-white tracking-wide">
            ROLE : <span class="font-normal text-gray-300">${infoWorker[i].role}</span>
        </h5>
    </div>
</div>

`

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

        // for remove bg red after add one worker
        if(checkLimit(container) == true){
            container.classList.remove("bg-red-600/50");
        }
        console.log(infoWorker[i])
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
function msgNoWorker() {
    const msgWorker = document.querySelector(".msg-no-worker");
    msgWorker.classList.remove("hidden");

    setTimeout(() => {
        msgWorker.classList.add("hidden");
    },2000)
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