import React, { useContext } from "react";
import { TalentsService } from "../../../../../../services/api-services";
import { UserContext } from "../../../../../../context/UserContext";
import Select, { components } from "react-select";

export function ValueCross(props) {
    const { proof, skills } = props;
    const { user, token } = useContext(UserContext);
    const handleClearOne = () => {
        TalentsService.deleteProofsSkills(
            user.id,
            proof.id,
            token,
            arguments[0].data.id
        ).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            {skills.length > 0 ? (
                <components.MultiValueRemove {...props}>
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={handleClearOne}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        x
                    </span>
                </components.MultiValueRemove>
            ) : (
                <components.MultiValueRemove {...props}>
                    <span
                        style={{ cursor: "pointer" }}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        x
                    </span>
                </components.MultiValueRemove>
            )}
        </>
    );
}
