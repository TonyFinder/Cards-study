import styles from './Test.module.scss'
import {Button} from '../_superComponents/Button/Button';
import {Checkbox} from '../_superComponents/Checkbox/Checkbox';
import {useState} from 'react';
import {Radio} from '../_superComponents/Radio/Radio';
import {Select} from '../_superComponents/Select/Select';
import {Input} from '../_superComponents/Input/Input';

export const Test = () => {
    // Checkbox usage
    const [checkboxValue, setCheckboxValue] = useState<boolean[]>([false, true, true, false, true])
    const onClickCheckbox = (position: number) => setCheckboxValue(checkboxValue.map((i, index) => index === position ? !checkboxValue[index] : i))

    // Radio usage
    const [radioSelect, setRadioSelect] = useState<boolean[]>([false, true, false])
    const onClickRadio = (position: number) => setRadioSelect(radioSelect.map((i, index) => index === position))

    // Select usage
    const [valueSelect, setValueSelect] = useState<any[]>(['', 'Petrov', 'Levin'])
    const setValueSelectHandler = (position: number, value: string) => setValueSelect(valueSelect.map((pos, i) => i === position ? value : pos))

    // Input usage
    const [text, setText] = useState<string[]>(['', 'Value is typed', ''])
    const [error, setError] = useState<boolean[]>([false, false, true])
    const setTextHandler = (position: number, value: string) => setText(text.map((pos, i) => i === position ? value : pos))
    const setErrorHandler = (position: number, value: boolean) => setError(error.map((pos, i) => i === position ? value : pos))

    return <div className={styles.container}>

        {/*Button*/}
        <div className={styles.innerBlock}>
            <div className={styles.description}>
                <h3>Button</h3>
                <span>The background and text color can be customized in the props. Blue by default.</span>
            </div>
            <div>
                <Button>Button default</Button>
                <Button color={'red'}>Button colored</Button>
                <Button disabled>Button disabled</Button>
            </div>
        </div>

        {/*Checkbox*/}
        <div className={styles.innerBlock}>
            <div className={styles.description}>
                <h3>Checkbox</h3>
                <span>The checkbox color can be customized in the props. Blue by default.</span>
            </div>
            <div>
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
            <div>
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
            <div className={styles.description}>
                <h3>Radio</h3>
                <span>The radio color can be customized in the props. Blue by default.</span>
            </div>
            <div>
                <Radio
                    color="green"
                    checked={radioSelect[0]}
                    onClick={() => onClickRadio(0)}
                >Yes</Radio>
                <Radio
                    checked={radioSelect[1]}
                    onClick={() => onClickRadio(1)}
                >Maybe</Radio>
                <Radio
                    color="red"
                    checked={radioSelect[2]}
                    onClick={() => onClickRadio(2)}
                >No</Radio>
            </div>
            <div>
                <Radio disabled>Disabled not selected</Radio>
                <Radio checked disabled>Disabled selected</Radio>
            </div>
        </div>

        {/*Select*/}
        <div className={styles.innerBlock}>
            <div className={styles.description}>
                <h3>Select</h3>
                <span>The button border can be customized to any color in the props. Blue by default.</span>
                <span>The color is applied when nothing is selected.</span>
            </div>
            <div>
                <Select
                    options={['None', 'Ivanov', 'Petrov', 'Sidorov', 'Levin']}
                    value={valueSelect[0]}
                    onChangeOption={(value: string)=>setValueSelectHandler(0, value)}
                />
                <Select
                    options={['None', 'Ivanov', 'Petrov', 'Sidorov', 'Levin']}
                    value={valueSelect[1]}
                    onChangeOption={(value: string)=>setValueSelectHandler(1, value)}
                />
                <Select
                    options={['None', 'Ivanov', 'Petrov', 'Sidorov', 'Levin']}
                    value={valueSelect[2]}
                    onChangeOption={(value: string)=>setValueSelectHandler(2, value)}
                    disabled
                />
            </div>
        </div>

        {/*Input*/}
        <div className={styles.innerBlock}>
            <div className={styles.description}>
                <h3>Input</h3>
                <span>The button border can be customized to any color in the props. Blue by default.</span>
                <span>The color is applied in case there is no value.</span>
            </div>
            <div>
                <Input
                    value={text[0]}
                    placeholder={'Placeholder text'}
                    onChangeText={(value: string)=>setTextHandler(0, value)}
                    onChangeError={(value: boolean)=>setErrorHandler(0, value)}
                    onEnter={() => alert('Data is accepted')}
                    error={error[0]}
                />
                <Input
                    value={text[1]}
                    placeholder={'Text here'}
                    onChangeText={(value: string)=>setTextHandler(1, value)}
                    onChangeError={(value: boolean)=>setErrorHandler(1, value)}
                    onEnter={() => alert('Data is accepted')}
                    error={error[1]}
                />
                <Input
                    value={text[2]}
                    placeholder={'Key "Enter" without text'}
                    onChangeText={(value: string)=>setTextHandler(2, value)}
                    onChangeError={(value: boolean)=>setErrorHandler(2, value)}
                    onEnter={() => alert('Data is accepted')}
                    error={error[2]}
                />
            </div>
        </div>

        {/*Editable Span*/}
        <div className={styles.innerBlock}>
            <div className={styles.description}>
                <h3>EditableSpan</h3>
            </div>
            <div>
                {/*<EditableSpan/>*/}
            </div>
        </div>

    </div>
}