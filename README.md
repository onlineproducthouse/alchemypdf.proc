# OPH HTML 2 PDF Converter API

## Config

Create the `.env` file.

```bash
aws s3 cp "s3://oph-devtools-shared-storage/oph/scripts/local-env-vars.sh" "$HOME/oph-local-env-vars.sh"
```

```bash
bash "$HOME/oph-local-env-vars.sh" "eu-west-1" "/oph/config/shared;/oph/config/local" $(pwd)
```

## Use case: maintenace

### Running API

To start the API, first you need to install dependencies by executing following commands:

```bash
 $ yarn clean:all
 $ yarn
```

If you want to run the development version, execute:
```bash
$ yarn dev
```

If you want to run the production version, execute:
```bash
$ yarn build
$ yarn serve
```

Now you can either run the VSCode debugger to execute the project or execute the command:

```bash
$ export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst) && go run ./oph.api.app/main.go
```

In the logs, the API will output something like:

```bash
[server]: HTML 2 PDF Converter is running at: http://127.0.0.1:7891
```

This indicates the API has started.

To have environment dependencies set up, execute command:

```bash
$ export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst) &&  docker-compose -f 'docker-compose.yml' up --build
```

# if you get an auth error for `docker login`, enter the following command:

```bash
$ export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst) &&  echo $(aws ecr get-login-password | docker login --username AWS --password-stdin $IMAGE_REGISTRY_BASE_URL)
```
