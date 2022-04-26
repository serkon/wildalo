/**
 * Creates new Dragger instance. drop-zone and drop-target must be the same string to be droppable. It makes it impossible to drop into different drop-zones.
 *
 * @property {string} _zone - Add "drag-zone" attribute to the drop area.
 * <div drop-zone="zone">item will be drop to the here</div>
 * @property {string} _target - Add "drag-target" attribute to the draggable item for restrict of the target drop zone.
 * <div drop-target="zone">this item will be dragged and dropped</div>
 */
class DraggerHelper {
  _state = false;
  _zone: string | null = 'drop-zone';
  _target: string | null = 'drop-zone';

  get state() {
    return this._state;
  }

  set state(state: boolean) {
    this._state = state;
  }

  onDragStart(event: DragEvent, data: any, callback?: (event?: DragEvent, data?: any) => any) {
    // console.log('drag start');
    this._target = (event.target as HTMLElement).getAttribute('drop-target');
    event.dataTransfer && event.dataTransfer.setData('id', JSON.stringify(data));
    event.target && (event.target as HTMLElement).classList.add('dragging');
    callback && callback(event, data);
  }

  onDragEnd(event: DragEvent, data?: any, callback?: (event?: DragEvent, data?: any) => any) {
    event.target && (event.target as HTMLElement).classList.remove('dragging');
    callback && callback(event, data);
  }

  onDragOver(event: DragEvent, callback?: (event?: DragEvent) => any) {
    event.preventDefault();
    callback && callback(event);
  }

  onDragEnter(event: DragEvent, callback?: (event?: DragEvent) => any): void {
    const dropZone = (event.target as HTMLElement).closest(`[drop-zone]`);
    this._zone = dropZone && dropZone.getAttribute('drop-zone');
    if (dropZone && !this.state && this._zone === this._target) {
      // console.log('enter 1: ', event.target);
      this.state = true;
      dropZone.classList.add('drag-over');
      Array.from(dropZone.children).forEach((child: Element) => {
        (child as HTMLElement).style.pointerEvents = 'none';
      });
      callback && callback(event);
    }
  }

  onDragLeave(event: DragEvent, callback?: (event?: DragEvent) => any) {
    const dropZone = event.target as HTMLElement;
    if (dropZone.getAttribute('drop-zone') && this._zone === this._target) {
      this.state = false;
      dropZone.classList.remove('drag-over');
      Array.from((event.target as HTMLElement).children).forEach((child: Element) => {
        (child as HTMLElement).style.pointerEvents = 'auto';
      });
      callback && callback(event);
      this._zone = null;
    }
  }

  onDrop(event: DragEvent, callback?: (event?: DragEvent) => any) {
    this.onDragLeave(event, callback);
  }
}

/**
 * SCSS Sample:
 *
 * ```scss
 *  .drop-zone {
 *   box-sizing: border-box;
 *   padding: 5px;
 *   border: 1px dashed transparent;
 *   transition: all 0.2s;
 *
 *   &.drag-over {
 *     box-sizing: border-box;
 *     border-radius: 10px;
 *     border-radius: 14px;
 *     border-color: #ffffff;
 *     transform: scale(1.04);
 *   }
 * }
 * ```
 */

export const Dragger = new DraggerHelper();
