import { Photo } from './photo';

export interface Admin {
    id: number;
    username: string;
    password: string;
    email: string;
    created: Date;
    lastActive: Date;
    phone: string;
    address: string;
    gender: string;
    photoUrl: string;
    photos: Photo[];
}
