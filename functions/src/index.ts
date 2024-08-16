import * as admin from "firebase-admin";
import {getExtensions} from "firebase-admin/extensions";
import {auth, logger, tasks} from "firebase-functions";
import {useChatKitty} from "./api";

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const syncApplication = tasks.taskQueue().onDispatch(async () => {
  const {Users} = await useChatKitty();

  const result = await app.auth().listUsers();

  const users = result.users;

  const response = {
    users: {
      count: 0,
    },
  };

  for (const user of users) {
    await Users.checkUserExists(user.uid).catch(async () => {
      await Users.createUser({
        name: user.uid,
        displayName: user.displayName || "anonymous",
        isGuest: true,
      });

      response.users.count++;
    });
  }

  const message = `Successfully synced ${response.users.count} users`;

  logger.info(message);

  await getExtensions().runtime().setProcessingState(
    "PROCESSING_COMPLETE",
    message
  );
});

export const handleCreateUser =
    auth.user().onCreate(async (user) => {
      const {Users} = await useChatKitty();

      await Users.checkUserExists(user.uid).catch(async () => {
        await Users.createUser({
          name: user.uid,
          displayName: user.displayName || "anonymous",
          isGuest: true,
        });
      });

      logger.info(`Successfully created ChatKitty user: ${user.uid}`);
    });

export const handleDeleteUser = auth.user().onDelete(async (user) => {
  const {Users} = await useChatKitty();

  const result = await Users.listUsers(0, 0, undefined, user.uid);

  const users = result.data._embedded?.users;

  if (users && users.length > 0) {
    await Users.deleteUser(users[0].id);

    logger.info(`Successfully deleted ChatKitty user: ${user.uid}`);
  } else {
    logger.info(`ChatKitty user not found: ${user.uid}`);
  }
});
