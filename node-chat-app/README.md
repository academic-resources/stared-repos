# chattrbox 

## Built with websockets library socket.io, Node.js, and Express

### What is it for?
                
+ For friends, family, and/or colleagues to connect in real time and communicate with each other. Messages are **timestamped**. **chattrbox** also uses the
[geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
and [Google Maps API Maps Url](https://developers.google.com/maps/documentation/urls/guide). The **geolocation API** allows users to provide their location IF they want to. They can always choose to **DENY** access to their location. For privacy reasons, the user is asked permission to report location information when clicking on the
**Send Location** button. **chattrbox** uses the **Google Maps API** along with the **geolocation API** so that a user not only shares his/her **latitude** and **longitude**, but an actual **Google Map** with his/her exact **location** and **directions** how to get there. That is possible because of the implementation of **Google Maps API** **dir** (directions) mode as opposed to **search** mode, which is a bit less **accurate**.

### Are chats private?

+ Chats in each chat room that is created by a user when he/she logs in, **are** private.

### If every user can create their own private chat room, how can people chat with each other?

+ By sharing the name of the chat room with those they want to communicate with in real time. It is important to note, however, that when filling out the input field for the name of the room, all characters must be lowercase and with no spaces. In addition, the spelling must be exactly the same, otherwise a new chat room will be created.

## How can I invite others to chat with me?

+ By sharing the link to the site.

### Are chats, locations, and timestamps saved anywhere?

+ The beauty of native **websockets** (and socket.io) is that they take place in real time BUT data transmitted via the sockets is NOT persistent by default. Only if saved to a database. **chattrbox** does not save anything to a database. On page refresh, everything in an individual user's chat disappears. Whatever that user transmitted to the room remains as long as other users keep their browser/socket instance open and don't refresh their page. When they close their window/instance, the information which they transmitted and was transmitted to them, is gone. That does not mean that everything that was transmitted to a room is gone **everywhere**. Everything is gone only when all users who have joined a room have left.

### Are rooms persistent?

+ No. But you can re-use a room name if you like and share it with others so that they can join you there.

### Will the url always remain the same?

**NO**. I will change it **frequently** at my **discretion** so as to prevent abuse of the site for potentially nefarious reasons or for profit. I will share the url only with those that i would like to share the space with.