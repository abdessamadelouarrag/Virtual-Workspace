const sectionForm = document.querySelector(".form-worker");
const btnAdd = document.getElementById("add-new-worker");
const btnExperience = document.querySelector(".btn-add-experience");
const imageUrl = document.querySelector('#imageUrl');
const imagePreview = document.querySelector("#imagePreview");
const placeholderText = document.querySelector("#placeholderText");
const bordCreate = document.querySelector(".place-workers");
const subForm = document.querySelector("#form-sub");
const formExperience = document.querySelector(".form-experience");

// Configuration des salles avec restrictions
const sallesConfig = {
    'salle-reception': { 
        roles: ['receptionniste'], 
        capacite: 2,
        nom: 'Réception'
    },
    'salle-serveurs': { 
        roles: ['technicien it'], 
        capacite: 3,
        nom: 'Salle des serveurs'
    },
    'salle-securite': { 
        roles: ['agent de securite', 'securite'], 
        capacite: 2,
        nom: 'Salle de sécurité'
    },
    'salle-conference': { 
        roles: 'all', 
        capacite: 10,
        nom: 'Salle de conférence'
    },
    'salle-personnel': { 
        roles: 'all', 
        capacite: 15,
        nom: 'Salle du personnel'
    },
    'salle-archives': { 
        roles: 'restricted', 
        capacite: 2,
        nom: 'Salle d\'archives',
        interdits: ['nettoyage']
    }
};

// Stockage des employés
let infoWorker = [];
let workerIdCounter = 0;

// Btn pour ajouter un nouveau worker
btnAdd.addEventListener('click', () => {
    sectionForm.classList.remove("hidden");
});

// Fermer le form si je clique à l'extérieur
document.body.addEventListener('click', (e) => {
    if (e.target === sectionForm) {
        closeForm();
    }
});

// Fonction pour fermer le formulaire
function closeForm() {
    sectionForm.classList.add("hidden");
    const form = sectionForm.querySelector("form");
    formExperience.innerHTML = '';
    form.reset();
    imagePreview.src = '';
    imagePreview.classList.add("hidden");
    placeholderText.classList.remove("hidden");
}

// Preview de l'image
imageUrl.addEventListener('input', () => {
    const url = imageUrl.value.trim();
    
    if (url) {
        imagePreview.src = url;
        imagePreview.classList.remove("hidden");
        placeholderText.classList.add("hidden");
    } else {
        imagePreview.src = '';
        imagePreview.classList.add("hidden");
        placeholderText.classList.remove("hidden");
    }
});

// Btn pour ajouter une expérience
btnExperience.addEventListener('click', () => {
    const newExp = document.createElement("div");
    newExp.className = "form-new-exp";
    
    newExp.innerHTML = `
        <div class="form-exper bg-blue-900/10 border-2 rounded-2xl p-3 mt-6">
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
        </div>
    `;
    
    formExperience.append(newExp);
    
    // Supprimer l'expérience
    const btnSupp = newExp.querySelector('.btn-supp-exp');
    btnSupp.addEventListener('click', () => {
        newExp.remove();
    });
});

// Vérifier si un employé peut être assigné à une salle
function peutAssigner(role, salleId) {
    const config = sallesConfig[salleId];
    if (!config) return false;
    
    const roleNormalized = role.toLowerCase().trim();
    
    // Manager peut aller partout
    if (roleNormalized === 'manager') return true;
    
    // Vérifier les interdictions (ex: nettoyage dans archives)
    if (config.interdits && config.interdits.includes(roleNormalized)) {
        return false;
    }
    
    // Si la salle accepte tous les rôles
    if (config.roles === 'all') return true;
    
    // Si la salle a des restrictions (archives)
    if (config.roles === 'restricted') {
        // Nettoyage ne peut pas aller dans archives
        if (roleNormalized === 'nettoyage') return false;
        return true;
    }
    
    // Vérifier si le rôle est autorisé
    return config.roles.includes(roleNormalized);
}

// Compter les employés dans une salle
function compterEmployesDansSalle(salleId) {
    const salle = document.getElementById(salleId);
    return salle.querySelectorAll('.worker-in-room').length;
}

