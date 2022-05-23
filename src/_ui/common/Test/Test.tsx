import {Input} from '../_superComponents/Input/Input';
import {EditableSpan} from '../_superComponents/EditableSpan/EditableSpan';
import {Radio} from '../_superComponents/Radio/Radio';
import {Select} from '../_superComponents/Select/Select';
import styles from './Test.module.scss'
import {Button} from '../_superComponents/Button/Button';
import {Checkbox} from '../_superComponents/Checkbox/Checkbox';
import {useState} from 'react';

export const Test = () => {
    const [checkboxValue, setCheckboxValue] = useState<boolean[]>([false, true, true, false, true])
    const onClickHandler = (position: number) => setCheckboxValue(checkboxValue.map((i, index) => index === position ? !checkboxValue[index] : i))

    return <div className={styles.container}>
        <div className={styles.innerBlock}>
            <span>Button<br/>Background and text color can be customized in the props.</span>
            <div>
                <Button>Button default</Button>
                <Button color={'red'}>Button colored</Button>
                <Button disabled>Button disabled</Button>
            </div>
        </div>
        <div className={styles.innerBlock}>
            <span>Checkbox<br/>Checkbox color can be customized in the props.</span>
            <div className={styles.checkboxBlock}>
                <Checkbox checked={checkboxValue[0]} onClick={() => onClickHandler(0)}>Active default</Checkbox>
                <Checkbox checked={checkboxValue[1]} onClick={() => onClickHandler(1)}>Completed default</Checkbox>
                <Checkbox color={'red'} checked={checkboxValue[2]} onClick={() => onClickHandler(2)}>Completed customized</Checkbox>
                <Checkbox checked={checkboxValue[3]} onClick={() => onClickHandler(3)} disabled>Disabled active</Checkbox>
                <Checkbox checked={checkboxValue[4]} onClick={() => onClickHandler(4)} disabled>Disabled completed</Checkbox>
            </div>
        </div>
        <div className={styles.innerBlock}>
            <span>EditableSpan</span>
            <EditableSpan/>
        </div>
        <div className={styles.innerBlock}>
            <span>Input</span>
            <Input/>
        </div>
        <div className={styles.innerBlock}>
            <span>Radio</span>
            <Radio options={['1', '2', '3']}/>
        </div>
        <div className={styles.innerBlock}>
            <span>Select</span>
            <Select options={['First', 'Second', 'Third']}/>
        </div>
    </div>
}