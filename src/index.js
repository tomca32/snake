import style from './index.css';
import {initializeGrid} from './grid';
import {initializeCanvas} from './drawing';

initializeGrid();
initializeCanvas(document.getElementById('app'));
