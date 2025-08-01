# Manual UI Test Cases for Engineering Calculator

## Test Environment
- Application URL: http://localhost:5174/
- Browser: Any modern browser

## Civil Engineering Tests

### 1. Grade Percent Calculation
**Test Case**: Rise=10, Run=100, Expected=10% grade
1. Navigate to Civil Engineering section
2. Click "Grade (%) calculation"
3. Enter Rise: 10
4. Enter Run: 100
5. Click Calculate
6. **Expected Results**:
   - Grade Percentage: 10%
   - Slope: 0.1
   - Angle: 5.71°
   - Work shown should display the formula and step-by-step calculation

### 2. Slope Angle Calculation
**Test Case**: Rise=10, Run=100, Expected=~5.71°
1. Navigate to Civil Engineering section
2. Click "Angle of slope (degrees/radians)"
3. Enter Rise: 10
4. Enter Run: 100
5. Click Calculate
6. **Expected Results**:
   - Angle (Degrees): 5.71°
   - Angle (Radians): 0.1 rad
   - Slope: 0.1
   - Grade: 10%

### 3. Horizontal Distance Calculation
**Test Case**: Rise=10, Slope=0.1, Expected=100 units
1. Navigate to Civil Engineering section
2. Click "Horizontal distance given slope and rise"
3. Enter Rise: 10
4. Enter Slope: 0.1
5. Click Calculate
6. **Expected Results**:
   - Horizontal Distance (Run): 100 units
   - Slope: 0.1
   - Grade: 10%
   - Angle: 5.71°

### 4. Vertical Rise Calculation
**Test Case**: Slope=0.1, Run=100, Expected=10 units
1. Navigate to Civil Engineering section
2. Click "Vertical rise given slope and run"
3. Enter Slope: 0.1
4. Enter Run: 100
5. Click Calculate
6. **Expected Results**:
   - Vertical Rise: 10 units
   - Slope: 0.1
   - Grade: 10%
   - Angle: 5.71°

## General Math Tests

### 5. Quadratic Equation Solver
**Test Case**: a=1, b=-5, c=6, Expected=x₁=3, x₂=2
1. Navigate to General Math section
2. Click "Quadratic equation solver"
3. Enter a: 1
4. Enter b: -5
5. Enter c: 6
6. Click Calculate
7. **Expected Results**:
   - Discriminant: 1
   - Solution Type: distinct
   - x₁: 3
   - x₂: 2
   - Work shown should show discriminant calculation and quadratic formula

### 6. Trigonometric Functions
**Test Case**: Angle=30°, Expected=sin(30°)=0.5
1. Navigate to General Math section
2. Click "Trigonometric functions (sin, cos, tan)"
3. Enter Angle: 30
4. Select Unit: degrees
5. Click Calculate
6. **Expected Results**:
   - Angle: 30° (0.5236 rad)
   - sin: 0.5
   - cos: 0.866
   - tan: 0.577
   - csc: 2
   - sec: 1.155
   - cot: 1.732

### 7. Percent Error Calculation
**Test Case**: Experimental=95, Theoretical=100, Expected=5%
1. Navigate to General Math section
2. Click "Percent error calculation"
3. Enter Experimental Value: 95
4. Enter Theoretical Value: 100
5. Click Calculate
6. **Expected Results**:
   - Percent Error: 5%
   - Absolute Error: 5
   - Relative Error: 0.05
   - Work shown should display formula and calculation steps

## Electrical Engineering Tests

### 8. Ohm's Law
**Test Case**: V=12V, R=4Ω, Expected=I=3A
1. Navigate to Electrical Engineering section
2. Click "Ohm's Law (V = IR)"
3. Enter Voltage: 12
4. Leave Current blank
5. Enter Resistance: 4
6. Click Calculate
7. **Expected Results**:
   - Voltage: 12 V
   - Current: 3 A
   - Resistance: 4 Ω
   - Power: 36 W
   - Work shown should show I = V/R calculation

### 9. Power Calculation
**Test Case**: V=12V, I=3A, Expected=P=36W
1. Navigate to Electrical Engineering section
2. Click "Power (P = VI)"
3. Enter Voltage: 12
4. Enter Current: 3
5. Leave Resistance blank
6. Click Calculate
7. **Expected Results**:
   - Power: 36 W
   - Method: P = V × I
   - Work shown should show P = V × I = 12 × 3 = 36W

### 10. Series Resistance
**Test Case**: Resistances=[10,20,30], Expected=60Ω
1. Navigate to Electrical Engineering section
2. Click "Resistance in series"
3. Enter Resistances: 10, 20, 30
4. Click Calculate
5. **Expected Results**:
   - Total Resistance: 60 Ω
   - Number of Resistors: 3
   - Individual Resistors: 10, 20, 30 Ω
   - Min/Max: 10 / 30 Ω
   - Average: 20 Ω

## Error Handling Tests

### 11. Division by Zero Error
**Test Case**: Grade Percent with Run=0
1. Navigate to Civil Engineering section
2. Click "Grade (%) calculation"
3. Enter Rise: 10
4. Enter Run: 0
5. Click Calculate
6. **Expected Results**:
   - Error message: "Run cannot be zero (division by zero)"
   - No results displayed
   - Error styling (red text)

### 12. Invalid Input Error
**Test Case**: Ohm's Law with too many values
1. Navigate to Electrical Engineering section
2. Click "Ohm's Law (V = IR)"
3. Enter Voltage: 12
4. Enter Current: 3
5. Enter Resistance: 4
6. Click Calculate
7. **Expected Results**:
   - Error message: "Please provide exactly 2 of the 3 values"
   - No results displayed

### 13. No Real Solutions
**Test Case**: Quadratic with discriminant < 0
1. Navigate to General Math section
2. Click "Quadratic equation solver"
3. Enter a: 1
4. Enter b: 0
5. Enter c: 1
6. Click Calculate
7. **Expected Results**:
   - Discriminant: -4
   - Solution Type: complex
   - Solutions: "No real solutions (complex roots exist)"

## UI/UX Verification

### 14. Navigation Flow
1. Verify back buttons work correctly
2. Verify breadcrumb navigation
3. Verify smooth transitions between sections
4. Verify responsive design on different screen sizes

### 15. Result Display
1. Verify results are clearly formatted
2. Verify work shown is properly displayed with correct formatting
3. Verify formulas are displayed correctly
4. Verify units are included in results
5. Verify precision/rounding is appropriate

### 16. Input Validation
1. Verify required field validation
2. Verify number input restrictions
3. Verify dropdown selections work
4. Verify comma-separated input parsing (for resistances)

## Performance Tests

### 17. Calculation Speed
1. Verify calculations complete quickly (<1 second)
2. Verify no freezing or blocking of UI
3. Verify loading states are shown appropriately

## Accessibility Tests

### 18. Keyboard Navigation
1. Verify all interactive elements are keyboard accessible
2. Verify tab order is logical
3. Verify focus indicators are visible

### 19. Screen Reader Compatibility
1. Verify proper labeling of form elements
2. Verify results are announced correctly
3. Verify error messages are accessible

## Test Results Summary

Record results for each test case:
- ✅ Pass
- ❌ Fail (include description of issue)
- ⚠️ Partial (works but has minor issues)

**Overall Assessment**: 
- Mathematical accuracy: ✅
- Error handling: ✅
- UI functionality: [To be tested]
- User experience: [To be tested]