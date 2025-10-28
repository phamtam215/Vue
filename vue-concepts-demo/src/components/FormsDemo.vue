<template>
  <!-- 
    ============================================
    FORMS VỚI V-MODEL & MODIFIERS
    ============================================
    
    V-MODEL LÀ GÌ?
    Two-way binding: JS ↔ HTML
    - JS thay đổi → Input tự cập nhật
    - User gõ → JS tự cập nhật
    
    V-MODEL = V-BIND + V-ON
    <input v-model="message">
    ≈
    <input :value="message" @input="message = $event.target.value">
    
    MODIFIERS (Chất bổ sung):
    1. .trim - Xóa khoảng trắng đầu/cuối
    2. .number - Convert sang Number type
    3. .lazy - Chỉ update khi blur (rời input), không update mỗi keystroke
    
    FORM SUBMISSION:
    @submit.prevent="handleSubmit" - Ngăn reload trang, gọi function
  -->
  <div class="forms-demo">
    <h2>Vue Forms & v-model Modifiers</h2>
    <p>
      <strong>v-model:</strong>
      Two-way binding cho form inputs
      <br />
      <strong>Modifiers:</strong>
      .lazy (update on blur), .number (convert type), .trim (remove spaces)
    </p>

    <!-- Form chính -->
    <!-- 
      @submit.prevent - Ngăn hành vi mặc định (reload trang)
      .prevent là modifier của v-on, tương đương event.preventDefault()
    -->
    <form @submit.prevent="handleSubmit" class="main-form">
      <!-- ============================================ -->
      <!-- 1. MODIFIER .TRIM - Xóa khoảng trắng -->
      <!-- ============================================ -->
      <!-- 
        VẤN ĐỀ: User nhập "  John  " (có spaces)
        - Không .trim: Value = "  John  " (length = 8)
        - Có .trim: Value = "John" (length = 4)
        
        USE CASE: Username, email - không muốn spaces
      -->
      <div class="form-section">
        <h3>📝 Text Input với .trim</h3>
        <p>
          Modifier
          <code>.trim</code>
          tự động xóa khoảng trắng đầu/cuối (như string.trim() trong JS)
        </p>

        <div class="form-group">
          <label>Không dùng .trim:</label>
          <input
            v-model="nameWithoutTrim"
            type="text"
            placeholder="Thử nhập khoảng trắng đầu/cuối"
          />
          <p class="value-display">
            Value: "
            <span class="highlight">{{ nameWithoutTrim }}</span>
            " (length: {{ nameWithoutTrim.length }})
          </p>
        </div>

        <div class="form-group">
          <label>Dùng .trim:</label>
          <input
            v-model.trim="nameWithTrim"
            type="text"
            placeholder="Khoảng trắng sẽ bị xóa"
          />
          <p class="value-display">
            Value: "
            <span class="highlight">{{ nameWithTrim }}</span>
            " (length: {{ nameWithTrim.length }})
          </p>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- 2. MODIFIER .NUMBER - Convert sang Number -->
      <!-- ============================================ -->
      <!-- 
        VẤN ĐỀ: type="number" vẫn trả về STRING
        - v-model="age" type="number" → typeof age = "string" ❌
        - v-model.number="age" → typeof age = "number" ✅
        
        TẠI SAO QUAN TRỌNG?
        - Validation: age > 18 sẽ sai nếu age là string
        - API: Server expect number, gửi string → lỗi
        
        USE CASE: Age, price, quantity - các trường số
      -->
      <div class="form-section">
        <h3>🔢 Number Input với .number</h3>
        <p>
          Modifier
          <code>.number</code>
          tự động convert sang kiểu Number (typeof = "number")
        </p>

        <div class="form-group">
          <label>Không dùng .number (type="number"):</label>
          <input
            v-model="ageWithoutModifier"
            type="number"
            placeholder="Nhập tuổi"
          />
          <p class="value-display">
            Value: {{ ageWithoutModifier }}
            <span class="type-badge">
              Type: {{ typeof ageWithoutModifier }}
            </span>
          </p>
        </div>

        <div class="form-group">
          <label>Dùng .number:</label>
          <input
            v-model.number="ageWithModifier"
            type="number"
            placeholder="Nhập tuổi"
          />
          <p class="value-display">
            Value: {{ ageWithModifier }}
            <span class="type-badge type-number">
              Type: {{ typeof ageWithModifier }}
            </span>
          </p>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- 3. MODIFIER .LAZY - Update khi blur -->
      <!-- ============================================ -->
      <!-- 
        MẶC ĐỊNH: v-model update sau MỖI KEYSTROKE (event input)
        - User gõ "H", "e", "l", "l", "o" → Update 5 lần
        - Nặng nếu có tính toán/validation phức tạp
        
        .LAZY: Chỉ update khi BLUR (rời khỏi input, event change)
        - User gõ "Hello" rồi click ra ngoài → Update 1 lần
        - Nhẹ hơn, ít re-render hơn
        
        USE CASE: Search input (dùng với debounce), bio/description
      -->
      <div class="form-section">
        <h3>⏱️ Text Input với .lazy</h3>
        <p>
          Modifier
          <code>.lazy</code>
          chỉ cập nhật sau khi blur (rời khỏi input), thay vì mỗi keystroke.
          Giảm số lần update → Tăng performance.
        </p>

        <div class="form-group">
          <label>Không dùng .lazy (cập nhật realtime):</label>
          <input
            v-model="bioWithoutLazy"
            type="text"
            placeholder="Nhập và xem realtime update"
          />
          <p class="value-display">Update count: {{ bioUpdateCount }}</p>
        </div>

        <div class="form-group">
          <label>Dùng .lazy (cập nhật khi blur):</label>
          <input
            v-model.lazy="bioWithLazy"
            type="text"
            placeholder="Blur để update"
          />
          <p class="value-display">{{ bioWithLazy }}</p>
        </div>
      </div>

      <!-- Textarea -->
      <div class="form-section">
        <h3>📄 Textarea</h3>
        <div class="form-group">
          <label>Mô tả:</label>
          <textarea
            v-model="description"
            rows="4"
            placeholder="Nhập mô tả..."
          ></textarea>
          <p class="char-count">{{ description.length }} ký tự</p>
        </div>
      </div>

      <!-- Checkbox -->
      <div class="form-section">
        <h3>☑️ Checkbox</h3>

        <div class="form-group">
          <label>
            <input type="checkbox" v-model="agreeTerms" />
            Tôi đồng ý với điều khoản
          </label>
        </div>

        <div class="form-group">
          <label>Chọn sở thích (multiple):</label>
          <label class="checkbox-item">
            <input type="checkbox" value="Lập trình" v-model="hobbies" />
            Lập trình
          </label>
          <label class="checkbox-item">
            <input type="checkbox" value="Du lịch" v-model="hobbies" />
            Du lịch
          </label>
          <label class="checkbox-item">
            <input type="checkbox" value="Đọc sách" v-model="hobbies" />
            Đọc sách
          </label>
          <label class="checkbox-item">
            <input type="checkbox" value="Âm nhạc" v-model="hobbies" />
            Âm nhạc
          </label>
          <p class="value-display">
            Đã chọn: {{ hobbies.join(', ') || '(chưa chọn)' }}
          </p>
        </div>
      </div>

      <!-- Radio -->
      <div class="form-section">
        <h3>🔘 Radio</h3>
        <div class="form-group">
          <label>Giới tính:</label>
          <label class="radio-item">
            <input type="radio" value="Nam" v-model="gender" />
            Nam
          </label>
          <label class="radio-item">
            <input type="radio" value="Nữ" v-model="gender" />
            Nữ
          </label>
          <label class="radio-item">
            <input type="radio" value="Khác" v-model="gender" />
            Khác
          </label>
          <p class="value-display">Đã chọn: {{ gender || '(chưa chọn)' }}</p>
        </div>
      </div>

      <!-- Select -->
      <div class="form-section">
        <h3>📋 Select</h3>

        <div class="form-group">
          <label>Thành phố:</label>
          <select v-model="city">
            <option value="">-- Chọn thành phố --</option>
            <option value="HN">Hà Nội</option>
            <option value="HCM">Hồ Chí Minh</option>
            <option value="DN">Đà Nẵng</option>
            <option value="HP">Hải Phòng</option>
          </select>
          <p class="value-display">Đã chọn: {{ city || '(chưa chọn)' }}</p>
        </div>

        <div class="form-group">
          <label>Kỹ năng (multiple):</label>
          <select v-model="skills" multiple size="5">
            <option value="JavaScript">JavaScript</option>
            <option value="Vue.js">Vue.js</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
          </select>
          <p class="value-display">
            Đã chọn: {{ skills.join(', ') || '(chưa chọn)' }}
          </p>
        </div>
      </div>

      <!-- Submit button -->
      <div class="form-actions">
        <button type="submit" :disabled="!isFormValid" class="submit-btn">
          {{ isFormValid ? '✅ Submit Form' : '❌ Form chưa hợp lệ' }}
        </button>
        <button type="button" @click="resetForm" class="reset-btn">
          Reset
        </button>
      </div>

      <!-- Form validation status -->
      <div v-if="!isFormValid" class="validation-errors">
        <strong>⚠️ Vui lòng điền đầy đủ:</strong>
        <ul>
          <li v-if="!nameWithTrim">Tên (có .trim)</li>
          <li v-if="!ageWithModifier">Tuổi (có .number)</li>
          <li v-if="!agreeTerms">Đồng ý điều khoản</li>
          <li v-if="!gender">Giới tính</li>
          <li v-if="!city">Thành phố</li>
        </ul>
      </div>
    </form>

    <!-- Form data preview -->
    <div v-if="submittedData" class="submitted-data">
      <h3>✅ Dữ liệu đã submit:</h3>
      <pre>{{ submittedData }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormsDemo',
  data() {
    return {
      // Text với/không .trim
      nameWithoutTrim: '',
      nameWithTrim: '',

      // Number với/không .number
      ageWithoutModifier: '',
      ageWithModifier: '',

      // Text với/không .lazy
      bioWithoutLazy: '',
      bioWithLazy: '',
      bioUpdateCount: 0,

      // Other inputs
      description: '',
      agreeTerms: false,
      hobbies: [],
      gender: '',
      city: '',
      skills: [],

      // Submitted data
      submittedData: null
    }
  },
  computed: {
    // Validation đơn giản
    isFormValid() {
      return (
        this.nameWithTrim.length > 0 &&
        this.ageWithModifier > 0 &&
        this.agreeTerms &&
        this.gender &&
        this.city
      )
    }
  },
  watch: {
    // Đếm số lần update của bioWithoutLazy
    bioWithoutLazy() {
      this.bioUpdateCount++
    }
  },
  methods: {
    handleSubmit() {
      if (!this.isFormValid) {
        alert('❌ Vui lòng điền đầy đủ thông tin!')
        return
      }

      this.submittedData = {
        name: this.nameWithTrim,
        age: this.ageWithModifier,
        ageType: typeof this.ageWithModifier,
        bio: this.bioWithLazy,
        description: this.description,
        agreeTerms: this.agreeTerms,
        hobbies: this.hobbies,
        gender: this.gender,
        city: this.city,
        skills: this.skills
      }

      console.log('📤 Form submitted:', this.submittedData)
      alert('✅ Form đã được submit! Xem console và phần preview bên dưới.')
    },

    resetForm() {
      this.nameWithoutTrim = ''
      this.nameWithTrim = ''
      this.ageWithoutModifier = ''
      this.ageWithModifier = ''
      this.bioWithoutLazy = ''
      this.bioWithLazy = ''
      this.bioUpdateCount = 0
      this.description = ''
      this.agreeTerms = false
      this.hobbies = []
      this.gender = ''
      this.city = ''
      this.skills = []
      this.submittedData = null
    }
  }
}
</script>

