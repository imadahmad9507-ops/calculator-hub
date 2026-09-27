import {
  calculateMortgage,
  calculateLoanEMI,
  calculateCompoundInterest,
  calculatePaycheck,
  calculateBMI,
  calculateTDEE,
  calculatePercentage,
  calculateGPA,
  calculateTip,
  calculateAge,
  convertUnits,
  calculateROI,
  calculateProgramming,
  evaluateBasicExpression,
  evaluateScientific,
  calculateShapeGeometry,
  generateGraphPoints,
} from './lib/calculators';

function assertEqual(name: string, actual: number, expected: number, tolerance = 0.01) {
  const diff = Math.abs(actual - expected);
  if (diff > tolerance) {
    console.error(`❌ TEST FAILED [${name}]: expected ~${expected}, got ${actual}`);
    process.exit(1);
  } else {
    console.log(`✓ TEST PASSED [${name}]: ${actual}`);
  }
}

console.log('--- RUNNING CALCULATOR VERIFICATION TESTS ---');

// 1. Mortgage: $300,000 home, $60,000 down (240k loan), 6.5%, 30 years -> expected EMI ~ $1516.96
const mort = calculateMortgage({ homePrice: 300000, downPayment: 60000, interestRate: 6.5, loanTermYears: 30 });
assertEqual('Mortgage Monthly Payment', mort.monthlyPayment, 1516.96);
assertEqual('Mortgage Total Interest', mort.totalInterest, 306106.77);

// 2. Loan EMI: $10,000 loan, 10%, 24 months -> expected EMI ~ $461.45
const emi = calculateLoanEMI({ loanAmount: 10000, interestRate: 10, loanTermMonths: 24 });
assertEqual('Loan EMI', emi.monthlyEMI, 461.45);

// 3. Compound Interest: $10,000 initial, $200/mo, 7% interest, 10 years -> expected FV ~ $54,713.58 ($19.67k initial growth + $35.03k contribution stream)
const ci = calculateCompoundInterest({ initialDeposit: 10000, monthlyContribution: 200, annualInterestRate: 7, years: 10 });
assertEqual('Compound Interest FV', ci.futureValue, 54713.58);

// 4. Paycheck: $75,000 salary, biweekly, single (2026 federal tax estimates)
const paycheck = calculatePaycheck({ grossSalary: 75000, payFrequency: 'biweekly', filingStatus: 'single' });
assertEqual('Paycheck Gross Biweekly', paycheck.grossPerPaycheck, 2884.62);
assertEqual('Paycheck Net Biweekly', paycheck.netPayPerPaycheck, 2368.94);

// 5. BMI: 150 lbs, 68 inches -> 22.8
const bmi = calculateBMI({ weightLbs: 150, heightInches: 68 });
assertEqual('BMI Value', bmi.bmi, 22.8);
if (bmi.category !== 'Normal weight') throw new Error('BMI category mismatch');

// 6. Calorie/TDEE: Male 25 yrs, 180 lbs (81.65 kg), 70 in (177.8 cm), moderate -> BMR = 1808, TDEE = 2802
const tdee = calculateTDEE({ gender: 'male', age: 25, weightLbs: 180, heightInches: 70, activityLevel: 'moderate' });
assertEqual('TDEE BMR', tdee.bmr, 1808);
assertEqual('TDEE Total', tdee.tdee, 2802);

// 7. Percentage: 15% of 200 = 30
const pct = calculatePercentage({ mode: 'of', val1: 15, val2: 200 });
assertEqual('Percentage Of', pct.result, 30);

// 8. GPA: 3 credits A (4.0), 4 credits B (3.0) -> (12 + 12)/7 = 3.43
const gpa = calculateGPA([
  { id: '1', name: 'Class 1', credits: 3, gradePoint: 4.0 },
  { id: '2', name: 'Class 2', credits: 4, gradePoint: 3.0 },
]);
assertEqual('GPA', gpa.gpa, 3.43);

// 9. Tip: $100 bill, 20% tip, 4 people -> tip $20, total $120, per person $30
const tip = calculateTip({ billAmount: 100, tipPercentage: 20, numPeople: 4 });
assertEqual('Tip Per Person', tip.perPersonBill, 30);
assertEqual('Tip Amount', tip.tipAmount, 20);