// Vérifier la capacité d'une salle
function salleADelaPlace(salleId) {
    const config = sallesConfig[salleId];
    const count = compterEmployesDansSalle(salleId);
    return count < config.capacite;
}

// Créer la carte d'un employé
function creerCarteEmploye(worker) {
    const newDiv = document.createElement('div');
    newDiv.className = "newOne flex justify-around items-center gap-4 mt-3 bg-white shadow-lg rounded-xl p-4 border border-gray-200 w-full max-w-md cursor-pointer hover:bg-blue-100/90";
    newDiv.dataset.workerId = worker.id;
    
    newDiv.innerHTML = `
        <img src="${worker.imagE}" class="w-10 h-10 object-cover rounded-xl border" />
        <div class="grid gap-1">
            <h5 class="text-[12px] font-semibold text-gray-800">NOM : 
                <span class="font-normal text-gray-600">${worker.nom}</span>
            </h5> 
            <h5 class="text-[12px] font-semibold text-red-800">ROLE : 
                <span class="font-normal text-gray-600">${worker.role}</span>
            </h5>
        </div>
    `;
    
    // Afficher le profil au clic
    newDiv.addEventListener('click', () => afficherProfilEmploye(worker));
    
    return newDiv;
}

// Afficher le profil d'un employé
function afficherProfilEmploye(worker) {
    const infoPopup = document.createElement("div");
    
    let expPart = '';
    if (worker.experience.length > 0) {
        worker.experience.forEach(exp => {
            expPart += `
                <div class="expCard border-2 border-green-300 flex flex-wrap bg-green-50 rounded-xl p-4 shadow-lg mt-3">
                    <div class="experience text-sm">
                        <p><span class="font-semibold">Poste :</span> ${exp.poste}</p>
                        <p><span class="font-semibold">Startup :</span> ${exp.startup}</p>
                        <p><span class="font-semibold">Début :</span> ${exp.dateStartExp}</p>
                        <p><span class="font-semibold">Fin :</span> ${exp.dateEndExp || 'En cours'}</p>
                    </div>
                </div>
            `;
        });
    } else {
        expPart = '<p class="text-center text-gray-500 mt-3">Aucune expérience</p>';
    }
    
    const locationText = worker.salle ? sallesConfig[worker.salle].nom : 'Non assigné';
    
    infoPopup.innerHTML = `
        <div class="all-info-popup bg-white w-full max-w-lg rounded-2xl shadow-xl p-4 h-[60vh] overflow-scroll [scrollbar-width:none] border-4 border-black/30">
            <div class="grid grid-cols-[1fr 2fr] gap-5 p-5">
                <img src="${worker.imagE}" alt="Worker image" class="w-28 h-28 object-cover rounded-xl shadow-md border-amber-300/50 border-4">
                
                <div class="infos gap-2 text-blue-700 text-sm border-[5px] h-auto p-3 col-span-1 rounded-xl shadow-lg">
                    <div class="border-b-2 border-blue-100 mb-3">
                        <h3 class="font-bold text-black text-center"><i class="fas fa-person"></i> INFO GLOBAL</h3>
                    </div>
                    <h5><span class="font-semibold">Nom :</span> ${worker.nom}</h5>
                    <h5><span class="font-semibold">Prénom :</span> ${worker.prenom}</h5>
                    <h5><span class="font-semibold">Rôle :</span> ${worker.role}</h5>
                    <h5><span class="font-semibold">Email :</span> ${worker.email}</h5>
                    <h5><span class="font-semibold">Localisation :</span> ${locationText}</h5>
                </div>
                
                <div class="col-span-2">
                    <h3 class="text-center font-bold text-black text-lg uppercase mt-4">Expériences</h3>
                    ${expPart}
                </div>
            </div>
        </div>
    `;
    
    const sectionPopup = document.querySelector(".info-popup");
    sectionPopup.innerHTML = '';
    sectionPopup.classList.remove("hidden");
    sectionPopup.append(infoPopup);
    
    // Fermer la popup
    const closePopup = (e) => {
        if (e.target === sectionPopup) {
            sectionPopup.classList.add("hidden");
            document.body.removeEventListener('click', closePopup);
        }
    };
    
    setTimeout(() => {
        document.body.addEventListener('click', closePopup);
    }, 100);
}

