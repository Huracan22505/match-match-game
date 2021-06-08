import { headerRender } from './components/header/header';
import { createBackdropMarkup } from './components/backdrop/backdrop';
import { createDataBase } from './database/database';
import { routing } from './routing';
import './style.scss';

headerRender();
routing();
createDataBase('Huracan22505');

const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

appElement.insertAdjacentHTML('beforeend', createBackdropMarkup());
