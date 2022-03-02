import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Is partly used for the information on the template parameters
 */
export type TestComponentType<T> = new (...args: any[]) => T;

/**
 * Describes the result of the basic setup.
 */
interface BasicUnittestResult<T> {
  /**
   * Fixture for the Component
   */
  fixture: ComponentFixture<T>;
  /**
   * Instance of the tested component
   */
  component: T;
  /**
   * Debug-Element for the Component
   */
  debugElement: DebugElement;
  /**
   * Reference on the HTML-Structure
   */
  nativeElement: INativeElementForTest;
}

interface INativeElementForTest {
  querySelector(selector: string): any;
  querySelectorAll(selector: string): any[];
}

/**
 * Describes the extended structure for the unit tests
 */
 interface ExtendedUnittestResult<T> extends BasicUnittestResult<T> {
  router: Router;

  /**
   * Adds routers to the result
   */
  withRouter(): ExtendedUnittestResult<T>;
}

/**
 * Shows the error message for undefined class / function
 *
 * @param expectedClass expected class / function
 */
 const showWarningForUndefined = (expectedClass: string | Function): void => {
  const className = toTestMethodName(expectedClass);
  console.error(`Warning: ${className} ist not defined.`);
};

const toTestMethodName = (method: string | Function): string | null => {
  if (typeof method === 'string' && method.trim() !== '') {
    return method;
  }
  if (typeof method === 'function') {
    return method.name;
  }
  return null;
};

/**
 * Shows a warning for the (mocked) class or function
 *
 * @param expectedMockedClass  expected class / function
 */
 const showMockWarningFor = (expectedMockedClass: string | Function): void => {
  const className = toTestMethodName(expectedMockedClass);
  console.warn(`Warning: ${className} ist not mocked.`);
};

/**
 * This class provides assistance in implementing of unit-tests
 */
export class Unittest<D = any> {
  SUITE_INITIAL_TEXT = 'Initialization';
  templateInitialStatusText = 'The template has a valid initial state';
  suiteTemplateText = 'Template';
  COMPONENT_CREATED_TEXT = 'The component is created';
  SERVICE_CREATED_TEXT = 'The service is created';
  COMPONENT_INITIAL_STATUS_TEXT = 'The component has a valid initial state';
  SUITE_METHODS_TEXT = 'Method calls';
  private component: any;
  private errorComponentNotSet =
    'Component not set. ' +
    'Please call unittest.forComponent(<Component>).' +
    'Please check whether TestBed has been initialized';

  /**
   * Create a Helpclass for the Unittest
   *
   * @param componentClass
   */
  static forComponent<T>(componentClass: TestComponentType<T>): Unittest<T> {
    const test = new Unittest<T>();
    test.setComponent(componentClass);
    return test;
  }

  /**
   * Creates an object without a configured component
   * (Useful if you are not testing a component and only want to use helper methods of this class)
   */
  static create(): Unittest {
    return new Unittest();
  }

  /**
   * Sets the tested Component
   *
   * @param component tested Component
   */
  setComponent(component: any): void {
    if (!component || typeof component !== 'function') {
      const type = typeof component;
      const msg =
        'It is not possible to set the tested component. Type:' + type;
      throw new Error(msg);
    }
    this.component = component;
  }

  /**
   * Replaces TestBed.inject. Returns the corresponding object from the TestBed for the specified class
   *
   * @param someClass Class for which the object is to be searched for in TestBed
   */
  get<T>(someClass: TestComponentType<T>): T {
    return TestBed.inject<T>(someClass);
  }

  /**
   * Tests whether the Component can be created for the component
   *
   * @param customSetupFn (optional) user-defined setup function to be used
   *
   */
  testComponentCreation(customSetupFn?: Function): void {
    it(
      this.COMPONENT_CREATED_TEXT,
      waitForAsync(() => {
        const result: BasicUnittestResult<D> = customSetupFn
          ? customSetupFn()
          : this.setup();

        expect(result.component).toBeTruthy();
      })
    );
  }

  /**
   * Tests whether the NativeElement can be created for the component
   *
   * @param customSetupFn (optional) user-defined setup function to be used
   *
   */
  testTemplateCreation(customSetupFn?: Function): void {
    it(
      this.templateInitialStatusText,
      waitForAsync(() => {
        const result: BasicUnittestResult<D> = customSetupFn
          ? customSetupFn()
          : this.setup();

        expect(result.nativeElement).toBeTruthy();
      })
    );
  }

  /**
   * Basic setup to get the basic test object from the TestBed
   */
  setup(): ExtendedUnittestResult<D> {
    if (!this.component) {
      throw new Error(this.errorComponentNotSet);
    }

    const fixture = TestBed.createComponent<D>(this.component);
    const component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    const nativeElement = debugElement.nativeElement;

    const result = {
      component,
      debugElement,
      fixture,
      nativeElement,
    } as ExtendedUnittestResult<D>;

    this.extendWithFunctions(result);

    return result;
  }

  /**
   * Extends the object by common functions
   *
   * @param result Result object, which is extended by functions
   */
   private extendWithFunctions(result: ExtendedUnittestResult<D>): void {
    result.withRouter = () => {
      try {
        result.router = TestBed.inject<Router>(Router);

        if (result.router instanceof Router) {
          showMockWarningFor(Router);
        }
      } catch (e) {
        if (!result.router) {
          showWarningForUndefined(Router);
        }
        throw e;
      }

      return result;
    };
  }
}
