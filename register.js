const { createApp } = Vue;

// ข้อมูลจังหวัด อำเภอ และเขตเลือกตั้ง (ตัวอย่าง)
const locationData = {
  กรุงเทพมหานคร: {
    districts: {
      บางรัก: {
        subdistricts: ["สี่พระยา", "มหาพฤฒาราม", "สุริยวงศ์"],
        constituency: "เขต 1",
      },
      ปทุมวัน: {
        subdistricts: ["ปทุมวัน", "ลุมพินี", "รองเมือง"],
        constituency: "เขต 2",
      },
      ดุสิต: {
        subdistricts: ["ดุสิต", "วชิรพยาบาล", "สวนจิตรลดา"],
        constituency: "เขต 3",
      },
      คลองเตย: {
        subdistricts: ["คลองเตย", "คลองตัน", "พระโขนง"],
        constituency: "เขต 4",
      },
    },
  },
  เชียงใหม่: {
    districts: {
      เมืองเชียงใหม่: {
        subdistricts: ["ศรีภูมิ", "พระสิงห์", "หายยา"],
        constituency: "เขต 1",
      },
      หางดง: {
        subdistricts: ["หางดง", "หนองแก๋ว", "บ้านแหวน"],
        constituency: "เขต 2",
      },
      สันกำแพง: {
        subdistricts: ["สันกำแพง", "ทรายมูล", "ร้องวัวแดง"],
        constituency: "เขต 3",
      },
    },
  },
  ขอนแก่น: {
    districts: {
      เมืองขอนแก่น: {
        subdistricts: ["ในเมือง", "บ้านค้อ", "สาวะถี"],
        constituency: "เขต 1",
      },
      บ้านไผ่: {
        subdistricts: ["บ้านไผ่", "เมืองเพีย", "หนองน้ำใส"],
        constituency: "เขต 2",
      },
      น้ำพอง: {
        subdistricts: ["น้ำพอง", "วังชัย", "ท่ากระเสริม"],
        constituency: "เขต 3",
      },
    },
  },
  ภูเก็ต: {
    districts: {
      เมืองภูเก็ต: {
        subdistricts: ["ตลาดใหญ่", "ตลาดเหนือ", "เกาะแก้ว"],
        constituency: "เขต 1",
      },
      กะทู้: {
        subdistricts: ["กะทู้", "ป่าตอง", "กมลา"],
        constituency: "เขต 1",
      },
      ถลาง: {
        subdistricts: ["เทพกระษัตรี", "ศรีสุนทร", "เชิงทะเล"],
        constituency: "เขต 1",
      },
    },
  },
};

