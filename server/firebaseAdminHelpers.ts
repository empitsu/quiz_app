/**
 *
 * https://github.com/mizchi/next-boilerplate-20200727/blob/14aac72b22f6ee40b9075e69b3fd542cedb9b7d9/src/server/firebaseAdminHelpers.ts
 * https://firebase.google.com/docs/admin/setup
 *
 */
import * as admin from "firebase-admin";
import firebaseAdminConfig from "../config/firebaseAdminConfig.json";
/**
 * DO NOT READ IT FROM CLIENT
 * */
export function getAdmin(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App;
  } else {
    const app = admin.initializeApp({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      credential: admin.credential.cert(firebaseAdminConfig as any),
      databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    });
    return app;
  }
}

export async function verifyIdToken(idToken: string) {
  const admin = getAdmin();
  return await admin.auth().verifyIdToken(idToken);
}
