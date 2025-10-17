export const archetypeDescriptions = {
  "Architect": {
    title: "Architect",
    subtitle: "Systems × Visionary",
    description: "You're a vision-driven builder who designs scalable frameworks and loves optimizing for efficiency and elegance. You see the big picture while understanding the intricate details needed to bring it to life. Your strength lies in creating systematic solutions that transform bold ideas into sustainable realities."
  },
  "Connector": {
    title: "Connector",
    subtitle: "People × Visionary",
    description: "You're a natural networker who thrives on collaboration, partnerships, and shared creative momentum. You excel at bringing people together around innovative ideas and building relationships that fuel growth. Your strength is in seeing possibilities through the lens of human connection and shared vision."
  },
  "Operator": {
    title: "Operator",
    subtitle: "Grounded × Systems",
    description: "You're a reliable executor who builds solid processes, manages risk, and ensures consistent results. You excel at creating stability through well-designed systems and methodical execution. Your strength lies in turning complex operations into smooth, predictable outcomes that others can depend on."
  },
  "Innovator": {
    title: "Innovator",
    subtitle: "Visionary × Systems",
    description: "You're an experimental thinker who constantly tests, iterates, and redefines what's possible through structured innovation. You combine bold imagination with systematic problem-solving to push boundaries. Your strength is in creating breakthrough solutions through disciplined creativity and technical excellence."
  },
  "Guardian": {
    title: "Guardian",
    subtitle: "Grounded × People",
    description: "You're a stable and supportive team builder who values trust, empathy, and long-term cohesion. You create environments where people feel secure and valued, enabling them to do their best work. Your strength lies in nurturing relationships and building foundations of reliability that teams can thrive on."
  },
  "Strategist": {
    title: "Strategist",
    subtitle: "Systems × Grounded",
    description: "You're an analytical planner who creates sustainable growth through data-driven insight and structure. You excel at identifying patterns, mitigating risks, and building frameworks for long-term success. Your strength is in combining systematic thinking with practical wisdom to chart winning paths forward."
  },
  "Catalyst": {
    title: "Catalyst",
    subtitle: "Visionary × People",
    description: "You're a charismatic motivator who inspires others into action and brings bold ideas to life. You energize teams with your enthusiasm and vision, turning possibilities into momentum. Your strength lies in rallying people around ambitious goals and creating the spark that ignites transformative change."
  },
  "Maker": {
    title: "Maker",
    subtitle: "Grounded × Visionary",
    description: "You're an independent doer who turns abstract ideas into tangible results with craft and consistency. You balance creative vision with practical execution, bringing concepts to life through hands-on work. Your strength is in transforming imagination into reality through steady, skillful action."
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
    "Systems,Visionary": "Architect",
    "Visionary,Systems": "Architect",
    "People,Visionary": "Connector",
    "Visionary,People": "Catalyst",
    "Grounded,Systems": "Operator",
    "Systems,Grounded": "Strategist",
    "Visionary,Grounded": "Maker",
    "Grounded,Visionary": "Maker",
    "Grounded,People": "Guardian",
    "People,Grounded": "Guardian",
    "Systems,People": "Architect",
    "People,Systems": "Connector"
  };

  const key = `${top1},${top2}`;
  const archetype = archetypeMap[key] || "Architect";

  return {
    scores,
    archetype,
    archetypeInfo: archetypeDescriptions[archetype]
  };
};
