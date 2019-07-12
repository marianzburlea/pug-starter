import { printError, getBaseUrl, logError } from "./util";

describe('Utils --> printError()', () => {
  it('should print the message in an h1 tag', () => {
    const received = printError({message: 'Not good'})
    const expected = `<h1 style='color:#c00'>Error</h1><pre style='text-align:left'>Not good</pre>`
    expect(received).toEqual(expected)
  })

  it('should return an undefined message if none provided', () => {
    const received = printError()
    const expected = `<h1 style='color:#c00'>Error</h1><pre style='text-align:left'>undefined</pre>`
    expect(received).toEqual(expected)
  })
})

/* Circle CI is a Biatch! */
// describe('Utils --> logError()', () => {
//   const name = 'Haha'
//   const message = 'Lala'
//   it('should call console.log() three times', () => {
//     const spyLog = jest.spyOn(console, 'log')
//     const spyClear = jest.spyOn(console, 'clear')
//     logError(name, message)
//     expect(spyLog.mock.calls.length).toEqual(3)
//     expect(spyClear.mock.calls.length).toEqual(1)
//   })
// })

describe('Utils --> getBaseUrl()', () => {
  it('should work with GitHub url', () => {
    const args = { production: true }
    const config = {
      deployToGithubIo: true,
      githubUrl: 'https://github.com/marianzburlea/super-nice-project.git',
    }

    const received = getBaseUrl(args, config)
    const expected = '/super-nice-project/'

    expect(received).toEqual(expected)
  })

  it('should work with custom domain url', () => {
    const args = { production: true }
    const config = {
      deployToGithubIo: false,
      customUrl: 'https://super-ultra-nice-project.com',
    }

    const received = getBaseUrl(args, config)
    const expected = `${config.customUrl}/`

    expect(received).toEqual(expected)
  })

  it('should work with localhost', () => {
    const args = { production: false }
    const config = null

    const received = getBaseUrl(args, config)
    const expected = `/`

    expect(received).toEqual(expected)
  })
})
