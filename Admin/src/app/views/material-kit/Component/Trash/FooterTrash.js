import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FooterContentTrash } from './FooterContentTrash';

export default function FooterTrash() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <FooterContentTrash />
      </DndProvider>
    </div>
  );
}
