const express = require('express')
const ejs = require('ejs')
const path = require("path")

const app = express()

//app.use(express.json());
app.use(express.urlencoded({ extended: true })); // changed to use POST

app.set("views", path.join(__dirname,"views"))
app.set("view engine", "ejs")

const PORT = 3030

const matk1 = {
    nimetus: "Sügismatk kõrvemaal",
    pildiUrl: "/assets/korvemaa.jpg",
    kirjeldus: "Lähme ja oleme kolm päeva looduses",
    osalejad: []
}
const matk2 = {
    nimetus: "Süstamatk Hiiumaal",
    pildiUrl: "/assets/hiiumaa.jpg",
    kirjeldus: "Lähme ja oleme kolm päeva vee peal",
    osalejad: []
}
const matkad = [
    matk1,
    matk2,
    {
        nimetus: "Mägimatk Otepääl",
        pildiUrl: "/assets/otepaa.jpg",
        kirjeldus: "Lähme ja oleme kolm päeva mägedes",
        osalejad: []        
    }
]

const uudised = [
    {
        pealkiri: "Kassid valisid oma kuninga",
        kokkuvõte: "Ühes väikeses külas korraldati kummaline valimiste üritus, kus kassid said valida oma kuninga. Häälte lugemisel selgus, et populaarseim kandidaat oli 7-aastane must kass nimega Musta Muri. Külarahvas tähistas tema võitu, pakkudes kassidele maitsvat toitu ja palju mänguasju.",
        pildiUrl: "/assets/cat.jpg",
    },
    {
        pealkiri: "Koer õppis rääkima!",
        kokkuvõte: "Üks rõõmsameelne koer nimega Roki on saanud kuulsaks, kuna ta oskab öelda sõnu nagu 'tere', 'maiustused' ja 'jalutuskäik'. Roki peremees jagas videoid sotsiaalmeedias, kus koer rääkis oma lemmiktoidust. Inimesed armastavad Roki ja tema videod on saanud tuhanded vaatamised!",
        pildiUrl: "/assets/dog.jpg",
    },
    {
        pealkiri: "Hakkasime müüma kõrvitsajooki",
        kokkuvõte: "Ühes kohalikus kohvikus hakati müüma uut jooki – kõrvitsajooki. See jook on valmistatud värskest kõrvitsast ja maitsestatud kaneeli ja vanilliga. Klientide seas on see saanud nii populaarseks, et kohvik pidi tellima lisakoguseid. Inimesed ütlevad, et see jook teeb neid rõõmsaks ja soojaks!",
        pildiUrl: "/assets/drink.jpg",
    }        
]

const sonumid =[]

function registreeruMatkale(matkaIndex, nimi, email) {
    if (matkaIndex > matkad.length) {
        console.log("Vale matka indeks")
        return
    }
    const matk = matkad[matkaIndex]
    const uusMatkaja = {
        nimi: nimi,
        email: email,
        registreerumiseAeg: new Date()
    }
    matk.osalejad.push(uusMatkaja)
    console.log(matkad)
}

function salvestaKontakt(nimi, sonum) {

    const uusSonum = {
        nimi: nimi,
        sonum: sonum,
        kontaktiAeg: new Date()
    }
    sonumid.push(uusSonum)
    console.log(sonumid)
}

app.get('/test', (req, res) => {res.end('init')})
app.use('/', express.static("public")) // localhost:3030 shows static site

app.get('/', (req, res) => {
    res.render("esileht", { matkad: matkad });
});

app.get('/uudised', (req, res) => {
    res.render("uudised", { uudised: uudised });
});

app.get('/uudis/:id', (req, res) => {
    const uudisIndex = parseInt(req.params.id, 10); // Convert to an integer
    if (isNaN(uudisIndex) || uudisIndex < 0 || uudisIndex >= uudised.length) {
        return res.status(404).send('News not found');
    }
    res.render("uudis", { uudis: uudised[uudisIndex] });
});

app.get('/matk/:matkId', (req, res) => {
    const matkaIndex = parseInt(req.params.matkId, 10); // Convert to an integer
    if (isNaN(matkaIndex) || matkaIndex < 0 || matkaIndex >= matkad.length) {
        return res.status(404).send('Travel plan not found');
    }
    res.render("matk", { matk: matkad[matkaIndex], id:matkaIndex});
});

app.get('/registreerumine', (req,res) => {
    //res.json(req.query)
    registreeruMatkale(req.query.matkaIndex, req.query.nimi, req.query.email)
    //res.end("Registreeritud!!!")
    res.render('reg_kinnitus', {matk: matkad[req.query.matkaIndex], nimi: req.query.nimi})
    
})

app.post('/registreerumine', (req,res) => {
    console.log(req.body)
    registreeruMatkale(req.body.matkaIndex, req.body.nimi, req.body.email)
    res.render('reg_kinnitus', {matk: matkad[req.body.matkaIndex], nimi: req.body.nimi})
})

// contact
app.get('/kontakt', (req, res) => {
    res.render("kontakt");
});

app.post('/saadaKontakt', (req, res) => {
    salvestaKontakt(req.body.nimi, req.body.markus)
    res.render('kontakt_kinnitus', {nimi: req.body.nimi})
})

app.listen(PORT)
