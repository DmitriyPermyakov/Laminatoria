import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainPageComponent } from './main-page/main-page.component'
import { ProductsPageComponent } from './products-page/products-page.component'
import { ProductCardComponent } from './product-card/product-card.component'
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'
import { AcceptOrderComponent } from './accept-order/accept-order.component'
import { EditProductComponent } from './edit-product/edit-product.component'

const routes: Routes = [
	{ path: '', component: MainPageComponent },
	{ path: 'product-cart', component: ShoppingCartComponent },
	{ path: 'products/:category', component: ProductsPageComponent },
	{ path: 'products/product/:id/edit', component: EditProductComponent },
	{ path: 'products/product/:id', component: ProductCardComponent },
	{ path: 'accept-order', component: AcceptOrderComponent },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
