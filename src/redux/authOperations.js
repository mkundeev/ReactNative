import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/configFB";
import { authSlice } from "./authReducer";

export const authSignUpUser = async ({ email, password, login }) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: login,
    });
    const updatedUser = auth.currentUser;
    return updatedUser;
  } catch (error) {
    console.log(error.message);
  }
};
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getSatte) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };
export const authSignOutUser = () => async (dispatch, getSatte) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authLogOut());
  } catch (error) {
    console.log(error.message);
  }
};
export const authStateChangeUser = () => async (dispatch, getSatte) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authSlice.actions.updateProfile({
            userId: user.uid,
            login: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          })
        );
        dispatch(authSlice.actions.authStateChange({ state: true }));
      } else {
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const updateAvatar = (newAvatar) => async (dispatch, getSatte) => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL: newAvatar,
    });
    const updatedUser = auth.currentUser;
    dispatch(
      authSlice.actions.updateAvatarAction({
        avatar: updatedUser.photoURL,
      })
    );
  } catch (error) {
    console.log(error.message);
  }
};
