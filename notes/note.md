# Single page application

![Screenshot 2025-06-19 at 8.07.54 am](/Users/siruichen/Desktop/WorldWise/notes/assets/Screenshot 2025-06-19 at 8.07.54 am.png)





# React Route Index

在 React Router v6 里，`<Route index element={...} />` 里的 `index` 并不是一个路由参数值，而是一个特殊标记，告诉路由：

1. **匹配父路径的“默认子路由”**
   - 当你把一组路由写在同一个父 `<Route path="…">` 下面，**访问恰好就是那个父路径**（没有多余的子路径）时，就会渲染这个 `index` 路由。
   - 换句话说，`index` 路由对应的是父路由路径的空子路径（`path=""`），相当于旧版里 `exact path="/"` 的效果。
2. **不能同时带 `path`**
   - 你不能给 `index` 路由再写 `path` 属性，`index` 本身就隐含了它的路径是空字符串。
3. **渲染顺序**
   - 在同级子路由里，`index` 会作为默认展示项放在最前面。
   - 如果 URL 刚好是父路径，就会优先渲染 `index` 路由；如果 URL 有子段（例如 `/about`），就会去匹配其它带 `path="about"` 的子路由。

举个更完整的例子：

```jsx
<Routes>
  <Route path="/" element={<MainLayout />}>
    {/* 访问 “/” 时渲染 Home */}
    <Route index element={<Home />} />

    {/* 访问 “/dashboard” 时渲染 Dashboard */}
    <Route path="dashboard" element={<Dashboard />} />
  </Route>
</Routes>
```

- 访问 “/” → 渲染 `<MainLayout>` 里 `index` 路由，也就是 `<Home />`
- 访问 “/dashboard” → 同样渲染 `<MainLayout>`，但子路由匹配到 `path="dashboard"`，渲染 `<Dashboard />`

------

**总结**：`index` 就是“当父路由路径完全匹配且没有额外子路径时，作为默认视图来渲染”这个标志。

### 为什么不在嵌套路由里用 `path="/"`？

如果在父路由下写 `<Route path="/" …/>`，它会被解析为“父路径再接一个 `/`”，等同于访问 `//` 或者会产生歧义，所以在子路由里用 `index` 来表示“空子路径”更清晰，也更符合路由设计逻辑。



# Parameter and search parameters

`const { id } = useParams();`

`const lat = searchParms.get("lat");`

`const lng = searchParms.get("lng");`

在 React Router（`react-router-dom`）里，这几行代码分别用于从 URL 的 **路径参数**（path params）和 **查询参数**（query params）中取值：

1. **`const { id } = useParams();`**

   - `useParams()` 是 React Router 提供的一个 Hook，用来读取当前匹配路由里「冒号」声明的动态片段（path parameters）。

   - 假设你的路由定义是：

     ```jsx
     <Route path="/users/:id" element={<UserDetail />} />
     ```

     当浏览器地址栏是 `http://.../users/42` 时，`useParams()` 会返回一个对象：

     ```js
     { id: '42' }
     ```

   - 通过 ES6 的 **解构赋值**（destructuring）写法 `const { id } = …`，你就把这个对象里的 `id` 属性取出来，赋给了常量 `id`，值就是字符串 `"42"`。

2. **`const lat = searchParams.get("lat");`**
    **`const lng = searchParams.get("lng");`**

   - 这里假设你之前是这样拿到 `searchParams` 的：

     ```js
     import { useSearchParams } from 'react-router-dom';
     // …
     const [searchParams] = useSearchParams();
     ```

   - `searchParams` 是一个 **`URLSearchParams`** 实例，用来操作浏览器地址栏中的查询字符串（`?key1=val1&key2=val2`）。

   - `.get("lat")` 会从查询字符串里找 `lat` 这个键名，返回对应的值（字符串），如果该键不存在就返回 `null`。

   - 同理，`.get("lng")` 拿到 `lng` 参数的值。

------

**举个完整例子：**
 URL 为

```
http://example.com/users/123?lat=45.67&lng=-122.12
```

在组件里写：

```jsx
import { useParams, useSearchParams } from 'react-router-dom';

function MapPage() {
  const { id } = useParams();               // id === "123"
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");      // lat === "45.67"
  const lng = searchParams.get("lng");      // lng === "-122.12"

  // 你可以把它们转成数字：
  // const latitude = parseFloat(lat);
  // const longitude = parseFloat(lng);
  
  return (
    <div>
      <h1>用户 ID：{id}</h1>
      <p>经度：{lng}，纬度：{lat}</p>
    </div>
  );
}
```

- **路径参数**（`/users/:id`）用 `useParams()` 拿
- **查询参数**（`?lat=…&lng=…`）用 `useSearchParams()` + `.get()` 拿

这样就能很方便地在组件里获取 URL 里动态传递的数据了。



# form

https://www.bilibili.com/video/BV1hF411R7by/?spm_id_from=333.337.search-card.all.click&vd_source=6521ea33363f84e6b8eef296b2e63f0e



e.preventDefault();



# 动态样式

这行代码是React组件中的按钮元素，让我详细解释：

## 代码解析：

```jsx
<button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
```

### 各部分含义：

1. **`<button>`** - HTML按钮元素
2. **`onClick={onClick}`** - 点击事件处理器
3. **`className={...}`** - CSS类名（使用模板字符串）

### 模板字符串语法：

```jsx
`${styles.btn} ${styles[type]}`
```

- **`styles.btn`** - 基础按钮样式类
- **`styles[type]`** - 动态样式类（根据type属性）

## 实际使用示例：

```jsx
// 假设 type = "primary"
<button className={`${styles.btn} ${styles.primary}`}>
// 生成的类名：btn primary

// 假设 type = "secondary"  
<button className={`${styles.btn} ${styles.secondary}`}>
// 生成的类名：btn secondary
```

## 组件完整结构：

```jsx
function Button({ children, type, onClick }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

// 使用方式
<Button type="primary" onClick={handleClick}>
  点击我
</Button>
```

## CSS模块样式：

```css
/* Button.module.css */
.btn {
  /* 基础按钮样式 */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.primary {
  background-color: blue;
  color: white;
}

.secondary {
  background-color: gray;
  color: black;
}
```

## 优势：

1. **组合样式**：基础样式 + 变体样式
2. **动态类名**：根据props动态应用样式
3. **CSS模块**：避免样式冲突
4. **可复用**：一个组件支持多种样式变体

这种模式在React中很常见，用于创建可配置的UI组件！





# navigate back

