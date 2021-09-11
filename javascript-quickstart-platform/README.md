# PubNub JavaScript Sample App

This repository contains the files required to run the [PubNub JavaScript Quickstart](https://www.pubnub.com/docs/platform/quickstarts/javascript).

PubNub takes care of the infrastructure and APIs needed for the realtime communication layer of your application. Work on your app's logic and let PubNub handle sending and receiving data across the world in less than 100ms.

## Get keys

You will need publish and subscribe keys to authenticate your app. Get your keys from the [Admin Portal](https://dashboard.pubnub.com/login).

## Set up the project

1. Clone this repository.
   
2. Open `index.html` and replace the placeholders with your keys:
   
    ```javascript 
    const pubnub = new PubNub({
      // replace the following with your own publish and subscribe keys
      publishKey: 'myPublishKey',
      subscribeKey: 'mySubscribeKey',
      uuid: clientUUID
    });
    ```

## Add project files

This is a single-file application and you do not need to add any additional files.

## Run the app

1. Open the `index.html` file in a browser.

    A message will be published on page load, and some other messages/events will also display.

2. In the Earth field, enter some text and click Submit Update to the Guide to publish your update.

    You should see the new update displayed at the top of the current messages below the Earth field. Also, the field is cleared for you to enter something new.

## Documentation

* [Build your first realtime JavaScript app with PubNub](https://www.pubnub.com/docs/platform/quickstarts/javascript)
* [API reference for JavaScript (web)](https://www.pubnub.com/docs/web-javascript/pubnub-javascript-sdk)
* [API reference for JavaScript (Node.js)](https://www.pubnub.com/docs/nodejs-javascript/pubnub-javascript-sdk)

## Support

If you **need help** or have a **general question**, contact <support@pubnub.com>.
