import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

import { MockFactory } from './mockfactory';

/**
 * Creates Configurationobjects for the TestingModule in Unit Tests
 */
export class MockProvider {
  /**
   * Creates a Configurationobject for the TestingModule for the Router
   */
  static forRouter(routerPath?: string): any {
    const mockForRouter = MockFactory.routerMock();
    mockForRouter.setUrl(routerPath);
    return createProviderConfiguration(Router, mockForRouter);
  }

  static forActivatedRoute(initialParamsValue?: any) {
    const paramsForActivatedRoute: any = {
      params: of(initialParamsValue),
      valueSender: new BehaviorSubject(initialParamsValue),
    };
    paramsForActivatedRoute.params =
      paramsForActivatedRoute.valueSender.asObservable();
    return createProviderConfiguration(ActivatedRoute, paramsForActivatedRoute);
  }
}

/**
 * Creates the Configurationobject for the providers-Part in Unit tests
 *
 * @param providedClass The mocked Class
 * @param mock an Instance of the mocked Class
 */
const createProviderConfiguration = (providedClass: any, mock: any) => ({
  provide: providedClass,
  useValue: mock,
});
