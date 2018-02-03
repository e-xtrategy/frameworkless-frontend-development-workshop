import matchesFactory from './matches'
let matches
const now = (new Date()).getTime()

beforeEach(() => {
  matches = matchesFactory()
})

test('should add matches', () => {
  let list
  const EXPECTATION = [{
    teamA: 12,
    teamB: 34,
    teamAScore: 0,
    teamBScore: 0,
    started: false
  }]

  matches.addChangeListener(data => {
    list = data.list
  })
  matches.add(12, 34)
  expect(list).toEqual(EXPECTATION)
})

test('should start a match', () => {
  let list
  const INITIAL_STATE = {
    list: [{
      teamA: 12,
      teamB: 34,
      teamAScore: 0,
      teamBScore: 0,
      started: false
    }]
  }
  const matches = matchesFactory(INITIAL_STATE)

  matches.addChangeListener(data => {
    list = data.list
  })
  matches.start(0, now)
  expect(list[0].started).toBe(true)
  expect(list[0].startTime).toBe(now)
})

test('should stop a match', () => {
  let list
  const INITIAL_STATE = {
    list: [{
      teamA: 12,
      teamB: 34,
      teamAScore: 0,
      teamBScore: 0,
      started: true
    }]
  }
  const matches = matchesFactory(INITIAL_STATE)

  matches.addChangeListener(data => {
    list = data.list
  })
  matches.stop(0, now)
  expect(list[0].started).toBe(false)
  expect(list[0].stopTime).toBe(now)
})

test('should add score to the right team', () => {
  let list
  const INITIAL_STATE = {
    list: [
      {
        teamA: 24,
        teamB: 47,
        teamAScore: 0,
        teamBScore: 0,
        started: false
      },
      {
        teamA: 87,
        teamB: 0,
        teamAScore: 0,
        teamBScore: 0,
        started: true
      }
    ]
  }

  const matches = matchesFactory(INITIAL_STATE)

  matches.addChangeListener(data => {
    list = data.list
  })

  matches.score(1, 87)
  matches.score(1, 87)
  matches.score(1, 0)
  matches.score(1, 87)
  matches.score(1, 0)

  expect(list[1].teamAScore).toBe(3)
  expect(list[1].teamBScore).toBe(2)
})
