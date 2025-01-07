interface Activity {
  id: string;
  title: string;
  type: 'content' | 'quiz' | 'assignment';
  slug: string;
  status?: 'completed' | 'in-progress' | 'not-started';
}

interface Module {
  id: string;
  title: string;
  activities: Activity[];
}

export const moduleStructure: Module = {
  id: "module-1",
  title: "Introduction to Number Systems",
  activities: [
    {
      id: "content-1",
      title: "Understanding Number Systems",
      type: "content",
      slug: "understanding-number-systems",
      status: "completed"
    },
    {
      id: "quiz-1",
      title: "Number Systems Quiz",
      type: "quiz",
      slug: "number-systems-quiz",
      status: "in-progress"
    },
    {
      id: "assignment-1",
      title: "Number Systems Practice",
      type: "assignment",
      slug: "number-systems-practice",
      status: "not-started"
    }
  ]
};
