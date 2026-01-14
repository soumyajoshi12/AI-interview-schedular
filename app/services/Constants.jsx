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