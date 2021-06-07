import { useLocation } from 'umi';
/**
 * menu Highlight key
 * @param pathname string
 */
export const queryKeysByPath = (
  pathname: string,
): { openKey: string; selectKey: string } => {
  const reg = /(^\/*)|(\/*$)/g; // 匹配字符串首尾斜杠
  const path = pathname.replace(reg, '');
  const routes = path.split('/');
  return { openKey: routes[0], selectKey: routes[1] || routes[0] };
};

/**
 *
 */
export const isPathUrl = () => {
  const location: any = useLocation();
  const { query } = location;
  console.log(query);
  return '';
};

/**
 * 判断什么背景颜色下适合用什么文字颜色（black|white）
 * @param color string
 */

export const getWordColor = (color: string) => {
  // 处理六位的颜色值，转为RGB
  var colorChange = [];
  for (var i = 1; i < 7; i += 2) {
    colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
  }

  let bool =
    0.213 * colorChange[0] + 0.715 * colorChange[1] + 0.072 * colorChange[2] >
    255 / 2;
  if (bool) {
    return '#000000';
  } else {
    return '#ffffff';
  }
};

/**
 * 枚举数字&字母
 * @returns
 */

export const getHotKey = () => {
  const arr = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  let hotKeyList: any = [];
  arr.forEach(item => {
    hotKeyList.push({
      label: item,
      value: item,
    });
  });
  return hotKeyList;
};
