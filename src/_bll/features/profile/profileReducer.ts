let initialState: InitialStateType = {
    email: 'anton@gmail.com',
    name: 'Anton',
    avatar: 'http://amintl.com.pk/wp-content/uploads/2019/11/avatar3.png',
    publicCardPacksCount: 5
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionTypes): InitialStateType => {
    switch (action) {
        default:
            return state
    }
}


// actions


// thunks


// types
export type ProfileActionTypes = {}
type InitialStateType = {
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
}