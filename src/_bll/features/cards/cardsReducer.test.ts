import {CardParamsType, CardsType, UpdatedGradeCardType} from '../../../_dal/api-PacksAndCards';
import {cardsReducer, initialStateCardsType, setCards, updateCardParams, updateGradeCard} from './cardsReducer';

const initialState: initialStateCardsType = {
    cards: [
        {
            answer: "no answer",
            question: "no question",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            shots: 1,
            user_id: "142151531535151",
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13T11:05:44.867Z",
            _id: "5ebbd48876810f1ad0e7ece3",
            answerImg: "",
            questionImg: "",
            questionVideo: "",
            answerVideo: "",
        },
    ],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
    packUserId: "",

    cardParams: {
        cardAnswer: "",
        cardQuestion: "",
        cardsPack_id: "",
        min: 0,
        max: 0,
        sortCards: "0updated",
        page: 1,
        pageCount: 8

    }
}

test('SET-CARDS-DATA. Cards have to be set', () => {
    const data: CardsType = {
        cards: [
            {
                answer: "Answer here",
                question: "3 questions",
                cardsPack_id: "hey",
                grade: 2,
                shots: 9,
                user_id: "12",
                created: "2020-05-13T11:05:44.867Z",
                updated: "2020-05-13T11:05:44.867Z",
                _id: "5ebbd48876810f1ad0e7ece3",
                answerImg: "",
                questionImg: "",
                questionVideo: "",
                answerVideo: "",
            },
            {
                answer: "Answer 2",
                question: "5 questions",
                cardsPack_id: "oh",
                grade: 5,
                shots: 2,
                user_id: "12",
                created: "2020-05-13T11:05:44.867Z",
                updated: "2020-05-13T11:05:44.867Z",
                _id: "5ebbd48876810f1ad0e7ece3",
                answerImg: "",
                questionImg: "",
                questionVideo: "",
                answerVideo: "",
            },
        ],
        cardsTotalCount: 3,
        maxGrade: 4.987525071790364,
        minGrade: 2.0100984354076568,
        page: 1,
        pageCount: 4,
        packUserId: "",
    }

    const endState = cardsReducer(initialState, setCards(data))

    expect(initialState.cards.length).toBe(1)
    expect(endState.cards.length).toBe(2)
    expect(initialState.cards[0].answer).toBe("no answer")
    expect(endState.cards[0].shots).toBe(9)
    expect(endState.cards[1].answer).toBe("Answer 2")
})
test('UPDATE-CARD-PARAMS. Cards have to be changed', () => {
    const newParams: CardParamsType = {
        cardAnswer: "",
            cardQuestion: "",
            cardsPack_id: "",
            min: 5,
            max: 50,
            sortCards: "1updated",
            page: 3,
            pageCount: 8
    }

    const endState = cardsReducer(initialState, updateCardParams(newParams))

    expect(initialState.cardParams.min).toBe(0)
    expect(initialState.cardParams.page).toBe(1)
    expect(endState.cardParams.max).toBe(50)
    expect(endState.cardParams.sortCards).toBe('1updated')
})
test('UPDATE-GRADE-CARD-PARAMS. Grade for card have to be applied', () => {
    const newGradeUpdate: UpdatedGradeCardType = {
        _id: "5ebbd48876810f1ad0e7ece3",
        cardsPack_id: "5eb6a2f72f849402d46c6ac4",
        card_id: "5ebbd48876810f1ad0e7ece3",
        user_id: "142151531535151",
        grade: 2.8,
        shots: 5,
        created: "2020-05-13T11:05:44.867Z",
        updated: "2020-05-13T11:05:44.867Z",
        more_id: '',
        __v: 50
    }

    const endState = cardsReducer(initialState, updateGradeCard(newGradeUpdate))

    expect(initialState.cards[0].grade).toBe(4.987525071790364)
    expect(initialState.cards[0].answer).toBe("no answer")
    expect(endState.cards[0].grade).toBe(2.8)
    expect(endState.cards[0].shots).toBe(5)
})