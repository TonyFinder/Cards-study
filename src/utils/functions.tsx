import {CardType} from '../_dal/api-PacksAndCards';
import {addNotification} from '../_bll/main/appReducer';
import {v1} from 'uuid';
import {RootActionTypes} from '../_bll/main/store';
import {Dispatch} from 'redux';

export const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}

export const showError = (error: string, dispatch: Dispatch<RootActionTypes>) => {
        dispatch(addNotification({
            type: "error",
            message: error,
            id: v1(),
        }))
}
export const showSuccess = (success: string, dispatch: Dispatch<RootActionTypes>) => {
    dispatch(addNotification({
        type: "success",
        message: success,
        id: v1(),
    }))
}