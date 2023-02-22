import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';



class Component extends HTMLElement {
    constructor(){
        super(); 
    }

    connectedCallback(){
        new Editor({
            element: document.querySelector('#tip-tap'),
            extensions: [ 
                StarterKit, 
                Paragraph.configure({
                    HTMLAttributes: {
                        class: 'paragraph',
                    },
                }),
            ],
            content: '<p>Hello World!</p>',
        });
    }
}
customElements.define('ht-formula', Component);
