import express from 'express';
import http from 'http';
import apiVersionRoutes from '@routes/apiVersionRoutes';
import loging from '@utils/loging';
const app = express();
const { PORT } = process.env;

/** Only start the server if the Prisma connects */
const StartServer = () => {
  app.use((req, res, next) => {
    /** Lof the request */
    loging.info(
      `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
      /** Log the response */
      loging.info(
        `Incoming -> Method:[${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status:[${res.statusCode}]`
      );
    });

    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(apiVersionRoutes);

  /** Rules of the API */
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method == 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  app.get('/', (req, res) => {
    return res.status(200).send('Home');
  });

  /**Healthcheck */
  app.get('/ping', (req, res, next) =>
    res.status(200).json({ message: 'pong' })
  );

  /**Error Handling */
  app.use((req, res, next) => {
    const error = new Error('not found');
    loging.error;
    return res.status(404).json({ message: error.message });
  });
  http.createServer(app).listen(PORT, () => {
    loging.info(`Server is running on port ${PORT}.`);
  });
};

StartServer();
