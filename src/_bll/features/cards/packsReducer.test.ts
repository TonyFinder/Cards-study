import {
    initialStatePacksType,
    packsReducer,
    setPacks,
    setShowFilters,
    updatePacksParams,
    UpdateParamsActionType
} from './packsReducer';
import {PacksType} from '../../../_dal/api-PacksAndCards';

const initialState: initialStatePacksType = {
    cardPacks: [
        {
            _id: "",
            user_id: "",
            user_name: "",
            name: "",
            cardsCount: 0,
            created: "",
            updated: "",
        },
    ],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 1,

    changeSlider: false,
    showFilters: false,

    packParams: {
        packName: "",
        min: 0,
        max: 0,
        sortPacks: "0updated",
        page: 1,
        pageCount: 8,
        user_id: '',
    },
}

test('SET-PACKS-DATA. Packs have to be set', () => {
    const data: PacksType = {
        cardPacks: [
            {
                _id: "5",
                user_id: "10",
                user_name: "Tony",
                name: "Funny",
                cardsCount: 4,
                created: "",
                updated: "",
            },
            {
                _id: "3",
                user_id: "15",
                user_name: "John",
                name: "Ann",
                cardsCount: 1,
                created: "",
                updated: "",
            },
        ],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 1,

        changeSlider: false,
        showFilters: false,
    }

    const endState = packsReducer(initialState, setPacks(data))

    expect(initialState.cardPacks.length).toBe(1)
    expect(endState.cardPacks.length).toBe(2)
    expect(initialState.cardPacks[0].name).toBe('')
    expect(endState.cardPacks[1].name).toBe('Ann')
})
test('UPDATE-PARAMS. Packs have to be changed', () => {
    const updatedParams: UpdateParamsActionType = {
            packName: "Mine",
            max: 10,
            sortPacks: "1updated",
    }

    const endState = packsReducer(initialState, updatePacksParams(updatedParams))

    expect(initialState.packParams.max).toBe(0)
    expect(endState.packParams.max).toBe(10)
    expect(initialState.packParams.packName).toBe('')
    expect(endState.packParams.packName).toBe('Mine')
})
test('SHOW-FILTERS. Filters have to be shown', () => {
    const endState = packsReducer(initialState, setShowFilters(true))

    expect(initialState.showFilters).toBeFalsy()
    expect(endState.showFilters).toBeTruthy()
})