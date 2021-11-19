export interface Avatar {
    url: string;
}

export interface Facebook {
    url: string;
}

export interface Twitter {
    url: string;
}

export interface Image {
    url: string;
    avatar: Avatar;
    facebook: Facebook;
    twitter: Twitter;
}

export interface Album {
    id: number;
    name: string;
    slug: string;
    image: Image;
    artist_name: string;
    rating_average: string;
    release_date: string;
    release_comments_count: number;
}
