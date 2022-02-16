import {$} from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target);
    // Use closes with the attribute, so there is no tight coupling with View
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const lineProp = type === 'col' ? 'bottom' : 'right';
    let value;

    // Always show resizer and make it longer
    $resizer.css({opacity: 1, [lineProp]: '-5000px'});

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({right: `${-delta}px`});
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({bottom: `${-delta}px`});
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;

      if (type === 'col') {
        $root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach((el) => $(el).css({width: `${value}px`}));
      } else {
        $parent.css({height: `${value}px`});
      }

      resolve({value, type, id: $parent.data[type]});

      $resizer.css({opacity: 0, right: 0, bottom: 0});
    };
  });
}
