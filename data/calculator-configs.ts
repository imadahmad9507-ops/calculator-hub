import React from 'react';
import { MortgageCalculatorUI } from '@/components/calculators/MortgageCalculatorUI';
import { LoanEMICalculatorUI } from '@/components/calculators/LoanEMICalculatorUI';
import { CompoundInterestCalculatorUI } from '@/components/calculators/CompoundInterestCalculatorUI';
import { PaycheckCalculatorUI } from '@/components/calculators/PaycheckCalculatorUI';
import { BMICalculatorUI } from '@/components/calculators/BMICalculatorUI';
import { CalorieTDEECalculatorUI } from '@/components/calculators/CalorieTDEECalculatorUI';
import { PercentageCalculatorUI } from '@/components/calculators/PercentageCalculatorUI';
import { GPACalculatorUI } from '@/components/calculators/GPACalculatorUI';
import { TipCalculatorUI } from '@/components/calculators/TipCalculatorUI';
import { AgeCalculatorUI } from '@/components/calculators/AgeCalculatorUI';
import { UnitConverterUI } from '@/components/calculators/UnitConverterUI';
import { ROICalculatorUI } from '@/components/calculators/ROICalculatorUI';
import { ProgrammingCalculatorUI } from '@/components/calculators/ProgrammingCalculatorUI';
import { StandardBasicCalculatorUI } from '@/components/calculators/StandardBasicCalculatorUI';
import { ScientificCalculatorUI } from '@/components/calculators/ScientificCalculatorUI';
import { ShapeGeometryCalculatorUI } from '@/components/calculators/ShapeGeometryCalculatorUI';
import { GraphCalculatorUI } from '@/components/calculators/GraphCalculatorUI';

