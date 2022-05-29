import styles from './Profile.module.scss'
import {useCustomSelector} from "../../../_bll/main/store";
import {InitialStateTypeProfile} from "../../../_bll/features/profile/profileReducer";

export const Profile = () => {

    const userData = useCustomSelector<InitialStateTypeProfile>(state => state.profile)



    return <div className={styles.container}>

        <p>
            {`id: ${userData._id}`}<br/>
            {`name: ${userData.name}`}<br/>
            {`email: ${userData.email}`}<br/>
        </p>

    </div>
}