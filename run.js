const { SageMakerEndpoint, SageMakerLLMContentHandler } = require('langchain/llms/sagemaker_endpoint');

class ContentHandler {
    constructor() {
        this.contentType = "application/json";
        this.accepts = "application/json";
    }

    async transformInput(prompt, modelKwargs) {
      const inputObj = {
          "inputs": [
              [
                  { "role": "system", "content": "You are a kind robot." },
                  { "role": "user", "content": prompt }
              ]
          ],
          "parameters": {
              max_new_tokens: 50,
          }
      };
  
      return Buffer.from(JSON.stringify(inputObj));
  }

    async transformOutput(output) {
        const responseJson = JSON.parse(Buffer.from(output).toString("utf-8"));
        return responseJson[0]["generation"]["content"];
    }
}

const contentHandler = new ContentHandler();

const clientOptions = {
    region: "us-east-1" // AWS Region
    // Add any other required configurations here
};

const lm = new SageMakerEndpoint({
    endpointName: "meta-textgeneration-llama-2-7b-f-2023-10-08-04-50-54-521",
    clientOptions: clientOptions,
    contentHandler: contentHandler,
    endpointKwargs: {
        CustomAttributes: 'accept_eula=true'
    }
});

// Wrap asynchronous operations inside an async function
async function main() {
      const result = await lm.predict('What is the capital of Germany?');
      console.log(result);
}

// Call the main function
main();