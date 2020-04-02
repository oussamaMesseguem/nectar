import { FormArray, FormControl } from '@angular/forms';

export class ContentUpload {
    lang: string;
    type: string;
    content: string;

    constructor(parameters) {

    }
}

export class ContentUploadForm {
    public static readonly LANG = 'lang';
    public static readonly TYPE = 'type';
    public static readonly CONTENT = 'content';

    lang = new FormControl();
    type = new FormControl();
    // content = new FormControl();

    constructor(content?: string, type?: string, lang?: string) {
        // if (content) {
        //     this.content.setValue(content);
        // }
        if (type) {
            this.type.setValue(type);
        }
        if (lang) {
            this.lang.setValue(lang);
        }
    }
}