// Créer l'élément d'un employé dans une salle
function creerEmployeDansSalle(worker) {
    const roomWorker = document.createElement("div");
    roomWorker.className = "worker-in-room relative group";
    roomWorker.dataset.workerId = worker.id;
    
    roomWorker.innerHTML = `
        <div class="relative bg-gradient-to-br from-amber-300 to-amber-400 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <button class="btn-delet-worker absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100">
                <i class="fas fa-times text-[10px]"></i>
            </button>
            <img src="${worker.imagE}" alt="${worker.nom}" class="w-12 h-12 object-cover rounded-xl border-2 border-white" title="${worker.nom} - ${worker.role}">
        </div>
    `;
    
    // Supprimer l'employé de la salle
    const btnDelete = roomWorker.querySelector('.btn-delet-worker');
    btnDelete.addEventListener('click', (e) => {
        e.stopPropagation();
        retirerEmployeDeSalle(worker.id);
    });
    
    // Afficher le profil au clic
    roomWorker.addEventListener('click', () => afficherProfilEmploye(worker));
    
    return roomWorker;
}

// Retirer un employé d'une salle
function retirerEmployeDeSalle(workerId) {
    const worker = infoWorker.find(w => w.id === workerId);
    if (!worker) return;
    
    // Enlever de la salle
    const salleElement = document.getElementById(worker.salle);
    const workerElement = salleElement.querySelector(`[data-worker-id="${workerId}"]`);
    if (workerElement) {
        workerElement.remove();
    }
    
    worker.salle = null;
    
    // Remettre dans la liste
    const carte = creerCarteEmploye(worker);
    bordCreate.append(carte);
    
    // Mettre à jour les boutons d'ajout
    mettreAJourBoutonsAjout();
}

// Assigner un employé à une salle
function assignerEmploye(workerId, salleId) {
    const worker = infoWorker.find(w => w.id === workerId);
    if (!worker) return;
    
    // Vérifier les permissions
    if (!peutAssigner(worker.role, salleId)) {
        alert(`${worker.nom} (${worker.role}) ne peut pas être assigné à ${sallesConfig[salleId].nom}`);
        return;
    }
    
    // Vérifier la capacité
    if (!salleADelaPlace(salleId)) {
        alert(`${sallesConfig[salleId].nom} est pleine (capacité: ${sallesConfig[salleId].capacite})`);
        return;
    }
    
    // Enlever de la liste non assignés
    const carteUnassigned = bordCreate.querySelector(`[data-worker-id="${workerId}"]`);
    if (carteUnassigned) {
        carteUnassigned.remove();
    }
    
    // Ajouter dans la salle
    worker.salle = salleId;
    const salle = document.getElementById(salleId);
    const workerElement = creerEmployeDansSalle(worker);
    salle.append(workerElement);
    
    // Mettre à jour les boutons
    mettreAJourBoutonsAjout();
}

// Mettre à jour les boutons d'ajout dans les salles
function mettreAJourBoutonsAjout() {
    const boutons = document.querySelectorAll('.btn-add-to-room');
    
    boutons.forEach(btn => {
        const salleId = btn.dataset.salleId;
        
        btn.onclick = () => {
            // Filtrer les employés éligibles
            const eligible = infoWorker.filter(w => 
                !w.salle && peutAssigner(w.role, salleId)
            );
            
            if (eligible.length === 0) {
                alert('Aucun employé disponible pour cette salle');
                return;
            }
            
            // Créer une modale de sélection
            afficherModalSelection(eligible, salleId);
        };
    });
}

