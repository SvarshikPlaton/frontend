import React, { useContext, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router";
import s from "./ProfilePage.module.scss";
import { Button, Input, Textarea } from "../../shared/components";
import userAvatar from "../../shared/images/user.png"
import { useNavigate } from "react-router-dom";
import linkedin from "../../shared/images/linkedin.svg";
import github from "../../shared/images/github.svg";
import { TalentsService } from "../../services/api-services";
import edit from "./images/edit.svg";
import { UserContext } from "../../context/UserContext";
import { useCookies } from "react-cookie";
import { AcceptingModal } from "./components/AcceptingModal";

export function ProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, token } = useContext(UserContext);


    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [editting, setEditting] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    useEffect(() => {
        if (editting) {
            navigate(`${location.pathname}${location.search}#edit`, {
                replace: true,
            });
        } else if (!editting) {
            navigate(`${location.pathname}${location.search}`, {
                replace: true,
            });
        }
    }, [editting]);

    useEffect(()=>{
        setIsLoading(true);
        if(user.id){
            TalentsService.getTalent(user.id, token).then((response)=>{
                setProfile(response);
                setIsLoading(false);
            }).catch((error) =>{
                console.log(error);
            })
        }
    }, [user.id, token])

    const [firstName, setFirstName] = useState({
        name: "",
        error: "",
        state: true,
    });
    const [lastName, setLastName] = useState({
        name: "",
        error: "",
        state: true,
    });
    const [specialization, setSpecialization] = useState({
        spec: "",
        error: "",
        state: true,
    });
    const [talents, setTalents] = useState({
        talents: "",
        error: "",
        state: true,
    });
    const [links, setLinks] = useState({
        links: "",
        error: "",
        state: true,
    });
    const [bio, setBio] = useState({
        bio: "",
        error: "",
        state: true,
    });
    const [additionalInfo, setAdditionalInfo] = useState({
        info: "",
        error: "",
        state: true,
    });
    const [contacts, setContacts] = useState({
        contacts: "",
        error: "",
        state: true,
    });
    // const [password, setPassword] = useState({
    //     pswd: "",
    //     error: "",
    //     state: true,
    // });
    // const [newPassword, setNewPassword] = useState({
    //     pswd: "",
    //     error: "",
    //     state: true,
    // });

    useEffect(()=>{
        if(Object.keys(profile).length !== 0){
            setFirstName((prev)=>({...prev, name:profile?.first_name}));
            setLastName((prev)=>({...prev, name:profile?.last_name}));
            setSpecialization((prev)=>({...prev, spec:profile?.specialization}));
            setTalents((prev)=>({...prev, talents: profile?.talents.join("; ")}));
            setLinks((prev)=>({...prev, links: profile?.links.join("; ")}));
            setBio((prev)=>({...prev, bio: profile?.bio ? profile?.bio : ""}));
            setAdditionalInfo((prev)=>({...prev, info: profile?.additional_info ? profile?.additional_info :""}));
            setContacts((prev)=>({...prev, contacts: profile?.contacts.join("; ") ? profile?.contacts.join("; ") :""}));
        }
    }, [profile, editting]);
    

    if (isLoading || !profile) {
        return <></>;
    }

    function validateFirstName() {
        const FIRST_NAME_REGEXP = /^[a-zA-Z'\s]{1,30}$/;
        if (FIRST_NAME_REGEXP.test(String(firstName.name).toLowerCase())) {
            setFirstName((prev) => ({ ...prev, state: true }));
            return true;
        } else {
            if (firstName.name.trim() === "") {
                setFirstName((prev) => ({ ...prev, error: "*empty field" }));
            } else if (firstName.name.length > 30) {
                setFirstName((prev) => ({
                    ...prev,
                    error: "*the value is too long",
                }));
            } else if (!FIRST_NAME_REGEXP.test(firstName.name)) {
                setFirstName((prev) => ({
                    ...prev,
                    error: "*you can use only latins letters",
                }));
            } else {
                setFirstName((prev) => ({ ...prev, error: "*not valid" }));
            }
            setFirstName((prev) => ({ ...prev, state: false }));
            return false;
        }
    }

    function validateLastName() {
        const LAST_NAME_REGEXP = /^[a-zA-Z'\s]{1,30}$/;
        if (LAST_NAME_REGEXP.test(String(lastName.name).toLowerCase())) {
            setLastName((prev) => ({ ...prev, state: true }));
            return true;
        } else {
            if (lastName.name.trim() === "") {
                setLastName((prev) => ({ ...prev, error: "*empty field" }));
            } else if (lastName.name.length > 30) {
                setLastName((prev) => ({
                    ...prev,
                    error: "*the value is too long",
                }));
            } else if (!LAST_NAME_REGEXP.test(lastName.name)) {
                setLastName((prev) => ({
                    ...prev,
                    error: "*you can use only latins letters",
                }));
            } else {
                setLastName((prev) => ({ ...prev, error: "*not valid" }));
            }
            setLastName((prev) => ({ ...prev, state: false }));
            return false;
        }
    }

    function validateSpecialization() {
        const SPECIALIZATION_REGEXP = /^[a-zA-Z0-9'\s]{1,70}$/;
        if (
            SPECIALIZATION_REGEXP.test(
                String(specialization.spec).toLowerCase()
            )
        ) {
            setSpecialization((prev) => ({ ...prev, state: true }));
            return true;
        } else {
            if (specialization.spec.trim() === "") {
                setSpecialization((prev) => ({
                    ...prev,
                    error: "*empty field",
                }));
            } else if (specialization.spec.length > 70) {
                setSpecialization((prev) => ({
                    ...prev,
                    error: "*the value is too long",
                }));
            } else if (
                !SPECIALIZATION_REGEXP.test(String(specialization.spec))
            ) {
                setSpecialization((prev) => ({
                    ...prev,
                    error: "*you can use only latins letters and numbers",
                }));
            } else {
                setSpecialization((prev) => ({ ...prev, error: "*not valid" }));
            }
            setSpecialization((prev) => ({ ...prev, state: false }));
            return false;
        }
    }

    function validateTalents() {
        const TALENTS_REGEXP = /^[A-Za-z0-9';\s]{0,200}$/;
        if (TALENTS_REGEXP.test(String(talents.talents).toLowerCase())) {
            setTalents((prev) => ({ ...prev, state: true }));
            return true;
        } else {
            if (talents.talents.length > 200) {
                setTalents((prev) => ({
                    ...prev,
                    error: "*the value is too long",
                }));
            } else if (!TALENTS_REGEXP.test(String(talents.talents))) {
                setTalents((prev) => ({
                    ...prev,
                    error: "*using incorrect symbols",
                }));
            }
            setTalents((prev) => ({ ...prev, state: false }));
            return false;
        }
    }

    function validateLinks() {
        if (links.links.length > 400) {
            setLinks((prev) => ({ ...prev, error: "*the value is too long" }));
            setLinks((prev) => ({ ...prev, state: false }));
            return false;
        } else {
            setLinks((prev) => ({ ...prev, state: true }));
            return true;
        }
    }

    function validateBio() {
        const BIO_REGEXP = /^[A-Za-z0-9'".,:;@#?!()\[\]*_\/-\s]{0,3000}$/;
        if (BIO_REGEXP.test(String(bio.bio).toLowerCase())) {
            setBio((prev) => ({ ...prev, state: true }));
            return true;
        } else {
            if (bio.bio.length > 3000) {
                setBio((prev) => ({
                    ...prev,
                    error: "*the value is too long (not more 3000 symbols)",
                }));
            } else if (!BIO_REGEXP.test(String(bio.bio))) {
                setBio((prev) => ({
                    ...prev,
                    error: "*using incorrect symbols",
                }));
            }
            setBio((prev) => ({ ...prev, state: false }));
            return false;
        }
    }

    function validateAdditionalInfo() {
        const ADDTIONAL_INFO_REGEXP =
            /^[A-Za-z0-9'".,:;@#?!()\[\]*_\/-\s]{0,500}$/;
        if (
            ADDTIONAL_INFO_REGEXP.test(
                String(additionalInfo.info).toLowerCase()
            )
        ) {
            setAdditionalInfo((prev) => ({ ...prev, state: true }));
            return true;
        } else {
            if (additionalInfo.info.length > 500) {
                setAdditionalInfo((prev) => ({
                    ...prev,
                    error: "*the value is too long (not more 500 symbols)",
                }));
            } else if (
                !ADDTIONAL_INFO_REGEXP.test(String(additionalInfo.info))
            ) {
                setAdditionalInfo((prev) => ({
                    ...prev,
                    error: "*using incorrect symbols",
                }));
            }
            setAdditionalInfo((prev) => ({ ...prev, state: false }));
            return false;
        }
    }

    function validateContacts() {
        if (contacts.contacts.length > 400) {
            setContacts((prev) => ({
                ...prev,
                error: "*the value is too long (not more 400 symbols)",
            }));
            setContacts((prev) => ({ ...prev, state: false }));
            return false;
        } else {
            setContacts((prev) => ({ ...prev, state: true }));
            return true;
        }
    }

    // function validatePassword() {
    //     if (profile.password !== password.pswd && password.pswd.length !== 0) {
    //         setPassword((prev) => ({
    //             ...prev,
    //             error: "*password doesn't equal to the previous one",
    //         }));
    //         setPassword((prev) => ({ ...prev, state: false }));
    //         return false;
    //     } else if (
    //         newPassword.pswd.length !== 0 &&
    //         password.pswd.length === 0
    //     ) {
    //         setPassword((prev) => ({ ...prev, error: "*empty field" }));
    //         setPassword((prev) => ({ ...prev, state: false }));
    //         return false;
    //     } else {
    //         setPassword((prev) => ({ ...prev, state: true }));
    //         return true;
    //     }
    // }

    // function validateNewPassword() {
    //     const NEW_PASSWORD_REGEXP = /^[a-zA-Z0-9]{8,}$/;

    //     if (
    //         (NEW_PASSWORD_REGEXP.test(String(newPassword.pswd).toLowerCase()) &&
    //             newPassword.pswd !== password.pswd) ||
    //         (newPassword.pswd.length === 0 && password.pswd.length === 0)
    //     ) {
    //         setNewPassword((prev) => ({ ...prev, state: true }));
    //         return true;
    //     } else {
    //         if (newPassword.pswd.length === 0) {
    //             setNewPassword((prev) => ({ ...prev, error: "*empty field" }));
    //         } else if (
    //             newPassword.pswd === password.pswd &&
    //             newPassword.pswd.length !== 0
    //         ) {
    //             setNewPassword((prev) => ({
    //                 ...prev,
    //                 error: "*new password can't be equal to the previous one",
    //             }));
    //         } else if (
    //             newPassword.pswd.length < 8 &&
    //             newPassword.pswd.length !== 0
    //         ) {
    //             setNewPassword((prev) => ({
    //                 ...prev,
    //                 error: "*password should be more than or equal 8 symbols",
    //             }));
    //         } else if (!/^[a-zA-Z0-9]$/.test(newPassword.pswd)) {
    //             setNewPassword((prev) => ({
    //                 ...prev,
    //                 error: "*you can use only latins letters and numbers",
    //             }));
    //         }
    //         setNewPassword((prev) => ({ ...prev, state: false }));
    //         return false;
    //     }
    // }

    function normalizeArray(str) {
        if (str.trim().length === 0) {
            return [];
        }
        str = str.replace(/\s+/g, " ").replace(/;\s/g, ";").trim();
        if (str.charAt(str.length) === ";") {
            return str.slice(0, -1).split(";");
        } else {
            return str.split(";");
        }
    }

    function normalizeString(str) {
        str = str.replace(/ +/g, " ").trim();
        str = str.replace(/\n+/g, "\n");
        if (str.slice(-1) === "\n") {
            str = str.slice(0, -1);
        }
        return str;
    }

    function save() {
        validateFirstName();
        validateLastName();
        validateSpecialization();
        validateTalents();
        validateLinks();
        validateBio();
        validateAdditionalInfo();
        validateContacts();

        let isValid =
            validateFirstName() &&
            validateLastName() &&
            validateSpecialization() &&
            validateTalents() &&
            validateLinks() &&
            validateBio() &&
            validateAdditionalInfo() &&
            validateContacts();

        if (isValid) {
            const obj = {
                first_name: firstName.name,
                last_name: lastName.name,
                specialization: specialization.spec,
                talents: normalizeArray(talents.talents),
                links: normalizeArray(links.links),
                bio: normalizeString(bio.bio),
                additional_info: normalizeString(additionalInfo.info),
                contacts: normalizeArray(contacts.contacts),
            }
            setProfile((prev) => ({
                ...prev,
                first_name: firstName.name,
                last_name: lastName.name,
                specialization: specialization.spec,
                talents: normalizeArray(talents.talents),
                links: normalizeArray(links.links),
                bio: normalizeString(bio.bio),
                additional_info: normalizeString(additionalInfo.info),
                contacts: normalizeArray(contacts.contacts),
            }));

            try {
                TalentsService.editTalent(user.id, obj, token)
                    .then(() => {
                        const newUser = {...user};
                        for(let k in obj){
                            if(user.hasOwnProperty(k)){
                                newUser[k] = obj[k];
                            }
                        }
                        setCookie("user", newUser, {
							path: '/',
							maxAge: 3600,
						})
                        setEditting(false);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
        <AcceptingModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} removeCookie={removeCookie} user={user} token={token}/>
            <div className={s.btns}>
                <Button className={s.btn} onClick={() => navigate(-1)}>
                    Back
                </Button>
            </div>
            <div className={s.container}>
                <div className={s.talent_data}>
                    <img className={s.ava} src={profile.image ? profile.image : userAvatar} alt="avatar" />
                    <div>
                        <div className={s.name}>
                            {editting ? (
                                <>
                                    <div className={s.input_block}>
                                        <Input
                                            type="text"
                                            value={firstName.name}
                                            placeholder="first name"
                                            autoComplete="off"
                                            className={`${
                                                firstName.state ? "" : s.error
                                            }`}
                                            onChange={(event) =>
                                                setFirstName((prev) => ({
                                                    ...prev,
                                                    name: event.target.value,
                                                }))
                                            }
                                        />
                                        <span>
                                            {firstName.state
                                                ? ""
                                                : firstName.error}
                                        </span>
                                    </div>
                                    <div className={s.input_block}>
                                        <Input
                                            type="text"
                                            value={lastName.name}
                                            placeholder="last name"
                                            autoComplete="off"
                                            className={`${
                                                lastName.state ? "" : s.error
                                            }`}
                                            onChange={(event) =>
                                                setLastName((prev) => ({
                                                    ...prev,
                                                    name: event.target.value,
                                                }))
                                            }
                                        />
                                        <span>
                                            {lastName.state
                                                ? ""
                                                : lastName.error}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                `${profile.first_name} ${profile.last_name}`
                            )}
                        </div>

                        <div className={s.specialization}>
                            {editting ? (
                                <div className={s.input_block}>
                                    <Input
                                        type="text"
                                        value={specialization.spec}
                                        placeholder="specialization"
                                        autoComplete="off"
                                        className={`${
                                            specialization.state ? "" : s.error
                                        }`}
                                        onChange={(event) =>
                                            setSpecialization((prev) => ({
                                                ...prev,
                                                spec: event.target.value,
                                            }))
                                        }
                                    />
                                    <span>
                                        {specialization.state
                                            ? ""
                                            : specialization.error}
                                    </span>
                                </div>
                            ) : (
                                <p>{profile?.specialization}</p>
                            )}
                        </div>

                        <div className={s.talents}>
                            {editting ? (
                                <div className={s.input_block}>
                                    <span>
                                        write the talents as shown in the
                                        example: talent1; talent2; ...
                                    </span>
                                    <Input
                                        type="text"
                                        value={talents.talents}
                                        placeholder="talent1; talent2;"
                                        autoComplete="off"
                                        className={`${
                                            talents.state ? "" : s.error
                                        }`}
                                        onChange={(event) =>
                                            setTalents((prev) => ({
                                                ...prev,
                                                talents: event.target.value,
                                            }))
                                        }
                                    />
                                    <span>
                                        {talents.state ? "" : talents.error}
                                    </span>
                                </div>
                            ) : (
                                profile.talents?.map((talent, index) => (
                                    <div className={s.talent} key={index}>
                                        {talent}
                                    </div>
                                ))
                            )}
                        </div>
                        <div className={s.links}>
                            {editting ? (
                                <div className={s.input_block}>
                                    <span>
                                        write the links as shown in the example:
                                        link1; link2; ...
                                    </span>
                                    <Input
                                        type="text"
                                        value={links.links}
                                        placeholder="link1; link2"
                                        autoComplete="off"
                                        className={`${
                                            links.state ? "" : s.error
                                        }`}
                                        onChange={(event) =>
                                            setLinks((prev) => ({
                                                ...prev,
                                                links: event.target.value,
                                            }))
                                        }
                                    />
                                    <span>
                                        {links.state ? "" : links.error}
                                    </span>
                                </div>
                            ) : (
                                profile.links?.map((link, talent) => (
                                    <a
                                        className={s.link}
                                        href={link}
                                        key={talent}
                                    >
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
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className={s.about}>
                    <img
                        src={edit}
                        alt="edit"
                        className={s.edit}
                        onClick={() => setEditting(() => !editting)}
                    />
                    <div className={s.ab_title}>about</div>

                    <h3>Bio</h3>
                    <div className={s.bio}>
                        {editting ? (
                            <div className={s.textarea_block}>
                                <Textarea
                                    placeholder="your biography"
                                    value={bio.bio}
                                    className={`${s.big_textarea} ${
                                        bio.state ? "" : s.error
                                    }`}
                                    onChange={(event) =>
                                        setBio((prev) => ({
                                            ...prev,
                                            bio: event.target.value,
                                        }))
                                    }
                                />
                                <span>{bio.state ? "" : bio.error}</span>
                            </div>
                        ) : (
                            <p>{profile.bio}</p>
                        )}
                    </div>
                    <h3>Additional info</h3>
                    <div className={s.additional_info}>
                        {editting ? (
                            <div className={s.textarea_block}>
                                <Textarea
                                    placeholder="some text"
                                    value={additionalInfo.info}
                                    className={`${
                                        additionalInfo.state ? "" : s.error
                                    }`}
                                    onChange={(event) =>
                                        setAdditionalInfo((prev) => ({
                                            ...prev,
                                            info: event.target.value,
                                        }))
                                    }
                                />
                                <span>
                                    {additionalInfo.state
                                        ? ""
                                        : additionalInfo.error}
                                </span>
                            </div>
                        ) : (
                            <p>{profile.additional_info}</p>
                        )}
                    </div>

                    <h3>Contacts:</h3>
                    <div className={s.contacts}>
                        {editting ? (
                            <>
                                <div className={s.textarea_block}>
                                    <span>
                                        write the contacts as shown in the
                                        example: contact1; contact2; ...
                                    </span>
                                    <Textarea
                                        placeholder="your contacts (links or email)"
                                        value={contacts.contacts}
                                        className={`${
                                            contacts.state ? "" : s.error
                                        }`}
                                        onChange={(event) =>
                                            setContacts((prev) => ({
                                                ...prev,
                                                contacts: event.target.value,
                                            }))
                                        }
                                    />
                                    <span>
                                        {contacts.state ? "" : contacts.error}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <ul>
                                {profile.contacts?.map((contact, index) => (
                                    <li key={index}>{contact}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* {editting ? (
                        <div className={s.passwords}>
                            <h3>Changing password :</h3>
                            <div className={s.input_block}>
                                <Input
                                    type="password"
                                    placeholder="old password"
                                    autoComplete="off"
                                    className={`$ ${
                                        password.state ? "" : s.error
                                    }`}
                                    onChange={(event) =>
                                        setPassword((prev) => ({
                                            ...prev,
                                            pswd: event.target.value,
                                        }))
                                    }
                                />
                                <span>
                                    {password.state ? "" : password.error}
                                </span>
                            </div>

                            <div className={s.input_block}>
                                <Input
                                    type="password"
                                    placeholder="new password"
                                    autoComplete="off"
                                    className={`$ ${
                                        newPassword.state ? "" : s.error
                                    }`}
                                    onChange={(event) =>
                                        setNewPassword((prev) => ({
                                            ...prev,
                                            pswd: event.target.value,
                                        }))
                                    }
                                />
                                <span>
                                    {newPassword.state ? "" : newPassword.error}
                                </span>
                            </div>
                        </div>
                    ) : (
                        ""
                    )} */}
                    {editting ? (
                        <div className={s.btns}>
                            <Button
                                onClick={() => setEditting(false)}
                                className={s.btn}
                            >
                                Cancel
                            </Button>
                            <Button onClick={save} className={s.btn}>
                                Save
                            </Button>
                            <Button className={s.btn} onClick={() => {setModalIsOpen(true)}}>
                                Delete profile
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
}
