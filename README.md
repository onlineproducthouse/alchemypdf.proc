# AlcheMyPDF Processor

AlcheMyPDF Processor project for converting HTML to PDF using Puppeteer.

## Dependencies

1. [AlcheMyPDF database migrations](https://github.com/onlineproducthouse/alchemypdf.db/blob/main/README.md) must have been executed.
2. [AlcheMyPDF API](https://github.com/onlineproducthouse/alchemypdf.api/blob/main/README.md) must be running.

## Installation

```bash
# clone repository
mkdir alchemypdf.proc
cd alchemypdf.proc
git clone https://github.com/onlineproducthouse/alchemypdf.proc.git .

# install dependencies
npm i

# build project
npm run build
```

## Usage

```bash
# set to either: local, test, qa, prod
export ENVIRONMENT_NAME=local

# set environment variables for the postgres database instance
export RUN_SWAGGER=true

export ALCHEMYPDF_PROJECT_NAME=AlcheMyPDF
export ALCHEMYPDF_PROJECT_SHORT_NAME=AlcheMyPDF

export ALCHEMYPDF_API_PROTOCOL=http
export ALCHEMYPDF_API_HOST=127.0.0.1
export ALCHEMYPDF_API_PORT=10000
export ALCHEMYPDF_API_BASEPATH=/api/v1
export ALCHEMYPDF_API_KEYS=69d2eddc-2cc9-acab-1a9c-dfcb1fca3efb

export ALCHEMYPDF_OVERRIDE_CALLBACK=false
export ALCHEMYPDF_PROC_API_KEY=69d2eddc-2cc9-acab-1a9c-dfcb1fca3efb

# run the database migration
npm run proc
```

## Integration tests

Given all steps have been followed, you may execute integration tests.

```bash
npm run test --workspace=@alchemypdf.proc/api.test.int
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

