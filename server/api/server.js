const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware');
const authRouter = require('../auth/auth-router');
const memoriesRouter = require('../memories/memories-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/memories', authenticate, memoriesRouter);

module.exports = server;