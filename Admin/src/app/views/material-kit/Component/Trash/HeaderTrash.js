import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ContainerTrash } from './ContentTrash';

export default function HeaderTrash() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <ContainerTrash />
      </DndProvider>
    </div>
  );
}
