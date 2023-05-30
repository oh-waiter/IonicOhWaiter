import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutoParaHoras'
})
export class MinutoParaHorasPipe implements PipeTransform {
  transform(value: number): string {
    const horas = Math.floor(value / 60);
    const minutos = value % 60;
    return `${horas} horas ${minutos} minutos`;
  } 
}

@NgModule({
  declarations: [MinutoParaHorasPipe],
  exports: [MinutoParaHorasPipe] // Adicione esta linha para exportar o pipe
})
export class MinutoParaHorasPipeModule { }