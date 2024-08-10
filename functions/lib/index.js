"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChatUser = exports.createChatUser = void 0;
const functions = require("firebase-functions");
const chatkitty_platform_sdk_1 = require("chatkitty-platform-sdk");
const chatkitty = new chatkitty_platform_sdk_1.ChatKitty({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});
exports.createChatUser = functions.auth.user().onCreate(async (user) => {
    await chatkitty.Users.checkUserExists(user.uid).catch(async () => {
        await chatkitty.Users.createUser({
            name: user.uid,
            displayName: user.displayName || "anonymous",
            isGuest: true,
        });
    });
});
exports.deleteChatUser = functions.auth.user().onDelete(async (user) => {
    var _a;
    const result = await chatkitty.Users.listUsers(0, 0, undefined, user.uid);
    const users = (_a = result.data._embedded) === null || _a === void 0 ? void 0 : _a.users;
    if (users && users.length > 0) {
        await chatkitty.Users.deleteUser(users[0].id);
    }
});
//# sourceMappingURL=index.js.map