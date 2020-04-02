//#region Imports

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//#endregion

/**
 * O decorador que extrai as informações da propriedade da rota
 */
export const Property = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const http = context.switchToHttp();
  const request = http.getRequest();

  return request.property;
});
