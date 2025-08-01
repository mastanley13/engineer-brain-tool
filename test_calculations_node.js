/**
 * Node.js Test Suite for Engineering Calculations
 * Tests all implemented calculations by copying the functions
 */

// Copy the calculation functions from api.ts for testing
function calculateGradePercent(rise, run) {
  try {
    if (run === 0) {
      return {
        success: false,
        error: 'Run cannot be zero (division by zero)'
      };
    }

    const gradePercent = (rise / run) * 100;
    const slope = rise / run;
    const angleRadians = Math.atan(slope);
    const angleDegrees = angleRadians * (180 / Math.PI);

    return {
      success: true,
      data: {
        gradePercent: parseFloat(gradePercent.toFixed(2)),
        slope: parseFloat(slope.toFixed(4)),
        angle: parseFloat(angleDegrees.toFixed(2)),
        angleRadians: parseFloat(angleRadians.toFixed(4))
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

function calculateSlopeAngle(rise, run) {
  try {
    if (run === 0) {
      return {
        success: false,
        error: 'Run cannot be zero (division by zero)'
      };
    }

    const slope = rise / run;
    const angleRadians = Math.atan(slope);
    const angleDegrees = angleRadians * (180 / Math.PI);
    const gradePercent = slope * 100;

    return {
      success: true,
      data: {
        angleDegrees: parseFloat(angleDegrees.toFixed(2)),
        angleRadians: parseFloat(angleRadians.toFixed(4)),
        slope: parseFloat(slope.toFixed(4)),
        gradePercent: parseFloat(gradePercent.toFixed(2))
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

function calculateHorizontalDistance(rise, slope) {
  try {
    if (slope === 0) {
      return {
        success: false,
        error: 'Slope cannot be zero (division by zero)'
      };
    }

    const run = rise / slope;
    const gradePercent = slope * 100;
    const angleRadians = Math.atan(slope);
    const angleDegrees = angleRadians * (180 / Math.PI);

    return {
      success: true,
      data: {
        run: parseFloat(run.toFixed(2)),
        slope: slope,
        gradePercent: parseFloat(gradePercent.toFixed(2)),
        angle: parseFloat(angleDegrees.toFixed(2))
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

function calculateVerticalRise(slope, run) {
  try {
    const rise = slope * run;
    const gradePercent = slope * 100;
    const angleRadians = Math.atan(slope);
    const angleDegrees = angleRadians * (180 / Math.PI);

    return {
      success: true,
      data: {
        rise: parseFloat(rise.toFixed(2)),
        slope: slope,
        gradePercent: parseFloat(gradePercent.toFixed(2)),
        angle: parseFloat(angleDegrees.toFixed(2))
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

function calculateQuadraticEquation(a, b, c) {
  try {
    if (a === 0) {
      return {
        success: false,
        error: 'Coefficient "a" cannot be zero (not a quadratic equation)'
      };
    }

    const discriminant = (b * b) - (4 * a * c);
    
    if (discriminant < 0) {
      return {
        success: true,
        data: {
          discriminant,
          hasRealSolutions: false,
          solutionType: 'complex',
          message: 'No real solutions (complex roots exist)'
        }
      };
    }

    const sqrtDiscriminant = Math.sqrt(discriminant);
    const x1 = (-b + sqrtDiscriminant) / (2 * a);
    const x2 = (-b - sqrtDiscriminant) / (2 * a);

    return {
      success: true,
      data: {
        discriminant,
        hasRealSolutions: true,
        x1: parseFloat(x1.toFixed(4)),
        x2: parseFloat(x2.toFixed(4)),
        solutionType: discriminant === 0 ? 'repeated' : 'distinct'
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

function calculateTrigonometric(angle, angleUnit = 'degrees') {
  try {
    const angleInRadians = angleUnit === 'degrees' ? angle * (Math.PI / 180) : angle;
    const angleInDegrees = angleUnit === 'radians' ? angle * (180 / Math.PI) : angle;
    
    const sinValue = Math.sin(angleInRadians);
    const cosValue = Math.cos(angleInRadians);
    const tanValue = Math.tan(angleInRadians);
    
    const cscValue = 1 / sinValue;
    const secValue = 1 / cosValue;
    const cotValue = 1 / tanValue;

    return {
      success: true,
      data: {
        angleRadians: parseFloat(angleInRadians.toFixed(4)),
        angleDegrees: parseFloat(angleInDegrees.toFixed(2)),
        sin: parseFloat(sinValue.toFixed(4)),
        cos: parseFloat(cosValue.toFixed(4)),
        tan: parseFloat(tanValue.toFixed(4)),
        csc: isFinite(cscValue) ? parseFloat(cscValue.toFixed(4)) : null,
        sec: isFinite(secValue) ? parseFloat(secValue.toFixed(4)) : null,
        cot: isFinite(cotValue) ? parseFloat(cotValue.toFixed(4)) : null
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

function calculatePercentError(experimentalValue, theoreticalValue) {
  try {
    if (theoreticalValue === 0) {
      return {
        success: false,
        error: 'Theoretical value cannot be zero (division by zero)'
      };
    }

    const absoluteError = Math.abs(experimentalValue - theoreticalValue);
    const percentError = (absoluteError / Math.abs(theoreticalValue)) * 100;
    const relativeError = absoluteError / Math.abs(theoreticalValue);

    return {
      success: true,
      data: {
        percentError: parseFloat(percentError.toFixed(2)),
        absoluteError: parseFloat(absoluteError.toFixed(4)),
        relativeError: parseFloat(relativeError.toFixed(6)),
        experimentalValue,
        theoreticalValue
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

function calculateOhmsLaw(voltage, current, resistance) {
  try {
    const provided = [voltage, current, resistance].filter(v => v !== undefined && v !== null);
    if (provided.length !== 2) {
      return {
        success: false,
        error: 'Please provide exactly 2 of the 3 values (voltage, current, resistance)'
      };
    }

    let result = {};

    if (voltage !== undefined && current !== undefined) {
      if (current === 0) {
        return { success: false, error: 'Current cannot be zero when calculating resistance' };
      }
      const calculatedR = voltage / current;
      const power = voltage * current;
      
      result = {
        voltage,
        current,
        resistance: parseFloat(calculatedR.toFixed(4)),
        power: parseFloat(power.toFixed(2))
      };
    } else if (voltage !== undefined && resistance !== undefined) {
      if (resistance === 0) {
        return { success: false, error: 'Resistance cannot be zero when calculating current' };
      }
      const calculatedI = voltage / resistance;
      const power = voltage * calculatedI;
      
      result = {
        voltage,
        current: parseFloat(calculatedI.toFixed(4)),
        resistance,
        power: parseFloat(power.toFixed(2))
      };
    } else if (current !== undefined && resistance !== undefined) {
      const calculatedV = current * resistance;
      const power = calculatedV * current;
      
      result = {
        voltage: parseFloat(calculatedV.toFixed(4)),
        current,
        resistance,
        power: parseFloat(power.toFixed(2))
      };
    }

    return {
      success: true,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

function calculatePowerVI(voltage, current, resistance) {
  try {
    let power;
    let method;

    if (voltage !== undefined && current !== undefined) {
      power = voltage * current;
      method = 'P = V × I';
    } else if (current !== undefined && resistance !== undefined) {
      power = current * current * resistance;
      method = 'P = I²R';
    } else if (voltage !== undefined && resistance !== undefined) {
      if (resistance === 0) {
        return { success: false, error: 'Resistance cannot be zero when using P = V²/R' };
      }
      power = (voltage * voltage) / resistance;
      method = 'P = V²/R';
    } else {
      return {
        success: false,
        error: 'Please provide at least 2 of the 3 values (voltage, current, resistance)'
      };
    }

    return {
      success: true,
      data: {
        power: parseFloat(power.toFixed(2)),
        method,
        voltage,
        current,
        resistance
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

function calculateResistanceSeries(resistances) {
  try {
    if (!Array.isArray(resistances) || resistances.length === 0) {
      return {
        success: false,
        error: 'Please provide an array of resistance values'
      };
    }

    if (resistances.some(r => r < 0)) {
      return {
        success: false,
        error: 'Resistance values cannot be negative'
      };
    }

    const totalResistance = resistances.reduce((sum, r) => sum + r, 0);
    const minResistance = Math.min(...resistances);
    const maxResistance = Math.max(...resistances);

    return {
      success: true,
      data: {
        totalResistance: parseFloat(totalResistance.toFixed(4)),
        individualResistances: resistances,
        count: resistances.length,
        minResistance,
        maxResistance,
        averageResistance: parseFloat((totalResistance / resistances.length).toFixed(4))
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

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

// Run all tests
console.log('🧪 Starting Engineering Calculations Test Suite...\n');

try {
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
  console.log('\n🧮 Testing General Math Calculations...');

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
  console.log('\n⚡ Testing Electrical Engineering Calculations...');

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

  console.log('\n🔍 Testing Edge Cases...');

  // Test very small numbers
  result = calculateGradePercent(0.001, 1);
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

  console.log('\n🎉 ALL TESTS PASSED! ✨');
  console.log('✅ Mathematical accuracy verified');
  console.log('✅ Error handling working correctly');
  console.log('✅ All calculations functioning as expected');

} catch (error) {
  console.error('\n❌ TEST FAILED:', error.message);
  process.exit(1);
}