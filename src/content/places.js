// ===== EDIT ME: THE PICTURE LIBRARY (one entry per place you take tours to) =====
// HOW IT WORKS: when a tour's title, summary or details mention one of the "match" words below, that tour's page
// builds itself: a slideshow banner behind the title, a "Where we go" row of pictures, and the picture on the Tours page.
// These pictures are used on the individual tour pages only. The three region pages (Western / Central / Eastern Europe)
// keep their own picture slots, which you fill yourself in src/content/regions.js.
//
// TO ADD A NEW PLACE THE EASY WAY (no picture hunting): copy this one line, change the words, and commit:
//   { key: "strasbourg", name: "Strasbourg", match: ["strasbourg"], search: "Strasbourg cathedral" },
// The "Save pictures" job (see README) then finds good free-licence photos on Wikimedia Commons, saves them into the
// website and adds the photographer credits by itself.
//
// TO USE YOUR OWN PHOTO: upload it to public/img and add a line   { img: "/img/my-photo.jpg", caption: "Our group in Avignon" },
// Put it FIRST in the list to make it the banner and the Tours-page picture. Your own photos need no credit.
// TO REMOVE A PICTURE you do not like: delete its line.
//
// file    = the exact file name on commons.wikimedia.org (free-licence photos; the credit is shown on the page automatically)
export const places = [
  // ---------- France ----------
  { key: "paris", name: "Paris", match: ["paris"], pictures: [
    { file: "Eiffel Tower @ Seine @ Paris (34343462864).jpg", caption: "The Eiffel Tower and the Seine", by: "Guilhem Vellut" },
    { file: "Jewish quarter, rue des Rosiers, Le Marais, Paris 2016.jpg", caption: "Rue des Rosiers in the Marais, the old Jewish quarter", by: "Guilhem Vellut" },
    { file: "Rue des Rosiers, Paris, France 01.jpg", caption: "Rue des Rosiers", by: "ninara" },
  ] },
  { key: "roussillon", name: "Roussillon", match: ["roussillon", "ocres", "ochre"], pictures: [
    { file: "Roussillon - Sentier des Ocres 22.jpg", caption: "Sentier des Ocres, the ochre trail", by: "Christophe.Finot" },
    { file: "Roussillon sentier des ocres2.JPG", caption: "The ochre cliffs of Roussillon", by: "G CHP" },
  ] },
  { key: "avignon", name: "Avignon", match: ["avignon"], pictures: [
    { file: "Avignon Palais des Papes vu du pont Saint-Bénézet.jpg", caption: "The Palais des Papes seen from the Pont Saint-Bénézet", by: "François de Dijon" },
    { file: "Pont Saint-Bénézet (Avignon).jpg", caption: "Pont Saint-Bénézet, the Pont d’Avignon" },
  ] },
  { key: "carpentras", name: "Carpentras", match: ["carpentras"], pictures: [
    { file: "Carpentras synagogue 02.jpg", caption: "The synagogue of Carpentras" },
    { file: "Synagogue de Carpentras - salle de prière 1.jpg", caption: "Prayer hall of the Carpentras synagogue" },
  ] },
  { key: "montpellier", name: "Montpellier", match: ["montpellier"], pictures: [
    { file: "Montpellier Place de la Comédie.jpg", caption: "Place de la Comédie", by: "Wolfgang Staudt" },
    { file: "Montpellier Place de la Comédie Opéra 1.jpg", caption: "The Opéra Comédie" },
  ] },
  { key: "arles", name: "Arles", match: ["arles"], pictures: [
    { file: "Les Arènes d'Arles.jpg", caption: "The Roman amphitheatre", by: "Oakenchips" },
    { file: "Arles Amphitheatre, Arles, France.jpg", caption: "Arles Amphitheatre", by: "Bokeby" },
  ] },
  { key: "marseille", name: "Marseille", match: ["marseille", "marseilles"], pictures: [
    { file: "Notre Dame de la Garde.jpg", caption: "Notre-Dame de la Garde seen from the Vieux-Port", by: "Benh LIEU SONG" },
    { file: "Marseille - Vieux-Port2.jpg", caption: "The Vieux-Port", by: "Tiia Monto" },
  ] },
  { key: "calanques", name: "The Calanques", match: ["calanques", "calanque"], pictures: [
    { file: "Calanque d'En Vau-Cassis.jpg", caption: "Calanque d’En-Vau" },
    { file: "MARSEILLE CALANQUE D'EN VAU.jpg", caption: "Calanques National Park", by: "Dolorette BERNARD" },
  ] },
  // ---------- Holland ----------
  { key: "amsterdam", name: "Amsterdam", match: ["amsterdam"], pictures: [
    { file: "Colorful windows and canal houses at blue hour with water reflection in Damrak Amsterdam Netherlands.jpg", caption: "Canal houses on the Damrak at dusk" },
    { file: "Amsterdam - Daniel Meyerplein - Portuguese Synagogue 1675 - Interior View II.jpg", caption: "Inside the Portuguese Synagogue (1675)", by: "Txllxt TxllxT" },
    { file: "Esnoga.jpg", caption: "The Esnoga, Amsterdam’s Portuguese Synagogue", by: "Massimo Catarinella" },
  ] },
  // ---------- Italy ----------
  { key: "rome", name: "Rome", match: ["rome", "roma"], pictures: [
    { file: "Great Synagogue of Rome,front view.jpg", caption: "The Great Synagogue of Rome" },
    { file: "Arch Titus, relief Jerusalem treasure, Forum Romanum, Rome, Italy.jpg", caption: "Arch of Titus: the Menorah carried from Jerusalem", by: "Jebulon" },
    { file: "2016 Sinagoga Tempio Maggiore di Roma.jpg", caption: "The Tempio Maggiore", by: "Jordiferrer" },
  ] },
  { key: "venice", name: "Venice", match: ["venice", "venezia"], pictures: [
    { file: "Campo del Ghetto Nuovo R01.jpg", caption: "Campo del Ghetto Nuovo", by: "Marc Ryckaert" },
    { file: "Campo di Ghetto Nuovo, Venice (37516299820).jpg", caption: "The Ghetto of Venice", by: "Dimitris Kamaras" },
  ] },
  // ---------- Central Europe ----------
  { key: "prague", name: "Prague", match: ["prague", "praha"], pictures: [
    { file: "Karlův most z Kampy.JPG", caption: "Charles Bridge from Malá Strana", by: "David Sedlecký" },
    { file: "Staronová synagoga 1.jpg", caption: "The Old New Synagogue (Altneuschul) at night", by: "Karelj" },
    { file: "Staronová synagoga, interiér.jpg", caption: "Inside the Old New Synagogue", by: "Jim Milles" },
  ] },
  { key: "vienna", name: "Vienna", match: ["vienna", "wien"], pictures: [
    { file: "Stadttempel interieur.jpg", caption: "Inside the Stadttempel, Vienna’s main synagogue" },
    { file: "Wiener Stadttempel - Innenraum.jpg", caption: "The Stadttempel (1826)" },
  ] },
  { key: "budapest", name: "Budapest", match: ["budapest"], pictures: [
    { file: "Synagoge Budapest 2014.jpg", caption: "The Dohány Street Synagogue", by: "Choinowski" },
    { file: "Dohány Street Synagogue in Pest, Budapest - Hungary (5132509510).jpg", caption: "Inside the Dohány Street Synagogue" },
  ] },
  // ---------- Eastern Europe ----------
  { key: "krakow", name: "Krakow", match: ["krakow", "kraków", "cracow", "kazimierz"], pictures: [
    { file: "Stara Synagoga na krakowskim Kazimierzu, XV w..jpg", caption: "The Old Synagogue in Kazimierz (15th century)", by: "Kamil Durda" },
    { file: "Inside old synagogue Krakow.JPG", caption: "Inside the Old Synagogue", by: "Bart Van den Bosch" },
    { file: "Krakow - Kazimierz IMG 7531 Stara Synagoga ul Szeroka 24.jpg", caption: "Szeroka Street, Kazimierz", by: "Bjoertvedt" },
  ] },
];

// WIDER NAMES: when a tour names a country or area but none of the places above, these decide which places' pictures to show.
export const groups = [
  { match: ["provence"], places: ["avignon", "roussillon", "carpentras", "arles", "marseille", "calanques"] },
  { match: ["holland", "netherlands"], places: ["amsterdam"] },
  { match: ["italy"], places: ["rome", "venice"] },
  { match: ["central europe"], places: ["prague", "vienna", "budapest"] },
  { match: ["danube"], places: ["budapest", "vienna"] },
  { match: ["poland"], places: ["krakow"] },
];
