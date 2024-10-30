const AdminSisuEl = document.getElementById('admin-sisu')
let hikes = []

function getLeftPaneHTML(hikes) {
    let returnHTML = "";
    for (const h of hikes) {
         returnHTML +=    
          `<div>
             ${h.nimetus}
         </div>`;
    }
    return returnHTML;
 }

function getPageContentHTML() {
    const leftPanelHTML = getLeftPaneHTML(hikes)
    return `
    <div class="row">
        Matkaklubi matkadele registreerunud
    </div>
    <div class="row">
        <div class="col-4">
            ${leftPanelHTML}
        </div>
        <div class="col-8">
            parem paan
        </div>        
    </div>
    `;
}

function showPageContent() {
    AdminSisuEl.innerHTML = getPageContentHTML();
}

async function fetchHikes() {
    let response = await fetch('/api/matk');

    console.log(response.status); // 200
    console.log(response.statusText); // OK

    if (response.status === 200) {
        let data = await response.json();
        // handle data
        console.log(data)
        hikes = data
        showPageContent()
    }
}

fetchHikes()