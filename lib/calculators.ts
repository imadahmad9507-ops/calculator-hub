import { addMonths, differenceInYears, differenceInMonths, differenceInDays, subYears, subMonths, isBefore, isValid } from 'date-fns';

// 1. MORTGAGE
export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  interestRate: number; // e.g. 6.5 for 6.5%
  loanTermYears: number; // e.g. 30
}

export interface MortgageOutput {
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
}

export function calculateMortgage(input: MortgageInput): MortgageOutput {
  const loanAmount = Math.max(0, input.homePrice - input.downPayment);
  if (loanAmount === 0 || input.loanTermYears <= 0) {
    return { loanAmount: 0, monthlyPayment: 0, totalInterest: 0, totalPaid: 0 };
  }

  const monthlyRate = input.interestRate / 100 / 12;
  const numberOfPayments = input.loanTermYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / numberOfPayments;
  } else {
    monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  }

  const totalPaid = monthlyPayment * numberOfPayments;
  const totalInterest = totalPaid - loanAmount;

  return {
    loanAmount: Math.round(loanAmount * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPaid: Math.round(totalPaid * 100) / 100,
  };
}

// 2. LOAN / EMI
export interface LoanEMIInput {
  loanAmount: number;
  interestRate: number;
  loanTermMonths: number;
}

export interface LoanEMIOutput {
  monthlyEMI: number;
  totalInterest: number;
  totalPayment: number;
}

