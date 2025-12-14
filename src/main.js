import * as core from '@actions/core'

export async function run() {
  try {
    const name = core.getInput('name')
    const greeting = `Hello, ${name}!`

    core.setOutput('greeting', greeting)
    console.log(greeting)
  } catch (error) {
    core.setFailed(error.message)
  }
}

// auto-run when executed directly
run()