// 10. Age: 1990-01-01 to 2026-01-01 -> 36 years
const age = calculateAge({ birthDate: '1990-01-01', targetDate: '2026-01-01' });
assertEqual('Age Years', age.years, 36);

// 11. Unit Converter: 100 C -> 212 F, 1 mile -> 1.6093 km
const tempF = convertUnits({ category: 'temperature', fromUnit: 'C', toUnit: 'F', value: 100 });
assertEqual('Temp C to F', tempF, 212);

// 12. ROI: $10,000 initial to $15,000 over 5 years -> 50% simple ROI, CAGR ~ 8.45%
const roi = calculateROI({ initialInvestment: 10000, finalValue: 15000, years: 5 });
assertEqual('Simple ROI', roi.simpleROI, 50);
assertEqual('CAGR', roi.cagr, 8.45);

console.log('--- BASELINE CASES COMPLETE ---');

console.log('--- REQUIRED USER-SPECIFIED TEST CASES ---');

const requiredMortgage = calculateMortgage({
  homePrice: 350000,
  downPayment: 70000,
  interestRate: 6.75,
  loanTermYears: 30,
});
assertEqual('Required Mortgage Monthly Payment', requiredMortgage.monthlyPayment, 1816.07);
assertEqual('Required Mortgage Loan Amount', requiredMortgage.loanAmount, 280000);
assertEqual('Required Mortgage Total Interest', requiredMortgage.totalInterest, 373786.88);

const requiredLoan = calculateLoanEMI({
  loanAmount: 15000,
  interestRate: 8.25,
  loanTermMonths: 36,
});
assertEqual('Required Loan Monthly EMI', requiredLoan.monthlyEMI, 471.78);
assertEqual('Required Loan Total Interest', requiredLoan.totalInterest, 1983.98);

const requiredCompound = calculateCompoundInterest({
  initialDeposit: 8000,
  monthlyContribution: 150,
  annualInterestRate: 6.5,
  years: 15,
});
assertEqual('Required Compound Interest Future Value', requiredCompound.futureValue, 66685.32);
assertEqual('Required Compound Interest Contributions', requiredCompound.totalContributions, 35000);

const requiredPaycheck = calculatePaycheck({
  grossSalary: 95000,
  payFrequency: 'biweekly',
  filingStatus: 'single',
});
assertEqual('Required Paycheck Gross Biweekly', requiredPaycheck.grossPerPaycheck, 3653.85);
assertEqual('Required Paycheck Federal Tax Biweekly', requiredPaycheck.federalTaxPerPaycheck, 464.23);
assertEqual('Required Paycheck Social Security Biweekly', requiredPaycheck.socialSecurityPerPaycheck, 226.54);
assertEqual('Required Paycheck Medicare Biweekly', requiredPaycheck.medicarePerPaycheck, 52.98);
assertEqual('Required Paycheck Net Biweekly', requiredPaycheck.netPayPerPaycheck, 2910.10);

const requiredBMI = calculateBMI({ weightLbs: 190, heightInches: 71 });
assertEqual('Required BMI', requiredBMI.bmi, 26.5);
if (requiredBMI.category !== 'Overweight') throw new Error('Required BMI category mismatch');

const requiredTDEE = calculateTDEE({
  gender: 'female',
  age: 34,
  weightLbs: 145,
  heightInches: 65,
  activityLevel: 'active',
});
assertEqual('Required TDEE BMR', requiredTDEE.bmr, 1359);
assertEqual('Required TDEE Very Active', requiredTDEE.tdee, 2344);

assertEqual('Required Percentage 22% of 340', calculatePercentage({ mode: 'of', val1: 22, val2: 340 }).result, 74.8);
assertEqual('Required Percentage 55 of 220', calculatePercentage({ mode: 'is_what_percent', val1: 55, val2: 220 }).result, 25);
assertEqual('Required Percentage Change 90 to 63', calculatePercentage({ mode: 'change', val1: 90, val2: 63 }).result, -30);

const requiredGPA = calculateGPA([
  { id: '1', name: 'A-', credits: 4, gradePoint: 3.7 },
  { id: '2', name: 'B+', credits: 3, gradePoint: 3.3 },
  { id: '3', name: 'C', credits: 2, gradePoint: 2.0 },
]);
assertEqual('Required GPA', requiredGPA.gpa, 3.19);
assertEqual('Required GPA Total Points', requiredGPA.totalPoints, 28.7);

