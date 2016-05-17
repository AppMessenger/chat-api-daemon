# chat-api-daemon

This projects provides multiple apis to access whatsapp using the php [chat-api library](https://github.com/mgp25/Chat-API). Once setup you can use it to send and receive whatsapp messages in your code using websockets or http.

## About / motivation
[Chat-api](https://github.com/mgp25/Chat-API) provides a great way to interact with whatsapp from php code. But since its coded in php you can only use it in php projects. To remove this limitation this projects provides an RPC like interface to chat-api so you can use it in nearly any language you can imagine.

## Installation
Before you can start you have to obtain a whatsapp username and password for the api. Have a look at the [chat-api documation](https://github.com/mgp25/Chat-API/wiki/WhatsApp-Registration-Flow) for this. If you have these two you can run:

```
docker run -it --rm -p 127.0.0.1:8080:8080 -p 127.0.0.1:8081:8081 -e "NUMBER=your_number" -e "PASSWORD='whatsapp_password'" -v $(pwd)/wadata:/app/client/vendor/whatsapp/chat-api/src/wadata mawalu/chat-api-daemon
```

Replace the environment variables with your values and after everything is downloaded you should be ready to go.

## Message format
All function calls and events are formated in the same way:
```
{"method": "someMethode", "args":["arg1", "arg2"]}
```
You can get a list of all functions, events and their arguments [here](https://github.com/mgp25/Chat-API/wiki/WhatsAPI-Documentation#list-of-all-functions) and [here](https://github.com/mgp25/Chat-API/wiki/WhatsAPI-Documentation#list-of-all-events).

## Usage
You can access the daemon using websockets or http. If you want to test the websocket connection you can install [wscat](https://www.npmjs.com/package/wscat) and try
```
wscat -c ws://127.0.0.1:8081
```
if everything is ok you should see all the events fired by chat-api. You can also call api functions if you format them like described above.

To trigger methods over http you can do something like:
```
curl -H "Content-Type: application/json" -X POST -d '{"method":"sendMessage","args":["12344356", "hello world"]}' http://127.0.0.1:8080
```

If you want to receive http notifications via webhooks, set a environment variable called `CALLBACK_URLS` to a comma separated list of urls.  (I can recommend [requestb.in](http://requestb.in) to test webhooks)

To use this from your favorite language you have to look up how to use http or websockets there and decide which one suits you better.

## Terms and conditions
As with chat-api itself:

- You will NOT use this API for marketing purposes (spam, massive sending...).
- We do NOT give support to anyone that wants this API to send massive messages or similar.
- We reserve the right to block any user of this repository that does not meet these conditions.

## Legal

This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by WhatsApp or any of its affiliates or subsidiaries.
