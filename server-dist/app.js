"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import session from 'express-session';
// import { modersOnline } from './controllers/moders';
const tops_1 = __importDefault(require("./controllers/tops"));
const monitoring_1 = __importDefault(require("./controllers/monitoring"));
const socket_1 = __importDefault(require("./controllers/socket"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
// import MongoStore from 'connect-mongo';
const auxiliary_1 = require("./controllers/auxiliary");
const bestmafia_1 = require("./router/bestmafia");
const main_1 = require("./router/main");
auxiliary_1.KeepAlive();
const app = express_1.default();
app.use(express_1.default.static(auxiliary_1.getUrl(__dirname, '../public')));
app.use(express_1.default.static(auxiliary_1.getUrl(__dirname, '../dist')));
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(cors_1.default());
app.use('/bestmafia', bestmafia_1.bestmafia);
app.use('/', main_1.main);
app.set('trust proxy', 1);
const port = +process.env.PORT || 8080, server = app.listen(port), io = socket_io_1.default(server), 
// mongoStore = MongoStore(session),
uri = config_1.default.get('db_uri');
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(uri, {
    useNewUrlParser: true,
    autoIndex: false,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const monitoring = io.of('/monitoring');
monitoring_1.default(monitoring);
const tops = io.of('/tops');
tops_1.default(tops);
const bm = io.of('/bestmafia');
socket_1.default(bm);
/*const maf_db = mongoose.connection.useDb('mafia');
const sessionMiddleware = session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    store: new mongoStore({ mongooseConnection: maf_db })
});
 io.use((socket: Socket, next: NextFunction) => sessionMiddleware(socket.request, socket.request.res, next));
app.use(sessionMiddleware);

const mafia = io.of('/mafia');*/
const db = mongoose_1.default.connection;
// db.on('open', () => console.log('Открыл дб'));
const mongooseDisconnect = () => {
    db.close(() => process.exit(0));
};
process.on('SIGINT', mongooseDisconnect).on('SIGTERM', mongooseDisconnect);
