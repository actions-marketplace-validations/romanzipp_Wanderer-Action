# Wanderer Action

This is the GitHub Action workflow for [Wanderer](https://github.com/romanzipp/Wanderer) deployer.

## Usage

```yml
name: Foo
jobs:
  deploy:
    steps:
      - name: "Publish to Wanderer"
        uses: romanzipp/Wanderer-Action@v1
        with:
          token: ${{ secrets.WANDERER_TOKEN }}
          endpoint: https://wanderer.example.com
          server: 1
          job: example-app
          selector: WEB_VERSION
          version: 1.0.0

```

### Available parameters

| Parameter               | Required | Description                                      | Example                      |
|-------------------------|----------|--------------------------------------------------|------------------------------|
| endpoint                | **yes**  | The base url to your Wanderer instance           | https://wanderer.example.com |
| token                   | **yes**  | The specified Wanderer authentication API token  |                              |
| server                  | **yes**      | The Wanderer server ID                           | 1                            |
| job                     | **yes**      | The Nomad job ID                                 | example-app                  |
| selector                | **yes**      | The version selector as specified in Wanderer UI | `WEB_VERSION`                |
| version                 | **yes**      | The new version to be deployed                   | `1.0.0`                      |
| cf-access-client-id     | no       | Cloudflare Access Client Id                      |                              |
| cf-access-client-secret | no       | Cloudflare Access Client Secret                  |                              |

## Development

```
npx ncc build index.js -m --license licenses.txt
```

## License

Released under the [MIT License](LICENSE.md).

## Authors

- [Roman Zipp](https://github.com/romanzipp)
