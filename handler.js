
export class ContentHandler {
  constructor() {
    this.contentType = 'application/json'
    this.accepts = 'application/json'
  }

  async transformInput(prompt) {
    const inputObj = {
      inputs: [
        [
          { role: 'system', content: 'You are a kind robot.' },
          { role: 'user', content: prompt },
        ],
      ],
      parameters: {
        max_new_tokens: 50,
      },
    }

    return Buffer.from(JSON.stringify(inputObj))
  }

  async transformOutput(output) {
    const responseJson = JSON.parse(Buffer.from(output).toString('utf-8'))
    return responseJson[0]['generation']['content']
  }
}

