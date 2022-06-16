import {cardsReducer, initialStateCardsType, setCards, updateGradeCard} from './cardsReducer';

const initialState: initialStateCardsType = {
    cards: [
        {
            answer: 'no answer',
            question: 'no question',
            cardsPack_id: '5eb6a2f72f849402d46c6ac4',
            grade: 4.987525071790364,
            shots: 1,
            user_id: '142151531535151',
            created: '2020-05-13T11:05:44.867Z',
            updated: '2020-05-13T11:05:44.867Z',
            _id: '5ebbd48876810f1ad0e7ece3',
        },
        {
            answer: '3',
            question: '3',
            cardsPack_id: 'asdfasdfasdvsadf',
            grade: 2.1564,
            shots: 3,
            user_id: '142151531535151',
            created: '2020-05-13T11:05:44.867Z',
            updated: '2020-05-13T11:05:44.867Z',
            _id: '5ebbd48876810f1ad0e7afe5',
        },
    ],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
    packUserId: '',

    cardParams: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 0,
        sortCards: '0grade',
        page: 1,
        pageCount: 7
    }
}

test('cards have to be added', () => {

    const updatedInfo = {
        cards: [
            {
                answer: '1',
                question: '2',
                cardsPack_id: '35asdf',
                grade: 4.156,
                shots: 5,
                user_id: '12352346',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: '5ebbd48876810f1ad0e7ece3',
            },
            {
                answer: '3',
                question: '4',
                cardsPack_id: '35asdf',
                grade: 4.152456,
                shots: 3,
                user_id: '12352346',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: '5ebbd48876810f1ad0e7ece3',
            },
        ],
        cardsTotalCount: 3,
        maxGrade: 4.987525071790364,
        minGrade: 2.0100984354076568,
        page: 1,
        pageCount: 4,
        packUserId: '',
    }

    const finalState = cardsReducer(initialState, setCards(updatedInfo))
    expect(finalState).toEqual({
        cards: [
            {
                answer: '1',
                question: '2',
                cardsPack_id: '35asdf',
                grade: 4.156,
                shots: 5,
                user_id: '12352346',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: '5ebbd48876810f1ad0e7ece3',
            },
            {
                answer: '3',
                question: '4',
                cardsPack_id: '35asdf',
                grade: 4.152456,
                shots: 3,
                user_id: '12352346',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: '5ebbd48876810f1ad0e7ece3',
            },
        ],
        cardsTotalCount: 3,
        maxGrade: 4.987525071790364,
        minGrade: 2.0100984354076568,
        page: 1,
        pageCount: 4,
        packUserId: '',

        cardParams: {
            cardAnswer: '',
            cardQuestion: '',
            cardsPack_id: '',
            min: 0,
            max: 0,
            sortCards: '0grade',
            page: 1,
            pageCount: 7
        }
    })
    expect(initialState).toEqual({
        cards: [
            {
                answer: 'no answer',
                question: 'no question',
                cardsPack_id: '5eb6a2f72f849402d46c6ac4',
                grade: 4.987525071790364,
                shots: 1,
                user_id: '142151531535151',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: '5ebbd48876810f1ad0e7ece3',
            },
            {
                answer: '3',
                question: '3',
                cardsPack_id: 'asdfasdfasdvsadf',
                grade: 2.1564,
                shots: 3,
                user_id: '142151531535151',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: '5ebbd48876810f1ad0e7afe5',
            },
        ],
        cardsTotalCount: 3,
        maxGrade: 4.987525071790364,
        minGrade: 2.0100984354076568,
        page: 1,
        pageCount: 4,
        packUserId: '',

        cardParams: {
            cardAnswer: '',
            cardQuestion: '',
            cardsPack_id: '',
            min: 0,
            max: 0,
            sortCards: '0grade',
            page: 1,
            pageCount: 7
        }
    })
})
test('grade have to be changed', ()=>{
    const updatedInfo = {
        _id: '5ebbd48876810f1ad0e7afe5',
        cardsPack_id: 'asdfasdfasdvsadf',
        card_id: '5ebbd48876810f1ad0e7afe5',
        user_id: '142151531535151',
        grade: 4.5,
        shots: 4,
        created: '',
        more_id: '',
        updated: '',
        __v: 0
    }
    const finalState = cardsReducer(initialState, updateGradeCard(updatedInfo))
    expect(initialState).toEqual({
        cards: [
            {
                answer: 'no answer',
                question: 'no question',
                cardsPack_id: '5eb6a2f72f849402d46c6ac4',
                grade: 4.987525071790364,
                shots: 1,
                user_id: '142151531535151',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: '5ebbd48876810f1ad0e7ece3',
            },
            {
                answer: '3',
                question: '3',
                cardsPack_id: 'asdfasdfasdvsadf',
                grade: 2.1564,
                shots: 3,
                user_id: '142151531535151',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: '5ebbd48876810f1ad0e7afe5',
            },
        ],
        cardsTotalCount: 3,
        maxGrade: 4.987525071790364,
        minGrade: 2.0100984354076568,
        page: 1,
        pageCount: 4,
        packUserId: '',

        cardParams: {
            cardAnswer: '',
            cardQuestion: '',
            cardsPack_id: '',
            min: 0,
            max: 0,
            sortCards: '0grade',
            page: 1,
            pageCount: 7
        }
    })
    expect(finalState).toEqual({
        cards: [
            {
                answer: 'no answer',
                question: 'no question',
                cardsPack_id: '5eb6a2f72f849402d46c6ac4',
                grade: 4.987525071790364,
                shots: 1,
                user_id: '142151531535151',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: '5ebbd48876810f1ad0e7ece3',
            },
            {
                answer: '3',
                question: '3',
                cardsPack_id: 'asdfasdfasdvsadf',
                grade: 4.5,
                shots: 4,
                user_id: '142151531535151',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: '5ebbd48876810f1ad0e7afe5',
            },
        ],
        cardsTotalCount: 3,
        maxGrade: 4.987525071790364,
        minGrade: 2.0100984354076568,
        page: 1,
        pageCount: 4,
        packUserId: '',

        cardParams: {
            cardAnswer: '',
            cardQuestion: '',
            cardsPack_id: '',
            min: 0,
            max: 0,
            sortCards: '0grade',
            page: 1,
            pageCount: 7
        }
    })
})