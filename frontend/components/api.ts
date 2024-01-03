
export interface Url {
    url: string;
    description : string | null;
}

export interface Section
{
    title: string;
    content: any;
}

export class ErrorSection implements Section
{
    title: string;
    content: any;

    constructor(content: string)
    {
        this.title = "Error";
        this.content = content;
    }
}