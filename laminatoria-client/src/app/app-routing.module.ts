import { NgModule, inject } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainPageComponent } from './main-page/main-page.component'
import { ProductsPageComponent } from './products-page/products-page.component'
import { ProductCardComponent } from './product-card/product-card.component'
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'
import { AcceptOrderComponent } from './accept-order/accept-order.component'
import { EditProductComponent } from './edit-product/edit-product.component'
import { OrdersComponent } from './orders/orders.component'
import { OrderPositionComponent } from './order-position/order-position.component'
import { OrderPositionEditComponent } from './order-position-edit/order-position-edit.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { CreateProductComponent } from './create-product/create-product.component'
import { CreateOrderComponent } from './create-order/create-order.component'
import { authGuard } from './services/auth-guard.service'
import { ChangeEmailComponent } from './change-email/change-email.component'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { AskContactsComponent } from './ask-contacts/ask-contacts.component'

const routes: Routes = [
	{ path: '', component: MainPageComponent },
	{ path: 'product-cart', component: ShoppingCartComponent },
	{ path: 'products', component: ProductsPageComponent },
	{ path: 'products/create', component: CreateProductComponent, canActivate: [authGuard] },
	{ path: 'products/:id/edit', component: EditProductComponent, canActivate: [authGuard] },
	{ path: 'products/:id', component: ProductCardComponent },
	{ path: 'accept-order', component: AcceptOrderComponent },
	{ path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
	{ path: 'orders/create', component: CreateOrderComponent, canActivate: [authGuard] },
	{ path: 'orders/:id', component: OrderPositionComponent, canActivate: [authGuard] },
	{ path: 'orders/:id/edit', component: OrderPositionEditComponent, canActivate: [authGuard] },
	{ path: 'login', component: LoginPageComponent },
	{ path: 'change-email', component: ChangeEmailComponent, canActivate: [authGuard] },
	{ path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard] },
	{ path: 'contacts', component: AskContactsComponent },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
