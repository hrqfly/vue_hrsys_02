import {createRouter,createWebHistory} from 'vue-router';
import axios from "axios";
const router = createRouter({
    history:createWebHistory(),
    routes:[
        // {
        //     name:"home",
        //     path:"/home",
        //     component:()=>import("../views/HomePage.vue")
        // },
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
        {
            name:"adduser",
            path:"/admin/adduser",
            component:()=>import("../views/AddUserPage.vue")
        },
        {
            name:"addplan",
            path:"/addplan",
            component:()=>import("../views/AddPlanPage.vue")
        },
        {
            name:"addtrain",
            path:"/addtrain",
            component:()=>import("../views/AddTrainPage.vue")
        },
        {
            name:"querytrain",
            path:"/querytrain",
            component:()=>import("../views/QueryTrainPage.vue")
        },
        {
            name:"querysalary",
            path:"/querysalary",
            component:()=>import("../views/QuerySalaryPage.vue")
        },
        {
            name:"querytrainusers",
            path:"/querytrainusers",
            component:()=>import("../views/QueryTrainUsersPage.vue")
        },
        {
            name:"querycontract",
            path:"/querycontract",
            component:()=>import("../views/QueryContractPage.vue")
        },
        {
            name:"userinf",
            path:"/userinf",
            component:()=>import("../views/UserInfPage.vue")
        },
        {
            name:"queryUserSignTrains",
            path:"/queryUserSignTrains",
            component:()=>import("../views/QueryUserSignTrainsPage.vue")
        },
        {
            name:"approvalPlan",
            path:"/approvalPlan",
            component:()=>import("../views/ApprovalPlanPage.vue")
        },
        {
            name:"attendance",
            path:"/attendance",
            component:()=>import("../views/AttendancePage.vue")
        },
        {
            name:"addContract",
            path:"/addContract",
            component:()=>import("../views/AddContractPage.vue")
        },
        {
            name:"welcome",
            path:"/welcome",
            component:()=>import("../views/WelcomePage.vue")
        }
    ]
})

//路由卫士
router.beforeEach((to,from,next)=> {
    let checkToken = window.localStorage.getItem("token")
    let checkSuperToken = window.localStorage.getItem("superToken")
    //if (to.path.startsWith('admin')&& !checkToken) {
    if (to.path !== '/login' && !checkToken) {
        // 没有token
        if (to.path === '/welcome'){
            next()
        }else {
            alert("请先登录")
            next({path:"/login"})
        }
    }
    else {
        // 有token
        if (to.path === '/login'){
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("superToken")
            next()
        }
        
        if (to.path.startsWith('/admin')) {
            if (checkSuperToken){
                // 检测管理员token合法性
                let superToken = JSON.parse(window.localStorage.getItem('superToken'))
                axios({
                    url:'http://localhost:8010/checksupertoken',
                    method:'get',
                    headers:{
                        superToken:superToken
                    }
                }).then((response) =>{
                    if (!response.data){
                        alert("权限等级不够！")
                        next({path:"/welcome"})
                    }else {
                        next()
                    }
                })
            }else {
                alert("权限等级不够！")
                next({path:"/welcome"})
            }
        }
        // 检验token的合法性
        let token = JSON.parse(window.localStorage.getItem('token'))
        if(!token){
            next({path:'/login'})
        }else {
            //校验token的合法性
            axios({
                url:'http://localhost:8010/checktoken',
                method:'get',
                headers:{
                    token:token
                }
            }).then((response) =>{
                if (!response.data){
                    alert("令牌校验失败,请重新登录")
                    next({path:"/login"})
                }else {
                    next()
                }
            })
            
        }
    }
})
//     if(to.path.startsWith('/login')){
//         window.localStorage.removeItem('access-admin')
//         next()
//     }else {
//         //取token校验
//         let admin = JSON.parse(window.localStorage.getItem('access-admin'))
//         if(!admin){
//             next({path:'/login'})
//         }else {
//             //校验token的合法性
//             axios({
//                 url:'http://localhost:8080/checkToken',
//                 method:'get',
//                 headers:{
//                     token:admin.token
//                 }
//             }).then((response) =>{
//                 if (response.data == "fail"){
//                     console.log("校验失败")
//                     next({path:'/error'})
//                 }
//             })
//             next()
//         }
//     }
// })

export default router