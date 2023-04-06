import { useEffect, useState } from "react";
import { TalentsService } from "../services/api-services";

export function useTalent(id) {
    const [talent, setTalent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        TalentsService.getTalent(id)
            .then((talent) => {
                setTalent(talent);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { talent, isLoading, error };
}
