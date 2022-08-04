import {axiosInstance, queryKeys} from "./apiConfig";
import {useQuery} from "@tanstack/react-query";
import Cipher from "../model/cipher";

function getAllCiphers() {
    return axiosInstance.get<Cipher[]>("/ciphers/list");
}

export function useAllCiphers() {
    return useQuery([queryKeys.CIPHERS_GET_ALL], getAllCiphers);
}