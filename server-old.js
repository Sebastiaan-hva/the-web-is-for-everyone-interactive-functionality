// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
app.set('views', './views')

// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get('/', async function (request, response) {
  const apiResponse = await fetch('https://fdnd-agency.directus.app/items/milledoni_products')
  const apiResponseJSON = await apiResponse.json()

  console.log(apiResponseJSON)
   response.render('index.liquid', { data: apiResponseJSON.data });
})


// app.get('/gifts/', async function (request, response) {
//   response.render('gifts.liquid')
// })

// app.get('/gifts/:id', async function (request, response) {
//   const GiftResponse = await fetch(`https://fdnd-agency.directus.app/items/milledoni_products/${request.params.id}`);
//   const GiftResponseJSON = await GiftResponse.json();

//   response.render('gifts.liquid', { data: GiftResponseJSON.data });
  
// });


app.get('/gifts/:slug', async function (request, response) {
  const slug = request.params.slug;
  const filter = `&filter={"slug":"${slug}"}`;
  // console.log(`Fetching gift from API: https://fdnd-agency.directus.app/items/milledoni_products?${filter}`);
  
  const giftResponse = await fetch(`https://fdnd-agency.directus.app/items/milledoni_products?${filter}`);
  console.log(giftResponse)
  const giftResponseJSON = await giftResponse.json();

  response.render("gifts.liquid", { data: giftResponseJSON}); // Stuur de JSON direct terug voor debugging
});


// post om gifts te favoriten maken
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, '/')
})

// 404 handler
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
