//this event will trigger when we open the task in question
const highlight_btn = document.querySelector('#highlight');
let timer;
const highlight = () => {
    clearTimeout(timer);
    const area = document.querySelector('#task-info');
    area.classList.remove('blink');
    area.classList.add('blink');
    timer = setTimeout(() => {
        area.classList.remove('blink');
    }, 1200);
}
highlight_btn.addEventListener('click', highlight);

const px = (label) => label+'px';
// see-more-description
// see-more-subtasks
const handle_limited = ({id, margin_bottom}) => {
    const btn = document.querySelector(`#see-more-${id}`);
    const div = document.querySelector(`#content-${id}`);
    const content = div.querySelector('#content');
    const title = div.querySelector('h4');
    const height = content.clientHeight;

    //assign the margin-bottom in question

    // remove the show-more button if the space doesn't exceed the maximun height
    if (height < margin_bottom) {
        title.style.marginBottom = px(height);
        btn.remove();
        return;
    } else {
        title.style.marginBottom = px(margin_bottom);
    }

    btn.addEventListener('click', () => {
        const label = btn.querySelector('span').textContent;
        const arrow = btn.querySelector('svg');

        const closed = label === 'Mostrar más';

        const toggle = (rotate, open_space, text) => {
            arrow.style.transform = rotate;
            title.style.marginBottom = open_space;
            btn.querySelector('span').textContent = text;

            // make the text overflow only if we opened the section
            content.style["overflow-y"] = text === 'Mostrar menos' ? 'scroll': '';
            content.scrollTop = 0; // scrolling back to the top to not save said behaviour.
        }
        closed ? toggle('rotate(-180deg)', px(content.clientHeight + 59), 'Mostrar menos') : toggle('rotate(0deg)', px(margin_bottom ),  'Mostrar más');
    });
}

const see_more = {
    description: {
        id: 'description',
        margin_bottom: 140, // the space we want to always show to the client
    },
    subtasks: {
        id: 'subtasks',
        margin_bottom: 160,
    }
}

handle_limited(see_more['description']);
handle_limited(see_more['subtasks']);

// taskDrawer interaction

// task-taskDrawer

const taskDrawer = $('#task-drawer');
// setting the initial value
let taskDrawerStatus = window.localStorage.getItem('taskDrawer');


//if its the first time we enter we set it to closed
if (!taskDrawerStatus) {
    window.localStorage.setItem('taskDrawer', 'closed')
    taskDrawerStatus = 'closed'
};


if (taskDrawerStatus === 'opened') {
    taskDrawer.addClass('opened');
}else if(taskDrawerStatus === 'closed') {
    taskDrawer.removeClass('opened');
}

const toggleTaskDrawer = () => {
    taskDrawerStatus = window.localStorage.getItem('taskDrawer');
    if (taskDrawerStatus === 'opened') {
        window.localStorage.setItem('taskDrawer', 'closed');
        taskDrawer.removeClass('opened');
    }else if(taskDrawerStatus === 'closed') {
        window.localStorage.setItem('taskDrawer', 'opened');
        taskDrawer.addClass('opened');
    }
};

$('#toggle-task-drawer').click(toggleTaskDrawer);
$('#close-task-drawer').click(toggleTaskDrawer);