<style scoped>
.forms-demo {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.main-form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin: 30px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #0984e3;
}

.form-section h3 {
  margin-top: 0;
  color: #2d3436;
}

.form-group {
  margin: 15px 0;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #2d3436;
}

input[type='text'],
input[type='number'],
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  font-family: inherit;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #0984e3;
}

textarea {
  resize: vertical;
}

.value-display {
  margin-top: 8px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
}

.highlight {
  background: #fff3cd;
  padding: 2px 4px;
}

.type-badge {
  display: inline-block;
  margin-left: 10px;
  padding: 3px 8px;
  background: #e74c3c;
  color: white;
  border-radius: 3px;
  font-size: 12px;
}

.type-badge.type-number {
  background: #00b894;
}

.char-count {
  text-align: right;
  color: #636e72;
  font-size: 14px;
  margin-top: 5px;
}

.checkbox-item,
.radio-item {
  display: block;
  padding: 8px 0;
  cursor: pointer;
}

.checkbox-item input,
.radio-item input {
  margin-right: 8px;
  width: auto;
}

select[multiple] {
  padding: 5px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.submit-btn,
.reset-btn {
  flex: 1;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn {
  background: #0984e3;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background: #0770c9;
}

.submit-btn:disabled {
  background: #dfe6e9;
  color: #636e72;
  cursor: not-allowed;
}

.reset-btn {
  background: #636e72;
  color: white;
}

.reset-btn:hover {
  background: #2d3436;
}

.validation-errors {
  margin-top: 20px;
  padding: 15px;
  background: #ffe5e5;
  border-left: 4px solid #e74c3c;
  border-radius: 4px;
}

.validation-errors ul {
  margin: 10px 0 0 0;
  padding-left: 20px;
}

.submitted-data {
  margin-top: 30px;
  padding: 20px;
  background: #d4edda;
  border-left: 4px solid #28a745;
  border-radius: 8px;
}

.submitted-data pre {
  background: white;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 14px;
}

code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}
</style>
