
import * as http from 'http'
import * as path from 'path'

import { AddressInfo } from 'net';
import { COVERAGE_DEST } from './configs'

export const serveCoverage = () => {
  const express = require('express')
  const app = express()

  const PORT = 9899;
  const HOST_NAME = `localhost`;
  const PUBLIC_COVERAGE = path.resolve(COVERAGE_DEST, 'lcov-report')

  app.use('/', express.static(PUBLIC_COVERAGE));

  const server = http.createServer(app);
  server.listen(PORT, HOST_NAME)
    .on('listening', function() {
      const { port, address } = server.address() as AddressInfo;
      console.log(`Server started on port ${port} at ${address}.`); 
    })
}