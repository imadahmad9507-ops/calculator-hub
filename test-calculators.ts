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
