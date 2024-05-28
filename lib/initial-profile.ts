import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "./db";

export const intitialProfile = async () => {
    const user = await currentUser();

    if (!user) {
        return redirectToSignIn();
    }

    const profile = await db.profile.findFirst({
        where: {
            userId: user.id,
        },
    });

    if (!profile) {
        const newProfile = await db.profile.create({
            data: {
                userId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress
            },
        });
        return newProfile;
    }

    return profile;
}