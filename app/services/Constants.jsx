import { Calendar, LayoutDashboard, List, Settings, WalletCards } from "lucide-react";

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