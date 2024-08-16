import {params} from "firebase-functions";

export const useChatKitty = async () => {
  const {ChatKitty} = await import("chatkitty-platform-sdk");

  return new ChatKitty({
    clientId: params.defineString("CLIENT_ID").value(),
    clientSecret: params.defineSecret("CLIENT_SECRET").value(),
  });
};
