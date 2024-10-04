import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
// import seedSuperAdmin from './app/DB';
import config from './app/config'

import { Server as SocketServer } from 'socket.io'

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    // seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`)
    })

    const io = new SocketServer(server, { cors: { origin: '*' } })

    io.on('connection', socket => {
      // console.log({ socket })

      // Listen for sendMessage event
      socket.on('sendMessage', message => {
        console.log('Message received:', message)

        // Broadcast the message to all clients
        io.emit('receiveMessage', message)
      })

      socket.on('disconnect', () => {
        console.log('user disconnected')
      })
    })
  } catch (err) {
    console.log(err)
  }
}

main()

process.on('unhandledRejection', err => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err)
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`)
  process.exit(1)
})
