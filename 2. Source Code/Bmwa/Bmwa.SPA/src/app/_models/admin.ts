import { Photo } from './photo';

export interface Admin {
    id: number;
    email: string;
    username: string;
    password: string;
    photoURL: string;
    photos: Photo[];
}
