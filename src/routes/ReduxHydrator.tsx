"use client";

import { User } from "@/types/auth";


export default function ReduxHydrator({ token, user }: { token: string; user: User }) {

    console.log({ token, user });

    // useEffect(() => {
    //     dispatch(setTokens({ access_token: token, user }));
    // }, [dispatch, token, user]);

    return null;
}
