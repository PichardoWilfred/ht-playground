//routes
import home from '../../views/home.html';
import task from '../../views/task-drawer.html';
import global from '../../views/global-search.html';

import files from '../../views/files/index.html';
import files_archives from '../../views/files/archives.html';
import files_detail from '../../views/files/_detail.html';
import files_deleted from '../../views/files/deleted.html';

const routes = {
        'home': home,
        'task-drawer': task,
        'global-search': global,
        'files': {
            '/': files,
            'archives': files_archives,
            'deleted': files_deleted,
            ':id': files_detail
        }
}
export { routes }