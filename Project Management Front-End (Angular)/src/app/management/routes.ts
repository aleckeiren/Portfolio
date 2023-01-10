import { Route } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EventsComponent } from "./events/events.component";
import { HistoryComponent } from "./history/history.component";
import { ManagementComponent } from "./management.component";
import { ProjectsComponent } from "./projects/projects.component";

export const MANAGE_ROUTES: Route[] = [
    {
        path: '', 
        component: ManagementComponent,
        children:[
            {
                path: 'dashboard', 
                component: DashboardComponent
            },
            {
                path: 'history', 
                component: HistoryComponent
            },
            {
                path: 'events', 
                component: EventsComponent
            },
            {
                path: 'projects', 
                component: ProjectsComponent
            },
        ],
        runGuardsAndResolvers: 'always',
    },
];