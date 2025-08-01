/**
 * Comprehensive Test Suite for Engineering Calculations
 * Tests all implemented calculations for mathematical accuracy and error handling
 */

// Import calculation functions (we'll copy them here for testing)
import {
  calculateGradePercent,
  calculateSlopeAngle,
  calculateHorizontalDistance,
  calculateVerticalRise,
  calculateQuadraticEquation,
  calculateTrigonometric,
  calculatePercentError,
  calculateOhmsLaw,
  calculatePowerVI,
  calculateResistanceSeries
} from './src/lib/api.js';

// Test helper functions
function assertEqual(actual, expected, tolerance = 0.0001) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`Expected ${expected}, got ${actual}`);
  }
}

function assertSuccess(result) {
  if (!result.success) {
    throw new Error(`Expected success, got error: ${result.error}`);
  }
}

function assertError(result) {
  if (result.success) {
    throw new Error('Expected error, but got success');
  }
}

// Civil Engineering Tests
console.log('🏗️ Testing Civil Engineering Calculations...');

// 1. Grade Percent Tests
console.log('Testing Grade Percent calculation...');
let result = calculateGradePercent(10, 100);
assertSuccess(result);
assertEqual(result.data.gradePercent, 10.0); // 10% grade
assertEqual(result.data.slope, 0.1);
assertEqual(result.data.angle, 5.71, 0.01); // ~5.71 degrees

// Test division by zero
result = calculateGradePercent(10, 0);
assertError(result);
console.log('✅ Grade Percent tests passed');

// 2. Slope Angle Tests
console.log('Testing Slope Angle calculation...');
result = calculateSlopeAngle(10, 100);
assertSuccess(result);
assertEqual(result.data.angleDegrees, 5.71, 0.01);
assertEqual(result.data.slope, 0.1);
assertEqual(result.data.gradePercent, 10.0);

// Test division by zero
result = calculateSlopeAngle(10, 0);
assertError(result);
console.log('✅ Slope Angle tests passed');

// 3. Horizontal Distance Tests
console.log('Testing Horizontal Distance calculation...');
result = calculateHorizontalDistance(10, 0.1);
assertSuccess(result);
assertEqual(result.data.run, 100.0);
assertEqual(result.data.slope, 0.1);

// Test division by zero
result = calculateHorizontalDistance(10, 0);
assertError(result);
console.log('✅ Horizontal Distance tests passed');

// 4. Vertical Rise Tests
console.log('Testing Vertical Rise calculation...');
result = calculateVerticalRise(0.1, 100);
assertSuccess(result);
assertEqual(result.data.rise, 10.0);
assertEqual(result.data.slope, 0.1);
console.log('✅ Vertical Rise tests passed');

// General Math Tests
console.log('🧮 Testing General Math Calculations...');

// 5. Quadratic Equation Tests
console.log('Testing Quadratic Equation solver...');
// Test case: a=1, b=-5, c=6 should give x=2,3
result = calculateQuadraticEquation(1, -5, 6);
assertSuccess(result);
assertEqual(result.data.discriminant, 1); // b²-4ac = 25-24 = 1
assertEqual(result.data.x1, 3.0);
assertEqual(result.data.x2, 2.0);

// Test case with no real solutions
result = calculateQuadraticEquation(1, 0, 1);
assertSuccess(result);
assertEqual(result.data.discriminant, -4);
assertEqual(result.data.hasRealSolutions, false);

// Test a=0 (not quadratic)
result = calculateQuadraticEquation(0, 1, 1);
assertError(result);
console.log('✅ Quadratic Equation tests passed');

// 6. Trigonometric Tests
console.log('Testing Trigonometric functions...');
// Test sin(30°) = 0.5
result = calculateTrigonometric(30, 'degrees');
assertSuccess(result);
assertEqual(result.data.sin, 0.5, 0.001);
assertEqual(result.data.cos, 0.866, 0.001); // cos(30°) = √3/2 ≈ 0.866
assertEqual(result.data.tan, 0.577, 0.001); // tan(30°) = 1/√3 ≈ 0.577

