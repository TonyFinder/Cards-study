import {Input} from '../_superComponents/Input/Input';
import {Button} from '../_superComponents/Button/Button';
import {Checkbox} from '../_superComponents/Checkbox/Checkbox';
import {EditableSpan} from '../_superComponents/EditableSpan/EditableSpan';
import {Radio} from '../_superComponents/Radio/Radio';
import {Select} from '../_superComponents/Select/Select';

export const Test = () => {
  return <div>
      <Input/>
      <Button>Button</Button>
      <Checkbox onClickChecked={()=>""} checked={false}/>
      <EditableSpan/>
      <Radio options={['1', '2', '3']}/>
      <Select options={['First', 'Second', 'Third']}/>
  </div>
}