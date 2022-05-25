export const ROUTE_PATHS = {
    MAIN: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT: '/forgot',
    SET_PASS: '/setPass',
    PROFILE: '/profile',
    TEST: '/test',
    ERROR_404: '/error404'
}

export const dataTestPage = {
    button: {
        header: 'Button',
        comments: ['The background and text color can be customized in the props. Blue by default.'],
        rowFirst: [
            {id: 0, title: 'Button default', color: '', disable: false},
            {id: 1, title: 'Button colored', color: 'red', disable: false},
            {id: 2, title: 'Button colored', color: 'green', disable: false},
            {id: 3, title: 'Button disabled', color: '', disable: true},
        ]
    },
    checkbox: {
        header: 'Checkbox',
        comments: ['The checkbox color can be customized in the props. Blue by default.'],
        rowFirst: [
            {id: 0, title: 'Active default', color: '', disable: false},
            {id: 1, title: 'Completed default', color: '', disable: false},
            {id: 2, title: 'Completed customized', color: 'red', disable: false},
            {id: 3, title: 'Completed customized', color: 'orange', disable: false},
        ],
        rowSecond: [
            {id: 4, title: 'Disabled active', color: '', disable: true},
            {id: 5, title: 'Disabled completed', color: '', disable: true},
        ]
    },
    radio: {
        header: 'Radio',
        comments: ['The radio color can be customized in the props. Blue by default.'],
        rowFirst: [
            {id: 0, title: 'Yes', color: 'green', disable: false},
            {id: 1, title: 'Maybe', color: '', disable: false},
            {id: 2, title: 'No', color: 'red', disable: false},
        ],
        rowSecond: [
            {id: 3, title: 'Disabled not selected', color: '', checked: false, disable: true},
            {id: 4, title: 'Disabled selected', color: '', checked: true, disable: true},
        ]
    },
    select: {
        header: 'Select',
        comments: ['The bottom border can be customized to any color in the props. Blue by default.',
            'The color is applied when nothing is selected.'],
        rowFirst: [
            {id: 0, color: '', disable: false},
            {id: 1, color: '', disable: false},
            {id: 2, color: '', disable: true},
        ],
    },
    input: {
        header: 'Input',
        comments: ['The bottom border can be customized to any color in the props. Blue by default.',
            'The color is applied in case there is no value.'],
        rowFirst: [
            {id: 0, color: '', placeholder: 'Placeholder text', disable: false},
            {id: 1, color: '', placeholder: 'Text here', disable: false},
            {id: 2, color: '', placeholder: 'Key "Enter" without text', disable: false},
        ],
    },
}