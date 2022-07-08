import {
    AuthInitialStateType,
    authReducer,
    redirectToCheckEmail,
    register,
    setIsLogin,
    setPasswordSuccess
} from './authReducer';

const initialAuthState: AuthInitialStateType = {
    isLoggedIn: false,
    isRegistered: false,
    isRedirect: false,
    isNewPasswordSet: false,
}

test('SET_IS_LOGIN, User have to log in', () => {
    const endState = authReducer(initialAuthState, setIsLogin(true))

    expect(initialAuthState.isLoggedIn).toBeFalsy()
    expect(initialAuthState.isRegistered).toBeFalsy()
    expect(initialAuthState.isRedirect).toBeFalsy()
    expect(initialAuthState.isNewPasswordSet).toBeFalsy()
    expect(endState.isLoggedIn).toBeTruthy()
    expect(endState.isRegistered).toBeFalsy()
    expect(endState.isRedirect).toBeFalsy()
    expect(endState.isNewPasswordSet).toBeFalsy()
})
test('REGISTER, User have to register', () => {
    const endState = authReducer(initialAuthState, register(true))

    expect(initialAuthState.isLoggedIn).toBeFalsy()
    expect(initialAuthState.isRegistered).toBeFalsy()
    expect(initialAuthState.isRedirect).toBeFalsy()
    expect(initialAuthState.isNewPasswordSet).toBeFalsy()
    expect(endState.isLoggedIn).toBeFalsy()
    expect(endState.isRegistered).toBeTruthy()
    expect(endState.isRedirect).toBeFalsy()
    expect(endState.isNewPasswordSet).toBeFalsy()
})
test('REDIRECT-TO-CHECK-EMAIL, User have to be redirected to check email page', () => {
    const endState = authReducer(initialAuthState, redirectToCheckEmail())

    expect(initialAuthState.isLoggedIn).toBeFalsy()
    expect(initialAuthState.isRegistered).toBeFalsy()
    expect(initialAuthState.isRedirect).toBeFalsy()
    expect(initialAuthState.isNewPasswordSet).toBeFalsy()
    expect(endState.isLoggedIn).toBeFalsy()
    expect(endState.isRegistered).toBeFalsy()
    expect(endState.isRedirect).toBeTruthy()
    expect(endState.isNewPasswordSet).toBeFalsy()
})
test('SET-PASSWORD-SUCCESS, New password have to be set', () => {
    const endState = authReducer(initialAuthState, setPasswordSuccess(true))

    expect(initialAuthState.isLoggedIn).toBeFalsy()
    expect(initialAuthState.isRegistered).toBeFalsy()
    expect(initialAuthState.isRedirect).toBeFalsy()
    expect(initialAuthState.isNewPasswordSet).toBeFalsy()
    expect(endState.isLoggedIn).toBeFalsy()
    expect(endState.isRegistered).toBeFalsy()
    expect(endState.isRedirect).toBeFalsy()
    expect(endState.isNewPasswordSet).toBeTruthy()
})