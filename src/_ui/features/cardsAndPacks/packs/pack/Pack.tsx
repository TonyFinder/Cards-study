import React from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import styles from './pack.module.scss';
import {Link} from 'react-router-dom';
import {COLORS, ROUTE_PATHS} from '../../../../../utils/_values';
import {SortButton} from '../../../../common/_superComponents/SortButton/SortButton';
import {useAppDispatch, useCustomSelector} from '../../../../../_bll/main/store';
import {updateParams} from '../../../../../_bll/features/cards/packsReducer';
import {LoadingStatusType} from '../../../../../utils/enums';
import { ModalDeleteContainer } from '../../../modal/packModal/deletePack/ModalDeleteContainer';
import { ModalUpdateContainer } from '../../../modal/packModal/updatePack/ModalUpdateContainer';

export type PackPropsType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    cardsCount: number | string
    created: string
    updated: string
    header?: boolean
    sort: string[]
    onClick?: (packId: string) => void
}

export const Pack: React.FC<PackPropsType> = (props) => {
    const {
        _id,
        name,
        cardsCount,
        updated,
        user_name,
        created,
        header,
        sort,
        user_id,
        onClick,
    } = props;
    const dispatch = useAppDispatch()
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)
    const userId = useCustomSelector<string>(state => state.profile._id)

    const disabled = loading === LoadingStatusType.active

    const onClickSortHandler = (e: string) => {
        // определяем, на какой колонке находится фильтр
        if (loading === LoadingStatusType.active) return
        sort[1] === e
            // определяем как отсортирована колонка
            ? sort[0] === '0'
                ? dispatch(updateParams({sortPacks: `1${sort[1]}`, page: 1}))
                : dispatch(updateParams({sortPacks: '0updated', page: 1}))
            : dispatch(updateParams({sortPacks: `0${e}`, page: 1}))
    }
    const onClickLearnHandle = () => {
        onClick && onClick(_id)
    }

    return (
        <div key={_id} className={styles.row}>
            <div className={styles.name}>
                {header
                    ? <SortButton title={name}
                                  value={sort[1] === 'name' ? sort[0] : '2'}
                                  color={COLORS.SORT}
                                  onClick={() => onClickSortHandler('name')}/>
                    : <div className={styles.hidden}>
                        <Link to={`${ROUTE_PATHS.CARDS}/${props._id}/${name}`}>{name}</Link>
                </div>
                }
            </div>
            <div className={styles.cards}>
                {header
                    ? <SortButton title={cardsCount}
                                  value={sort[1] === 'cardsCount' ? sort[0] : '2'}
                                  color={COLORS.SORT}
                                  onClick={() => onClickSortHandler('cardsCount')}/>
                    : cardsCount
                }
            </div>
            <div className={styles.updated}>
                {header
                    ? <SortButton title={updated}
                                  value={sort[1] === 'updated' ? sort[0] : '2'}
                                  color={COLORS.SORT}
                                  onClick={() => onClickSortHandler('updated')}/>
                    : `${new Date(String(updated)).getDate()}/${new Date(String(updated)).getMonth()}/${new Date(String(updated)).getFullYear()}`
                }
            </div>
            <div className={styles.createdBy}>
                {header
                    ? <SortButton title={user_name}
                                  value={sort[1] === 'user_name' ? sort[0] : '2'}
                                  color={COLORS.SORT}
                                  onClick={() => onClickSortHandler('user_name')}/>
                    : <div className={styles.hidden}>{user_name}</div>
                }
            </div>
            <div className={styles.actions}>

                {header
                    ? <SortButton title={created}
                                  value="2"
                                  color="#fd974f"/>
                    : <>
                        {user_id === userId &&
                            <ModalDeleteContainer disabled={disabled} packId={_id} packName={name}/>}
                        {user_id === userId &&
                            <ModalUpdateContainer disabled={disabled} packId={_id} packName={name}/>}
                        <Button color={COLORS.BUTTON_TABLE_MAIN}
                                onClick={onClickLearnHandle}
                                disabled={cardsCount === 0}
                                className={styles.button}>Learn</Button>
                    </>
                }
            </div>

        </div>
    );
};


