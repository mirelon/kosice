function initMap() {
    window.mapa = L.map('mapDiv').setView([48.721, 21.257], 12)
    L.tileLayer('https://api.tomtom.com/map/1/tile/basic/{style}/{z}/{x}/{y}.{format}?key={accessToken}&tileSize={tileSize}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        style: 'main', // night
        format: 'png',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'hQTcD1ASTmxsaLdgzev0K6Fts55chfw4'
    }).addTo(window.mapa)

    const legend = L.control({position: 'bottomleft'})
    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend')
        let labels = ['<strong>Farby</strong>']
        labels.push('<i style="background:#2A81CB">Vonku</i>')
        labels.push('<i style="background:#9C2BCB">Vonku + livestream</i>')
        labels.push('<i style="background:#7B7B7B">Vnútri</i>')
        labels.push('<i style="background:#2AAD27">Čas do 10 minút</i>')
        labels.push('<i style="background:#FFD326">Čas do 20 minút</i>')
        labels.push('<i style="background:#CAC428">Čas do 40 minút</i>')
        labels.push('<i style="background:#CB8427">Čas do 60 minút</i>')
        labels.push('<i style="background:#CB2B3E">Čas nad 60 minút</i>')
        div.innerHTML = labels.join('<br/>')
        return div
    };
    legend.addTo(window.mapa);
    fetchData()
}

window.onload = initMap

