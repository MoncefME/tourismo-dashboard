const TOKEN_PREFIX ="@token";

export const TokenService =  {
    getAccessToken: () => localStorage.getItem(TOKEN_PREFIX),
    setAccessToken: (token: string) => localStorage.setItem(TOKEN_PREFIX,token),
    removeAccessToken: () => localStorage.removeItem(TOKEN_PREFIX)
}