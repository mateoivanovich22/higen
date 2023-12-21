import  express  from "express";
import exphbs  from 'express-handlebars';
import config from "./config/config.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import home from "./routes/home.router.js"
// app.js o donde configures Handlebars

import Handlebars from 'handlebars';

// Helper 'eq' para comparaciones de igualdad
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('starRating', function(rating) {
    let stars = '';
    const totalStars = 5;

    for (let i = 1; i <= totalStars; i++) {
        if (i <= rating) {
            stars += '★'; // Muestra una estrella si el índice es menor o igual al rating
        } else {
            stars += '☆'; // De lo contrario, muestra una estrella vacía
        }
    }

    return new Handlebars.SafeString(stars); // Retorna SafeString para renderizar HTML seguro
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = config.server.port;

const app = express();
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(express.static(__dirname + "/public"));
app.engine('handlebars', exphbs.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", home);
export default app;