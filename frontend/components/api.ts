
export interface Url {
    url: string;
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