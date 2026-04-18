import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Farmer } from './farmer/farmer';
import { Product } from './product/product';
import { Vegitables } from './vegitables/vegitables';
import { Fruits } from './fruits/fruits';
import { GreenVegitables } from './green-vegitables/green-vegitables';
import { RootVegetables } from './root-vegetables/root-vegetables';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Regis } from './regis/regis';
import { Footer } from './footer/footer';
import { AuthGuard } from './auth-guard';

import { ProductDetail } from './product-detail/product-detail';

import { AdminLayout } from './admin-layout/admin-layout';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminManageCategory } from './admin-manage-category/admin-manage-category';
import { FarmerApproval } from './farmer-approval/farmer-approval';
import { AdminProduct } from './admin-product/admin-product';
import { AdminOrder } from './admin-order/admin-order';
import { AdminUser } from './admin-user/admin-user';
import { AdminReport } from './admin-report/admin-report';

import { FarmerLayout } from './farmer-layout/farmer-layout';
import { FarmerDashboard } from './farmer-dashboard/farmer-dashboard';
import { AddProduct } from './add-product/add-product';
import { MyProduct } from './my-product/my-product';
import { FarmerOrderTrack } from './farmer-order-track/farmer-order-track';
import { FarmerEarning } from './farmer-earning/farmer-earning';

import { ConsumerLayout } from './consumer-layout/consumer-layout';
import { ConsumerDashboard } from './consumer-dashboard/consumer-dashboard';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { ConsumerOrder } from './consumer-order/consumer-order';
import { ConsumerOffers } from './consumer-offers/consumer-offers';
import { ConsumerProfile } from './consumer-profile/consumer-profile';










export const routes: Routes = [
    {path: '', component: Home},
    {path: 'about', component: About},
    {path: 'login', component: Login},
    {path: 'regis', component: Regis},
    {path: 'farmer', component: Farmer},
    {path: 'product', component:Product},
    {path:'vegitables', component:Vegitables},
    {path: 'fruits', component:Fruits},
    {path: 'green-vegitables', component:GreenVegitables},
    {path: 'root-vegetables', component: RootVegetables},
    {path: 'contact', component: Contact},
    {path: 'footer', component: Footer},

    {path:'admin',component: AdminLayout,
        children: [
                { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
                {path: 'admin-dashboard', component: AdminDashboard},
                {path: 'farmer-approval', component: FarmerApproval},
                {path: 'admin-manage-category',component: AdminManageCategory},
                {path: 'admin-product', component:AdminProduct},
                {path: 'admin-order', component: AdminOrder},
                {path: 'admin-user', component: AdminUser},
                {path : 'admin-report', component: AdminReport}
        ]
    },
    {path: 'farmers', component: FarmerLayout,
        children: [
            { path: '', redirectTo: 'farmer-dashboard', pathMatch: 'full' },
            {path: 'farmer-dashboard', component: FarmerDashboard},
            {path: 'add-product', component: AddProduct},
            {path: 'my-product', component: MyProduct},
            {path: 'farmer-order-track', component: FarmerOrderTrack},
            {path: 'farmer-earning', component: FarmerEarning}, 
        ]
    },

    {path: 'consumer', component: ConsumerLayout,
        children: [
            { path: '', redirectTo: 'consumer-dashboard', pathMatch: 'full' },
            {path: 'consumer-dashboard', component: ConsumerDashboard},
            {path: 'cart', component: Cart},
            {path: 'checkout', component: Checkout},
            {path: 'consumer-order', component: ConsumerOrder},
            {path: 'consumer-offers', component: ConsumerOffers},
            {path: 'consumer-profile', component: ConsumerProfile},
            {path: 'product-detail', component: ProductDetail},
        ]
    }
    
];
