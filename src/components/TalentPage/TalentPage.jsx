import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Layout } from "../Layout";
import s from "./TalentPage.module.scss";
import { Button } from "../../shared/components/Button/Button";
import { useNavigate } from "react-router-dom";
import linkedin from "../../shared/images/linkedin.svg";
import github from "../../shared/images/github.svg";
import { TalentsService } from "../../services/api-services";
import { TalentsContext } from "../../context/TalentsContext";
import { useTalent } from "../../hooks/useTalent";

export function TalentPage() {
    const params = useParams();
    const navigate = useNavigate();

    const { talent, isLoading } = useTalent(params.id);

    if (isLoading || !talent) {
        return <></>;
    }

    return (
        <>
            <div className={s.btns}>
                <Button className={s.btn} onClick={() => navigate(-1)}>
                    Back
                </Button>
            </div>
            <div className={s.container}>
                <div className={s.talent_data}>
                    <img className={s.ava} src={talent.image} alt="avatar" />
                    <div className={s.talent}>
                        <div className={s.name}>
                            {talent.first_name} {talent.last_name}
                        </div>

                        <p>{talent?.specialization}</p>

                        <div className={s.skills}>
                            {talent.skills?.map((skill, talent) => (
                                <div className={s.skill} key={talent}>
                                    {skill}
                                </div>
                            ))}
                        </div>
                        <div className={s.links}>
                            {talent.links?.map((link, talent) => (
                                <a className={s.link} href={link} key={talent}>
                                    {link.includes("linkedin") ? (
                                        <img
                                            className={s.socials}
                                            src={linkedin}
                                            alt=" media icon"
                                        />
                                    ) : (
                                        <img
                                            className={s.socials}
                                            src={github}
                                            alt=" media icon"
                                        />
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={s.about}>
                    <div className={s.ab_title}>about</div>

                    <h3>Bio</h3>
                    <div className={s.bio}>
                        <p>{talent.bio}</p>
                    </div>
                    <h3>Additional info</h3>
                    <div className={s.additional_info}>
                        <p>{talent.additional_info}</p>
                    </div>

                    <h3>Contacts:</h3>
                    <ul className={s.contacts}>
                        {talent.contacts?.map((contact, index) => (
                            <li key={index}>{contact}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* <div className={s.proofs}>
                <div className={s.info}>
                    <h3>Proof:</h3>
                </div>
            </div> */}
        </>
    );
}