// Afficher la modale de sélection d'employés
function afficherModalSelection(workers, salleId) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    
    let optionsHTML = workers.map(w => `
        <div class="worker-option flex items-center gap-3 p-3 border rounded-lg hover:bg-blue-50 cursor-pointer" data-worker-id="${w.id}">
            <img src="${w.imagE}" class="w-10 h-10 object-cover rounded-lg">
            <div>
                <p class="font-semibold">${w.nom} ${w.prenom}</p>
                <p class="text-sm text-gray-600">${w.role}</p>
            </div>
        </div>
    `).join('');
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-6 max-w-md w-full max-h-[70vh] overflow-auto">
            <h2 class="text-2xl font-bold mb-4">Sélectionner un employé</h2>
            <p class="text-gray-600 mb-4">Pour : ${sallesConfig[salleId].nom}</p>
            <div class="space-y-2">
                ${optionsHTML}
            </div>
            <button class="btn-cancel mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">Annuler</button>
        </div>
    `;
    
    document.body.append(modal);
    
    // Gérer la sélection
    modal.querySelectorAll('.worker-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const workerId = parseInt(opt.dataset.workerId);
            assignerEmploye(workerId, salleId);
            modal.remove();
        });
    });
    
    // Annuler
    modal.querySelector('.btn-cancel').addEventListener('click', () => {
        modal.remove();
    });
    
    // Fermer au clic extérieur
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Soumission du formulaire
subForm.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Regex de validation
    const nomRegex = /^[A-Za-zÀ-ÿ]{3,}$/;
    const prenomRegex = /^[A-Za-zÀ-ÿ]{3,}$/;
    const roleRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/;
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    const imageurlRegex = /^https?:\/\/.+/;
    
    const nom = document.querySelector("#nom-worker").value.trim();
    const prenom = document.querySelector("#prenom-worker").value.trim();
    const email = document.querySelector("#email-worker").value.trim();
    const role = document.querySelector("#role-worker").value.trim();
    const imagE = imageUrl.value.trim();
    
    // Validations
    if (!nomRegex.test(nom)) {
        alert("Nom invalide ! (minimum 3 lettres)");
        return;
    }
    if (!prenomRegex.test(prenom)) {
        alert("Prénom invalide ! (minimum 3 lettres)");
        return;
    }
    if (!emailRegex.test(email)) {
        alert("Email invalide !");
        return;
    }
    if (!roleRegex.test(role)) {
        alert("Rôle invalide ! (minimum 2 caractères)");
        return;
    }
    if (!imageurlRegex.test(imagE)) {
        alert("URL d'image invalide ! (doit commencer par http:// ou https://)");
        return;
    }
    
    // Collecter les expériences
    let experienceWorker = [];
    const formExperiences = document.querySelectorAll(".form-exper");
    
    for (let expDiv of formExperiences) {
        const poste = expDiv.querySelector('input[name="poste"]').value.trim();
        const startup = expDiv.querySelector('input[name="startup"]').value.trim();
        const dateStartExp = expDiv.querySelector('input[name="date_debut"]').value;
        const dateEndExp = expDiv.querySelector('input[name="date_fin"]').value;
        
        // Validation des champs d'expérience
        if (!poste || !startup || !dateStartExp) {
            alert("Veuillez remplir tous les champs obligatoires des expériences (Poste, Entreprise, Date de début)");
            return;
        }
        
        // Validation des dates
        if (dateEndExp && new Date(dateStartExp) > new Date(dateEndExp)) {
            alert("La date de début doit être antérieure à la date de fin !");
            return;
        }
        
        experienceWorker.push({ poste, startup, dateStartExp, dateEndExp });
    }
    
    // Créer l'objet employé
    const worker = {
        id: workerIdCounter++,
        nom,
        prenom,
        email,
        imagE,
        role,
        experience: experienceWorker,
        salle: null
    };
    
    infoWorker.push(worker);
    
    // Ajouter à la liste
    const carte = creerCarteEmploye(worker);
    bordCreate.append(carte);
    
    // Fermer le formulaire
    closeForm();
    
    // Mettre à jour les boutons d'ajout
    mettreAJourBoutonsAjout();
});

// Initialiser les boutons d'ajout au chargement
document.addEventListener('DOMContentLoaded', () => {
    mettreAJourBoutonsAjout();
});