const requiredTip = calculateTip({ billAmount: 142.5, tipPercentage: 22, numPeople: 5 });
assertEqual('Required Tip Amount', requiredTip.tipAmount, 31.35);
assertEqual('Required Tip Per Person Total', requiredTip.perPersonBill, 34.77);
assertEqual('Required Tip Per Person Gratuity', requiredTip.perPersonTip, 6.27);

const requiredAge = calculateAge({ birthDate: '1988-11-03', targetDate: '2026-09-27' });
if (!requiredAge.isValid) throw new Error('Required age case should be valid');
assertEqual('Required Age Years', requiredAge.years, 37);
assertEqual('Required Age Months', requiredAge.months, 10);
assertEqual('Required Age Days', requiredAge.days, 24);

assertEqual('Required 26.2 Miles to Kilometers', convertUnits({ category: 'length', fromUnit: 'mi', toUnit: 'km', value: 26.2 }), 42.1648);
assertEqual('Required 150 Pounds to Kilograms', convertUnits({ category: 'weight', fromUnit: 'lb', toUnit: 'kg', value: 150 }), 68.0389);
assertEqual('Required -40 Fahrenheit to Celsius', convertUnits({ category: 'temperature', fromUnit: 'F', toUnit: 'C', value: -40 }), -40);

const requiredROI = calculateROI({ initialInvestment: 25000, finalValue: 38000, years: 3.5 });
assertEqual('Required Simple ROI', requiredROI.simpleROI, 52);
assertEqual('Required CAGR', requiredROI.cagr, 12.71);

assertEqual('Zero-Rate Mortgage', calculateMortgage({
  homePrice: 350000,
  downPayment: 0,
  interestRate: 0,
  loanTermYears: 30,
}).monthlyPayment, 972.22);
assertEqual('Zero-Rate Loan', calculateLoanEMI({
  loanAmount: 15000,
  interestRate: 0,
  loanTermMonths: 36,
}).monthlyEMI, 416.67);
console.log('✅ ALL REQUIRED USER-SPECIFIED CASES PASSED');

console.log('--- NEW CALCULATOR TESTS ---');

// 13. Programming Calculator: 42 in decimal
const prog1 = calculateProgramming({ value: 42 });
if (prog1.hex !== '0x2A') throw new Error(`Programming hex: expected 0x2A, got ${prog1.hex}`);
if (prog1.dec !== '42') throw new Error(`Programming dec: expected 42, got ${prog1.dec}`);
if (prog1.oct !== '0o52') throw new Error(`Programming octal: expected 0o52, got ${prog1.oct}`);
console.log(`✓ TEST PASSED [Programming Hex/Dec/Oct]: hex=${prog1.hex} dec=${prog1.dec} oct=${prog1.oct}`);

// 255 -> hex 0xFF
const prog2 = calculateProgramming({ value: 255 });
if (prog2.hex !== '0xFF') throw new Error(`Programming 255 hex: expected 0xFF, got ${prog2.hex}`);
console.log(`✓ TEST PASSED [Programming 255 hex]: ${prog2.hex}`);

// Bitwise AND: 42 & 15 = 10
const progAnd = calculateProgramming({ value: 42, operation: 'AND', operand2: 15 });
if (progAnd.dec !== '10') throw new Error(`Bitwise AND: expected decimal 10, got ${progAnd.dec}`);
console.log(`✓ TEST PASSED [Bitwise AND 42&15]: ${progAnd.dec}`);

// Bitwise OR: 42 | 15 = 47
const progOr = calculateProgramming({ value: 42, operation: 'OR', operand2: 15 });
if (progOr.dec !== '47') throw new Error(`Bitwise OR: expected 47, got ${progOr.dec}`);
console.log(`✓ TEST PASSED [Bitwise OR 42|15]: ${progOr.dec}`);

// 14. Basic Calculator expression: 10 + 5 * 2 = 20 (operator precedence)
const basic1 = evaluateBasicExpression('10 + 5 * 2');
assertEqual('Basic Expression 10+5*2', basic1, 20);

// Simple addition: 7 + 3 = 10
const basic2 = evaluateBasicExpression('7 + 3');
assertEqual('Basic Expression 7+3', basic2, 10);

// 15. Scientific Calculator: sin(90 deg) = 1, log(100) = 2, sqrt(144) = 12
const sci1 = evaluateScientific({ expression: 'sin(90)', angleMode: 'deg' });
assertEqual('Scientific sin(90 deg)', sci1, 1.0);

