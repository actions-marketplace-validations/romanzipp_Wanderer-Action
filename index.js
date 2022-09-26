const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
    const [endpoint, token, server, job, selector, version, cfAccessClientId, cfAccessClientSecret] = [
        core.getInput('endpoint'),
        core.getInput('token'),
        core.getInput('server'),
        core.getInput('job'),
        core.getInput('selector'),
        core.getInput('version'),
        core.getInput('cf-access-client-id'),
        core.getInput('cf-access-client-secret'),
    ];

    const headers = {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
    };

    if (cfAccessClientId) {
        headers['CF-Access-Client-Id'] = cfAccessClientId;
        headers['CF-Access-Client-Secret'] = cfAccessClientSecret;
    }

    axios
        .post(`${endpoint}/api/deploy`, {
            server, job, selector, version,
        }, { headers })
        .then((res) => {
            // const data = JSON.parse(res.data);
            // const payload = JSON.stringify(github.context.payload, undefined, 2);

            // console.log('The event payload', payload);
            console.log('response:', res.data);

            core.setOutput('status', 'ok');
        })
        .catch((err) => {
            core.setFailed(err.message);
        });
} catch (error) {
    core.setFailed(error.message);
}
