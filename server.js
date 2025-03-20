import express from 'express'

import { Liquid } from 'liquidjs';

const userID = 5
const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')

app.get('/', async function (request, response) {
  const apiResponse = await fetch('https://fdnd-agency.directus.app/items/milledoni_products');
  const apiResponseJSON = await apiResponse.json();
  
  const savedProductsURL = 'https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products';
  const savedProductsJSON = await fetch(`${savedProductsURL}?filter={"milledoni_users_id":${userID}}`);
  const saved_products = await savedProductsJSON.json();
  
  // Ensure both API responses contain valid data
  if (!apiResponseJSON.data || !saved_products.data) {
    console.error("Error: API response missing data:", { apiResponseJSON, saved_products });
    return response.status(500).send("Internal Server Error: Missing API data.");
  }
  
  saved_products.data.forEach(({ milledoni_products_id }) => {
    const product = apiResponseJSON.data.find(({ id }) => id === milledoni_products_id);
  
    if (product) {
      product.saved = true;
    }
  });
  
  response.render('index.liquid', { data: apiResponseJSON.data, savedProducts: saved_products });
  
})

app.get('/gifts/:slug', async function (request, response) {
  const slug = request.params.slug;
  const filter = `&filter={"slug":"${slug}"}`;
  // console.log(`Fetching gift from API: https://fdnd-agency.directus.app/items/milledoni_products?${filter}`);
  
  const giftResponse = await fetch(`https://fdnd-agency.directus.app/items/milledoni_products?${filter}`);
  console.log(giftResponse)
  const giftResponseJSON = await giftResponse.json();

  response.render("gifts.liquid", { data: giftResponseJSON}); 
});

app.get('/savedgifts', async function (request, response) {

  const savedGiftsResponse = await fetch('https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products?filter=%7B%22milledoni_users_id%22:5%7D');
  const savedGiftsJSON = await savedGiftsResponse.json();

  const savedGiftsWithDetails = await Promise.all(savedGiftsJSON.data.map(async (gift) => {
    const productResponse = await fetch(`https://fdnd-agency.directus.app/items/milledoni_products/${gift.milledoni_products_id}`);
    const productJSON = await productResponse.json();
    return {
      ...gift,
      productDetails: productJSON.data
    };
  }));

  response.render('savedgifts.liquid', { savedGifts: savedGiftsWithDetails });
});




app.post('/savedgifts/:giftId', async function (request, response) {

  const savedProductsURL = 'https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products';

  const idRes = await fetch(`${savedProductsURL}?filter={"milledoni_products_id":${request.params.giftId},"milledoni_users_id":${userID}}`); //Request paramsID
  const idJson = await idRes.json();

  console.log(idJson)
  if (idJson.data.length > 0) {
    const id = idJson.data[0].id;
   
    await fetch(`${savedProductsURL}/${id}`, {
      method: 'DELETE',
        headers: {
        'Content-Type': 'application/json;charset=UTF-8'
        }
    });
  } else {
     await fetch('https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products', {
        method: 'POST',
        body: JSON.stringify({
            milledoni_products_id: request.params.giftId,
            milledoni_users_id: 5
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });
  }

  // Redirect naar de homepage
  response.redirect(303, '/');
});




app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`http://localhost:${app.get('port')}`)
})


/*
// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post(…, async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  await fetch(…, {
    method: …,
    body: JSON.stringify(…),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303, …)
})
*/

// app.use((req, res, next) => {
//   res.status(404).send("Sorry can't find that!")
// })