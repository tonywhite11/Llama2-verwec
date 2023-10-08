import { SageMakerEndpoint } from 'langchain/llms/sagemaker_endpoint'
import { ContentHandler } from './handler.js'

const llm = new SageMakerEndpoint({
  endpointName: 'meta-textgeneration-llama-2-7b-f-2023-10-08-04-50-54-521',
  clientOptions: { region: 'us-east-1' },
  contentHandler: new ContentHandler(),
  endpointKwargs: {
    CustomAttributes: 'accept_eula=true',
  },
})

async function main() {
  const result = await llm.predict('What is the capital of Germany?')
  console.log(result)
}

main()