const sci2 = evaluateScientific({ expression: 'log(100)', angleMode: 'deg' });
assertEqual('Scientific log(100)', sci2, 2.0);

const sci3 = evaluateScientific({ expression: 'sqrt(144)', angleMode: 'deg' });
assertEqual('Scientific sqrt(144)', sci3, 12.0);

// 16. Shape Geometry: circle r=5 -> area ~78.54, perimeter ~31.42
const shape1 = calculateShapeGeometry({ shape: 'circle', dim1: 5 });
assertEqual('Shape Circle Area', shape1.areaOrSurface, 78.54, 0.01);
assertEqual('Shape Circle Perimeter', shape1.perimeterOrVolume, 31.42, 0.01);

// Rectangle 4x6 -> area=24, perimeter=20
const shape2 = calculateShapeGeometry({ shape: 'rectangle', dim1: 4, dim2: 6 });
assertEqual('Shape Rectangle Area', shape2.areaOrSurface, 24);
assertEqual('Shape Rectangle Perimeter', shape2.perimeterOrVolume, 20);

// Sphere r=3 -> surface area ~113.10
const shape3 = calculateShapeGeometry({ shape: 'sphere', dim1: 3 });
assertEqual('Shape Sphere Surface', shape3.areaOrSurface, 113.10, 0.01);

// 17. Graph Calculator: x^2 at x=0,1,2 -> y=0,1,4
const pts = generateGraphPoints('x^2', 0, 2, 1);
const pt0 = pts.find(p => p.x === 0);
const pt1 = pts.find(p => p.x === 1);
const pt2 = pts.find(p => p.x === 2);
if (!pt0 || Math.abs(pt0.y) > 0.001) throw new Error(`Graph x^2 at x=0: expected y=0, got ${pt0?.y}`);
if (!pt1 || Math.abs(pt1.y - 1) > 0.001) throw new Error(`Graph x^2 at x=1: expected y=1, got ${pt1?.y}`);
if (!pt2 || Math.abs(pt2.y - 4) > 0.001) throw new Error(`Graph x^2 at x=2: expected y=4, got ${pt2?.y}`);
console.log(`✓ TEST PASSED [Graph x^2 points]: (0,${pt0?.y}) (1,${pt1?.y}) (2,${pt2?.y})`);

// sin(x) should have 3 points for range 0 to 2 step 1
const sinPts = generateGraphPoints('sin(x)', 0, 2, 1);
if (sinPts.length < 3) throw new Error(`Graph sin(x) expected >= 3 points, got ${sinPts.length}`);
console.log(`✓ TEST PASSED [Graph sin(x) point count]: ${sinPts.length} points`);

// Custom user input test: 2x + 3 at x=0, 2, 4 -> y=3, 7, 11
const customLinear = generateGraphPoints('2x + 3', 0, 4, 2);
const c0 = customLinear.find(p => p.x === 0);
const c2 = customLinear.find(p => p.x === 2);
const c4 = customLinear.find(p => p.x === 4);
if (!c0 || c0.y !== 3) throw new Error(`Custom graph 2x+3 at x=0: expected 3, got ${c0?.y}`);
if (!c2 || c2.y !== 7) throw new Error(`Custom graph 2x+3 at x=2: expected 7, got ${c2?.y}`);
if (!c4 || c4.y !== 11) throw new Error(`Custom graph 2x+3 at x=4: expected 11, got ${c4?.y}`);
console.log(`✓ TEST PASSED [Custom Graph 2x + 3]: (0,${c0?.y}) (2,${c2?.y}) (4,${c4?.y})`);

// Custom polynomial input test: x^2 - 4 at x=2 -> y=0
const customPoly = generateGraphPoints('x^2 - 4', 0, 2, 1);
const polyAt2 = customPoly.find(p => p.x === 2);
if (!polyAt2 || polyAt2.y !== 0) throw new Error(`Custom graph x^2-4 at x=2: expected 0, got ${polyAt2?.y}`);
console.log(`✓ TEST PASSED [Custom Graph x^2 - 4 at x=2]: y=${polyAt2?.y}`);

