## 有趣的 web-components 组件

- 对前端熟悉一丁点或者更多的，可**自行构建**。`pnpm build`
- 
### Sparkles 火花✨组件

- 可直接在浏览器中使用 [dist/components/sparkles.iife.js](/./dist/components/a_sparkles.iife.js)

1. 文章中可直接使用 `a-sparkles` 标签，可使用的属性值如下：
    - `colors` 定义火花✨随机颜色，可单个，可多个。
      - 形式如 `colors="#fbbf24, #4ade80, #60a5fa, #8b5cf6, #f43f5e"` 或者 `colors="#fbbf24`
    - `min-delay` 与 `max-delay` 共同使用。调节火花随机生成的最小与最大间隔，明显表现为火花✨数量，`min-delay` 越小且与 `max-delay` 相差较小时，火花✨出现越快越多；
      - 形式如 `min-delay="300" max-delay="800"`，属性值为数值类型。
    - `max-delay` 介绍同上，并补充：此属性值最小为 `500`ms，受限于单个火花✨的动画时长`600ms`
    - `left-offset-range` 定义火花✨出现的范围边界；（从左向右边界）
      - 形式如 `left-offset-range="-10,60"`，属性值为数值类型，映射样式单位为百分比
    - `top-offset-range` （从上至下边界）
    - etc...
2. 引入方式：
   - 在 `body` 标签末尾插入 `<script src="a_sparkles.iife.js"></script>`
   - 或者在 `head` 标签中即插入 `<script defer src="a_sparkles.iife.js"></script>`

[React 版预览](https://next.aerowang.cn/p/a87c8524-664b-46a5-826d-b029b67d3022/mdx-zi-ding-yi-zu-jian)
