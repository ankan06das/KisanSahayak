import { useState } from "react";
import toast from "react-hot-toast";

const useGetItems = () => {
    const [loading, setLoading] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;

    const items = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/marketplace/explore`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, items }
}

export default useGetItems;