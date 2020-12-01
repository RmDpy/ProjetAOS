import app from "./config/app";
import env from './environment'

const PORT = env.getPort();
const port = process.env.PORT || 8080;
app.listen(port, () => {
   console.log('API REST - AOS GMAO is running on port ' + port);
});