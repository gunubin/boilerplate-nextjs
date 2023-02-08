import {useEffect} from 'react';
import {useSystemInitializeUseCase} from "@/useCases/systemInitializeUseCase";

export const useAppPage = () => {
    const [systemInitialize] = useSystemInitializeUseCase();

    useEffect(() => {
        systemInitialize();
    }, [systemInitialize]);
};
