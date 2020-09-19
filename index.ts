import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'

import { GameState, SnakeInfo, Move, Direction } from './types'

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/', handleIndex)
app.post('/start', handleStart)
app.post('/move', handleMove)
app.post('/end', handleEnd)

app.listen(PORT, () => console.log(`Battlesnake Server listening at http://127.0.0.1:${PORT}`))


function handleIndex(request: Request, response: Response<SnakeInfo>) {
  const battlesnakeInfo: SnakeInfo = {
    apiversion: '1',
    author: '',
    color: '#888888',
    head: 'default',
    tail: 'default'
  }
  response.status(200).json(battlesnakeInfo)
}

function handleStart(request: Request<{}, {}, GameState>, response: Response) {
  const gameData = request.body

  console.log('START')
  response.status(200).send('ok')
}

function handleMove(request: Request<{}, {}, GameState>, response: Response<Move>) {
  const gameData = request.body

  const possibleMoves: Direction[] = ['up', 'down', 'left', 'right']
  const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

  console.log('MOVE: ' + move)
  response.status(200).send({
    move: move
  })
}

function handleEnd(request: Request<{}, {}, GameState>, response: Response) {
  const gameData = request.body

  console.log('END')
  response.status(200).send('ok')
}
