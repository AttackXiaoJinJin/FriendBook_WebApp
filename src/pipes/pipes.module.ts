import { NgModule } from '@angular/core';
import { StringSlicePipe } from './string-slice/string-slice';
@NgModule({
	declarations: [StringSlicePipe],
	imports: [],
	exports: [StringSlicePipe]
})
export class PipesModule {}
