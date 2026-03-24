export type SvgType = "pizza" | "cake" | "circle" | "rectangle";

export interface Question {
  id: number;
  level: 1 | 2 | 3;
  text: string;
  svgType?: SvgType;
  svgProps?: { numerator: number; denominator: number };
  options: string[];
  correct: string;
  explanation: string;
  wrongExplanations: Record<string, string>;
}

export interface Level {
  id: 1 | 2 | 3;
  name: string;
  theme: string;
  color: string;
  headerColor: string;
  questions: Question[];
}

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "Easy",
    theme: "Pizza Party",
    color: "#2ECC71",
    headerColor: "#27AE60",
    questions: [
      {
        id: 101,
        level: 1,
        text: "Look at the pizza below. How many slices are shaded (with toppings)?",
        svgType: "pizza",
        svgProps: { numerator: 3, denominator: 8 },
        options: ["3/8", "2/8", "5/8", "1/8"],
        correct: "3/8",
        explanation:
          "The pizza has 8 equal slices total and 3 slices are shaded with toppings. So the fraction shaded is 3 out of 8, written as 3/8!",
        wrongExplanations: {
          "2/8":
            "Count again! There are 3 shaded slices, not 2. The denominator (bottom number) tells us total slices = 8.",
          "5/8":
            "5 out of 8 would mean MORE than half the pizza is shaded. Count the shaded slices carefully — there are only 3!",
          "1/8":
            "1/8 means only 1 slice out of 8 is shaded. But if you count the shaded slices, you'll find there are 3!",
        },
      },
      {
        id: 102,
        level: 1,
        text: "The cake has been cut into equal pieces. What fraction shows the shaded pieces?",
        svgType: "cake",
        svgProps: { numerator: 2, denominator: 5 },
        options: ["2/5", "3/5", "1/5", "4/5"],
        correct: "2/5",
        explanation:
          "The cake is divided into 5 equal pieces and 2 pieces are shaded. So the fraction is 2/5 — 2 pieces out of 5 total!",
        wrongExplanations: {
          "3/5":
            "3/5 means 3 pieces shaded out of 5. Count the shaded pieces again — only 2 are shaded!",
          "1/5":
            "1/5 means only 1 piece is shaded. But there are 2 shaded pieces, so the answer is 2/5!",
          "4/5":
            "4/5 means almost the whole cake is shaded! Count more carefully — only 2 of the 5 pieces are shaded.",
        },
      },
      {
        id: 103,
        level: 1,
        text: "Look at the circle below. What fraction of the circle is shaded blue?",
        svgType: "circle",
        svgProps: { numerator: 1, denominator: 4 },
        options: ["1/4", "3/4", "2/4", "1/2"],
        correct: "1/4",
        explanation:
          "The circle is divided into 4 equal parts and only 1 part is shaded. So the shaded fraction is 1/4 — one quarter!",
        wrongExplanations: {
          "3/4":
            "3/4 would mean 3 out of 4 parts are shaded. But only 1 part is shaded!",
          "2/4":
            "2/4 means half the circle is shaded. Count the shaded sections — only 1 out of 4 is shaded!",
          "1/2":
            "1/2 is the same as 2/4, which means half. But only 1 of the 4 equal parts is shaded, so it's 1/4!",
        },
      },
      {
        id: 104,
        level: 1,
        text: "The rectangle below shows equal sections. What fraction is shaded green?",
        svgType: "rectangle",
        svgProps: { numerator: 4, denominator: 6 },
        options: ["2/6", "4/6", "3/6", "5/6"],
        correct: "4/6",
        explanation:
          "The rectangle has 6 equal sections and 4 of them are shaded green. So the fraction is 4/6 — four sixths!",
        wrongExplanations: {
          "2/6":
            "2/6 means only 2 sections are shaded. Count carefully — 4 sections are shaded out of 6 total!",
          "3/6":
            "3/6 means exactly half is shaded. But 4 sections (more than half) are shaded here!",
          "5/6":
            "5/6 means 5 out of 6 sections. Count again — only 4 sections are shaded!",
        },
      },
      {
        id: 105,
        level: 1,
        text: "Look at this pizza! Exactly half is covered with cheese. What fraction is that?",
        svgType: "pizza",
        svgProps: { numerator: 2, denominator: 4 },
        options: ["1/4", "3/4", "1/2", "2/3"],
        correct: "1/2",
        explanation:
          "The pizza has 4 slices and 2 are shaded. 2/4 = 1/2 because dividing both by 2 gives us one half. Half the pizza is shaded!",
        wrongExplanations: {
          "1/4":
            "1/4 means only one quarter (1 slice of 4) is shaded. But 2 out of 4 slices are shaded, which equals 1/2!",
          "3/4":
            "3/4 means three quarters are shaded. Count the shaded slices — only 2 out of 4 are shaded, that's 1/2!",
          "2/3":
            "2/3 means 2 out of 3 equal parts. This pizza has 4 slices, not 3. With 2 shaded out of 4, it's 2/4 = 1/2!",
        },
      },
      {
        id: 106,
        level: 1,
        text: "This cake is divided into 4 equal pieces. How many pieces are shaded?",
        svgType: "cake",
        svgProps: { numerator: 3, denominator: 4 },
        options: ["1/4", "2/4", "3/4", "4/4"],
        correct: "3/4",
        explanation:
          "The cake has 4 pieces total and 3 pieces are shaded. So the fraction shaded is 3/4 — three quarters of the whole cake!",
        wrongExplanations: {
          "1/4":
            "1/4 means only 1 piece out of 4 is shaded. But 3 pieces are shaded — that's 3/4!",
          "2/4":
            "2/4 means half the cake is shaded. But more than half is shaded here — count again and you'll get 3/4!",
          "4/4":
            "4/4 means the WHOLE cake is shaded (all 4 pieces). But 1 piece is unshaded, so only 3/4 is shaded!",
        },
      },
    ],
  },
  {
    id: 2,
    name: "Medium",
    theme: "Cake Challenge",
    color: "#FF9A2F",
    headerColor: "#E8890A",
    questions: [
      {
        id: 201,
        level: 2,
        text: "Compare these two fractions: 1/2 ☐ 2/4",
        options: [">", "<", "=", "Cannot compare"],
        correct: "=",
        explanation:
          "1/2 = 2/4 because if you multiply both the numerator and denominator of 1/2 by 2, you get 2/4. They are equivalent fractions — exactly the same size!",
        wrongExplanations: {
          ">": "1/2 is NOT greater than 2/4. They are actually equal! 1/2 × 2/2 = 2/4. Both fractions represent exactly half.",
          "<": "1/2 is NOT less than 2/4. They are actually equal! Both fractions represent the same amount — one half.",
          "Cannot compare":
            "We can always compare fractions! Convert to the same denominator: 1/2 = 2/4, so they are equal (=).",
        },
      },
      {
        id: 202,
        level: 2,
        text: "Compare these two fractions: 3/4 ☐ 2/3",
        options: [">", "<", "=", "Cannot compare"],
        correct: ">",
        explanation:
          "Convert to common denominator 12: 3/4 = 9/12 and 2/3 = 8/12. Since 9/12 > 8/12, we know 3/4 > 2/3!",
        wrongExplanations: {
          "<": "3/4 is actually GREATER than 2/3! Convert: 3/4 = 9/12 and 2/3 = 8/12. Since 9 > 8, so 3/4 > 2/3.",
          "=": "3/4 and 2/3 are NOT equal. 3/4 = 9/12 and 2/3 = 8/12. They differ by 1/12!",
          "Cannot compare":
            "We can compare by finding a common denominator! LCM of 4 and 3 is 12. Then 9/12 > 8/12, so 3/4 > 2/3.",
        },
      },
      {
        id: 203,
        level: 2,
        text: "Simplify this fraction to its lowest terms: 6/8 = ?",
        options: ["3/4", "2/3", "1/2", "6/8"],
        correct: "3/4",
        explanation:
          "The GCF (Greatest Common Factor) of 6 and 8 is 2. Divide both by 2: 6÷2 = 3 and 8÷2 = 4. So 6/8 = 3/4!",
        wrongExplanations: {
          "2/3":
            "To simplify 6/8, divide BOTH numerator and denominator by their GCF (which is 2). 6÷2=3 and 8÷2=4, giving 3/4, not 2/3.",
          "1/2":
            "1/2 would require dividing by 4, but GCF of 6 and 8 is only 2. 6÷2=3 and 8÷2=4, so the answer is 3/4.",
          "6/8":
            "6/8 can be simplified further! Divide both by 2 (the GCF): 6÷2=3, 8÷2=4. Simplified form is 3/4.",
        },
      },
      {
        id: 204,
        level: 2,
        text: "Simplify this fraction to its lowest terms: 4/6 = ?",
        options: ["2/3", "1/3", "3/4", "4/6"],
        correct: "2/3",
        explanation:
          "The GCF of 4 and 6 is 2. Divide both by 2: 4÷2 = 2 and 6÷2 = 3. So 4/6 = 2/3!",
        wrongExplanations: {
          "1/3":
            "To get 1/3 you'd need to divide by 4, but GCF of 4 and 6 is 2. The correct simplification is 4÷2=2 and 6÷2=3, giving 2/3.",
          "3/4":
            "3/4 comes from flipping the fraction. To simplify 4/6, divide both by GCF(2): 4÷2=2, 6÷2=3. Answer is 2/3.",
          "4/6":
            "4/6 can be simplified! The GCF of 4 and 6 is 2. Divide both numbers by 2 to get 2/3.",
        },
      },
      {
        id: 205,
        level: 2,
        text: "Compare these two fractions: 5/6 ☐ 7/8",
        options: [">", "<", "=", "Cannot compare"],
        correct: "<",
        explanation:
          "Find common denominator 24: 5/6 = 20/24 and 7/8 = 21/24. Since 20 < 21, we know 5/6 < 7/8!",
        wrongExplanations: {
          ">": "5/6 is actually LESS than 7/8! Convert: 5/6 = 20/24 and 7/8 = 21/24. Since 20 < 21, so 5/6 < 7/8.",
          "=": "5/6 and 7/8 are NOT equal. Common denominator 24: 5/6 = 20/24 and 7/8 = 21/24. They differ!",
          "Cannot compare":
            "Find LCM of 6 and 8, which is 24. Then 5/6 = 20/24 and 7/8 = 21/24. So 5/6 < 7/8!",
        },
      },
      {
        id: 206,
        level: 2,
        text: "Simplify this fraction to its lowest terms: 9/12 = ?",
        options: ["3/4", "2/3", "1/4", "9/12"],
        correct: "3/4",
        explanation:
          "The GCF of 9 and 12 is 3. Divide both by 3: 9÷3 = 3 and 12÷3 = 4. So 9/12 = 3/4!",
        wrongExplanations: {
          "2/3":
            "To get 2/3 you'd need different numbers. For 9/12, find GCF(9,12)=3. Then 9÷3=3, 12÷3=4, giving 3/4.",
          "1/4":
            "1/4 is much smaller. Find GCF of 9 and 12, which is 3. Then 9÷3=3, 12÷3=4. The simplified form is 3/4.",
          "9/12":
            "9/12 can be simplified! GCF of 9 and 12 is 3. Divide both by 3: 9÷3=3 and 12÷3=4. So 9/12 = 3/4.",
        },
      },
    ],
  },
  {
    id: 3,
    name: "Hard",
    theme: "Math Maze",
    color: "#7A4CFF",
    headerColor: "#6A3BE8",
    questions: [
      {
        id: 301,
        level: 3,
        text: "Calculate: 1/4 + 2/4 = ?",
        options: ["3/4", "3/8", "1/2", "4/8"],
        correct: "3/4",
        explanation:
          "Same denominators! Just add the numerators: 1 + 2 = 3, keep the denominator 4. So 1/4 + 2/4 = 3/4!",
        wrongExplanations: {
          "3/8":
            "Don't add the denominators! When denominators are the same, keep them and only add numerators. 1+2=3 and denominator stays 4. Answer: 3/4.",
          "1/2":
            "1/2 = 2/4, but 1/4 + 2/4 = 3/4 which is larger. Add numerators: 1+2=3, denominator stays 4!",
          "4/8":
            "Don't add both numerators and denominators! For same denominators, add numerators only: 1+2=3, keep denominator 4. Answer: 3/4.",
        },
      },
      {
        id: 302,
        level: 3,
        text: "Calculate: 3/5 - 1/5 = ?",
        options: ["2/5", "2/10", "4/5", "1/5"],
        correct: "2/5",
        explanation:
          "Same denominators! Subtract the numerators: 3 - 1 = 2, keep the denominator 5. So 3/5 - 1/5 = 2/5!",
        wrongExplanations: {
          "2/10":
            "Don't subtract the denominators! 5 - 5 = 0 (can't divide by 0). Keep denominator as 5 and subtract numerators: 3-1=2. Answer: 2/5.",
          "4/5":
            "For subtraction with same denominators, subtract numerators: 3-1=2, not 3+1=4. The answer is 2/5!",
          "1/5":
            "Check your subtraction! 3 - 1 = 2, not 1. So the answer is 2/5, not 1/5.",
        },
      },
      {
        id: 303,
        level: 3,
        text: "Calculate: 1/3 + 1/2 = ?",
        options: ["5/6", "2/5", "2/6", "1/6"],
        correct: "5/6",
        explanation:
          "Different denominators! LCD of 3 and 2 is 6. Convert: 1/3 = 2/6 and 1/2 = 3/6. Now add: 2/6 + 3/6 = 5/6!",
        wrongExplanations: {
          "2/5":
            "Don't add numerators and denominators separately (1+1=2, 3+2=5)! Find LCD first. LCD of 3 and 2 is 6. Then 2/6 + 3/6 = 5/6.",
          "2/6":
            "2/6 would only be correct if you added just the numerators with the same denominator. Convert to LCD=6 first: 2/6 + 3/6 = 5/6!",
          "1/6":
            "1/6 is too small. Convert both fractions to sixths: 1/3 = 2/6 and 1/2 = 3/6. Then 2+3=5, so the answer is 5/6!",
        },
      },
      {
        id: 304,
        level: 3,
        text: "Calculate: 3/4 - 1/3 = ?",
        options: ["5/12", "2/7", "1/4", "7/12"],
        correct: "5/12",
        explanation:
          "Different denominators! LCD of 4 and 3 is 12. Convert: 3/4 = 9/12 and 1/3 = 4/12. Now subtract: 9/12 - 4/12 = 5/12!",
        wrongExplanations: {
          "2/7":
            "Don't subtract numerators and denominators separately (3-1=2, 4-3=7)! Find LCD=12: 3/4=9/12, 1/3=4/12. Then 9-4=5, answer is 5/12.",
          "1/4":
            "1/4 = 3/12, but the correct answer is bigger. 3/4=9/12 and 1/3=4/12. Subtract: 9-4=5. Answer is 5/12.",
          "7/12":
            "7/12 would be 3/12 + 4/12 (addition). But this is subtraction: 9/12 - 4/12 = 5/12. Don't add when you should subtract!",
        },
      },
      {
        id: 305,
        level: 3,
        text: "Calculate: 2/3 + 1/6 = ?",
        options: ["5/6", "3/9", "1/2", "3/6"],
        correct: "5/6",
        explanation:
          "LCD of 3 and 6 is 6. Convert: 2/3 = 4/6 and 1/6 stays 1/6. Now add: 4/6 + 1/6 = 5/6!",
        wrongExplanations: {
          "3/9":
            "Don't add numerators AND denominators (2+1=3, 3+6=9)! Find LCD=6: 2/3=4/6, then 4/6+1/6=5/6.",
          "1/2":
            "1/2 = 3/6, but the correct answer is bigger. Convert 2/3 to sixths: 2/3=4/6. Then 4/6 + 1/6 = 5/6!",
          "3/6":
            "3/6 = 1/2, which is less than 2/3 alone! Convert properly: 2/3=4/6, then 4/6 + 1/6 = 5/6.",
        },
      },
      {
        id: 306,
        level: 3,
        text: "Calculate: 5/6 - 1/4 = ?",
        options: ["7/12", "4/2", "1/3", "5/12"],
        correct: "7/12",
        explanation:
          "LCD of 6 and 4 is 12. Convert: 5/6 = 10/12 and 1/4 = 3/12. Now subtract: 10/12 - 3/12 = 7/12!",
        wrongExplanations: {
          "4/2":
            "4/2 = 2, which is bigger than 1! Fractions can't become that large with subtraction. Find LCD=12: 10/12 - 3/12 = 7/12.",
          "1/3":
            "1/3 = 4/12, which is too small. Convert to LCD=12: 5/6=10/12 and 1/4=3/12. Subtract: 10-3=7, answer is 7/12.",
          "5/12":
            "5/12 is wrong. Don't just subtract numerators without converting! 5/6=10/12 and 1/4=3/12. Then 10-3=7, answer is 7/12.",
        },
      },
    ],
  },
];

export const TOTAL_QUESTIONS = LEVELS.reduce(
  (acc, l) => acc + l.questions.length,
  0,
);
export const POINTS_PER_QUESTION = 10;
