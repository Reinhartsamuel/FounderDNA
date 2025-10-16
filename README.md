# 🔮 Team Dynamics Test (Custom Wealth Dynamics Inspired)

A self-assessment web app that helps identify personal work style archetypes (inspired by Wealth Dynamics, but redesigned with unique metrics and scoring).  
Built with **React + Tailwind** on **Bolt.new**.

---

## 🚀 Features

- 25 multiple-choice questions  
- Randomized answer order (no visible bias)  
- Real-time scoring algorithm  
- Final archetype with explanation  
- Downloadable result summary (as `.txt` file or `.pdf` if you add jsPDF)

---

## 🧠 Archetype Overview

Each user’s personality profile is a blend of two key energies:

| Axis | Description |
|------|--------------|
| **Visionary** | Creative, future-focused, experimental |
| **People** | Relational, persuasive, emotionally intelligent |
| **Grounded** | Practical, consistent, risk-aware |
| **Systems** | Analytical, structural, data-oriented |

These combine into **8 archetypes**:

- **Creator** (Visionary–Dynamic)
- **Star** (Visionary–People)
- **Supporter** (People–Dynamic)
- **Deal Maker** (People–Grounded)
- **Trader** (Grounded–Practical)
- **Accumulator** (Grounded–Systems)
- **Lord** (Systems–Analytical)
- **Mechanic** (Systems–Visionary)

---

## 🧩 File Structure

```
src/
  ├── data/questions.json        # 25 questions (your JSON)
  ├── components/
  │     ├── QuestionCard.jsx     # renders one question + options
  │     ├── ResultCard.jsx       # final result summary + download button
  ├── utils/
  │     ├── scoring.js           # scoring + archetype mapping
  ├── App.jsx                    # main quiz logic
  └── index.css / tailwind.css
```

---

## ⚙️ Logic Overview

### `scoring.js`
```js
export const calculateResult = (answers) => {
  const scores = { Visionary: 0, People: 0, Grounded: 0, Systems: 0 };

  // Count tags
  answers.forEach(tags => {
    tags.forEach(tag => {
      if (scores[tag] !== undefined) scores[tag]++;
    });
  });

  // Sort tags by score
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [top1, top2] = sorted.map(s => s[0]);

  // Map top tag pairs to archetypes
  const archetypeMap = {
    "Visionary,People": "Star",
    "People,Visionary": "Star",
    "People,Grounded": "Deal Maker",
    "Grounded,People": "Deal Maker",
    "Grounded,Systems": "Accumulator",
    "Systems,Grounded": "Lord",
    "Systems,Visionary": "Mechanic",
    "Visionary,Systems": "Creator",
    "People,Dynamic": "Supporter",
    "Visionary,Dynamic": "Creator"
  };

  const key = `${top1},${top2}`;
  const result = archetypeMap[key] || top1;

  return { scores, result };
};
```

---

### `ResultCard.jsx` (download button)
```jsx
export default function ResultCard({ result, scores }) {
  const handleDownload = () => {
    const content = \`Your Archetype: \${result}\n\nScores:\n\${Object.entries(scores)
      .map(([k, v]) => \`\${k}: \${v}\`)
      .join("\n")}\`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "team-dynamics-result.txt";
    link.click();
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-2">Your Archetype: {result}</h2>
      <ul className="mb-4">
        {Object.entries(scores).map(([k, v]) => (
          <li key={k}>{k}: {v}</li>
        ))}
      </ul>
      <button
        onClick={handleDownload}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
      >
        Download Results
      </button>
    </div>
  );
}
```

---

### `QuestionCard.jsx`
```jsx
import { useState, useEffect } from "react";

export default function QuestionCard({ question, onSelect }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions([...question.options].sort(() => Math.random() - 0.5));
  }, [question]);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-3">{question.text}</h3>
      <div className="space-y-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(opt.tags)}
            className="block w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
```
