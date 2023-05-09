import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../../context/UserContext";
import { TalentsService } from "../../../../services/api-services";
import s from "./SponsorData.module.scss";
import userAvatar from "../../../../shared/images/user.png";
export function SponsorData() {
    const { user, token, userInfo } = useContext(UserContext);
    const [kudos, setKudos] = useState(0);

    useEffect(() => {
        if (user.id) {
            TalentsService.getSponsorKudoses(user.id, token)
                .then((kudos) => {
                    setKudos(kudos.amount);
                })
                .catch((err) => console.log(err));
        }
    }, [user.id]);
    return (
        <div className={s.container}>
            <div className={s.sponsor_data}>
                <img className={s.ava} src={userAvatar} alt="avatar" />
                <div className={s.sponsor}>
                    <div className={s.name}>
                        {userInfo.first_name} {userInfo.last_name}
                    </div>
                </div>
            </div>
            <div className={s.about}>
                <div
                    className={s.ab_title}
                >{`Sponsor's kudoses: ${kudos}`}</div>
            </div>
        </div>
    );
}
