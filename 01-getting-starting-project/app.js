/* 
=== CODE JAVASCRIPT THUẦN (ĐÃ COMMENT) ===
Đây là cách làm truyền thống với vanilla JavaScript - phức tạp và dài dòng
*/
// buttonInput = document.querySelector('button');
// inputEl = document.querySelector('input');
// listEl = document.querySelector('ul');

// addElement = () => {
//   const inputValue = inputEl.value;
//   const listItem = document.createElement('li');
//   listItem.textContent = inputValue;
//   listEl.appendChild(listItem);
//   inputEl.value = '';
// };

// buttonInput.addEventListener('click', addElement);

/* 
=== CODE VUE - ĐƠN GIẢN VÀ DỄ HIỂU HỢN ===
*/

// Vue.createApp(): Tạo một Vue application instance
Vue.createApp({
  // data(): Định nghĩa dữ liệu reactive của component
  // Tất cả properties trong đây sẽ được Vue theo dõi và tự động cập nhật UI khi thay đổi
  data() {
    return {
      goals: [], // Mảng chứa danh sách các mục tiêu
      enteredValue: '' // Giá trị hiện tại trong input field
    }
  },

  // methods: Định nghĩa các phương thức (functions) của component
  methods: {
    // addGoal(): Thêm một mục tiêu mới vào danh sách
    addGoal() {
      // this.goals: Truy cập vào data property 'goals'
      this.goals.push(this.enteredValue) // Thêm giá trị input vào mảng
      this.enteredValue = '' // Xóa input field sau khi thêm

      // Vue sẽ tự động cập nhật UI:
      // - Danh sách <li> sẽ được render lại với item mới
      // - Input field sẽ được xóa trống (do v-model)
    }
  }
}).mount('#app') // .mount('#app'): Gắn kết Vue app với element có id="app"
