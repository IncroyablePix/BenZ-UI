import {axiosInstance, queryKeys} from "./apiConfig";
import {useQuery} from "@tanstack/react-query";
import Crypto from "../model/crypto";

function getAllCryptos() {
    return axiosInstance.get<Crypto[]>("/cryptos/list");
}

export function useAllCryptos() {
    return useQuery([queryKeys.CRYPTOS_GET_ALL], getAllCryptos);
}