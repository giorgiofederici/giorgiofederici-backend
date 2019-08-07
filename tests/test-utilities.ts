import express from 'express';
import chai from 'chai';

export class TestConstants {
  static readonly SKILLS_REGEXP = /^\/api\/v1\/skills\/?(?=\/|$)/i;
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete'
}

// TODO: Refactor all these middleware functions
export const checkAppRouter = (app: any, regexp: RegExp): boolean => {
  let result = false;
  app._router.stack.forEach((middleware: any) => {
    // console.log(middleware.regexp);
    if (
      middleware.name === 'router' &&
      middleware.regexp.toString() === regexp.toString()
    ) {
      result = true;
    }
  });
  return result;
};

export const checkMethodRoute = (
  app: any,
  regexp: RegExp,
  method: HttpMethod,
  path: string
): boolean => {
  let result = false;
  app._router.stack.forEach((middleware: any) => {
    if (
      middleware.name !== 'router' ||
      middleware.regexp.toString() !== regexp.toString()
    ) {
      return;
    }
    middleware.handle.stack.forEach((layer: any) => {
      if (layer.route.path === path && layer.route.methods[method]) {
        result = true;
        return;
      }
    });
  });
  return result;
};

export const checkMethodRouteHandlerName = (
  app: any,
  regexp: RegExp,
  method: HttpMethod,
  path: string,
  handlerName: string
): boolean => {
  let result = false;
  app._router.stack.forEach((middleware: any) => {
    if (
      middleware.name !== 'router' ||
      middleware.regexp.toString() !== regexp.toString()
    ) {
      return;
    }
    middleware.handle.stack.forEach((layer: any) => {
      if (layer.route.path !== path || !layer.route.methods[method]) {
        return;
      }
      layer.route.stack.forEach((subLayer: any) => {
        if (subLayer.method === method && subLayer.name === handlerName) {
          result = true;
          return;
        }
      });
    });
  });
  return result;
};

export const checkAppMiddleware = (
  app: any,
  middlewareName: string
): boolean => {
  let result = false;
  app._router.stack.forEach((middleware: any) => {
    if (middleware.name === middlewareName) {
      result = true;
      return;
    }
  });
  return result;
};

export const fakeRequestHandler: any = (
  req: any,
  res: any,
  next: any,
  stub: sinon.SinonStub<any[], any>
) => {
  chai.expect(stub.calledOnce).true;
  next();
};
