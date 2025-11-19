const sectionForm = document.querySelector(".form-worker");
const btnAdd = document.getElementById("add-new-worker");
const btnExperience = document.querySelector(".btn-add-experience");
const imageUrl = document.querySelector('#imageUrl');
const imagePreview = document.querySelector("#imagePreview");
const placeholderText = document.querySelector("#placeholderText");
const bordCreate = document.querySelector(".place-workers");
const formExperience = document.querySelector(".form-experience");
const subForm = document.querySelector("#form-sub");

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

//for stock info workers
let infoWorker = [];
//all i need to take inputs from the form
const inputNom = document.querySelector("#nom-worker");
const inputPrenom = document.querySelector("#prenom-worker");
const emailWorker = document.querySelector("#email-worker");
const imageWorker = document.querySelector("#imageUrl");
const roleWorker = document.querySelector("#role-worker");

//part submit of form
subForm.addEventListener('click', (e) => {
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

    //conditions of all regex
    if (!nomRegex.test(nom)) {
        alert("invalide nom !!!")
        return;
    }
    if (!prenomRegex.test(prenom)) {
        alert("invalide prenom !!!")
        return;
    }
    if (!emailRegex.test(email)) {
        alert("email invalide !!!");
        return;
    }
    if (!imageurlRegex.test(imagE)) {
        alert("invalide url image !!!");
        return;
    }
    if (!roleRegex.test(role)) {
        alert("invalide role !!!");
        return;
    }

    //arrzy for stock experiences of workers
    let experienceWorker = [];

    const formExperiences = document.querySelectorAll(".form-exper");

    formExperiences.forEach(expDiv => {
        const poste = expDiv.querySelector(".post-exp").value;
        const dateStartExp = expDiv.querySelector("#date-start").value;
        const dateEndExp = expDiv.querySelector("#date-end").value;

        if(dateStartExp > dateEndExp){
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
    newDiv.className =
        "newOne flex justify-around items-center gap-4 mt-3 bg-white shadow-lg rounded-xl p-4 border border-gray-200 w-full max-w-md cursor-pointer hover:bg-blue-100/90";

    newDiv.innerHTML = `
   <img 
     src="${workers.imagE}" 
     class="w-10 h-10 object-cover rounded-xl border"
   />
   <div class="grid gap-1">
      <h5 class="text-[12px] font-semibold text-gray-800">NOM : 
        <span class="font-normal text-gray-600">${workers.nom}</span>
      </h5> 

      <h5 class="text-[12px] font-semibold text-red-800">ROLE : 
        <span class="font-normal text-gray-600">${workers.role}</span>
      </h5>
   </div>
`;

    bordCreate.append(newDiv);

    newDiv.addEventListener('click', () => {
        const infoPopup = document.createElement("div");

        let expPart = ``;

        workers.experience.forEach(exp => {
            expPart += `
            <br>
             <h3 class="col-span-4 text-center font-bold text-black text-lg uppercase mt-4">Expériences</h3>
        <div class="expCard border-2 border-green-300 flex flex-wrap bg-green-50 rounded-xl p-4 shadow-lg">
            <div class="experience text-sm mt-3">
                <p><span class="font-semibold">Poste :</span> ${exp.poste}</p>
                <p><span class="font-semibold">Début :</span> ${exp.dateStartExp}</p>
                <p><span class="font-semibold">Fin :</span> ${exp.dateEndExp}</p>
            </div>
        </div>
        `;
        });


        infoPopup.innerHTML = `
    <div class="all-info-popup bg-white w-full max-w-lg rounded-2xl shadow-xl p-4 h-[60vh] overflow-scroll [scrollbar-width:none] border-4 border-black/30">
        <button class="delet-workers"><i class="fas fa-trash-can test-[7px] text-red-600"></i></button>
        <div class="grid grid-cols-[1fr 2fr] gap-5 p-5">

            <img src="${workers.imagE}" alt="Worker image" class="w-28 h-28 object-cover rounded-xl shadow-md border-amber-300/50 border-4">

            <div class="infos gap-2 text-blue-700 text-sm border-[5px] h-[150px] p-3 col-span-1 rounded-xl shadow-lg">
                <div class="border-b-2 border-blue-100 mb-3">
                    <h3 class="font-bold text-black text-center"><i class="fas fa-person"></i> INFO GLOBAL</h3>
                </div>
                <h5><span class="font-semibold">Nom :</span> ${workers.nom}</h5>
                <h5><span class="font-semibold">Prénom :</span> ${workers.prenom}</h5>
                <h5><span class="font-semibold">Rôle :</span> ${workers.role}</h5>
                <h5><span class="font-semibold">Email :</span> ${workers.email}</h5>
            </div>

            <div class="col-span-2">
                ${expPart || "No Experiences"}
            </div>

        </div>
    </div>
    `;

        const sectionPopup = document.querySelector(".info-popup");
        sectionPopup.innerHTML = '';
        sectionPopup.classList.remove("hidden");
        sectionPopup.append(infoPopup);

        const deletWorker = document.querySelector(".delet-workers");

        deletWorker.addEventListener('click', () => {
            infoWorker.remove();
        })

        document.body.addEventListener('click', (e) => {
            if (e.target === sectionPopup) {
                sectionPopup.classList.add("hidden");
            }
        });
    });

    formExperience.innerHTML = ``;
    sectionForm.classList.add("hidden");
    sectionForm.querySelector("form").reset()
    imagePreview.src = '';
    imagePreview.classList.add("hidden");
    placeholderText.classList.remove("hidden")
})
//all i need to show workers and add in his rooms
const roombtnConfirence = document.querySelector(".btn-add-conference");
const roombtnServeurs = document.querySelector(".btn-add-serveurs");
const roombtnSecurite = document.querySelector(".btn-add-securite");
const roombtnReseption = document.querySelector(".btn-add-reseption");
const roombtnPersonnel = document.querySelector(".btn-add-personnel");
const roombtnArchives = document.querySelector(".btn-add-archives");

//function add to room workers
function addToRoom(infoWorker,i){ 
    
    const btnAddToRoom = document.querySelector(".btn-add-to-room");

     btnAddToRoom.addEventListener('click', () => { 

        let stockWorkerRoom = []; 

        stockWorkerRoom.push(infoWorker[i]) 

        console.log(stockWorkerRoom); 

        const roomSecurite = document.createElement("div");

         roomSecurite.innerHTML = `
         <div class="new-div-room flex">
          <img src="${stockWorkerRoom[i].imagE}" alt="image-room"
           <div class="info-room">
            <h5>${stockWorkerRoom[i].nom}</h5>
            <h5>${stockWorkerRoom[i].role}</h5>
         </div>
        </div>` 
        const roomFist = document.getElementById("salle-conference"); 
        roomSecurite.appendChild(roomFist); 
    }) 
}

//function to show workers in his roomes
function ShowInRoom(infoWorker, i, container){
            const showWorkers = document.querySelector(".workers");

            let showWorker = `
                <div class="flex items-center gap-4 p-4 bg-white shadow-md rounded-2xl border m-2 border-gray-200 hover:shadow-lg transition">
                <button class="btn-add-to-room bg-green-600 text-[8px] rounded-2xl p-2">ADD</button>
                <img src="${infoWorker[i].imagE}" 
                    class="w-14 h-14 object-cover rounded-xl border border-gray-300">

                <div class="flex flex-col gap-1">
                    <h5 class="text-[13px] font-semibold text-gray-700">NOM :<span class="font-normal text-gray-600">${infoWorker[i].nom}</span>
                    </h5>
                    <h5 class="text-[13px] font-semibold text-blue-600">ROLE :<span class="font-normal text-gray-600">${infoWorker[i].role}</span>
                    </h5>
                </div>
            </div>
            `;

            const tesOne = document.createElement("div");
            tesOne.className = "w-full place-self-center"
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

            tesOne.querySelector(".btn-add-to-room").addEventListener('click', () => {
                container.append(function cardinroom, id);
                //lcard in room function kan3tiwha id o katrJ3 lina div dyal lkart li ghadi n7to f room m9ada 3la 7sab dak id li 3Tanaha
            })
}
//btn to show all can enter room confirence
roombtnConfirence.addEventListener('click', () => {

    const showWorkers = document.querySelector(".workers");
    showWorkers.innerHTML = '';

    for (let i = 0; i < infoWorker.length; i++) {
        const role = infoWorker[i].role.toLowerCase().trim();

        if (role == "it" || role == "manager" || role == "securite" || role == "nettoyage" || role == "reseption" || role == "autres") {
            ShowInRoom(infoWorker, i, confirenceContainer)
        }
    }
})
//btn to show all can enter room serveurs
roombtnServeurs.addEventListener('click', () => {

    const showWorkers = document.querySelector(".workers");
    showWorkers.innerHTML = '';

    for (let i = 0; i < infoWorker.length; i++) {
        const role = infoWorker[i].role.toLowerCase().trim();

        if (role == "it" || role == "manager" || role == "nettoyage") {
            ShowInRoom(infoWorker, i);
        }
    }
})
//btn to show all can enter room securite
roombtnSecurite.addEventListener('click', () => {

    const showWorkers = document.querySelector(".workers");
    showWorkers.innerHTML = '';

    for (let i = 0; i < infoWorker.length; i++) {
        const role = infoWorker[i].role.toLowerCase().trim();

        if (role == "manager" || role == "securite" || role == "nettoyage") {
            ShowInRoom(infoWorker, i);
        }
    }
})
//btn to show all can enter room reseption
roombtnReseption.addEventListener('click', () => {

    const showWorkers = document.querySelector(".workers");
    showWorkers.innerHTML = '';

    for (let i = 0; i < infoWorker.length; i++) {
        const role = infoWorker[i].role.toLowerCase().trim();

        if (role == "manager" || role == "nettoyage" || role == "reseption") {
            ShowInRoom(infoWorker, i);
        }
    }
})
//btn to show all can enter room personnel
roombtnPersonnel.addEventListener('click', () => {

    const showWorkers = document.querySelector(".workers");
    showWorkers.innerHTML = '';

    for (let i = 0; i < infoWorker.length; i++) {
        const role = infoWorker[i].role.toLowerCase().trim();

        if (role == "it" || role == "manager" || role == "securite" || role == "nettoyage" || role == "reseption" || role == "autres") {
            ShowInRoom(infoWorker, i);
        }
    }
})
//btn to show all can enter room archives
roombtnArchives.addEventListener('click', () => {

    const showWorkers = document.querySelector(".workers");
    showWorkers.innerHTML = '';

    for (let i = 0; i < infoWorker.length; i++) {
        const role = infoWorker[i].role.toLowerCase().trim();

        if (role == "manager") {
            ShowInRoom(infoWorker, i);
        }
    }
})