const geocodeData = [
    ["Kultúrny dom MČ Barca, Barčianská 31", 48.6851282, 21.2622264],
    ["Telocvičňa pri MÚ BARCA, Abovská 30", 48.6784262, 21.2647599],
    ["letisko (príjazd len od Pereša,výjazd iba do Barce)", 48.673234, 21.236836],
    ["ZŠ Krosnianska 2, telocvičňa", 48.7365091, 21.2888238],
    ["ZŠ Ľudovíta Fulu, telocvičňa", 48.7278534, 21.2879551],
    ["ZŠ Fábryho 44", 48.7439362, 21.2815874],
    ["ZŠ Krosnianska 4, vestibul – chodba", 48.7397736, 21.2860073],
    ["ZŠ Postupimska 37, telocvičňa", 48.7314433, 21.2857688],
    ["Jegorovovo námestie 5", 48.7371829999999, 21.280014],
    ["CVČ Charkovská 1", 48.7055577, 21.2291622],
    ["Miestný úrad – Dvorkinová 7", 48.7267268, 21.2903436],
    ["Bistro u Tona – Kalinovska 22", 48.743451, 21.2760052],
    ["Výmeník- Jegorovovo námestie 5", 48.7368317, 21.279863],
    ["Depo DPMK, Hornádska 10", 48.7364827, 21.2715443],
    ["Hotelová akadémia, Južná trieda 10, jedáleň, telocvičňa / vonku", 48.712122, 21.261896],
    ["Staničná 13, foyer / vonku podľa počasia", 48.7074183999999, 21.2643311],
    ["ZŠ Požiarnicka 3, v triede / vonku podľa počasia", 48.7126333, 21.264097],
    ["Kasarne Kulturpark, Kukučínová 2", 48.714124, 21.2565186],
    ["Steel Arena, Nerudova 12", 48.7153262, 21.2481113],
    ["ZŠ Užhorodská 39, triedy a cez okienko vstupnej chodby", 48.7000162, 21.256776],
    ["SOŠ Ostrovského 1, telocvičňa alebo vonku podľa počasia", 48.7034783, 21.2497646],
    ["Miestny úrad, Široká 17/A", 48.7758291, 21.2083229],
    ["Futbalové ihrisko FK Košická Nová Ves, Poľná 1", 48.7335653, 21.3013117],
    ["Kultúrny dom, Opátska 18", 48.6724116, 21.3140639],
    ["Kaštieľ Krásna, Nám. sv. Cyrila a Metoda 2", 48.6706004, 21.31829],
    ["Telocvičňa, ZŠ Rehoľná 2", 48.6703058, 21.3179283],
    ["Kultúrny dom, Lorinčík 15", 48.6894436, 21.1923378],
    ["ZŠ Ľ. Podjavorinskej 1", 48.6974207, 21.2231637],
    ["Kultúrny dom, Pod horou 22", 48.7095455, 21.2027202],
    ["Telocvičňa ZŠ Galaktická 9", 48.6769895, 21.3052724],
    ["Telocvičňa ZŠ Družicová 4", 48.679174, 21.3019322],
    ["Telocvičňa ZŠ Jenisejská 22", 48.684872, 21.291575],
    ["Telocvičňa ZŠ Dneperská 4", 48.6878847, 21.287223],
    ["Telocvičňa ZŠ Bukovecká 17", 48.6958415999999, 21.2822489],
    ["Obchodná akadémia Polárna 1", 48.6829243, 21.2954068],
    ["Parkovisko pri Miestnom úrade, Poludníkova 7", 48.6827244, 21.2964875],
    ["Výmenník Važecká, Galaktická 1A", 48.6759941, 21.3003448],
    ["Zberný dvor spoločnosti Kosit, Napájadlá 17/A", 48.6795141, 21.2883768],
    ["Parkovisko pri OC Kaufland, Napájadlá 1/D", 48.7152616, 21.2368727],
    ["Parkovisko za Poštou Košice 12, Spišské námestie 3- Levočská", 48.6886579, 21.2835228],
    ["Parkovisko pri splave, Jenisejská 45", 48.6868484, 21.2916016],
    ["Parkovisko pri Hypermarkete Tesco, Napájadlá 16", 48.6804257, 21.2884095],
    ["OC Pereš, Revúcka 14", 48.6886802, 21.2114385],
    ["Futbalové ihrisko, Kovaľská 284", 48.662328, 21.202626],
    ["Bilingválne gymnázium, Park mládeže 5: Trakt A", 48.7408529, 21.254306],
    ["Bilingválne gymnázium, Park mládeže 5: Trakt B", 48.740601, 21.253762],
    ["Amfiteáter, Festivalové námestie 2", 48.7270899, 21.2386952],
    ["Technická Univerzita – Aula Maxima, Letná 9", 48.7306564999999, 21.2458953],
    ["Technická Univerzita – Združená poslucháreň, Boženy Němcovej 9", 48.7304697999999, 21.2455912],
    ["Univerzita veterinárneho lekárstva a farmácie – Pavilón 32, Komenského 73", 48.738437, 21.2460466],
    ["ZŠ Polianska 1, vonku", 48.7477084, 21.2436792],
    ["Telocvičňa na ZŠ Hroncova 23", 48.7324475, 21.2398508],
    ["ZŠ Tomášikova 31, vonku", 48.7354911, 21.2528693],
    ["Spojená škola Odborárska 2", 48.7383445, 21.2561384],
    ["Basketbalová hala Lokomotíva, Čermeľská cesta 1", 48.7404933, 21.2433762],
    ["ZŠ Starozagorská 8", 48.717127, 21.2159466],
    ["ZŠ Mateja Lechkého, Jána Pavla II, 1", 48.7206886, 21.2138988],
    ["ZŠ Drábova 3", 48.7078847, 21.2168509],
    ["Miestny úrad, Trieda KVP 1", 48.7161576, 21.2136782],
    ["Budova aktivačných pracovníkov Miestneho úradu, Trieda KVP 1", 48.7161592, 21.2136903],
    ["Garáž pod Miestnym úradom KVP, Trieda KVP 1", 48.7161576, 21.2136782],
    ["Telocvičňa na ZŠ Janigova 2", 48.7162981, 21.2088217],
    ["Telocvičňa na Spojenej škole sv. Košických mučeníkov, Čordákova 50", 48.7153089, 21.2093259],
    ["Výmenník Wuppertálska, Titogradská 17", 48.7180125, 21.2172288],
    ["Drocárov park – športové zázemie vonku", 48.7092771, 21.2145684],
    ["Telocvičňa na ZŠ Belehradská 21", 48.7561113, 21.2709952],
    ["ZŠ Bruselská 18, ihrisko", 48.7577544, 21.2657211],
    ["Poliklinika Ťahanovce, Americká trieda 17", 48.7549216, 21.267797],
    ["Elokované pracovisko ZUŠ Jantárova, Aténska 1", 48.7152802, 21.2654721],
    ["Centrum voľného času, Juhoslovanská 2", 48.7545843, 21.2712706],
    ["Kultúrne stredisko, Budapeštianska 30", 48.7546048, 21.2689108],
    ["Skatepark Ťahanovce, Bruselská – Európska trieda", 48.7561952, 21.2663025],
    ["Mestská krytá plaváreň, Protifašistických bojovníkov 4", 48.7198481, 21.264629],
    ["Kunsthalle, Rumanova 1", 48.724943, 21.260932],
    ["SPŠ Dopravná, Hlavná 113", 48.7258598, 21.2556198],
    ["Kunsthalle, Rumanova 1", 48.724943, 21.260932],
    ["Angels Aréna, Pri Jazdiarni 1", 48.7260836, 21.2503246],
    ["Štátne divadlo, Hlavná 32", 48.7217904, 21.2573527],
    ["Stará radnica, Hlavná 59", 48.7233571, 21.2569049],
    ["Univerzita Pavla Jozefa Šafárika, Dr. Kostlivého 1", 48.7192339, 21.2512567],
    ["Evanjelické gymnázium J.A. Komenského, Škultétyho 10", 48.7196192, 21.2485232],
    ["Sobášna sieň, Hviezdoslavova 7", 48.7264247, 21.2507379],
    ["Gymnázium M.R. Štefánika, Laca Novomeského 4", 48.7241045, 21.2443651],
    ["Výmenník Štítova, Štítova 3", 48.7262, 21.2409577],
    ["Štátna filharmónia – Dom umenia, Moyzesova 66", 48.7170797, 21.254122],
    ["Tabačka Kulturfabrik, Gorkého 2", 48.729069, 21.2559742],
    ["Kultúrne stredisko, Železiarenská 7", 48.6340848, 21.1714885],
    ["Spoločenský dom, Mládežnícka 1", 48.6348096, 21.1674967],
    ["Športový areál, Mládežnícka 5", 48.634907, 21.168586],
    ["Vstupný areál U.S. Steel Košice", 48.6228045999999, 21.1924367],
    ["Parkovisko pri Kultúrnom dome, Podbeľová 1", 48.1634025, 17.1856934],
    ["Dvor Miestneho úradu, Ťahanovská 31", 48.7575929, 21.2548345],
    ["Futbalový štadión, rekreačná oblasť Anička", 48.75293, 21.252646],
    ["Kultúrne stredisko Jánošík, Nižná úvrať 25", 48.7164023, 21.2799572],
    ["Spojená škola, Opatovská cesta 101", 48.7045134, 21.2831808],
    ["Poslucháreň bývalej ZŠ, Petzvalova 4", 48.7011952999999, 21.2336375],
    ["CVČ Domino, Popradská 86", 48.7055577, 21.2291622],
    ["Stredná športová škola, Trieda SNP 104", 48.705147, 21.241206],
    ["Centrum voľného času, Orgovánová 5", 48.7118672999999, 21.2393893],
    ["Telocvičňa v basketbalovej hale ZŠ Bernolákova 16", 48.7095467, 21.2410818],
    ["Ústav telesnej výchovy a športu UPJŠ, Ondavská 21", 48.7202647, 21.2398985],
    ["Spoločenský pavilón, Trieda SNP 61", 48.7073703, 21.2407139],
    ["MČ Západ, Magistrát mesta Košice, Trieda SNP 48/A (vchod od parkoviska)", 48.7141745, 21.232887],
    ["Saleziáni don Bosca, Tri hôrky 17", 48.708415, 21.242494],
    ["Miestny úrad, Trieda SNP 39", 48.726417, 21.2507707],
    ["ZŠ Považská 12, telocvičňa/vonku", 48.7195647, 21.2381087]
]

