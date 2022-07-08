import {AuthDataType} from '../../../_dal/api-auth';
import {changeProfileData, profileReducer, setProfileData} from './profileReducer';

const initialState: AuthDataType = {
    _id: '',
    email: 'nya-admin@nya.nya',
    password: '1qazxcvBG',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,

    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,

    error: '',
}

test('SET-PROFILE-DATA. Profile data has to be set', () => {
    const data = {
        _id: '',
        email: 'tony@gmail.com',
        password: '301',
        name: 'Finder',
        avatar: '',
        publicCardPacksCount: 100,

        created: '',
        updated: '',
        isAdmin: false,
        verified: false,
        rememberMe: true,

        error: '',
    }
    const endState = profileReducer(initialState, setProfileData(data))

    expect(initialState.email).toBe('nya-admin@nya.nya')
    expect(initialState.password).toBe('1qazxcvBG')
    expect(initialState.name).toBe('')
    expect(initialState.publicCardPacksCount).toBe(0)
    expect(initialState.rememberMe).toBeFalsy()
    expect(endState.email).toBe('tony@gmail.com')
    expect(endState.password).toBe('301')
    expect(endState.name).toBe('Finder')
    expect(endState.publicCardPacksCount).toBe(100)
    expect(endState.rememberMe).toBeTruthy()
})
test('CHANGE-PROFILE-DAT. Profile data has to be changed', () => {
    const data = {
        _id: '',
        email: 'nya-admin@nya.nya',
        password: '999',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,

        created: '',
        updated: '',
        isAdmin: false,
        verified: false,
        rememberMe: false,

        error: '',
    }
    const endState = profileReducer(initialState, changeProfileData(data))

    expect(initialState.email).toBe('nya-admin@nya.nya')
    expect(initialState.password).toBe('1qazxcvBG')
    expect(initialState.name).toBe('')
    expect(initialState.publicCardPacksCount).toBe(0)
    expect(initialState.rememberMe).toBeFalsy()
    expect(endState.email).toBe('nya-admin@nya.nya')
    expect(endState.password).toBe('999')
    expect(endState.name).toBe('')
    expect(endState.publicCardPacksCount).toBe(0)
    expect(endState.rememberMe).toBeFalsy()
})
