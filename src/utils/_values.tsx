import {Navigate} from 'react-router-dom';
import {Forgot} from '../_ui/features/auth/Forgot/Forgot';
import {SetPass} from '../_ui/features/auth/SetPass/SetPass';
import {Profile} from '../_ui/features/Profile/Profile';
import {Test} from '../_ui/common/Test/Test';
import {Error404} from '../_ui/common/Error404/Error404';
import {Packs} from "../_ui/features/cardsAndPacks/packs/Packs";
import {Cards} from "../_ui/features/cardsAndPacks/cards/Cards";
import { Template } from '../_ui/features/Template';
import {CheckEmail} from '../_ui/features/auth/CheckEmail/CheckEmail';
import {Answer} from '../_ui/features/cardsAndPacks/learn/Answer/Answer';
import {Question} from '../_ui/features/cardsAndPacks/learn/Question/Question';
import {Login} from '../_ui/features/auth/Login/Login';
import {Register} from '../_ui/features/auth/Register/Register';

export const COLORS = {
    MAIN_DARK: '#fd974f',
    MAIN_LIGHT: '#fef2e4',
    BUTTON_TABLE_MAIN: '#fa6c3b',
    HEADER_BOTTOM: '#fc6e0a',
    DEFAULT: '#53a6fb',
    TRANSPARENT: 'rgba(255,255,255,0.7)',
    SORT: 'white'
}

export const ROUTE_PATHS = {
    MAIN: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT: '/forgot',
    SET_PASS: '/setPass',
    SET_PASS_TOKEN: '/setPass/:token',
    CHECK_EMAIL: '/checkEmail',
    CHECK_EMAIL_TOKEN: '/checkEmail/:email',
    PROFILE: '/profile',
    PACKS: '/packs',
    CARDS: '/cardsAndPacks',
    CARDS_TOKEN: '/cardsAndPacks/:packId/:packName',
    TEST: '/test',
    ERROR_404: '/error404',
    UNKNOWN_URL: '*',
    TEMPLATE: '/template',
    QUESTION: '/question',
    QUESTION_TOKEN: '/question/:packId',
    ANSWER: '/answer',
    ANSWER_TOKEN: '/answer/:packId/:cardId',
}

export const dataRoutes = {
    routes: [
        {id: 0, title: 'Main', visible: false, path: ROUTE_PATHS.MAIN, element: <Navigate to={ROUTE_PATHS.LOGIN}/>},
        {id: 1, title: 'Login', visible: false, path: ROUTE_PATHS.LOGIN, element: <Login/>},
        {id: 2, title: 'Register', visible: false, path: ROUTE_PATHS.REGISTER, element: <Register/>},
        {id: 3, title: 'ForgotPass', visible: false, path: ROUTE_PATHS.FORGOT, element: <Forgot/>},
        {id: 4, title: 'SetPass', visible: false, path: ROUTE_PATHS.SET_PASS, element: <SetPass/>},
        {id: 5, title: 'SetPassToken', visible: false, path: ROUTE_PATHS.SET_PASS_TOKEN, element: <SetPass/>},
        {id: 6, title: 'Packs', visible: true, path: ROUTE_PATHS.PACKS, element: <Packs/>},
        {id: 7, title: 'Cards', visible: false, path: ROUTE_PATHS.CARDS, element: <Cards/>},
        {id: 8, title: 'CardsToken', visible: false, path: ROUTE_PATHS.CARDS_TOKEN, element: <Cards/>},
        {id: 9, title: 'Profile', visible: true, path: ROUTE_PATHS.PROFILE, element: <Profile/>},
        {id: 10, title: 'Test', visible: false, path: ROUTE_PATHS.TEST, element: <Test/>},
        {id: 11, title: 'Error404', visible: false, path: ROUTE_PATHS.ERROR_404, element: <Error404/>},
        {id: 12, title: 'Unknown url', visible: false, path: ROUTE_PATHS.UNKNOWN_URL, element: <Navigate to={ROUTE_PATHS.ERROR_404}/>},
        {id: 13, title: 'Template', visible: false, path: ROUTE_PATHS.TEMPLATE, element: <Template/>},
        {id: 14, title: 'CheckEmail', visible: false, path: ROUTE_PATHS.CHECK_EMAIL, element: <CheckEmail/>},
        {id: 15, title: 'CheckEmailToken', visible: false, path: ROUTE_PATHS.CHECK_EMAIL_TOKEN, element: <CheckEmail/>},
        {id: 16, title: 'Question', visible: false, path: ROUTE_PATHS.QUESTION, element: <Question/>},
        {id: 17, title: 'Question', visible: false, path: ROUTE_PATHS.QUESTION_TOKEN, element: <Question/>},
        {id: 18, title: 'Answer', visible: false, path: ROUTE_PATHS.ANSWER, element: <Answer/>},
        {id: 19, title: 'Answer', visible: false, path: ROUTE_PATHS.ANSWER_TOKEN, element: <Answer/>},
    ]
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
            {id: 0, color: '', placeholder: 'Placeholder text', sign: 'Title', disable: false},
            {id: 1, color: '', placeholder: 'Text here', sign: 'Title', disable: false},
            {id: 2, color: '', placeholder: 'Key "Enter" without text', sign: 'Title', disable: false},
        ],
    },
    slider: {
        header: 'Slider',
        comments: ['The color can be set in scss variables.'],
        rowFirst: [
            {id: 0, min: 3, max: 20},
        ],
    },
    loader: {
        header: 'Loader',
        comments: ['The color can be customized in props.'],
        rowFirst: [
            {id: 0},
        ],
    },
    sortButton: {
        header: 'Sort Button',
        comments: ['The color and sort value can be customized in props.', 'Sort value for props: "2" - disable, "1" - up, "0" - down'],
        rowFirst: [
            {id: 0, title: 'Sort up', value: '1', color: '#fd974f'},
            {id: 1, title: 'Sort down', value: '0', color: '#fd974f'},
            {id: 2, title: 'Not selected', value: '2', color: '#fd974f'},
        ],
    },
    doubleButton: {
        header: 'Double Button',
        comments: ['The colors have to be customized in props. Active or disable params have to be passed in props as well.'],
        rowFirst: [
            {id: 0, activeColor: '#fd974f', disableColor: '#fef2e4', active: [true, false]},
        ],
    },
}