function geocode(adresa) {
    if (adresa === 'Odberné miesto') {
        return [0, 0]
    }
    for (const geocodeDatum of geocodeData) {
        if (adresa === geocodeDatum[0]) {
            return geocodeDatum.slice(1)
        }
    }
    console.warn(`Could not geocode ${adresa}`)
    return [0, 0]
}

function coloredIcon(color) {
    return new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
}

function addMarker(lat, lng, color, tooltip) {
    console.log(`Adding N ${lat} E ${lng}, color ${color}, tooltip ${tooltip}`)
    const urlRegexp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    L.marker([lat, lng], {
        title: tooltip,
        icon: coloredIcon(color)
    })
        .bindPopup(tooltip.replace('\n', '<br/>').replace(urlRegexp, "<a href='$1' target='_blank'>$1</a>"))
        .addTo(window.mapa)
}

function fetchData() {
    fetchKosice()
    fetchOkolie()
}

function isLive() {
    return (Date.now() > 1604124000000 && Date.now() < 1604268000000)
        || (Date.now() > 1604772000000 && Date.now() < 1604872800000)
}

function fetchKosice() {
    fetch('miesta.html')
        .then(response => response.text())
        .then(html => {
                const wrappers = new DOMParser().parseFromString(html, 'text/html').getElementsByClassName('elementor-tab-content')
                const trs = Array.from(wrappers).flatMap(wrapper => {
                    return Array.from(wrapper.getElementsByTagName('tr'))
                })
                const data = Array.from(trs).map(tr => {
                    const nazov = tr.getElementsByTagName('td')[0].innerText
                    const cas = tr.getElementsByTagName('td')[1].innerText
                    return [nazov, cas]
                })
                data.map(datum => {
                    const adresa = datum[0].trim().replace('\n', '')
                    const [lat, lng] = geocode(adresa)
                    if ([lat, lng] !== [0, 0]) {
                        const cas = isLive() ? datum[1].trim() : Math.floor(Math.random() * 100)
                        console.log(`Adding ${adresa} - N ${lat} E ${lng} cas ${cas}`)
                        const casString = (cas === '') ? 'Neznámy' : `${cas} minút`
                        const tooltip = `${adresa}\nOdhadovaný čas čakania: ${casString}`

                        const color = (cas === '') ? 'grey' :
                            (cas < 10) ? 'green' :
                                (cas < 20) ? 'gold' :
                                    (cas < 40) ? 'yellow' :
                                        (cas < 60) ? 'orange' : 'red'

                        addMarker(lat, lng, color, tooltip)
                    }
                })
            }
        )
}

