import app from "./config/app";
import env from './environment'

const PORT = env.getPort();

app.listen(PORT, () => {
   console.log('API REST - AOS GMAO is running on port ' + PORT);
});