/**
 * refer to:
 * https://github.com/mizchi/next-boilerplate-20200727/blob/14aac72b22f6ee40b9075e69b3fd542cedb9b7d9/src/client/firebaseHelpers.ts
 */
import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase/app";
import firebaseConfig from "../config/firebaseConfig.json";

let _app: firebase.app.App | null = null;

// https://firebase.google.com/docs/web/setup
export function getApp() {
  if (_app) return _app;
  if (firebase.apps.length > 0) {
    return (_app = firebase.app());
  } else {
    _app = firebase.initializeApp(firebaseConfig);
    return _app;
  }
}

export function getAuth() {
  return getApp().auth();
}

export async function createUserWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(user);
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("login failed", errorCode, errorMessage);
    return null;
  }
}

export async function loginWithEmailAndPassword(
  email: string,
  password: string
): Promise<firebase.auth.UserCredential | null> {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log(user);
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("login failed", errorCode, errorMessage);
    return null;
  }
}

/* export async function loginAnonymously(): Promise<firebase.auth.UserCredential | null> {
  try {
    const user = await firebase.auth().signInAnonymously();
    console.log(user);
    return user;
  } catch (error) {
    console.error("login failed", error);
    return null;
  }
}

export async function loginWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider();
  try {
    const user = await firebase.auth().signInWithPopup(provider);
    console.log(user);
  } catch (error) {
    console.error("login failed", error);
  }
}

export async function linkWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider();
  try {
    const user = await firebase.auth().currentUser?.linkWithPopup(provider);
    console.log(user);
  } catch (error) {
    console.error("login failed", error);
  }
} */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalThis._app = firebase;
export async function logout() {
  try {
    const user = await firebase.auth().signOut();
    console.log(user);
  } catch (error) {
    console.error("logout failed", error);
  }
}

export async function deleteUser() {
  try {
    const user = firebase.auth().currentUser;
    await user?.delete();
  } catch (error) {
    console.error("delete failed", error);
  }
}
