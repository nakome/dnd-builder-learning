import shortcode from 'shortcode-parser';
import marked from 'marked';

/**
 *  [box color=red] text here [/box]
 */
shortcode.add('box', function (content, options) {
  var color = options.color ? 'color:' + options.color + ';' : '',
    p = options.p ? 'padding:' + options.p + 'px;' : '',
    pt = options.pt ? 'padding-top:' + options.pt + 'px;' : '',
    pb = options.pb ? 'padding-bottom:' + options.pb + 'px;' : '',
    pl = options.pl ? 'padding-left:' + options.pl + 'px;' : '',
    pr = options.pr ? 'padding-right:' + options.pr + 'px;' : '',
    mt = options.mt ? 'margin-top:' + options.mt + 'px;' : '',
    mb = options.mb ? 'margin-bottom:' + options.mb + 'px;' : '',
    ml = options.ml ? 'margin-left:' + options.ml + 'px;' : '',
    mr = options.mr ? 'margin-right:' + options.mr + 'px;' : '',
    m = options.m ? 'margin:' + options.m + 'px;' : '',
    bg = options.bg ? 'background-color:' + options.bg + ';' : '';
  return (
    '<div style="' +
    color +
    p +
    pt +
    pb +
    pl +
    pr +
    bg +
    m +
    mt +
    mb +
    ml +
    mr +
    '">' +
    content +
    '</div>'
  );
});

/**
 *  [color name=red] text here [/color]
 */
shortcode.add('color', function (content, options) {
  var color = options.name ? 'color:' + options.name + ';' : 'red';
  return '<span style="' + color + '">' + content + '</span>';
});

/**
 *  [details] text here [/details]
 *  [details name=note] text here [/details]
 */
shortcode.add('details', function (content, options) {
  var name = options.name ? options.name : 'More..';
  return (
    '<details><summary>' +
    name +
    '</summary><div class="details-body">' +
    marked(content) +
    '</div></details>'
  );
});

/**
 *  [youtube id=GxEc46k46gg class=iframe]
 */
shortcode.add('youtube', function (content, options) {
  var cls = options.class
      ? 'class="' + options.class + '"'
      : 'embed-responsive',
    id = options.id ? options.id : '',
    autoplay = options.autoplay ? 'autoplay=1' : 'autoplay=0',
    start = options.start ? 'start=' + options.start : 'start=0',
    end = options.end ? 'end=' + options.end : 'end=0',
    info = options.info ? 'showinfo=' + options.info : 'showinfo=0',
    origin = options.origin
      ? 'origin=' + options.origin
      : 'origin=' + window.location.href,
    fs = options.fullscreen ? 'fs=' + options.fullscreen : 'fs=0';

  if (id)
    return (
      '<div ' +
      cls +
      '><iframe frameborder="0" scrolling="no" marginheight="0"  allowFullScreen src="https://www.youtube.com/embed/' +
      id +
      '?' +
      autoplay +
      '&' +
      fs +
      '&' +
      start +
      '&' +
      end +
      '&' +
      info +
      '&' +
      origin +
      '" type="text/html"></iframe></div>'
    );
});

/**
 *  [vimeo id=149129821 class=iframe]
 */
shortcode.add('vimeo', function (content, options) {
  var cls = options.class
      ? 'class="' + options.class + '"'
      : 'embed-responsive',
    id = options.id ? options.id : '';

  if (id)
    return (
      '<div ' +
      cls +
      '><iframe src="https://player.vimeo.com/video/' +
      id +
      '" frameborder="0" allowfullscreen></iframe></div>'
    );
});

/**
 *  [playground id={python,react,react-native,html,javascript} class=iframe]
 */
shortcode.add('playground', function (content, options) {
  var cls = options.class
      ? 'class="' + options.class + '"'
      : 'embed-responsive',
    id = options.id ? options.id : 'javascript';

  if (id)
    return (
      '<div ' +
      cls +
      '><iframe src="https://unpkg.com/javascript-playgrounds@1.1.4/public/index.html#preset=' +
      id +
      '" frameborder="0"></iframe></div>'
    );
});
