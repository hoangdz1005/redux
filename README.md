# Redux Tutorials
### Redux là gì?
- Thư viện js quản lý **state**, mà state này có thể dự đoán được.
- Sử dụng kiến trúc _**uni-directional data flow**_

![Mô tả ảnh](https://images.viblo.asia/3eca7a19-82be-4c9f-8bfc-cbeac838106b.png)

- `Store` gồm có:
  + `State`: là dữ liệu hiện tại được lưu trên state.
  + `Reducer`: là hàm biến đổi state cũ sang state mới.
  + `Dispatcher`: quản lý middlewares và chuyển dữ liệu xuống reducer.
- `Action`: plain javascript object mô tả hành động.

### Khi nào dùng?
- Dữ liệu được sử dụng ở nhiều nơi
- Có hỗ trợ chức năng undo/redo (quay lại bước trước )
- Cần cache dữ liệu để tái sử dụng cho những lần sau.

![Mô tả ảnh](https://topdev.vn/blog/wp-content/uploads/2019/05/redux-store.png)

### Cách hoạt động:
Các luồng hành động (action flows) trong Redux thường bao gồm các bước sau:
1. **Trạng thái ban đầu (Initial State)**: Trạng thái ban đầu của ứng dụng được xác định và khởi tạo trong store Redux.
2. **Gửi Action (Dispatching Actions)**: Người dùng thực hiện các hành động (ví dụ: bấm nút, nhập dữ liệu) hoặc các sự kiện khác trong ứng dụng. Khi điều này xảy ra, một action được tạo và gửi đến store bằng cách sử dụng hàm _dispatch(action)._
3. **Reducer Xử lý Action:** Một reducer nhận action và trạng thái hiện tại từ store. Reducer sau đó xử lý action và trả về một trạng thái mới, nhưng không làm thay đổi trạng thái hiện tại.
4. **Cập Nhật Store**: Store cập nhật trạng thái mới dựa trên kết quả từ reducer. Trạng thái mới này được sử dụng để cập nhật toàn bộ ứng dụng.
5. **Thông Báo Sự Thay Đổi (Notifying Subscribers)**: Các subscribers (các thành phần hoặc phần mềm theo dõi) đã đăng ký với store sẽ được thông báo về sự thay đổi trong trạng thái của ứng dụng. Điều này cho phép các thành phần React (hoặc bất kỳ giao diện người dùng nào) cập nhật hiển thị để phản ánh trạng thái mới.
6. **Kết thúc (Completion)**: Luồng hành động Redux kết thúc, và ứng dụng tiếp tục hoạt động với trạng thái mới nếu có. Người dùng có thể tiếp tục thực hiện các hành động và lặp lại quá trình.
![Mô tả ảnh](https://d33wubrfki0l68.cloudfront.net/01cc198232551a7e180f4e9e327b5ab22d9d14e7/b33f4/assets/images/reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

### Redux trong React:
1. Cài đặt 
`npm install --save redux react-redux`

2. Tổ chức file trong react:
```javascript
src
|__ reducers
| |__ hobby.js
| |__ todo.js
| |__ ... (one reducer per file)
| |__ index.js (root reducer)
|
|__ actions
| |__ hobby.js
| |__ todo.js
| |__ ...
|
|__ pages
| |__ HomePage/index.jsx (connect to redux)
|
|__ store.js (reducers, init state, middlewares)
|__ index.js (setup Store Provider)
```
3. Setup `reducers` và `root-reducer`
``` javascript
// reducers/hobby.js
const initialState = {
    list: ['Listening to music'],
    selectedId: null,
}
const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HOBBY': {
            const newList = [...state.list];
            newList.push(action.payload);
            return {...state, list: newList,}}
        default:
        return state;
}};
export default hobbyReducer;

// reducers/index.js (ROOT)
const rootReducer = combineReducers({
hobby: hobbyReducer,
})
export default rootReducer;
```
4. Setup redux `store`
```javascript
// src/store.js
const store = createStore(rootReducer);
export default store;
```
5. Setup Store Provider cho toàn app `src/index.js`
```javascript
const Main = () => (
    <Provider store={store}>
        <App />
    </Provider>
)
```
6. Connect vào redux từ reactjs component
- Với class component: dùng HOC `connect()`
- Với functional component: dùng hooks `useSelector()` và `useDispatch()`
```javascript
function HomePage(props) {
    const hobbyList = useSelector(state => state.hobby.list);
    const dispatch = useDispatch();
    const handleAddHobbyClick = () => {
        const newHobby = 'Coding';
        dispatch({
            type: 'ADD_HOBBY',
            payload: newHobby,
        });
    }
return (
    <div className="home-page">
        <HobbyList data={hobbyList} />
        <button onClick={handleAddHobbyClick}>Add new hobby</button>
    </div>
    );
}
export default HomePage;
```
### Related important keywords: 
- `dispatch`: là một phương thức do store cung cấp cho phép gửi `action `-> `store` . Khi một hành động được gửi, store gọi đến reducers  để cập nhật state.
- `selectors`: là các hàm được sử dụng để truy cập các  state cụ thể của  store 
- `middleware`: là một cách mở rộng tính năng của Redux. Nó có thể được sử dụng để xử lý các hành động hoặc trạng thái trước khi chúng thay đổi trạng thái Redux hoặc sau khi chúng thay đổi. redux-thunk là một middleware phổ biến cho việc xử lý các hành động bất đồng bộ.

- `Provider`: là một thành phần React từ thư viện react-redux cho phép cung cấp cửa hàng Redux cho toàn bộ ứng dụng, làm cho nó truy cập được từ tất cả các thành phần.

- `connect`: Hàm connect từ react-redux được sử dụng để kết nối các thành phần React với cửa hàng Redux. Nó cho phép các thành phần truy cập trạng thái và gửi các hành động.

- `Redux Devtools`: là một công cụ mà bạn có thể tích hợp vào ứng dụng Redux để giúp theo dõi và debug trạng thái và hành vi của ứng dụng Redux

- `redux-thunk`: là một middleware cho Redux, cho phép viết các action chả về một hàm thay vì một đối tượng action thông thường. Điều này giúp xử lý các tác vụ bất đồng bộ (async) . Middleware redux-thunk sẽ kiểm tra xem hàm đó có trả về một đối tượng action hay không. Nếu là một đối tượng action, Redux xử lý nó bình thường. Nếu là một hàm, Redux thực hiện hàm đó và truyền vào một hàm dispatch và getState như tham số.
``` javascript
// import and use
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk));
```
``` javascript
// create action
import axios from 'axios';
export const fetchData = () => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_DATA_REQUEST' });

    axios.get('https://api.example.com/data')
      .then(response => {
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_DATA_FAILURE', payload: error });
      });
  };
};
```
``` javascript
// truyền function vào dispatch
const handleFetchData = () => {
    dispatch(fetchData());
  };
```
### Redux Toolkit:
- RTK là một thư viện giúp viết Redux tốt hơn, dễ hơn và đơn giản hơn. (tiêu chuẩn để viết Redux)
- Ba vấn đề làm nền tảng ra đời RTK:
    - Cấu hình store phức tạp
    - Phải cài thêm nhiều package để sử dụng hiệu quả 
    - Redux đòi hỏi nhiều đoạn mã trùng lặp

`configureStore()`: 
```javascript
// Khi chưa có Redux Toolkit
// store.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
// Enable to use redux dev tool in development mode
const composeEnhancers = 'development' === process.env.NODE_ENV ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;
// Use redux-thunk as a redux middleware
const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, {}, enhancer);
export default store;

// Khi đã có redux toolkit 🤣
// store.js
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
const store = configureStore({ reducer: rootReducer })
```

`createReducer()`: 
```javascript
// Không có Redux Toolkit
function counterReducer(state = 0, action) {
    switch (action.type) {
        case 'increment':
            return state + action.payload
        case 'decrement':
            return state - action.payload
        default:
            return state
    }
}

// Có Redux Toolkit
// - Mỗi key là một case
// - Không cần handle default case
const counterReducer = createReducer(0, {
    increment: (state, action) => state + action.payload,
    decrement: (state, action) => state - action.payload
})

// Một điểm hay nữa là reducer có thể mutate data trực tiếp.
// Bản chất bên dưới họ sử dụng thư viện Immerjs
const todoReducer = createReducer([], {
    addTodo: (state, action) => {
    // 1. Có thể mutate data trực tiếp 🎉
    state.push(action.payload)
    },
    
    removeTodo: (state, action) => {
    // 2. Hoặc phải trả về state mới
    // CHỨ KO ĐƯỢC cả 1 và 2 nha 😎
    const newState = [...state];
    newState.splice(action.payload, 1);
    return newState;
}
})
```
`createAction()`: 
```javascript
// Không có redux toolkit
const INCREMENT = 'counter/increment'
function increment(amount) {
return {
type: INCREMENT,
payload: amount
        }
}
const action = increment(3)
// { type: 'counter/increment', payload: 3 }

// Có redux toolkit
const increment = createAction('counter/increment')
const action = increment(3)
// returns { type: 'counter/increment', payload: 3 }
```
`createSlice()`: https://redux-toolkit.js.org/api/createSlice
`createSelector()`: https://redux-toolkit.js.org/api/createSelector
`createAsyncThunk()`: https://redux-toolkit.js.org/api/createAsyncThunk
`createEntityAdapter()`: https://redux-toolkit.js.org/api/createEntityAdapter