import 'rc-slider/assets/index.css';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setMinMaxCardsCount} from "../../../../../../_bll/features/cards/packsReducer";

export default () => {

    const [number, setNumber] = useState<number[]>([0, 0])

    const dispatch = useDispatch()

    const onChangeHandlerMultiSlider = (e: number[]) => {
        dispatch(setMinMaxCardsCount(e))
    }


    return (
        <>
            <h2>{number[0]}</h2>
            <h2>{number[1]}</h2>
            {/*<Slider onChange={(e) => Array.isArray(e) && setNumber(e)} range allowCross={false}
                max={110}    defaultValue={[0, 110]} onAfterChange={(e) => Array.isArray(e) && onChangeHandlerMultiSlider(e)}/>*/}
        </>
    );
}


