import { render } from 'react-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Content } from './Content';

export default function HeaderTable() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Content />
      </DndProvider>
    </div>
  );
}
