import {BaseText} from 'slate'

declare module 'slate' {
    interface BaseText{
        bold:string,
        italic:string,
        underline:string,
        code:string,
    }
}