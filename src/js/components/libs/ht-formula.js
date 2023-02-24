import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit';
import tippy from 'tippy.js'
import Placeholder from '@tiptap/extension-placeholder';
import Paragraph from '@tiptap/extension-paragraph';

import Mention from '@tiptap/extension-mention'

class Component extends HTMLElement {
    constructor(){
        super(); 
    }
    config = {
        char: '@',
        decorationTag: 'mark',
        decorationClass: 'ht-suggestion',
        items: ({ query }) => {
            return ['Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John', 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',]
            .filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5);
        },
        render() {
            const command = Mention.options.suggestion.command;
            $(document).on('click', 'li.suggestion', function(e) {
                command({ editor: startProps.editor, range: startProps.range, props: { id: startProps.items[e.target.dataset.index]}});
            });
            let selectedIndex = 0;
            let startProps;
            let popup;
            const removeList = () => {
                const prev_ul = document.querySelector('#variables');
                if (prev_ul) {
                    prev_ul.remove();
                    popup[0].destroy();
                };
            }
            const renderList = (props, type = 'default') => {
                removeList();
                const ul = document.createElement('ul');
                ul.id = 'variables';
                ul.classList.add('suggestion-list', 'bg-ht-main-500', 'overflow-hidden', 'position-relative');
                props.items.forEach( (text, index) => {
                    const li = document.createElement('li');
                    li.classList.add('suggestion', 'position-relative', 'cursor-pointer');
                    if (index === selectedIndex ) li.classList.add('active');
                    li.textContent = text;
                    li.dataset.index = index;
                    ul.append(li)
                });
                popup = tippy('body', {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: ul,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start',
                    animation: type === 'default' ? false : 'fade'
                });
            }
            const keyHandler = ({props, items}) => {
                const key = props.event.key;
                switch (key) {
                    case "ArrowUp":
                        selectedIndex = ((selectedIndex + items.length) - 1) % items.length;
                        renderList(startProps);
                        return true;
                    case "ArrowDown":
                        selectedIndex = (selectedIndex + 1) % items.length
                        renderList(startProps);
                        return true;
                    default:
                        return false
                }
            }
            return {
                onStart: props => {
                    if (!props.clientRect) return;
                    startProps = props;
                    renderList(props, 'start');
                },
                onUpdate: props => {
                    startProps = props;
                    renderList(props);
                },
                onExit() {
                    removeList();
                },
                onKeyDown(props) {
                    if (props.event.key === 'Escape') {
                        removeList();
                        return true;
                    }else if(props.event.key === 'Enter') {
                        command({ editor: startProps.editor, range: startProps.range, props: { id: startProps.items[selectedIndex] } });
                        return true;
                    }else {
                        return keyHandler({props, items: startProps.items});
                    }
                },
            }
        }
    }
    connectedCallback(){
        this.editor = new Editor({
            element: document.querySelector('#tip-tap'),
            extensions: [
                StarterKit,
                Paragraph.configure({
                    HTMLAttributes: { class: 'paragraph' },
                }),
                Placeholder.configure({ // Use a placeholder:
                    placeholder: 'Write your title …',
                }),
                Mention.configure({
                    HTMLAttributes: { class: 'ht-mention' },
                    suggestion: this.config
                })
            ],
        });

        // function getMentions(data) {
        //     const mentions = (data.content || []).flatMap(getMentions);
        //     if (data.type === 'mention') mentions.push(data.attrs.id);
        //     return mentions
        // }
        // // how to use:
        // const mentions = getMentions(this.editor.getJSON());

        $(document).on('click', 'button#save', () => {
            this.saved = this.editor.getJSON();
        });
        
        $(document).on('click', 'button#clear', () => {
            this.editor.commands.setContent('');
        });
        $(document).on('click', 'button#fill', () => {
            this.editor.commands.setContent(this.saved)
        });
        // printing the JSON OBJECT
        $(document).on('input', '#tip-tap', () => {
            // const editor_value = ;
            // const papo = editor_value
            // $('#editor-json-output').html(JSON.stringify(papo));
            // console.log(this.editor.getJSON());
        });

        
    }
}
customElements.define('ht-formula', Component);
