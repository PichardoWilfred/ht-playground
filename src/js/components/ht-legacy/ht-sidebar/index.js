import template from './template.html';

class Component extends HTMLElement {
    constructor(){
        super(); 
    }
    renderList(){
        const aside_menu = [
            {
                title: '',
                items: [
                    'Home',
                    'Dashboard',
                    'Dashboard designers',
                    'Notes Timeline',
                ]
            },
            {
                title: 'modules',
                items: [
                    'Leads',
                    'Opportunities',
                    'Properties',
                    'Contacts',
                    'Solar Projects',
                    'Meetings',
                    'Energy Efficiency',
                    'Gizmo Tasks',
                ]
            }, 
            {
                title: 'resources',
                items: [
                    'Resource Hub',
                    'FREE TRIAL - Leads Map',
                    'My Teams',
                ]
            }, 
            {
                title: 'proposal quoting tools',
                items: [
                    'Proposal Center',
                    'Management Report',
                    'Requested Panels',
                    'Solar Panel Settings',
                ]
            },
            {   
                title: 'Admin Settings',
                items: [
                    'Users',
                    'Organizations',
                    'Teams',
                    'Groups',
                    'Forms',
                    'Transitions',
                    'User Permissions',
                    'Field Permissions',
                    'Module Configuration',
                    'Roster',
                    'Account Settings',
                    'Finance Options',
                ]
            }
        ]
        // building the side navigation
        const navigation = document.querySelector('nav#navigation-container');
        for (const { title, items } of aside_menu) {
            const ul = document.createElement('ul');
            ul.classList.add('nav-list')
            if (title) {
                const li = document.createElement('li');
                li.classList.add('list-header');
                li.textContent = title.toUpperCase();
                ul.append(li);
            };
            for (const item of items) {
                const li_ = document.createElement('li');
                li_.classList.add('list-item','text-truncate');
                li_.textContent = item;
                ul.append(li_);
            }
            navigation.append(ul);
        }
    }
    connectedCallback(){
        this.innerHTML = template;
        this.renderList();
    }
}
customElements.define('ht-legacy-sidebar', Component);
