import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export class ToastError {
    static errorHandler (error: Error | AxiosError) {
        if (axios.isAxiosError(error)) {
            const { message } = error.response?.data
            toast.error(message, {
                position: "top-right",
                autoClose: 7000,
            })
        }
    }
}