import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(!value)return null;
    if(!args)return value;

    args = args.toLowerCase();

    return value.filter(function(item){
        return JSON.stringify(item).toLowerCase().includes(args)
        // return JSON.stringify(item.description).toLowerCase().includes(args);

        // item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1

    });
}
}
