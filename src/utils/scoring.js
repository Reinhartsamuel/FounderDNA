export const archetypeDescriptions = {
  "Creator": {
    title: "Creator",
    subtitle: "Visionary–Dynamic",
    description: "You thrive on bringing new ideas to life. Innovation, experimentation, and creative problem-solving energize you. You're comfortable with uncertainty and love building things from scratch. Your strength lies in seeing possibilities others miss and turning them into reality through bold action."
  },
  "Star": {
    title: "Star",
    subtitle: "Visionary–People",
    description: "You're a natural communicator who inspires and energizes others with your vision. You combine creativity with charisma, making you excellent at pitching ideas, building relationships, and leading through influence. You thrive in the spotlight and excel at bringing people together around a compelling future."
  },
  "Supporter": {
    title: "Supporter",
    subtitle: "People–Dynamic",
    description: "You excel at connecting people and creating collaborative environments. You're the glue that holds teams together, combining emotional intelligence with practical action. You thrive on helping others succeed and building strong, supportive relationships that enable great work."
  },
  "Deal Maker": {
    title: "Deal Maker",
    subtitle: "People–Grounded",
    description: "You're skilled at reading people and negotiating win-win outcomes. You combine interpersonal savvy with practical thinking, making you excellent at partnerships, sales, and relationship-based success. You understand what motivates people and how to create value through connections."
  },
  "Trader": {
    title: "Trader",
    subtitle: "Grounded–Practical",
    description: "You excel at timing and practical execution. You're adaptable, resourceful, and excellent at spotting opportunities in the moment. You thrive on taking calculated risks and making things happen efficiently. Your strength is in turning resources into results through smart, grounded action."
  },
  "Accumulator": {
    title: "Accumulator",
    subtitle: "Grounded–Systems",
    description: "You're exceptional at building and maintaining sustainable systems. You value consistency, reliability, and long-term thinking. You excel at risk management, careful planning, and steadily accumulating resources and knowledge. Your strength is creating stable foundations that stand the test of time."
  },
  "Lord": {
    title: "Lord",
    subtitle: "Systems–Analytical",
    description: "You're a master strategist who excels at understanding complex systems and making data-driven decisions. You thrive on analysis, optimization, and building efficient structures. You see patterns others miss and excel at creating frameworks that enable scalable success. Your strength is in systematic thinking and strategic control."
  },
  "Mechanic": {
    title: "Mechanic",
    subtitle: "Systems–Visionary",
    description: "You're exceptional at understanding how things work and improving them. You combine technical mastery with innovative thinking, making you excellent at engineering solutions and optimizing systems. You thrive on figuring out complex problems and building better processes that push boundaries."
  }
};

export const calculateResult = (answers) => {
  const scores = { Visionary: 0, People: 0, Grounded: 0, Systems: 0 };

  answers.forEach(tags => {
    tags.forEach(tag => {
      if (scores[tag] !== undefined) scores[tag]++;
    });
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [top1, top2] = sorted.map(s => s[0]);

  const archetypeMap = {
    "Visionary,People": "Star",
    "People,Visionary": "Star",
    "People,Grounded": "Deal Maker",
    "Grounded,People": "Deal Maker",
    "Grounded,Systems": "Accumulator",
    "Systems,Grounded": "Accumulator",
    "Systems,Visionary": "Mechanic",
    "Visionary,Systems": "Mechanic",
    "Visionary,Grounded": "Creator",
    "Grounded,Visionary": "Trader",
    "People,Systems": "Supporter",
    "Systems,People": "Lord"
  };

  const key = `${top1},${top2}`;
  const archetype = archetypeMap[key] || "Creator";

  return {
    scores,
    archetype,
    archetypeInfo: archetypeDescriptions[archetype]
  };
};
