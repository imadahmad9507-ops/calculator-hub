export interface CalculatorMeta {
  slug: string;
  name: string;
  category: 'finance' | 'health' | 'math' | 'everyday' | 'business';
  description: string;
  keywords: string[];
  icon: string;
}

export const CATEGORIES = [
  { id: 'finance', name: 'Finance', description: 'Mortgage, loans, interest, and paycheck calculators.' },
  { id: 'health', name: 'Health & Fitness', description: 'BMI, calories, TDEE, and fitness metrics.' },
  { id: 'math', name: 'Math & Statistics', description: 'Percentages, GPA, algebra, and common math functions.' },
  { id: 'everyday', name: 'Everyday Tools', description: 'Tip splitting, exact age, and unit conversions.' },
  { id: 'business', name: 'Business & Investing', description: 'ROI, CAGR, profitability, and business metrics.' },
] as const;

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    category: 'finance',
    description: 'Calculate monthly payment, total interest, and full amortization summary for home loans.',
    keywords: ['mortgage', 'home loan', 'housing', 'amortization', 'monthly payment'],
    icon: 'Home',
  },
  {
    slug: 'loan-emi-calculator',
    name: 'Loan / EMI Calculator',
    category: 'finance',
    description: 'Generalized EMI calculator for personal, auto, student, or business loans.',
    keywords: ['emi', 'loan', 'installment', 'personal loan', 'auto loan'],
    icon: 'Landmark',
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'finance',
    description: 'Calculate future investment growth with monthly contributions and compounding interest.',
    keywords: ['compound interest', 'investing', 'savings', 'future value', 'annuity'],
    icon: 'TrendingUp',
  },
  {
    slug: 'paycheck-calculator',
    name: 'Paycheck Calculator (US)',
    category: 'finance',
    description: 'Estimate net take-home pay per paycheck after federal income taxes and FICA deductions.',
    keywords: ['paycheck', 'salary', 'take home pay', 'tax', 'fica', 'federal tax'],
    icon: 'DollarSign',
  },
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'health',
    description: 'Calculate body mass index (BMI) and health category based on official CDC guidelines.',
    keywords: ['bmi', 'body mass index', 'weight', 'height', 'cdc category'],
    icon: 'Activity',
  },
  {
    slug: 'calorie-tdee-calculator',
    name: 'Calorie & TDEE Calculator',
    category: 'health',
    description: 'Determine your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).',
    keywords: ['tdee', 'bmr', 'calories', 'weight loss', 'mifflin st jeor', 'daily calories'],
    icon: 'Flame',
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'math',
    description: 'Solve percentage of values, percentage change, and what percent one number is of another.',
    keywords: ['percentage', 'percent change', 'percent of', 'ratio', 'math'],
    icon: 'Percent',
  },
  {
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    category: 'math',
    description: 'Calculate weighted high school or college GPA based on course credit hours and letter grades.',
    keywords: ['gpa', 'grade point average', 'college gpa', 'weighted gpa', 'grades'],
    icon: 'GraduationCap',
  },
  {
    slug: 'tip-calculator',
    name: 'Tip & Bill Splitter',
    category: 'everyday',
    description: 'Calculate custom tip percentages, total bill, and split amounts evenly per person.',
    keywords: ['tip', 'bill split', 'restaurant', 'gratuity', 'diners'],
    icon: 'Utensils',
  },
  {
    slug: 'age-calculator',
    name: 'Exact Age Calculator',
    category: 'everyday',
    description: 'Calculate exact chronological age in years, months, days, and total days lived.',
    keywords: ['age', 'birthdate', 'exact age', 'days old', 'leap years'],
    icon: 'Calendar',
  },
  {
    slug: 'unit-converter',
    name: 'Unit Converter',
    category: 'everyday',
    description: 'Convert length, weight, and precise temperature scales (Celsius, Fahrenheit, Kelvin).',
    keywords: ['unit converter', 'length', 'weight', 'temperature', 'celsius to fahrenheit'],
    icon: 'ArrowLeftRight',
  },
  {
    slug: 'roi-calculator',
    name: 'ROI & CAGR Calculator',
    category: 'business',
    description: 'Compute overall Return on Investment and Compound Annual Growth Rate (CAGR).',
    keywords: ['roi', 'return on investment', 'cagr', 'annualized roi', 'profitability'],
    icon: 'Briefcase',
  },
  {
    slug: 'programming-calculator',
    name: 'Programmer Calculator',
    category: 'math',
    description: 'Convert between Decimal, Hexadecimal, Binary, and Octal with bitwise AND, OR, XOR, NOT operations.',
    keywords: ['programmer', 'hex', 'binary', 'octal', 'bitwise', 'and', 'or', 'xor', 'not'],
    icon: 'Code',
  },
  {
    slug: 'standard-basic-calculator',
    name: 'Standard Basic Calculator',
    category: 'math',
    description: 'Full-featured standard interactive calculator with memory functions (M+, M-, MR, MC) and arithmetic.',
    keywords: ['calculator', 'basic', 'standard', 'memory', 'addition', 'subtraction'],
    icon: 'Calculator',
  },
  {
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    category: 'math',
    description: 'Advanced scientific functions including trigonometry (sin, cos, tan), logarithms, square roots, and exponents.',
    keywords: ['scientific', 'trigonometry', 'logarithm', 'sin', 'cos', 'tan', 'power', 'sqrt'],
    icon: 'Cpu',
  },
  {
    slug: 'shape-geometry-calculator',
    name: 'Shape Geometry Calculator',
    category: 'math',
    description: 'Calculate area, perimeter, surface area, and volume for 2D and 3D shapes (circle, rectangle, sphere, cylinder, cone).',
    keywords: ['shape', 'geometry', 'area', 'perimeter', 'volume', 'circle', 'sphere', 'cylinder'],
    icon: 'Box',
  },
  {
    slug: 'graph-calculator',
    name: 'Function Graph Plotter',
    category: 'math',
    description: 'Plot 2D mathematical functions like f(x) = sin(x), x^2, or custom polynomials with interactive canvas visualization.',
    keywords: ['graph', 'plotter', 'function', 'canvas', 'math plot', 'f(x)'],
    icon: 'LineChart',
  },
];
