import { useEffect, useState } from "react";

import api from "../api";

export function useRequest() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fecthData = async () => {
            const { data } = await api.get(`/requests`);
            setRequests(data);
        };
        fecthData();
    }, []);

    return requests;
}