const RegisterPage = {
  template: `
        <div class="register-container">
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
            <div class="register-header">
                <div class="logo-section">
                    <div class="logo-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.94-6-5.24-6-9V8.3l6-3 6 3V11c0 3.76-2.13 8.06-6 9z"/>
                            <path d="M8 11h2v6H8zm6 0h2v6h-2zm-3-2h2v8h-2z"/>
                        </svg>
                    </div>
                    <h1>ลงทะเบียนผู้มีสิทธิ์เลือกตั้ง</h1>
                </div>
                <p class="subtitle">Voter Registration</p>
            </div>

            <!-- Register Card -->
            <div class="register-card">
                <!-- Progress Steps -->
                <div class="progress-steps">
                    <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
                        <div class="step-circle">1</div>
                        <span class="step-label">ข้อมูลส่วนตัว</span>
                    </div>
                    <div class="step-divider"></div>
                    <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
                        <div class="step-circle">2</div>
                        <span class="step-label">ที่อยู่</span>
                    </div>
                    <div class="step-divider"></div>
                    <div class="step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
                        <div class="step-circle">3</div>
                        <span class="step-label">ตั้งรหัสผ่าน</span>
                    </div>
                </div>

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

                <!-- Registration Form -->
                <form @submit.prevent="handleSubmit" class="register-form">
                    <!-- Step 1: Personal Information -->
                    <div v-show="currentStep === 1" class="form-step">
                        <h2 class="step-title">ข้อมูลส่วนตัว</h2>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="citizenId" class="form-label required">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clip-rule="evenodd"/>
                                    </svg>
                                    เลขบัตรประชาชน
                                </label>
                                <input 
                                    type="text" 
                                    id="citizenId" 
                                    v-model="formData.citizenId"
                                    @input="formatCitizenId"
                                    placeholder="X-XXXX-XXXXX-XX-X"
                                    maxlength="17"
                                    required
                                    class="form-input"
                                    :class="{ 'input-error': errors.citizenId }"
                                />
                                <span v-if="errors.citizenId" class="error-text">{{ errors.citizenId }}</span>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="firstName" class="form-label required">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                                    </svg>
                                    ชื่อ
                                </label>
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    v-model="formData.firstName"
                                    placeholder="กรอกชื่อจริง"
                                    required
                                    class="form-input"
                                    :class="{ 'input-error': errors.firstName }"
                                />
                                <span v-if="errors.firstName" class="error-text">{{ errors.firstName }}</span>
                            </div>

                            <div class="form-group">
                                <label for="lastName" class="form-label required">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                                    </svg>
                                    นามสกุล
                                </label>
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    v-model="formData.lastName"
                                    placeholder="กรอกนามสกุล"
                                    required
                                    class="form-input"
                                    :class="{ 'input-error': errors.lastName }"
                                />
                                <span v-if="errors.lastName" class="error-text">{{ errors.lastName }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2: Address -->
                    <div v-show="currentStep === 2" class="form-step">
                        <h2 class="step-title">ที่อยู่และเขตเลือกตั้ง</h2>

                        <div class="form-group">
                            <label for="address" class="form-label required">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                                </svg>
                                ที่อยู่
                            </label>
                            <textarea 
                                id="address" 
                                v-model="formData.address"
                                placeholder="บ้านเลขที่ หมู่ที่ ซอย ถนน"
                                rows="3"
                                required
                                class="form-input"
                                :class="{ 'input-error': errors.address }"
                            ></textarea>
                            <span v-if="errors.address" class="error-text">{{ errors.address }}</span>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="province" class="form-label required">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
                                    </svg>
                                    จังหวัด
                                </label>
                                <select 
                                    id="province" 
                                    v-model="formData.province"
                                    @change="onProvinceChange"
                                    required
                                    class="form-input"
                                    :class="{ 'input-error': errors.province }"
                                >
                                    <option value="">-- เลือกจังหวัด --</option>
                                    <option v-for="province in provinces" :key="province" :value="province">
                                        {{ province }}
                                    </option>
                                </select>
                                <span v-if="errors.province" class="error-text">{{ errors.province }}</span>
                            </div>

                            <div class="form-group">
                                <label for="district" class="form-label required">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                                    </svg>
                                    อำเภอ/เขต
                                </label>
                                <select 
                                    id="district" 
                                    v-model="formData.district"
                                    @change="onDistrictChange"
                                    :disabled="!formData.province"
                                    required
                                    class="form-input"
                                    :class="{ 'input-error': errors.district }"
                                >
                                    <option value="">-- เลือกอำเภอ/เขต --</option>
                                    <option v-for="district in districts" :key="district" :value="district">
                                        {{ district }}
                                    </option>
                                </select>
                                <span v-if="errors.district" class="error-text">{{ errors.district }}</span>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="subdistrict" class="form-label required">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                                    </svg>
                                    ตำบล/แขวง
                                </label>
                                <select 
                                    id="subdistrict" 
                                    v-model="formData.subdistrict"
                                    :disabled="!formData.district"
                                    required
                                    class="form-input"
                                    :class="{ 'input-error': errors.subdistrict }"
                                >
                                    <option value="">-- เลือกตำบล/แขวง --</option>
                                    <option v-for="subdistrict in subdistricts" :key="subdistrict" :value="subdistrict">
                                        {{ subdistrict }}
                                    </option>
                                </select>
                                <span v-if="errors.subdistrict" class="error-text">{{ errors.subdistrict }}</span>
                            </div>

                            <div class="form-group">
                                <label for="constituency" class="form-label">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                                    </svg>
                                    เขตเลือกตั้ง
                                </label>
                                <div class="constituency-display">
                                    <span v-if="formData.constituency" class="badge-constituency">
                                        {{ formData.constituency }}
                                    </span>
                                    <span v-else class="text-muted">กรุณาเลือกอำเภอเพื่อระบุเขตเลือกตั้ง</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: Password -->
                    <div v-show="currentStep === 3" class="form-step">
                        <h2 class="step-title">ตั้งรหัสผ่าน</h2>

                        <div class="form-group">
                            <label for="password" class="form-label required">
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
                                    placeholder="ตั้งรหัสผ่าน (อย่างน้อย 8 ตัวอักษร)"
                                    required
                                    class="form-input"
                                    :class="{ 'input-error': errors.password }"
                                />
                                <button 
                                    type="button" 
                                    @click="showPassword = !showPassword"
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
                            
                            <!-- Password Strength Indicator -->
                            <div v-if="formData.password" class="password-strength">
                                <div class="strength-bar" :class="passwordStrength.class">
                                    <div class="strength-fill" :style="{ width: passwordStrength.width }"></div>
                                </div>
                                <span class="strength-text" :style="{ color: passwordStrength.color }">
                                    {{ passwordStrength.text }}
                                </span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="confirmPassword" class="form-label required">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                                ยืนยันรหัสผ่าน
                            </label>
                            <div class="password-wrapper">
                                <input 
                                    :type="showConfirmPassword ? 'text' : 'password'" 
                                    id="confirmPassword" 
                                    v-model="formData.confirmPassword"
                                    placeholder="กรอกรหัสผ่านอีกครั้ง"
                                    required
                                    class="form-input"
                                    :class="{ 'input-error': errors.confirmPassword }"
                                />
                                <button 
                                    type="button" 
                                    @click="showConfirmPassword = !showConfirmPassword"
                                    class="password-toggle"
                                >
                                    <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                                    </svg>
                                </button>
                            </div>
                            <span v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</span>
                        </div>

                        <div class="terms-section">
                            <label class="checkbox-label">
                                <input type="checkbox" v-model="formData.acceptTerms" required>
                                <span>ฉันยอมรับ <a href="#" class="link-primary">ข้อกำหนดและเงื่อนไข</a> และ <a href="#" class="link-primary">นโยบายความเป็นส่วนตัว</a></span>
                            </label>
                        </div>
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="form-navigation">
                        <button 
                            v-if="currentStep > 1" 
                            type="button" 
                            @click="previousStep"
                            class="btn-secondary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                            ย้อนกลับ
                        </button>

                        <button 
                            v-if="currentStep < 3" 
                            type="button" 
                            @click="nextStep"
                            class="btn-primary"
                        >
                            ถัดไป
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </button>

                        <button 
                            v-if="currentStep === 3" 
                            type="submit"
                            class="btn-primary"
                            :disabled="isLoading"
                        >
                            <span v-if="!isLoading">ลงทะเบียน</span>
                            <span v-else class="loading-spinner">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10" stroke-width="4" stroke-dasharray="32" stroke-linecap="round">
                                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                                    </circle>
                                </svg>
                                กำลังลงทะเบียน...
                            </span>
                        </button>
                    </div>
                </form>

                <div class="divider">
                    <span>หรือ</span>
                </div>

                <div class="login-section">
                    <p>มีบัญชีอยู่แล้ว?</p>
                    <a href="login.html" class="btn-link">เข้าสู่ระบบ</a>
                </div>
            </div>

            <!-- Footer -->
            <div class="register-footer">
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
      currentStep: 1,
      formData: {
        citizenId: "",
        firstName: "",
        lastName: "",
        address: "",
        province: "",
        district: "",
        subdistrict: "",
        constituency: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
        rememberMe: false,
      },
      errors: {},
      errorMessage: "",
      successMessage: "",
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false,
      locationData: locationData,
    };
  },
  computed: {
    provinces() {
      return Object.keys(this.locationData);
    },
    districts() {
      if (!this.formData.province) return [];
      return Object.keys(this.locationData[this.formData.province].districts);
    },
    subdistricts() {
      if (!this.formData.province || !this.formData.district) return [];
      return this.locationData[this.formData.province].districts[
        this.formData.district
      ].subdistricts;
    },
    passwordStrength() {
      const password = this.formData.password;
      if (!password) return { width: "0%", text: "", color: "", class: "" };

      let strength = 0;
      if (password.length >= 8) strength++;
      if (password.length >= 12) strength++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
      if (/\d/.test(password)) strength++;
      if (/[^a-zA-Z0-9]/.test(password)) strength++;

      if (strength <= 1) {
        return {
          width: "25%",
          text: "อ่อนแอ",
          color: "#EF4444",
          class: "weak",
        };
      } else if (strength <= 3) {
        return {
          width: "50%",
          text: "ปานกลาง",
          color: "#F59E0B",
          class: "medium",
        };
      } else if (strength <= 4) {
        return { width: "75%", text: "ดี", color: "#10B981", class: "good" };
      } else {
        return {
          width: "100%",
          text: "แข็งแรงมาก",
          color: "#059669",
          class: "strong",
        };
      }
    },
  },
  methods: {
    formatCitizenId(event) {
      let value = event.target.value.replace(/[^0-9]/g, "");
      if (value.length > 13) value = value.slice(0, 13);

      if (value.length > 0) {
        let formatted = value[0];
        if (value.length > 1) formatted += "-" + value.slice(1, 5);
        if (value.length > 5) formatted += "-" + value.slice(5, 10);
        if (value.length > 10) formatted += "-" + value.slice(10, 12);
        if (value.length > 12) formatted += "-" + value.slice(12, 13);
        this.formData.citizenId = formatted;
      } else {
        this.formData.citizenId = "";
      }
    },
    onProvinceChange() {
      this.formData.district = "";
      this.formData.subdistrict = "";
      this.formData.constituency = "";
    },
    onDistrictChange() {
      this.formData.subdistrict = "";
      if (this.formData.province && this.formData.district) {
        this.formData.constituency =
          this.locationData[this.formData.province].districts[
            this.formData.district
          ].constituency;
      } else {
        this.formData.constituency = "";
      }
    },
    validateStep(step) {
      this.errors = {};
      this.errorMessage = "";
      let isValid = true;

      if (step === 1) {
        // Validate Citizen ID
        const cleanId = this.formData.citizenId.replace(/[^0-9]/g, "");
        if (cleanId.length !== 13) {
          this.errors.citizenId = "กรุณากรอกเลขบัตรประชาชน 13 หลัก";
          isValid = false;
        }

        if (!this.formData.firstName.trim()) {
          this.errors.firstName = "กรุณากรอกชื่อ";
          isValid = false;
        }

        if (!this.formData.lastName.trim()) {
          this.errors.lastName = "กรุณากรอกนามสกุล";
          isValid = false;
        }
      } else if (step === 2) {
        if (!this.formData.address.trim()) {
          this.errors.address = "กรุณากรอกที่อยู่";
          isValid = false;
        }

        if (!this.formData.province) {
          this.errors.province = "กรุณาเลือกจังหวัด";
          isValid = false;
        }

        if (!this.formData.district) {
          this.errors.district = "กรุณาเลือกอำเภอ/เขต";
          isValid = false;
        }

        if (!this.formData.subdistrict) {
          this.errors.subdistrict = "กรุณาเลือกตำบล/แขวง";
          isValid = false;
        }
      } else if (step === 3) {
        if (this.formData.password.length < 8) {
          this.errors.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
          isValid = false;
        }

        if (this.formData.password !== this.formData.confirmPassword) {
          this.errors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
          isValid = false;
        }

        if (!this.formData.acceptTerms) {
          this.errorMessage = "กรุณายอมรับข้อกำหนดและเงื่อนไขก่อนดำเนินการต่อ";
          isValid = false;
        }
      }

      return isValid;
    },
    nextStep() {
      if (this.validateStep(this.currentStep)) {
        this.currentStep++;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    previousStep() {
      this.currentStep--;
      this.errorMessage = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    async handleSubmit() {
      if (!this.validateStep(3)) {
        return;
      }

      this.isLoading = true;
      this.errorMessage = "";
      this.successMessage = "";

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.successMessage =
          "ลงทะเบียนสำเร็จ! กำลังพาคุณไปยังหน้าเข้าสู่ระบบ...";

        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      }, 2000);
    },
  },
};

const app = createApp({
  components: {
    RegisterPage,
  },
});

app.mount("#app");
