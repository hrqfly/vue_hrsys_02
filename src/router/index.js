import {createRouter,createWebHistory} from 'vue-router';
import axios from "axios";
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
        {
            name:"adduser",
            path:"/adduser",
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
        }
    ]
})

//路由卫士
router.beforeEach((to,from,next)=> {
    let checkToken = window.localStorage.getItem("token")
    if (to.path !== '/login' && !checkToken) {
        if (to.path === '/home'){
            next()
        }else {
            alert("请先登录")
            next({path:"/login"})
        }
    }
    else {
        if (to.path === '/login'){
            window.localStorage.removeItem("token")
            next()
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