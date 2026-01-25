const { createApp } = Vue;

const LoginPage = {
    template: `
        <div class="login-container">
            <!-- Back to Dashboard Link -->
            <div class="back-link">
                <a href="dashboard.html">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
                    </svg>
                    กลับไปดูผลการเลือกตั้ง
                </a>
            </div>

            <!-- Header Section -->
            <div class="login-header">
                <div class="logo-section">
                    <div class="logo-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.94-6-5.24-6-9V8.3l6-3 6 3V11c0 3.76-2.13 8.06-6 9z"/>
                            <path d="M8 11h2v6H8zm6 0h2v6h-2zm-3-2h2v8h-2z"/>
                        </svg>
                    </div>
                    <h1>ระบบเลือกตั้งออนไลน์</h1>
                </div>
                <p class="subtitle">Online Voting System</p>
            </div>

            <!-- Login Card -->
            <div class="login-card">
                <h2 class="card-title">เข้าสู่ระบบ</h2>
                <p class="card-subtitle">กรุณากรอกข้อมูลเพื่อเข้าใช้งานระบบ</p>

                <!-- Alert Messages -->
                <div v-if="errorMessage" class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                    </svg>
                    <span>{{ errorMessage }}</span>
                </div>

                <div v-if="successMessage" class="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span>{{ successMessage }}</span>
                </div>

                <!-- Login Form -->
                <form @submit.prevent="handleLogin" class="login-form">
                    <div class="form-group">
                        <label for="citizenId" class="form-label">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                            </svg>
                            เลขบัตรประชาชน
                        </label>
                        <input 
                            type="text" 
                            id="citizenId" 
                            v-model="formData.citizenId"
                            placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
                            maxlength="13"
                            required
                            class="form-input"
                            :class="{ 'input-error': errors.citizenId }"
                        />
                        <span v-if="errors.citizenId" class="error-text">{{ errors.citizenId }}</span>
                    </div>

                    <div class="form-group">
                        <label for="password" class="form-label">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                            </svg>
                            รหัสผ่าน
                        </label>
                        <div class="password-wrapper">
                            <input 
                                :type="showPassword ? 'text' : 'password'" 
                                id="password" 
                                v-model="formData.password"
                                placeholder="กรอกรหัสผ่าน"
                                required
                                class="form-input"
                                :class="{ 'input-error': errors.password }"
                            />
                            <button 
                                type="button" 
                                @click="togglePassword"
                                class="password-toggle"
                            >
                                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                                </svg>
                            </button>
                        </div>
                        <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
                    </div>

                    <div class="form-options">
                        <label class="checkbox-label">
                            <input type="checkbox" v-model="formData.rememberMe">
                            <span>จดจำฉันไว้</span>
                        </label>
                        <a href="#" class="forgot-link">ลืมรหัสผ่าน?</a>
                    </div>

                    <button type="submit" class="btn-primary" :disabled="isLoading">
                        <span v-if="!isLoading">เข้าสู่ระบบ</span>
                        <span v-else class="loading-spinner">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" stroke-width="4" stroke-dasharray="32" stroke-linecap="round">
                                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                                </circle>
                            </svg>
                            กำลังเข้าสู่ระบบ...
                        </span>
                    </button>
                </form>

                <div class="divider">
                    <span>หรือ</span>
                </div>

                <div class="register-section">
                    <p>ยังไม่มีบัญชี?</p>
                    <a href="register.html" class="btn-secondary">ลงทะเบียนผู้มีสิทธิ์เลือกตั้ง</a>
                </div>
            </div>

            <!-- Footer -->
            <div class="login-footer">
                <p>&copy; 2026 ระบบเลือกตั้งออนไลน์ | ปลอดภัย มั่นคง โปร่งใส</p>
                <div class="footer-links">
                    <a href="#">นโยบายความเป็นส่วนตัว</a>
                    <span>•</span>
                    <a href="#">เงื่อนไขการใช้งาน</a>
                    <span>•</span>
                    <a href="#">ติดต่อเรา</a>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            formData: {
                citizenId: '',
                password: '',
                rememberMe: false
            },
            errors: {
                citizenId: '',
                password: ''
            },
            errorMessage: '',
            successMessage: '',
            showPassword: false,
            isLoading: false
        }
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        validateForm() {
            this.errors = {
                citizenId: '',
                password: ''
            };
            let isValid = true;

            // Validate Citizen ID
            if (this.formData.citizenId.length !== 13) {
                this.errors.citizenId = 'กรุณากรอกเลขบัตรประชาชน 13 หลัก';
                isValid = false;
            } else if (!/^\d+$/.test(this.formData.citizenId)) {
                this.errors.citizenId = 'กรุณากรอกเฉพาะตัวเลข';
                isValid = false;
            }

            // Validate Password
            if (this.formData.password.length < 6) {
                this.errors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
                isValid = false;
            }

            return isValid;
        },
        async handleLogin() {
            this.errorMessage = '';
            this.successMessage = '';

            if (!this.validateForm()) {
                return;
            }

            this.isLoading = true;

            // Simulate API call
            setTimeout(() => {
                this.isLoading = false;
                
                // Demo: Success case
                if (this.formData.citizenId === '1234567890123' && this.formData.password === 'password') {
                    this.successMessage = 'เข้าสู่ระบบสำเร็จ กำลังพาคุณไปยังหน้าลงคะแนน...';
                    setTimeout(() => {
                        window.location.href = 'voting.html';
                    }, 1500);
                } else {
                    this.errorMessage = 'เลขบัตรประชาชนหรือรหัสผ่านไม่ถูกต้อง';
                }
            }, 1500);
        }
    }
};

const app = createApp({
    components: {
        LoginPage
    }
});

app.mount('#app');
