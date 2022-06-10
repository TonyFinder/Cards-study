import React from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import styles from './pack.module.scss';
import {Link} from 'react-router-dom';
import {COLORS, ROUTE_PATHS} from '../../../../../utils/_values';
import {SortButton} from '../../../../common/_superComponents/SortButton/SortButton';
import {useAppDispatch} from '../../../../../_bll/main/store';
import {updateParams} from '../../../../../_bll/features/cards/packsReducer';

export type PackPropsType = {
    _id: string
    user_id?: string
    user_name?: string
    name?: string
    cardsCount?: number | string
    created?: string
    updated?: string
    header?: boolean
    sort: string[]
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
    } = props;

    const dispatch = useAppDispatch()

    const onClickHandler = (e: string) => {
        // определяем, на какой колонке находится фильтр
        sort[1] === e
            // определяем как отсортирована колонка
            ? sort[0] === '0'
                ? dispatch(updateParams({sortPacks: `1${sort[1]}`, page: 1}))
                : dispatch(updateParams({sortPacks: '0updated', page: 1}))
            : dispatch(updateParams({sortPacks: `0${e}`, page: 1}))
    }

    return (
        <div key={_id} className={styles.row}>
            <div className={styles.name}>
                {header
                    ? <SortButton title={name ? name : ''}
                                  value={sort[1] === 'name' ? sort[0] : '2'}
                                  color={COLORS.MAIN_DARK}
                                  onClick={() => onClickHandler('name')}/>
                    : <Link to={`${ROUTE_PATHS.CARDS}/${props._id}/${name}`}>{name}</Link>
                }
            </div>
            <div className={styles.cards}>
                {header
                    ? <SortButton title={cardsCount ? cardsCount : ''}
                                  value={sort[1] === 'cardsCount' ? sort[0] : '2'}
                                  color={COLORS.MAIN_DARK}
                                  onClick={() => onClickHandler('cardsCount')}/>
                    : cardsCount
                }
            </div>
            <div className={styles.updated}>
                {header
                    ? <SortButton title={updated ? updated : ''}
                                  value={sort[1] === 'updated' ? sort[0] : '2'}
                                  color={COLORS.MAIN_DARK}
                                  onClick={() => onClickHandler('updated')}/>
                    : updated?.slice(0, 10)
                }
            </div>
            <div className={styles.createdBy}>
                {header
                    ? <SortButton title={user_name ? user_name : ''}
                                  value={sort[1] === 'user_name' ? sort[0] : '2'}
                                  color={COLORS.MAIN_DARK}
                                  onClick={() => onClickHandler('user_name')}/>
                    : user_name
                }
            </div>
            <div className={styles.actions}>
                {header
                    ? <SortButton title={created ? created : ''}
                                  value="2"
                                  color="#fd974f"/>
                    : <div>
                        <Button color={'red'}>Delete</Button>
                        <Button>Edit</Button>
                        <Button>Learn</Button>
                    </div>
                }
            </div>
        </div>
    );
};


