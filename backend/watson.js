const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const dotenv = require('dotenv');
dotenv.config();

const assistant = new AssistantV1({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.assistant_apikey,
  }),
  url: process.env.assistant_url,
});


function message(input) {

    return assistant.message({
        workspaceId: process.env.assistant_workspace_id,
        input: { 'text': input }
        })
}

module.exports.message = message