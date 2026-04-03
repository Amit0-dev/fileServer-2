export interface User {
    username: string;
    name: string;
    email: string;
    password: string;
    id: string;
    bucketFolderName: string;
    isVerified: boolean;
    emailVerificationToken: string | null;
    emailVerificationTokenExpiry: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