function fetchOkolie() {
    const miesta = [
        ['Obecný úrad Rozhanovce', 'Webkamera dostupná na https://testovanie-rozhanovce.webnode.sk/', 48.751279, 21.343675, 'violet'],
        ['Kultúrny dom Rozhanovce', 'Webkamera dostupná na https://testovanie-rozhanovce.webnode.sk/', 48.750758, 21.344031, 'grey'],
        ['Futbalový štadión Budimír', 'https://www.obecbudimir.eu/', 48.795039, 21.306383, 'blue'],
        ['Družstevná pri Hornáde, multifunkčné ihrisko', 'https://www.druzstevna.sk/uvod/testovanie-na-covid-19/', 48.800698, 21.251329, 'blue'],
        ['Ďurďošík na detstkom ihrisku, vonku', 'https://www.obecdurdosik.sk/index.php?id=3&ni=259', 48.742017, 21.415394, 'blue'],
        ['Základná škola Košické Oľšany č. 215, vnútri', 'https://www.kosickeolsany.sk/', 48.732123, 21.345340, 'grey'],
        ['Potraviny Vajkovce', 'https://www.obecvajkovce.sk/--23-89-plosne-testovanie-v-obci-vajkovce', 48.781760, 21.325748, 'blue'],
        ['Telocvičňa Kráľovce', 'https://www.kralovce.sk/', 48.801783, 21.323515, 'blue'],
        ['Obecný úrad Bidovce', 'https://www.bidovce.sk/celoplosne-testovanie-covid-19-informacia-oznam/mid/429250/.html', 48.736653, 21.437110, 'grey'],
        ['Kultúrny dom Svinica', 'https://obecsvinica.sk/uradna-tabula/nezaradene/upresnenie-testovania/', 48.732346, 21.461602, 'grey'],
        ['Obecný úrad Košická Polianka 122', 'http://www.kosickapolianka.sk/--23-642-orientacny-harmonogram-poradia-vykonavania-testovania-na-odbernom-mieste-kosicka-polianka-122', 48.692690, 21.343789, 'grey'],
        ['Kultúrna sála Vyšná Hutka', 'http://www.vysnahutka.sk/--23-110-testovanie----casovy-harmonogram-', 48.675524, 21.353813, 'grey'],
        ['Kultúrny dom Kokšov-Bakša', 'https://www.koksovbaksa.sk/aktuality-1/plosne-testovanie-na-covid-19-521sk.html', 48.647917, 21.323780, 'grey'],
        ['Sála kultúrneho domu, Hlavná 1/1, Nižný Klátov', 'https://www.niznyklatov.sk/oznam---casovy-harmonogram-plosneho-testovania--a22-141', 48.728026, 21.140781, 'grey'],
        ['Kultúrny dom – Vyšný Klátov 131', 'http://www.vysnyklatov.sk/--23-338-covid-19-plosne-testovanie', 48.742681, 21.123000, 'grey'],
        ['Pred obecným úradom Baška', 'https://www.baska-obec.sk/oznamy/covid-19-prve-celoplosne-testovanie-31-10-1-11-2020-0.html', 48.707352, 21.181164, 'blue'],
        ['Nádvorie základnej školy Kostoľany nad Hornádom', 'https://www.kostolany.sk/obec-2/udalosti-v-obci/aktuality/informacie-k-celoplosnemu-testovaniu-v-nasej-obci-161sk.html', 48.797976, 21.241041, 'blue'],
        ['Kamenná ulica, Sokoľ', 'https://www.obecsokol.sk/--23-691-testovanie-covid---19', 48.811322, 21.220372, 'blue'],
        ['Kultúrny dom Ploské - Ortáše', 'https://www.ploske.sk/oznam-o-celoplosnom-testovani-v-nasej-obci-a22-108', 48.830263, 21.358448, 'grey'],
        ['Futbalové ihrisko Ploské', 'https://www.ploske.sk/oznam-o-celoplosnom-testovani-v-nasej-obci-a22-108', 48.814739, 21.314535, 'blue'],
        ['Futbalové ihrisko Malá Ida', 'https://malaida.sk/celoplosne-testovanie-v-nasej-obci/', 48.672708, 21.169202, 'blue'],
        ['Kultúrny dom Bukovec', 'https://www.bukovec.eu/oznamy/celoplose-testovanie-obyvatelov-na-ochorenie-covid-19.html', 48.709486, 21.150181, 'grey'],
        ['Budova bývalej Základnej školy, Beniakovce 38', 'https://www.obecbeniakovce.sk/obec-1/oznamy/celoplosne-testovanie-obyvatelov-v-obci-beniakovce-oznam-490sk.html', 48.769029, 21.317520, 'grey'],
        ['Chodba obecného úradu', 'http://www.hrasovik.ocu.sk/index.php?ids=45', 48.747853, 21.321738, 'grey'],
        ['Za obecným úradom Trsťany v altánku (iba v sobotu)', 'http://www.trstany.sk/index.php?id=3&ni=73', 48.758551, 21.406431, 'blue'],
        ['Terasa pri Kultúrnom dome Valaliky', 'https://www.youtube.com/watch?v=5gYln5XCEMs', 48.633266, 21.297557, 'violet'],
        ['Telocvičňa ZŠ Valaliky', 'http://www.valaliky.sk/60-uvod/849-plosne-testovanie-na-covid-19-vo-valalikoch', 48.634666, 21.299538, 'grey'],
        ['Obecný úrad Geča', 'https://www.obecgeca.sk/obec-1/aktuality/mobilna-aplikacia-celoplosne-testovanie-v-obci-geca-209sk.html', 48.628166, 21.308840, 'grey'],
        ['Pri obecnom úrade Chrastné 86', 'http://www.chrastne.sk/oznam-k-celoplosnemu-testovaniu-v-nasej-obci-a22-25', 48.791735, 21.347536, 'blue'],
        ['Obecný úrad Čižatice (iba v nedeľu)', 'https://www.cizatice.sk/', 48.797020, 21.392812, 'grey'],
        ['Malá sála kultúrneho domu - Sady nad Torysou, Byster', 'https://www.sadynadtorysou.sk/', 48.729116, 21.340244, 'grey'],
        ['Areál základnej školy - Sady nad Torysou, Zdoba', 'https://www.sadynadtorysou.sk/', 48.706966, 21.330869, 'blue']

    ]
    miesta.forEach(miesto => {
            const tooltip = `${miesto[0]}\n${miesto[1]}`
            addMarker(miesto[2], miesto[3], miesto[4], tooltip)
        }
    )
}
