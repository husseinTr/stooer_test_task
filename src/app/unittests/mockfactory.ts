import { Subject } from "rxjs";

/**
 * Creates Mock-Objects for the Tests
 */
 export class MockFactory {
  static routerMock(): any {
    const result: any = {
      eventSender: new Subject(),
      navigate: jasmine.createSpy('navigate'),
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
      onSameUrlNavigation: 'ignore',
      routeReuseStrategy: {
        shouldReuseRoute: () => true,
      },
      /**
       * (Helpfunction) sends an Event
       * @param evt Event-Data
       */
      sendRouteEvent(evt: any): void {
        return this.eventSender.next(evt);
      },
      setUrl(url: string): void {
        if (url) {
          this.routerState = {
            snapshot: { url },
          };
        }
      },
    };
    result.events = result.eventSender.asObservable();

    return result;
  }
}
