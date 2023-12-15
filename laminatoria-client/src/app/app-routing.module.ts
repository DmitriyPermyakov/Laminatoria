import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainPageComponent } from './main-page/main-page.component'
import { ProductsPageComponent } from './products-page/products-page.component'
import { ProductCardComponent } from './product-card/product-card.component'

const routes: Routes = [
	{ path: '', component: MainPageComponent },
	{ path: 'products/:category', component: ProductsPageComponent },
	{ path: 'products/product/:id', component: ProductCardComponent },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
