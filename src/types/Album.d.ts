interface Avatar {
    url: string;
}

interface Facebook {
    url: string;
}

interface Twitter {
    url: string;
}

interface Image {
    url: string;
    avatar: Avatar;
    facebook: Facebook;
    twitter: Twitter;
}

interface Album {
    id: number;
    name: string;
    slug: string;
    image: Image;
    artist_name: string;
    rating_average: string;
    release_date: string;
    release_comments_count: number;
}
interface Tracklist {
    title: string;
    duration: string;
    feat: any[];
}

interface Ratings {
    current_user?: any;
    average: string;
    redaction: string;
}

interface HeadMetaData {
    slug: string;
    title: string;
    description: string;
    og_fb_title: string;
    og_fb_description: string;
    og_fb_image: string;
    og_tw_title: string;
    og_tw_description: string;
    og_tw_image: string;
}

interface AlbumDetails {
    id: number;
    name: string;
    slug: string;
    image: Image;
    tracklist: Tracklist[];
    artist_name: string;
    artist_slug: string;
    release_date: string;
    review?: any;
    ratings: Ratings;
    meta_title: string;
    meta_description: string;
    head_meta_data: HeadMetaData;
}

interface ArtistAlbums {
    popular: Album[],
    items: Album[]
}