export interface DynamicCalculatorConfig {
  component: React.ComponentType;
  howItWorks: string;
  formula: string;
  faqs: { question: string; answer: string }[];
  disclaimer?: string;
  affiliate?: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export const CALCULATOR_CONFIGS: Record<string, DynamicCalculatorConfig> = {
  'mortgage-calculator': {
    component: MortgageCalculatorUI,
    howItWorks:
      'This mortgage calculator uses standard fixed-rate amortization formulas to compute monthly principal and interest payments based on your total loan balance, interest rate, and term length.',
    formula: 'PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)',
    faqs: [
      {
        question: 'What is included in the monthly mortgage calculation?',
        answer: 'This calculation reflects Principal and Interest (P&I). Property taxes, homeowners insurance, and PMI are excluded.',
      },
      {
        question: 'How does down payment affect my monthly payment?',
        answer: 'A larger down payment lowers your principal balance (P), reducing your total interest paid and monthly payment.',
      },
      {
        question: 'Can I pay off my mortgage early?',
        answer: 'Yes, adding extra payments toward principal reduces your total interest and shortens loan duration.',
      },
    ],
    disclaimer: 'This calculator provides estimates for informational purposes only. Consult a licensed mortgage lender.',
    affiliate: {
      title: 'Compare Lowest US Mortgage Rates',
      description: 'Get personalized rate quotes from top-rated online mortgage lenders with zero origination fees.',
      buttonText: 'Check Rates',
    },
  },
  'loan-emi-calculator': {
    component: LoanEMICalculatorUI,
    howItWorks:
      'The Equal Monthly Installment (EMI) calculator uses monthly compounding amortization to compute fixed monthly payments for personal, auto, or student loans.',
    formula: 'EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)',
    faqs: [
      {
        question: 'What does EMI stand for?',
        answer: 'EMI stands for Equated Monthly Installment—a fixed payment amount made by a borrower to a lender at a specified date each month.',
      },
      {
        question: 'How is interest calculated on loans?',
        answer: 'Interest is computed on a reducing balance basis where monthly interest payments decrease as principal is paid down.',
      },
    ],
    disclaimer: 'Calculations are estimates. Final terms subject to credit approval by lender.',
  },
  'compound-interest-calculator': {
    component: CompoundInterestCalculatorUI,
    howItWorks:
      'Computes total future value of an initial investment combined with regular monthly contributions, compounding interest monthly.',
    formula: 'FV = P * (1 + r/12)^(12t) + PMT * (((1 + r/12)^(12t) - 1) / (r/12))',
    faqs: [
      {
        question: 'Why is compound interest powerful?',
        answer: 'Compound interest generates earnings not only on initial principal but also on accumulated past interest.',
      },
      {
        question: 'What compounding frequency is used?',
        answer: 'This calculator assumes monthly compounding interest (12 times per year).',
      },
    ],
    disclaimer: 'Investment returns are not guaranteed. Past performance does not indicate future results.',
    affiliate: {
      title: 'Open High-Yield Savings Account',
      description: 'Earn up to 5.00% APY on cash reserves with FDIC insured online banking accounts.',
      buttonText: 'Explore Accounts',
    },
  },
  'paycheck-calculator': {
    component: PaycheckCalculatorUI,
    howItWorks:
      'Estimates federal income tax withholding based on standard IRS progressive tax brackets and standard deduction, alongside 7.65% FICA payroll taxes.',
    formula: 'Net Pay = Gross Pay - Federal Progressive Tax - FICA (6.2% SS + 1.45% Medicare)',
    faqs: [
      {
        question: 'Why is state tax not included?',
        answer: 'State income taxes vary widely by US state (e.g. 0% in TX/FL vs progressive in CA/NY). This tool focuses on federal taxes.',
      },
      {
        question: 'What is FICA tax?',
        answer: 'FICA consists of 6.2% Social Security (up to annual wage cap) and 1.45% Medicare tax deducted from gross pay.',
      },
    ],
    disclaimer: 'This tax estimate does not constitute official tax advice. Consult a certified CPA for tax planning.',
  },
  'bmi-calculator': {
    component: BMICalculatorUI,
    howItWorks:
      'Computes Body Mass Index using official CDC imperial standard: (weight in lbs / (height in inches)²) × 703.',
    formula: 'BMI = (Weight_lbs / Height_inches²) * 703',
    faqs: [
      {
        question: 'What is a healthy BMI range?',
        answer: 'According to the CDC, a normal BMI ranges from 18.5 to 24.9 for adult men and women.',
      },
      {
        question: 'Does BMI distinguish muscle mass from fat?',
        answer: 'No, BMI is a general population screening tool and does not measure body fat directly.',
      },
    ],
    disclaimer: 'BMI is a screening tool, not a diagnostic measure of health. Consult your physician.',
  },
  'calorie-tdee-calculator': {
    component: CalorieTDEECalculatorUI,
    howItWorks:
      'Calculates Basal Metabolic Rate using the Mifflin-St Jeor equation and multiplies by physical activity factors to determine total daily energy expenditure.',
    formula: 'BMR = 10*weight_kg + 6.25*height_cm - 5*age + (5 for M, -161 for F); TDEE = BMR * ActivityMultiplier',
    faqs: [
      {
        question: 'What is TDEE?',
        answer: 'TDEE is Total Daily Energy Expenditure—the total calories your body burns in 24 hours based on BMR and movement.',
      },
      {
        question: 'How many calories should I eat to lose weight?',
        answer: 'A deficit of 500 calories per day under TDEE generally results in approximately 1 lb of fat loss per week.',
      },
    ],
    disclaimer: 'Caloric requirements vary individually. Consult a registered dietitian or nutritionist.',
  },
  'percentage-calculator': {
    component: PercentageCalculatorUI,
    howItWorks:
      'Provides three instant modes for common percentage math: calculating percent of total, relative percentage, and percentage change.',
    formula: 'Percent = (Part / Total) * 100 | Change = ((New - Old) / Old) * 100',
    faqs: [
      {
        question: 'How do I calculate percent change?',
        answer: 'Subtract the old value from new value, divide by old value, then multiply by 100.',
      },
    ],
  },
  'gpa-calculator': {
    component: GPACalculatorUI,
    howItWorks:
      'Computes credit-hour weighted Grade Point Average by multiplying each letter grade point by course credit hours and dividing by total credits.',
    formula: 'GPA = Sum(Course_Credits * Grade_Points) / Total_Credits',
    faqs: [
      {
        question: 'What is a weighted GPA?',
        answer: 'A weighted GPA accounts for course credit weight (e.g. 4-credit course counts more than 1-credit lab).',
      },
    ],
  },
  'tip-calculator': {
    component: TipCalculatorUI,
    howItWorks:
      'Multiplies bill total by tip percentage and splits total bill and tip amounts evenly across dinner guests.',
    formula: 'Tip = Bill * Tip%; Per Person = (Bill + Tip) / Guests',
    faqs: [
      {
        question: 'What is standard tip percentage in US restaurants?',
        answer: 'Standard tipping in US restaurants ranges from 18% to 22% for good service.',
      },
    ],
  },
  'age-calculator': {
    component: AgeCalculatorUI,
    howItWorks:
      'Uses accurate date library algorithm to compute exact calendar years, months, and days between birthdate and target date.',
    formula: 'Exact calendar difference accounting for variable month lengths and leap years',
    faqs: [
      {
        question: 'How does it account for leap years?',
        answer: 'It checks leap year dates (Feb 29) dynamically to calculate total days lived precisely.',
      },
    ],
  },
  'unit-converter': {
    component: UnitConverterUI,
    howItWorks:
      'Performs scientific unit conversions using exact constant conversion factors and non-linear scale equations for temperature.',
    formula: '°C = (°F - 32) * 5/9 | K = °C + 273.15',
    faqs: [
      {
        question: 'Why are temperature conversions non-linear?',
        answer: 'Fahrenheit and Celsius have different zero points and scale increments, requiring offset subtraction before scaling.',
      },
    ],
  },
  'roi-calculator': {
    component: ROICalculatorUI,
    howItWorks:
      'Calculates total return percentage and Compound Annual Growth Rate (CAGR) for multi-year investments.',
    formula: 'ROI = ((Final - Initial) / Initial) * 100 | CAGR = (Final / Initial)^(1 / Years) - 1',
    faqs: [
      {
        question: 'What is CAGR?',
        answer: 'CAGR is Compound Annual Growth Rate—the mean annual growth rate of an investment over a specified period longer than 1 year.',
      },
    ],
    disclaimer: 'Calculations do not include brokerage fees or capital gains taxes.',
  },
  'programming-calculator': {
    component: ProgrammingCalculatorUI,
    howItWorks:
      'Converts a decimal integer to its Hexadecimal, Binary, and Octal equivalents, and applies standard bitwise operations (AND, OR, XOR, NOT) between two operands.',
    formula: 'Hex = toString(16) | Bin = toString(2) | Oct = toString(8) | Bitwise: A & B, A | B, A ^ B, ~A',
    faqs: [
      {
        question: 'What are bitwise operations?',
        answer: 'Bitwise operations (AND, OR, XOR, NOT) work directly on the binary representations of integers, flipping or comparing individual bits.',
      },
      {
        question: 'What range of numbers are supported?',
        answer: 'Whole integers from 0 to 2^32−1 (unsigned 32-bit range). Negative numbers use JavaScript signed 32-bit integer representation for NOT.',
      },
    ],
    disclaimer: 'Results are computed using JavaScript 32-bit integer arithmetic.',
  },
  'standard-basic-calculator': {
    component: StandardBasicCalculatorUI,
    howItWorks:
      'An interactive arithmetic calculator with a display and keypad. Supports basic operations (+, −, ×, ÷) and memory functions (M+, M−, MR, MC).',
    formula: 'Standard arithmetic: addition, subtraction, multiplication, division with operator precedence.',
    faqs: [
      {
        question: 'What do the memory buttons do?',
        answer: 'M+ adds the current display to memory, M− subtracts it, MR recalls the stored value to display, and MC clears memory to zero.',
      },
      {
        question: 'How is division by zero handled?',
        answer: 'Dividing by zero produces an "Error" state on the display and resets the calculator.',
      },
    ],
  },
  'scientific-calculator': {
    component: ScientificCalculatorUI,
    howItWorks:
      'Evaluates scientific and trigonometric expressions. Supports sin, cos, tan, inverse trig functions, natural log, log base-10, square root, exponentiation, and π / e constants.',
    formula: 'sin(x), cos(x), tan(x), ln(x), log(x), √x, xʸ — DEG mode converts angles: rad = deg × π/180',
    faqs: [
      {
        question: 'What is the difference between DEG and RAD mode?',
        answer: 'In DEG mode, trigonometric functions accept angles in degrees. In RAD mode, they accept radians. Toggle the DEG/RAD button to switch.',
      },
      {
        question: 'How are inverse trig functions used?',
        answer: 'sin⁻¹, cos⁻¹, and tan⁻¹ compute the angle (in degrees or radians) whose trig value equals the input.',
      },
    ],
  },
  'shape-geometry-calculator': {
    component: ShapeGeometryCalculatorUI,
    howItWorks:
      'Computes area, perimeter (2D shapes), or surface area and volume (3D shapes) using standard geometric formulas for circle, rectangle, triangle, sphere, cylinder, and cone.',
    formula: 'Circle: A=πr², P=2πr | Rect: A=lw, P=2(l+w) | Sphere: V=(4/3)πr³, SA=4πr² | Cylinder: V=πr²h, SA=2πr(r+h)',
    faqs: [
      {
        question: 'Which shapes are supported?',
        answer: 'Circle, rectangle, triangle (Heron\'s formula), sphere, cylinder, and cone. Select the shape to reveal the required dimension inputs.',
      },
      {
        question: 'What units are the results in?',
        answer: 'Results are in the same units you enter — if you enter centimeters, area will be in cm² and volume in cm³.',
      },
    ],
  },
  'graph-calculator': {
    component: GraphCalculatorUI,
    howItWorks:
      'Plots 2D mathematical functions over a configurable x-axis range. Evaluates functions point-by-point and renders the curve as an SVG path on a Cartesian plane with grid lines.',
    formula: 'f(x) evaluated at evenly spaced x values: sin(x), cos(x), tan(x), x², x³, custom polynomial, etc.',
    faqs: [
      {
        question: 'What function types can I plot?',
        answer: 'You can plot sin(x), cos(x), tan(x), x², x³, and custom expressions like 2x+1 using standard mathematical notation.',
      },
      {
        question: 'How do I set the x-axis range?',
        answer: 'Enter the minimum and maximum x values in the range inputs. The plotter evaluates the function at 200 evenly-spaced points within that range.',
      },
    ],
  },
};