// Test sin(π/6) = 0.5 (radians)
result = calculateTrigonometric(Math.PI/6, 'radians');
assertSuccess(result);
assertEqual(result.data.sin, 0.5, 0.001);
console.log('✅ Trigonometric tests passed');

// 7. Percent Error Tests
console.log('Testing Percent Error calculation...');
// Test case: experimental=95, theoretical=100 should be 5%
result = calculatePercentError(95, 100);
assertSuccess(result);
assertEqual(result.data.percentError, 5.0);
assertEqual(result.data.absoluteError, 5.0);
assertEqual(result.data.relativeError, 0.05);

// Test division by zero
result = calculatePercentError(95, 0);
assertError(result);
console.log('✅ Percent Error tests passed');

// Electrical Engineering Tests  
console.log('⚡ Testing Electrical Engineering Calculations...');

// 8. Ohm's Law Tests
console.log('Testing Ohm\'s Law...');
// Test case: V=12, R=4 should give I=3A
result = calculateOhmsLaw(12, undefined, 4);
assertSuccess(result);
assertEqual(result.data.voltage, 12);
assertEqual(result.data.current, 3.0);
assertEqual(result.data.resistance, 4);
assertEqual(result.data.power, 36); // P = V*I = 12*3 = 36W

// Test with I and R given
result = calculateOhmsLaw(undefined, 3, 4);
assertSuccess(result);
assertEqual(result.data.voltage, 12);
assertEqual(result.data.current, 3);
assertEqual(result.data.resistance, 4);

// Test error cases
result = calculateOhmsLaw(12, 3, 4); // Too many values
assertError(result);

result = calculateOhmsLaw(12); // Too few values
assertError(result);

result = calculateOhmsLaw(12, 0, undefined); // Current = 0
assertError(result);
console.log('✅ Ohm\'s Law tests passed');

// 9. Power VI Tests
console.log('Testing Power calculations...');
// Test P = V*I
result = calculatePowerVI(12, 3, undefined);
assertSuccess(result);
assertEqual(result.data.power, 36);
assertEqual(result.data.method, 'P = V × I');

// Test P = I²R
result = calculatePowerVI(undefined, 3, 4);
assertSuccess(result);
assertEqual(result.data.power, 36); // P = 3² * 4 = 36W
assertEqual(result.data.method, 'P = I²R');

// Test P = V²/R
result = calculatePowerVI(12, undefined, 4);
assertSuccess(result);
assertEqual(result.data.power, 36); // P = 12²/4 = 144/4 = 36W
assertEqual(result.data.method, 'P = V²/R');

// Test division by zero
result = calculatePowerVI(12, undefined, 0);
assertError(result);
console.log('✅ Power calculations tests passed');

// 10. Series Resistance Tests
console.log('Testing Series Resistance...');
result = calculateResistanceSeries([10, 20, 30]);
assertSuccess(result);
assertEqual(result.data.totalResistance, 60);
assertEqual(result.data.count, 3);
assertEqual(result.data.minResistance, 10);
assertEqual(result.data.maxResistance, 30);
assertEqual(result.data.averageResistance, 20);

// Test empty array
result = calculateResistanceSeries([]);
assertError(result);

// Test negative values
result = calculateResistanceSeries([10, -5, 20]);
assertError(result);
console.log('✅ Series Resistance tests passed');

console.log('\n🎉 All calculation tests passed! Mathematical accuracy verified.');

// Additional Edge Case Tests
console.log('\n🔍 Testing Edge Cases...');

// Test very small numbers
result = calculateGradePercent(0.001, 1000);
assertSuccess(result);
assertEqual(result.data.gradePercent, 0.1);

// Test very large numbers  
result = calculateResistanceSeries([1000000, 2000000, 3000000]);
assertSuccess(result);
assertEqual(result.data.totalResistance, 6000000);

// Test negative slope
result = calculateSlopeAngle(-10, 100);
assertSuccess(result);
assertEqual(result.data.angleDegrees, -5.71, 0.01);

console.log('✅ Edge case tests passed');

console.log('\n✨ All tests completed successfully! The calculations are mathematically correct.');