import { auth } from '../../../../FirebaseConfig';
import { loginSuccess, loginFailure, logout } from '../../redux/actions/auth.action';

// function logInWithEmailAndPassword(email, password) {
//     return async function (dispatch) {
//         try {
//             // Sign in to Firebase Auth
//             const { user } = await auth().signInWithEmailAndPassword(email, password);
//             // Dispatch the loginSuccess action with user info
//             dispatch(
//                 loginSuccess({
//                     token: await user.getIdToken(),
//                     email: user.email,
//                     userId: user.uid,
//                 }),
//             );
//         } catch (error) {
//             // Dispatch the loginFailure action with error message
//             dispatch(loginFailure(error.message));
//         }
//     };
// }

// const loginWithEmailAndPassword = async (email, password) => {
//     return new Promise(function (resolve, reject) {
//         auth()
//             .signInWithEmailAndPassword(email, password)
//             .then(response => {
//                 const uid = response.user.uid;
//                 const userData = {
//                     email,
//                     id: uid,
//                 };
//                 usersRef
//                     .doc(uid)
//                     .get()
//                     .then(function (firestoreDocument) {
//                         if (!firestoreDocument.exists) {
//                             resolve({ errorCode: ErrorCode.noUser })
//                             return
//                         }
//                         const user = firestoreDocument.data()
//                         const newUserData = {
//                             ...userData,
//                             ...user,
//                         }
//                         resolve({ user: newUserData })
//                     })
//                     .catch(function (_error) {
//                         console.log('_error:', _error)
//                         resolve({ error: ErrorCode.serverError })
//                     })
//             })
//             .catch(error => {
//                 console.log('error:', error)
//                 var errorCode = ErrorCode.serverError
//                 switch (error.code) {
//                     case 'auth/wrong-password':
//                         errorCode = ErrorCode.invalidPassword
//                         break
//                     case 'auth/network-request-failed':
//                         errorCode = ErrorCode.serverError
//                         break
//                     case 'auth/user-not-found':
//                         errorCode = ErrorCode.noUser
//                         break
//                     default:
//                         errorCode = ErrorCode.serverError
//                 }
//                 resolve({ error: errorCode })
//             })
//     })
// }

function signOut() {
    return async function (dispatch) {
        // Sign out from Firebase Auth
        await auth().signOut();

        // Dispatch the logout action
        dispatch(logout());
    };
}

export const authManager = {
    loginWithEmailAndPassword,
    signOut,
};