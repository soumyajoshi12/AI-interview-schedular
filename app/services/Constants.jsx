import { Briefcase, Calendar, Code, Crown, LayoutDashboard, List, Puzzle, Settings, Users, WalletCards } from "lucide-react";

export const DashboardOptions = [
    {
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
     {
        name:'Schedule Interview',
        icon:Calendar,
        path:'/schedule-interview'
    },
     {
        name:'All Interviews',
        icon:List,
        path:'/all-interview'
    },
     {
        name:'Billing',
        icon:WalletCards,
        path:'/billing'
    },
     {
        name:'Setting',
        icon:Settings,
        path:'/setting'
    },
]

export const JOB_TYPES = [
  { type: 'Technical', icon: Code },
  { type: 'Behaviour', icon: Users },
  { type: 'Experience', icon: Briefcase },
  { type: 'Problem Solving', icon: Puzzle },
  { type: 'Leadership', icon: Crown },
]

export const PROMPT = `You are an expert technical interviewer.

Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}

Job Description:{{jobDescription}}

Interview Duration: {{duration}}

Interview Type: {{type}}

Your task:

Analyze the job description to identify key responsibilities, required skills, and expected experience.

Generate a list of interview questions depends on interview duration

Adjust the number and depth of questions to match the interview duration.

Ensure the questions match the tone and structure of a real-life {{type}} interview. Format your response in JSON format with array list of questions.

format: interviewQuestions=[

question:",

type:'Technical/Behavioral/Experince/Problem Solving/Leaseship'

{

},{

}]

The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`

export const FEEDBACK_PROMT = `{{conversation}}

Depends on this Interview Conversation between assitant and user,

Give me feedback for user interview. Give me rating out of 10 for technical Skills, Communication, Problem Solving, Experince. Also give me summery in 3 lines about the interview and one line to let me know whether is recommanded for hire or not with msg. Give me response in JSON format {

feedback:{

rating:{

},

techical Skills:5,

communication:6,

problem Solving:4,

experince:7

summery:<in 3 Line>, Recommendation:",

RecommendationMsg:"

}

}`