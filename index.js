// Inspired by https://github.com/Ilshidur/action-discord
// Released under the MIT License, Copyright (c) 2018 Nicolas Coutin

const axios = require('axios');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { argv } = yargs(hideBin(process.argv));

const REQUIRED_ENV_VARS = [
    'GITHUB_EVENT_PATH',
    'GITHUB_REPOSITORY',
    'GITHUB_WORKFLOW',
    'GITHUB_ACTOR',
    'GITHUB_EVENT_NAME',
    'GITHUB_ACTION',
];

process.env.GITHUB_ACTION = process.env.GITHUB_ACTION || '<missing GITHUB_ACTION env var>';

REQUIRED_ENV_VARS.forEach((env) => {
    if (!process.env[env] || !process.env[env].length) {
        console.error(
            `Env var ${env} is not defined. Maybe try to set it if you are running the script manually.`,
        );
        process.exit(1);
    }
});

const [endpoint, token, server, job, selector, version, cfAccessClientId, cfAccessClientSecret] = [...argv._];

console.debug('args:', {
    endpoint, token, server, job, selector, version, cfAccessClientId, cfAccessClientSecret,
});

const headers = {
    Authorization: `${token}`,
    'Content-Type': 'application/json',
};

if (cfAccessClientId) {
    headers['CF-Access-Client-Id'] = cfAccessClientId;
    headers['CF-Access-Client-Secret'] = cfAccessClientSecret;
}

console.debug('headers:', headers);

(async () => {
    try {
        const response = await axios.post(`${endpoint}/api/deploy`, {
            server, job, selector, version,
        }, { headers });

        if (typeof response.data !== 'object') {
            console.warn(response.data);
            throw new Error('The response does not contain JSON');
        }

        console.debug(response.data);
        process.exit(0);
    } catch (err) {
        console.error('error in POST request:', err.message, err?.response?.data?.message);
        process.exit(1);
    }
})();