export function calculateLoanEMI(input: LoanEMIInput): LoanEMIOutput {
  const { loanAmount, interestRate, loanTermMonths } = input;
  if (loanAmount <= 0 || loanTermMonths <= 0) {
    return { monthlyEMI: 0, totalInterest: 0, totalPayment: 0 };
  }

  const r = interestRate / 100 / 12;
  const n = loanTermMonths;

  let monthlyEMI = 0;
  if (r === 0) {
    monthlyEMI = loanAmount / n;
  } else {
    monthlyEMI = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPayment = monthlyEMI * n;
  const totalInterest = totalPayment - loanAmount;

  return {
    monthlyEMI: Math.round(monthlyEMI * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
  };
}

// 3. COMPOUND INTEREST
export interface CompoundInterestInput {
  initialDeposit: number;
  monthlyContribution: number;
  annualInterestRate: number;
  years: number;
}

export interface CompoundInterestOutput {
  futureValue: number;
  totalContributions: number;
  totalInterestEarned: number;
}

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestOutput {
  const { initialDeposit, monthlyContribution, annualInterestRate, years } = input;
  if (years <= 0) {
    return { futureValue: initialDeposit, totalContributions: initialDeposit, totalInterestEarned: 0 };
  }

  const r = annualInterestRate / 100 / 12;
  const n = years * 12;

  let fvInitial = initialDeposit * Math.pow(1 + r, n);
  // Monthly contributions made at end of month: PMT * (((1+r)^n - 1) / r)
  let fvContributions = 0;
  if (r === 0) {
    fvContributions = monthlyContribution * n;
  } else {
    fvContributions = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
  }

  const futureValue = fvInitial + fvContributions;
  const totalContributions = initialDeposit + monthlyContribution * n;
  const totalInterestEarned = futureValue - totalContributions;

  return {
    futureValue: Math.round(futureValue * 100) / 100,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
  };
}

// 4. PAYCHECK (US 2026 IRS Federal Brackets + FICA)
export interface PaycheckInput {
  grossSalary: number; // annual
  payFrequency: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly';
  filingStatus: 'single' | 'married';
}

export interface PaycheckOutput {
  grossPerPaycheck: number;
  federalTaxPerPaycheck: number;
  socialSecurityPerPaycheck: number;
  medicarePerPaycheck: number;
  netPayPerPaycheck: number;
  annualFederalTax: number;
  annualFICA: number;
  annualNetPay: number;
}

export function calculatePaycheck(input: PaycheckInput): PaycheckOutput {
  const { grossSalary, payFrequency, filingStatus } = input;
  const periods = payFrequency === 'weekly' ? 52 : payFrequency === 'biweekly' ? 26 : payFrequency === 'semimonthly' ? 24 : 12;

  if (grossSalary <= 0) {
    return {
      grossPerPaycheck: 0,
      federalTaxPerPaycheck: 0,
      socialSecurityPerPaycheck: 0,
      medicarePerPaycheck: 0,
      netPayPerPaycheck: 0,
      annualFederalTax: 0,
      annualFICA: 0,
      annualNetPay: 0,
    };
  }

  // Tax year 2026 standard deductions (single / married filing jointly).
  const standardDeduction = filingStatus === 'single' ? 16100 : 32200;
  const taxableIncome = Math.max(0, grossSalary - standardDeduction);

  // Tax year 2026 federal brackets (Single).
  const singleBrackets = [
    { limit: 12400, rate: 0.10 },
    { limit: 50400, rate: 0.12 },
    { limit: 105700, rate: 0.22 },
    { limit: 201775, rate: 0.24 },
    { limit: 256225, rate: 0.32 },
    { limit: 640600, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ];

  // Tax year 2026 federal brackets (Married Filing Jointly).
  const marriedBrackets = [
    { limit: 24800, rate: 0.10 },
    { limit: 100800, rate: 0.12 },
    { limit: 211400, rate: 0.22 },
    { limit: 403550, rate: 0.24 },
    { limit: 512450, rate: 0.32 },
    { limit: 768700, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ];

  const brackets = filingStatus === 'single' ? singleBrackets : marriedBrackets;
  let annualFederalTax = 0;
  let prevLimit = 0;

  for (const b of brackets) {
    if (taxableIncome > prevLimit) {
      const taxableInBracket = Math.min(taxableIncome - prevLimit, b.limit - prevLimit);
      annualFederalTax += taxableInBracket * b.rate;
      prevLimit = b.limit;
    } else {
      break;
    }
  }

  // FICA
  const ssWageCap = 184500; // 2026 wage base
  const ssTaxable = Math.min(grossSalary, ssWageCap);
  const annualSS = ssTaxable * 0.062;
  const annualMedicare = grossSalary * 0.0145;
  const annualFICA = annualSS + annualMedicare;

  const annualNetPay = Math.max(0, grossSalary - annualFederalTax - annualFICA);

  return {
    grossPerPaycheck: Math.round((grossSalary / periods) * 100) / 100,
    federalTaxPerPaycheck: Math.round((annualFederalTax / periods) * 100) / 100,
    socialSecurityPerPaycheck: Math.round((annualSS / periods) * 100) / 100,
    medicarePerPaycheck: Math.round((annualMedicare / periods) * 100) / 100,
    netPayPerPaycheck: Math.round((annualNetPay / periods) * 100) / 100,
    annualFederalTax: Math.round(annualFederalTax * 100) / 100,
    annualFICA: Math.round(annualFICA * 100) / 100,
    annualNetPay: Math.round(annualNetPay * 100) / 100,
  };
}

// 5. BMI
export interface BMIInput {
  weightLbs: number;
  heightInches: number;
}

export interface BMIOutput {
  bmi: number;
  category: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obesity';
}

export function calculateBMI(input: BMIInput): BMIOutput {
  const { weightLbs, heightInches } = input;
  if (weightLbs <= 0 || heightInches <= 0) {
    return { bmi: 0, category: 'Normal weight' };
  }

  const bmiRaw = (weightLbs / (heightInches * heightInches)) * 703;
  const bmi = Math.round(bmiRaw * 10) / 10;

  let category: BMIOutput['category'] = 'Normal weight';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25.0) category = 'Normal weight';
  else if (bmi < 30.0) category = 'Overweight';
  else category = 'Obesity';

  return { bmi, category };
}

// 6. CALORIE / TDEE
export interface TDEEInput {
  gender: 'male' | 'female';
  age: number;
  weightLbs: number;
  heightInches: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

export interface TDEEOutput {
  bmr: number;
  tdee: number;
  weightLossCalories: number;
  weightGainCalories: number;
}

export function calculateTDEE(input: TDEEInput): TDEEOutput {
  const { gender, age, weightLbs, heightInches, activityLevel } = input;
  if (age <= 0 || weightLbs <= 0 || heightInches <= 0) {
    return { bmr: 0, tdee: 0, weightLossCalories: 0, weightGainCalories: 0 };
  }

  const weightKg = weightLbs * 0.45359237;
  const heightCm = heightInches * 2.54;

  // Mifflin-St Jeor
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  bmr += gender === 'male' ? 5 : -161;

  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const tdee = bmr * multipliers[activityLevel];

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    weightLossCalories: Math.round(tdee - 500),
    weightGainCalories: Math.round(tdee + 500),
  };
}

// 7. PERCENTAGE
export interface PercentageInput {
  mode: 'of' | 'is_what_percent' | 'change';
  val1: number;
  val2: number;
}

export interface PercentageOutput {
  result: number;
  label: string;
}

export function calculatePercentage(input: PercentageInput): PercentageOutput {
  const { mode, val1, val2 } = input;
  if (mode === 'of') {
    const res = (val1 / 100) * val2;
    return { result: Math.round(res * 10000) / 10000, label: `${val1}% of ${val2}` };
  } else if (mode === 'is_what_percent') {
    if (val2 === 0) return { result: 0, label: 'Cannot divide by 0' };
    const res = (val1 / val2) * 100;
    return { result: Math.round(res * 100) / 100, label: `${val1} is % of ${val2}` };
  } else {
    if (val1 === 0) return { result: 0, label: 'Initial value cannot be 0' };
    const res = ((val2 - val1) / val1) * 100;
    return { result: Math.round(res * 100) / 100, label: `Percent change from ${val1} to ${val2}` };
  }
}

// 8. GPA
export interface CourseRow {
  id: string;
  name: string;
  credits: number;
  gradePoint: number; // e.g. 4.0 for A, 3.0 for B, etc.
}

export interface GPAOutput {
  gpa: number;
  totalCredits: number;
  totalPoints: number;
}

export function calculateGPA(courses: CourseRow[]): GPAOutput {
  let totalCredits = 0;
  let totalPoints = 0;

  for (const c of courses) {
    if (c.credits > 0 && c.gradePoint >= 0) {
      totalCredits += c.credits;
      totalPoints += c.credits * c.gradePoint;
    }
  }

  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return {
    gpa: Math.round(gpa * 100) / 100,
    totalCredits: Math.round(totalCredits * 100) / 100,
    totalPoints: Math.round(totalPoints * 100) / 100,
  };
}

// 9. TIP
export interface TipInput {
  billAmount: number;
  tipPercentage: number;
  numPeople: number;
}

export interface TipOutput {
  tipAmount: number;
  totalBill: number;
  perPersonBill: number;
  perPersonTip: number;
}

export function calculateTip(input: TipInput): TipOutput {
  const { billAmount, tipPercentage, numPeople } = input;
  const people = Math.max(1, numPeople);
  if (billAmount <= 0) {
    return { tipAmount: 0, totalBill: 0, perPersonBill: 0, perPersonTip: 0 };
  }

  const tipAmount = billAmount * (tipPercentage / 100);
  const totalBill = billAmount + tipAmount;

  return {
    tipAmount: Math.round(tipAmount * 100) / 100,
    totalBill: Math.round(totalBill * 100) / 100,
    perPersonBill: Math.round((totalBill / people) * 100) / 100,
    perPersonTip: Math.round((tipAmount / people) * 100) / 100,
  };
}

// 10. AGE
export interface AgeInput {
  birthDate: string; // YYYY-MM-DD
  targetDate?: string; // default today
}

export interface AgeOutput {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  isValid: boolean;
}

export function calculateAge(input: AgeInput): AgeOutput {
  const birth = new Date(input.birthDate);
  const target = input.targetDate ? new Date(input.targetDate) : new Date();

  if (!isValid(birth) || !isValid(target) || isBefore(target, birth)) {
    return { years: 0, months: 0, days: 0, totalDays: 0, isValid: false };
  }

  const years = differenceInYears(target, birth);
  const birthPlusYears = addMonths(birth, years * 12);
  const months = differenceInMonths(target, birthPlusYears);
  const birthPlusMonths = addMonths(birthPlusYears, months);
  const days = differenceInDays(target, birthPlusMonths);
  const totalDays = differenceInDays(target, birth);

  return { years, months, days, totalDays, isValid: true };
}

// 11. UNIT CONVERTER
export type UnitCategory = 'length' | 'weight' | 'temperature';

export interface UnitConverterInput {
  category: UnitCategory;
  fromUnit: string;
  toUnit: string;
  value: number;
}

export function convertUnits(input: UnitConverterInput): number {
  const { category, fromUnit, toUnit, value } = input;

  if (category === 'temperature') {
    // Celsius, Fahrenheit, Kelvin
    let tempInC = value;
    if (fromUnit === 'F') tempInC = (value - 32) * (5 / 9);
    else if (fromUnit === 'K') tempInC = value - 273.15;

    let result = tempInC;
    if (toUnit === 'F') result = tempInC * (9 / 5) + 32;
    else if (toUnit === 'K') result = tempInC + 273.15;

    return Math.round(result * 100) / 100;
  }

  if (category === 'length') {
    // Meters base
    const lengthInMeters: Record<string, number> = {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      mi: 1609.344,
      ft: 0.3048,
      in: 0.0254,
      yd: 0.9144,
    };
    const inMeters = value * (lengthInMeters[fromUnit] || 1);
    const result = inMeters / (lengthInMeters[toUnit] || 1);
    return Math.round(result * 10000) / 10000;
  }

  if (category === 'weight') {
    // Kilograms base
    const weightInKg: Record<string, number> = {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.45359237,
      oz: 0.028349523125,
    };
    const inKg = value * (weightInKg[fromUnit] || 1);
    const result = inKg / (weightInKg[toUnit] || 1);
    return Math.round(result * 10000) / 10000;
  }

  return value;
}

// 12. ROI & CAGR
export interface ROIInput {
  initialInvestment: number;
  finalValue: number;
  years: number;
}

export interface ROIOutput {
  totalGain: number;
  simpleROI: number; // percentage
  cagr: number; // annual percentage
}

export function calculateROI(input: ROIInput): ROIOutput {
  const { initialInvestment, finalValue, years } = input;
  if (initialInvestment <= 0) {
    return { totalGain: 0, simpleROI: 0, cagr: 0 };
  }

  const totalGain = finalValue - initialInvestment;
  const simpleROI = (totalGain / initialInvestment) * 100;

  let cagr = 0;
  if (years > 0 && finalValue > 0) {
    cagr = (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100;
  }

  return {
    totalGain: Math.round(totalGain * 100) / 100,
    simpleROI: Math.round(simpleROI * 100) / 100,
    cagr: Math.round(cagr * 100) / 100,
  };
}
