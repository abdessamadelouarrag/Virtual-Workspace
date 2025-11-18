const sectionForm = document.querySelector(".form-worker");
const btnAdd = document.getElementById("add-new-worker");
const btnExperience = document.querySelector(".btn-add-experience");
const imageUrl = document.querySelector('#imageUrl');
const imagePreview = document.querySelector("#imagePreview");
const placeholderText = document.querySelector("#placeholderText");
const bordCreate = document.querySelector(".place-workers");

//btn for add new worker
btnAdd.addEventListener('click', () => {
    sectionForm.classList.remove("hidden")
})


//for close form if i click in body with out this form
document.body.addEventListener('click', (e) => {
    if (e.target === sectionForm) {
        sectionForm.classList.add("hidden");
        const form = sectionForm.querySelector("form");
        formExperience.innerHTML = ``;
        form.reset();
    }
});


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

const btnSupprimer = document.querySelector(".btn-supp-exp");
const formExperience = document.querySelector(".form-experience");

//btn for add experience 
btnExperience.addEventListener('click', () => {
    // console.log(formExperience)

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
                            <span class="text-sm font-medium mb-2">Nom de la Startup / Entreprise</span>
                            <input name="startup" type="text" required placeholder="Ex : TechWave Solutions"
                                class="startup-exp px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </label>
    
    
                        <label class="flex flex-col mt-4">
                            <span class="text-sm font-medium mb-2">Date de début</span>
                            <input name="date_debut" type="date" required
                                class="datestar-exp px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </label>
    
    
                        <label class="flex flex-col mt-4">
                            <span class="text-sm font-medium mb-2">Date de fin</span>
                            <input name="date_fin" type="date"
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

const inputNom = document.querySelector("#nom-worker");
const inputPrenom = document.querySelector("#prenom-worker");
const emailWorker = document.querySelector("#email-worker");
const imageWorker = document.querySelector("#imageUrl");
const roleWorker = document.querySelector("#role-worker");

//part submit of form
const subForm = document.querySelector("#form-sub");

subForm.addEventListener('click', (e) => {
    e.preventDefault();

    const nomRegex = /^[A-Za-z]{3,}$/;
    const prenomRegex = /^[A-Za-z]{3,}$/;
    const roleRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    const imageurlRegex = /^https?:\/\//;

    const nom = inputNom.value.trim();
    const prenom = inputPrenom.value.trim();
    const email = emailWorker.value.trim();
    const role = roleWorker.value.trim();
    const imagE = imageWorker.value.trim();

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

    let experienceWorker = [];

    const formExperiences = document.querySelectorAll(".form-exper");

    formExperiences.forEach(expDiv => {
        const poste = expDiv.querySelector('input[name="poste"]').value;
        const startup = expDiv.querySelector('input[name="startup"]').value;
        const dateStartExp = expDiv.querySelector('input[name="date_debut"]').value;
        const dateEndExp = expDiv.querySelector('input[name="date_fin"]').value;

        experienceWorker.push({ poste, startup, dateStartExp, dateEndExp });
    });


    if (!roleRegex.test(role)) {
        alert("invalide role !!!");
        return;
    }

    const workers = {
        nom,
        prenom,
        email,
        imagE,
        role: roleWorker.value,
        experience: experienceWorker,
    }

    infoWorker.push(workers);
    // console.log(infoWorker);
    // console.log(infoWorker[0])

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
                <p><span class="font-semibold">Startup :</span> ${exp.startup}</p>
                <p><span class="font-semibold">Début :</span> ${exp.dateStartExp}</p>
                <p><span class="font-semibold">Fin :</span> ${exp.dateEndExp}</p>
            </div>
        </div>
        `;
        });


        infoPopup.innerHTML = `
    <div class="all-info-popup bg-white w-full max-w-lg rounded-2xl shadow-xl p-4 h-[60vh] overflow-scroll [scrollbar-width:none] border-4 border-black/30">

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



    const roomS = document.querySelectorAll(".btn-add");
    const roomSecurity = document.querySelector("#salle-securite")


    roomS.forEach((room) => {

        room.addEventListener('click', () => {
            // let kayn = false;
            for (let i = 0; i < infoWorker.length; i++) {
                if (infoWorker[i].role === "securite") {

                    const roomWorker = document.createElement("div");

                    roomWorker.className = "room-here"
                    roomWorker.innerHTML = `
                    <div class="grid grid-cols-3 place-self-center bg-amber-300 rounded-2xl mb-3">
                        <button class="btn-delet-worker"><i class="fas fa-x text-[5px]"></i></button>
                        <img src="${workers.imagE}" alt="" class="w-8 h-8 object-cover rounded-3xl p-1">
                    </div>`
                    roomSecurity.append(roomWorker)
                    bordCreate.innerHTML = ``;
                    break;
                }
                const bntRemove = document.querySelector(".btn-delet-worker");

                bntRemove.addEventListener('click' , () => {
                    // const test = document.querySelector(".room-here");
                    .remove();
                })
            }
        })
    })
})

// })