# timer-api
## Instructions
1. execute git clone https://github.com/danabig/timer-api.git
2. execute cd ./timer-api
3. execute npm install
4. execute npm run start
5. The server will be available on port 1111

## Notes
1. I never used MongoDB before, I took it as a challenge to use something new.
2. If I were designing the API I would make the timer id of type uuid instead of incremented integer. It is a safer.
3. In order to create the incremented ID, every startup I query how many docs were already inserted, and increment it every time I create a timer. This design is not 100% thread safe, because I can imagine a scenario where two CREATE requests occur in the same time more or less, and the counter gets two identical ids for these two request. I solve this issue by assuming that we are running on a single server, thus I can rely on Node for being actually single threaded and two identical ids will never be created.
4. I used open api validation for the api schema validation.