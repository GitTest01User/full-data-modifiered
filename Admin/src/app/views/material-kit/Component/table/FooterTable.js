import { render } from 'react-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FooterContent } from './FooterContent';

export default function FooterTable() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <FooterContent />
      </DndProvider>
    </div>
  );
}
