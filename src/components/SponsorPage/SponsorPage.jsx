import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import s from "./SponsorPage.module.scss";
import { Button, ModalWindow } from "../../shared/components";
import { useNavigate } from "react-router-dom";
import { TalentsService } from "../../services/api-services";
import { UserContext } from "../../context/UserContext";
import { useCookies } from "react-cookie";
import { SponsorData } from "./components/SponsorData";
export function SponsorPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // const talentDataRef = useRef(null);
    // const aboutRef = useRef(null);

    const { user, token } = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    // const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);

    const [editting, setEditting] = useState(false);
    // const { setUserInfo } = useContext(UserContext);
    // const [modalIsOpen, setModalIsOpen] = useState(false);
    // const [cancelModalIsOpen, setCancelModalIsOpen] = useState(false);
    // const [saveError, setSaveError] = useState("");

    useEffect(() => {
        const path = `${location.pathname}${location.search}`;
        const hash = editting ? "#edit" : "";
        navigate(`${path}${hash}`, { replace: true });
    }, [editting, navigate, location.pathname, location.search]);

    useEffect(() => {
        setIsLoading(true);
        if (user.id) {
            TalentsService.getSponsor(user.id, token)
                .then((response) => {
                    setProfile(response);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user.id, token]);

    // const [firstName, setFirstName] = useState({
    //     name: "",
    //     error: "",
    //     state: true,
    // });
    // const [lastName, setLastName] = useState({
    //     name: "",
    //     error: "",
    //     state: true,
    // });

    // useEffect(() => {
    //     setUserInfo(profile);
    // }, [profile]);

    // useEffect(() => {
    //     if (Object.keys(profile).length !== 0) {
    //         setFirstName({ name: profile?.first_name, error: "", state: true });
    //         setLastName({ name: profile?.last_name, error: "", state: true });

    //         setSaveError("");
    //     }
    // }, [profile, editting]);

    if (isLoading || !profile) {
        return (
            <>
                <p>Loading</p>
            </>
        );
    }

    // const propsTalentData = {
    //     profile,
    //     editting,
    //     firstName,
    //     setFirstName,
    //     lastName,
    //     setLastName,
    // };

    // const propsAbout = {
    //     profile,
    //     editting,
    //     setEditting,
    //     setModalIsOpen,
    //     setCancelModalIsOpen,
    //     saveError,
    // };

    return (
        <>
            <div className={s.btns}>
                <Button className={s.btn} onClick={() => navigate(-1)}>
                    Back
                </Button>
            </div>
            <SponsorData />
        </>
    );
}
