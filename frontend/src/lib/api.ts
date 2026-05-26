export const api = async (url: string, options: any = {}) => {

    const token = localStorage.getItem("token");

    const res = await fetch(`https://api.cloudignite.in${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {})
        }
    });

    if (!res.ok) {
        throw new Error("API Error");
    }

    return res.json();
};