// Constant expressions testing: sin(45) produces horizontal line y = Math.sin(45) ~ 0.85
const sin45Expected = Math.round(Math.sin(45) * 100) / 100;
const sin45Points = generateGraphPoints('sin(45)', 0, 4, 1);
if (sin45Points.length < 5) throw new Error(`sin(45) expected 5 points, got ${sin45Points.length}`);
sin45Points.forEach(p => {
  if (Math.abs(p.y - sin45Expected) > 0.01) throw new Error(`sin(45) at x=${p.x}: expected ~${sin45Expected}, got ${p.y}`);
});
console.log(`✓ TEST PASSED [Constant Graph sin(45)]: 5 points plotted at y=${sin45Expected}`);

// Constant integer: 5 produces horizontal line y = 5
const const5 = generateGraphPoints('5', -2, 2, 1);
if (const5.length !== 5 || const5.some(p => p.y !== 5)) throw new Error('Constant 5 plotting failed');
console.log(`✓ TEST PASSED [Constant Graph 5]: plotted horizontal line at y=5`);

// Constant cos(0) = 1
const cos0 = generateGraphPoints('cos(0)', -1, 1, 1);
if (cos0.some(p => p.y !== 1)) throw new Error('cos(0) plotting failed');
console.log(`✓ TEST PASSED [Constant Graph cos(0)]: plotted horizontal line at y=1`);

// Wide function variety tests: tan(x), exp(x), ln(x), cbrt(x), sinh(x), tanh(x)
// tan(0) = 0
const tanPoints = generateGraphPoints('tan(x)', 0, 1, 1);
const tan0 = tanPoints.find(p => p.x === 0);
if (!tan0 || Math.abs(tan0.y) > 0.001) throw new Error(`tan(0) failed, got ${tan0?.y}`);
console.log(`✓ TEST PASSED [Function Graph tan(x)]: tan(0) = ${tan0?.y}`);

// exp(x) at x=0 -> 1, x=1 -> 2.72
const expPoints = generateGraphPoints('exp(x)', 0, 1, 1);
const exp0 = expPoints.find(p => p.x === 0);
const exp1 = expPoints.find(p => p.x === 1);
if (!exp0 || Math.abs(exp0.y - 1) > 0.01) throw new Error(`exp(0) failed, got ${exp0?.y}`);
if (!exp1 || Math.abs(exp1.y - 2.72) > 0.01) throw new Error(`exp(1) failed, got ${exp1?.y}`);
console.log(`✓ TEST PASSED [Function Graph exp(x)]: exp(0)=${exp0?.y}, exp(1)=${exp1?.y}`);

// ln(x) at x=1 -> 0, x=e -> 1
const lnPoints = generateGraphPoints('ln(x)', 1, 2, 1);
const ln1 = lnPoints.find(p => p.x === 1);
if (!ln1 || Math.abs(ln1.y) > 0.01) throw new Error(`ln(1) failed, got ${ln1?.y}`);
console.log(`✓ TEST PASSED [Function Graph ln(x)]: ln(1) = ${ln1?.y}`);

// cbrt(x) at x=8 -> 2, x=27 -> 3
const cbrtPoints = generateGraphPoints('cbrt(x)', 8, 27, 19);
const cbrt8 = cbrtPoints.find(p => p.x === 8);
if (!cbrt8 || Math.abs(cbrt8.y - 2) > 0.01) throw new Error(`cbrt(8) failed, got ${cbrt8?.y}`);
console.log(`✓ TEST PASSED [Function Graph cbrt(x)]: cbrt(8) = ${cbrt8?.y}`);

// Hyperbolic: sinh(0) = 0, cosh(0) = 1, tanh(0) = 0
const sinhPoints = generateGraphPoints('sinh(x)', 0, 1, 1);
const coshPoints = generateGraphPoints('cosh(x)', 0, 1, 1);
const tanhPoints = generateGraphPoints('tanh(x)', 0, 1, 1);
if (Math.abs(sinhPoints[0].y) > 0.01) throw new Error('sinh(0) failed');
if (Math.abs(coshPoints[0].y - 1) > 0.01) throw new Error('cosh(0) failed');
if (Math.abs(tanhPoints[0].y) > 0.01) throw new Error('tanh(0) failed');
console.log(`✓ TEST PASSED [Hyperbolic Functions]: sinh(0)=0, cosh(0)=1, tanh(0)=0`);

console.log('✅ ALL NEW CALCULATOR TESTS PASSED');

