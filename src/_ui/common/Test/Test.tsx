import styles from './Test.module.scss'
import {ButtonIntro} from './ButtonIntro/ButtonIntro';
import {CheckboxIntro} from './CheckboxIntro/CheckboxIntro';
import {RadioIntro} from './RadioIntro/RadioIntro';
import {SelectIntro} from './SelectIntro/SelectIntro';
import {InputIntro} from './InputIntro/InputIntro';
import {EditableSpanIntro} from './EditableSpanIntro/EditableSpanIntro';
import {SliderIntro} from './SliderIntro/SliderIntro';
import {LoaderIntro} from './LoaderIntro/LoaderIntro';

export const Test = () => {
    return <div className={styles.container}>
        <SliderIntro/>
        <LoaderIntro/>
        <ButtonIntro/>
        <CheckboxIntro/>
        <RadioIntro/>
        <SelectIntro/>
        <InputIntro/>
        <EditableSpanIntro/>
    </div>
}