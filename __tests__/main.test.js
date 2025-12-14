import {
  jest,
  beforeEach,
  afterEach,
  describe,
  it,
  expect
} from '@jest/globals'

// import fixtures
const core = await import('../__fixtures__/core.js')
const github = await import('../__fixtures__/github.js')

// mock ESM modules
jest.unstable_mockModule('@actions/core', () => core)
jest.unstable_mockModule('@actions/github', () => github)

// import your action AFTER mocks
const main = await import('../src/main.js')

describe('run()', () => {
  beforeEach(() => {
    core.getInput.mockReturnValueOnce('Vladyslav')
    github.context.payload = { actor: 'Vladyslav' } // simulate payload
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('outputs a greeting', async () => {
    await main.run()

    expect(core.getInput).toHaveBeenCalledWith('name')
    expect(core.setOutput).toHaveBeenCalledWith('greeting', 'Hello, Vladyslav!')
  })

  // it("handles errors", async () => {
  //   core.getInput.mockImplementation(() => {
  //     throw new Error("bad input");
  //   });

  //   await main.run();

  //   expect(core.setFailed).toHaveBeenCalledWith("bad input");
  // });

  it('can access github payload', async () => {
    await main.run()
    expect(github.context.payload.actor).toBe('Vladyslav')
  })
})
