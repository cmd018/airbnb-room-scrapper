import App from "./app";
import IndexRoute from "./routes/index.route";
import RoomsRoute from "./routes/rooms.route";

const app = new App([new IndexRoute(), new RoomsRoute()]);

app.listen();
