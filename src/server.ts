import App from "./app";
import IndexRoute from "./routes/index.route";
import RoomsRoute from "./routes/rooms.route";

//TODO: implement environment validation

const app = new App([new IndexRoute(), new RoomsRoute()]);

app.listen();
