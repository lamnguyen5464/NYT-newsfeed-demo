export interface IItemStory {
    url?: string;
    title: string;
    section: string;
    byline?: string;
    published_date?: string;
    multimedia?: IMultimedia[];
}

export interface IMultimedia {
    url?: string;
}

export interface ISectionStory {
    results: IItemStory[];
}
