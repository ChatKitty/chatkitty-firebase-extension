import * as functions from "firebase-functions";
import {ChatKitty} from "chatkitty-platform-sdk";

const chatkitty = new ChatKitty({
  clientId: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
});


export const handleCreateUser =
    functions.auth.user().onCreate(async (user) => {
      await chatkitty.Users.checkUserExists(user.uid).catch(async () => {
        await chatkitty.Users.createUser({
          name: user.uid,
          displayName: user.displayName || "anonymous",
          isGuest: true,
        });
      });
    });

export const handleDeleteUser = functions.auth.user().onDelete(async (user) => {
  const result = await chatkitty.Users.listUsers(0, 0, undefined, user.uid);

  const users = result.data._embedded?.users;

  if (users && users.length > 0) {
    await chatkitty.Users.deleteUser(users[0].id);
  }
});
