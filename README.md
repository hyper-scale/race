# Hyperscale Race

What we are building: https://docs.google.com/document/d/1X558K8dC4OCcrbjK2ZMK0sjOSu6SLg6Awk9C9yaMXHI/edit

Figma designs to replicate: https://www.figma.com/file/CPfZkeob1dtxStjSuUUXDs/HyperscalePaid

## Getting Started

### Dev enviroment
First, clone the repo into a new folder (if you haven't yet):

```sh
git clone https://github.com/hyper-scale/race.git .
```

Next start dev enviroment:

```sh
$ docker-compose up -d --build
```

Verify that mongo and web services are running:
```
$ docker-compose ps
          Name                        Command                  State                          Ports
-----------------------------------------------------------------------------------------------------------------------
mongo                      docker-entrypoint.sh mongod      Up (healthy)   0.0.0.0:27017->27017/tcp,:::27017->27017/tcp
race_direct_mongo_seed_1   docker-entrypoint.sh /mong ...   Exit 0
web                        docker-entrypoint.sh sh -c ...   Up             0.0.0.0:3000->3000/tcp,:::3000->3000/tcp
```

You might need to wait a minute while `web` installs its dependencies.

Access `web` logs with `docker-compose logs web`.

`mongo_seed` should be in `Exit 0` as it is used for populating mongodb. More in `Test data` section below.
MongoDB is already pre-populated with test data.

You can now open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

- You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

- [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

- The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Test data

The test data is already there but if you want to update it or test some missing case just modify json files in mongo/seed and run:

```
docker-compose up mongo_seed
```

**Note**: Please do not add users' private data.

## Discord Authentication
Set up:
1. Create a custom [Discord application](https://discord.com/developers/applications)
2. Add the redirect URI `http://localhost:3000/api/auth/callback/discord`to the Discord application (under the OAuth section)
3. Replace XXXX with actually values from Discord application in .env.docker and rebuild the services with `docker-compose -d up --build`.
4. `DISCORD_GUILD_ID` is the server id that user needs to be member of for successful login.
    To get Discord_guild_id Right Click on any  Server you are member of  and copy ID Paste that ID in your  .env.docker.example

## Linting and formatting

Don't forget to check your code before creating a Pull Request:

```sh
docker-compose exec web yarn lint
```

That lints scripts, styles and checks formatting..

[Prettier](https://prettier.io) is being used for automatically formatting the code.
To apply prettier, you can run:
```sh
docker-compose exec web yarn format
```

## Testing

Unit tests, ran by [jest](https://jestjs.io), can be executed by:

```sh
docker-compose exec web yarn test # or test:watch for running tests in watch-mode
```

## Contributing

Pull Requests are welcome and encouraged! Make an issue first, and create a PR to assign it to yourself. Mark it for review when ready and we'll check to merge it.

Contribution process borrows from [Collective Code Construction Contract](https://rfc.zeromq.org/spec/44/) (C4). Most important points:

* Change on the project shall be governed by the pattern of accurately identifying problems and applying minimal, accurate solutions to these problems.
* The user or contributor should seek consensus on the accuracy of their observation, and the value of solving the problem.
* To work on an issue, a contributor shall fork the project repository and then work on their forked repository.
* To submit a patch, a contributor shall create a pull request (PR) back to the project.
* A contributor shall not commit changes directly to the project.
* To discuss a patch, people may comment on the pull request.
* Maintainers should not merge their own patches except in exceptional cases, such as non-responsiveness from other maintainers for an extended period (more than 1-2 days).
* Maintainers shall not make value judgments on correct patches.
* Maintainers shall merge correct patches from other contributors rapidly.
* Maintainers should ask for improvements to incorrect patches and should reject incorrect patches if the contributor does not respond constructively.
* Any contributor who has value judgments on a correct patch should express these via their own patches.

## License

TBD
