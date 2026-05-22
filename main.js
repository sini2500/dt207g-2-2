const apiUrl = "http://localhost:3000/api/workexperience";

// Hämta alla
async function getWorkExperience() {

    const response = await fetch(apiUrl);
    console.log(response);

    const data = await response.json();

    const container = document.getElementById("work-list");

    container.innerHTML = "";

    data.forEach(work => {

        container.innerHTML += `
        <article class="work-card">

            <div class="work-card-header">
                <h2>${work.companyname}</h2>
                <p class="job-title">${work.jobtitle}</p>
            </div>

            <div class="work-card-body">
                <p><strong>Plats:</strong>${work.location}</p>
                <p><strong>Period:</strong>${work.startdate} - ${work.enddate}</p>
                <p class="description">${work.description}</p>
            </div>

            <div class="work-card-buttons">
                <button class="updateBtn" onclick="startUpdatingWork(${work.id})">
                    Uppdatera
                </button>
                <button class="deleteBtn" onclick="deleteWork(${work.id})">
                    Radera
                </button>
            </div>

        </article>
        `;

    });

}

// Radera
async function deleteWork(id) {

    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });

    getWorkExperience();
}

// Lägg till

async function addWorkExperience(e) {

    e.preventDefault();

    const companyname = document.getElementById("companyname").value.trim();

    const jobtitle = document.getElementById("jobtitle").value.trim();

    const location = document.getElementById("location").value.trim();

    const startdate = document.getElementById("startdate").value;

    const enddate = document.getElementById("enddate").value;

    const description = document.getElementById("description").value.trim();

    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        document.getElementById("message").innerText = "Alla fält måste fyllas i";
        return;
    }

    const work = { companyname, jobtitle, location, startdate, enddate, description };

    const response = await fetch(apiUrl, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(work)

    });

    const data = await response.json();

    document.getElementById("message").innerText = data.message;

}

// Uppdatera
// ?


// om listan finns
if (document.getElementById("work-list")) {
    getWorkExperience();
}

// om formuläret finns
if (document.getElementById("workForm")) {
    document.getElementById("workForm").addEventListener("submit", addWorkExperience);
}