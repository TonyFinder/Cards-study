import {Input} from '../_superComponents/Input/Input';
import {EditableSpan} from '../_superComponents/EditableSpan/EditableSpan';
import styles from './Test.module.scss'
import {Button} from '../_superComponents/Button/Button';
import {Checkbox} from '../_superComponents/Checkbox/Checkbox';
import {useState} from 'react';
import {Radio} from '../_superComponents/Radio/Radio';
import {Select} from '../_superComponents/Select/Select';

export const Test = () => {
    // Checkbox usage
    const [checkboxValue, setCheckboxValue] = useState<boolean[]>([false, true, true, false, true])
    const onClickCheckbox = (position: number) => setCheckboxValue(checkboxValue.map((i, index) => index === position ? !checkboxValue[index] : i))

    // Radio usage
    const [radioSelect, setRadioSelect] = useState<boolean[]>([false, true, false])
    const onClickRadio = (position: number) => setRadioSelect(radioSelect.map((i, index) => index === position))


    // Select usage
    const [value, onChangeOption] = useState('')

    return <div className={styles.container}>

        {/*Button*/}
        <div className={styles.innerBlock}>
            <span>Button<br/>Background and text color can be customized in the props.</span>
            <div>
                <Button>Button default</Button>
                <Button color={'red'}>Button colored</Button>
                <Button disabled>Button disabled</Button>
            </div>
        </div>

        {/*Checkbox*/}
        <div className={styles.innerBlock}>
            <span>Checkbox<br/>Checkbox color can be customized in the props.</span>
            <div className={styles.checkboxBlock}>
                <Checkbox
                    checked={checkboxValue[0]}
                    onClick={() => onClickCheckbox(0)}
                >Active default</Checkbox>
                <Checkbox
                    checked={checkboxValue[1]}
                    onClick={() => onClickCheckbox(1)}
                >Completed default</Checkbox>
                <Checkbox
                    color={'red'}
                    checked={checkboxValue[2]}
                    onClick={() => onClickCheckbox(2)}
                >Completed customized</Checkbox>
            </div>
            <div className={styles.checkboxBlock}>
                <Checkbox
                    checked={checkboxValue[3]}
                    onClick={() => onClickCheckbox(3)}
                    disabled
                >Disabled active</Checkbox>
                <Checkbox
                    checked={checkboxValue[4]}
                    onClick={() => onClickCheckbox(4)}
                    disabled
                >Disabled completed</Checkbox>
            </div>
        </div>

        {/*Radio*/}
        <div className={styles.innerBlock}>
            <span>Radio<br/>Radio color can be customized in the props.</span>
            <div className={styles.checkboxBlock}>
                <Radio
                    color='green'
                    checked={radioSelect[0]}
                    onClick={() => onClickRadio(0)}
                >Yes</Radio>
                <Radio
                    checked={radioSelect[1]}
                    onClick={() => onClickRadio(1)}
                >Maybe</Radio>
                <Radio
                    color='red'
                    checked={radioSelect[2]}
                    onClick={() => onClickRadio(2)}
                >No</Radio>
            </div>
            <div className={styles.checkboxBlock}>
                <Radio disabled>Disabled not selected</Radio>
                <Radio checked disabled>Disabled selected</Radio>
            </div>
        </div>

        {/*Select*/}
        <div className={styles.innerBlock}>
            <span>Select</span>
            <Select
                options={['None', 'Ivanov', 'Petrov', 'Sidorov', 'Levin']}
                value={value}
                onChangeOption={onChangeOption}
            />
        </div>

        {/*Input*/}
        <div className={styles.innerBlock}>
            <span>Input</span>
            <Input/>
        </div>

        {/*Editable Span*/}
        <div className={styles.innerBlock}>
            <span>EditableSpan</span>
            <div className={styles.checkboxBlock}>
                <EditableSpan/>
            </div>
        </div>

    </div>
}