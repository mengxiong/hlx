import { useSortable } from '@dnd-kit/sortable';

export type RenderItem<T> = (
  props: Pick<ReturnType<typeof useSortable>, 'setNodeRef' | 'attributes' | 'listeners'> & {
    style: React.CSSProperties;
    item: T;
  }
) => JSX.Element;

export interface SortableItemProps<T extends { id: string }> {
  item: T;
  renderItem: RenderItem<T>;
}

export function SortableItem<T extends { id: string }>({ item, renderItem }: SortableItemProps<T>) {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: item.id,
  });

  const style: React.CSSProperties = {
    touchAction: 'none',
    cursor: 'grab',
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return renderItem({
    setNodeRef,
    attributes,
    listeners,
    style,
    item,
  });
}
