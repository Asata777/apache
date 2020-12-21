import express from 'express';
import socket, { Socket } from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
// import session from 'express-session';
// import { modersOnline } from './controllers/moders';
import socketTopsConnection from './controllers/tops';
import socketMonitoringConnection from './controllers/monitoring';
import socketBestmafiaConnection from './controllers/socket';
import mongoose from 'mongoose';
import config from 'config';
// import MongoStore from 'connect-mongo';
import { getUrl, KeepAlive } from './controllers/auxiliary';
import { bestmafia } from './router/bestmafia';
import { main } from './router/main';
KeepAlive();
const app = express();

app.use(express.static(getUrl(__dirname, '../public')));
app.use(express.static(getUrl(__dirname, '../dist')));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());


app.use('/bestmafia', bestmafia);
app.use('/', main);
app.set('trust proxy', 1);


const port: number = +process.env.PORT || 8080,
    server = app.listen(port),
    io = socket(server),
    // mongoStore = MongoStore(session),
    uri: string = config.get('db_uri');
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useNewUrlParser: true,
    autoIndex: false,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const monitoring = io.of('/monitoring');
socketMonitoringConnection(monitoring);

const tops = io.of('/tops');
socketTopsConnection(tops);

const bm = io.of('/bestmafia');
socketBestmafiaConnection(bm);
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
const db = mongoose.connection;
// db.on('open', () => console.log('Открыл дб'));
const mongooseDisconnect = () => {
    db.close(() => process.exit(0));
}
process.on('SIGINT', mongooseDisconnect).on('SIGTERM', mongooseDisconnect);