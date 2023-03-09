import {createRouter,createWebHistory} from 'vue-router';
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            name:"home",
            path:"/home",
            component:()=>import("../views/HomePage.vue")
        },
        {
            name:"test",
            path:"/test",
            component:()=>import("../views/TestPage.vue")
        },
        {
            name:"login",
            path:"/login",
            component:()=>import("../views/LoginPage.vue")
        },
        {
            name:"queryuser",
            path:"/queryuser",
            component:()=>import("../views/QueryUserPage.vue")
        },
        {
            name:"queryplan",
            path:"/queryplan",
            component:()=>import("../views/RecruitmentPlanPage.vue")
        },
    ]
})
export default router