
import Application from './containers/Application';
import ScrollToTop from './scrollToTop';

import { Provider } from 'react-redux';
import store from  './store';

// Import application sass styles
import './styles/style.scss';

// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';

// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';

// react-bootstrap-table2 styles
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// rc-slider style
import 'rc-slider/assets/index.css';

// Authentication
const token = localStorage.getItem('token');

function App() {
  return (
    <Provider store={store}>
      <ScrollToTop>
        <Application />
      </ScrollToTop>
      <h1 className='header-info'>hello world</h1>
    </Provider>
  );
}

export default App;
