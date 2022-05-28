import styles from './Profile.module.scss'
import {useSelector} from "react-redux";
import {AppStateRootType} from "../../../_bll/main/store";
import {InitialStateTypeProfile} from "../../../_bll/features/profile/profileReducer";

export const Profile = () => {

    const userData = useSelector<AppStateRootType, InitialStateTypeProfile>(state => state.profile)

    return <div className={styles.container}>

        <p>
            {`id: ${userData._id}`}<br/>
            {`name: ${userData.name}`}<br/>
            {`email: ${userData.email}`}<br/>
        </p>

    </div>
}