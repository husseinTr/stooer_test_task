import { TestBed, waitForAsync } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Unittest } from '../unittests/unittests';

describe(DataService.name, () => {
  const unittest = Unittest.forComponent(DataService);
  function setup() {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    return {
      httpClient: TestBed.inject<HttpClient>(HttpClient),
      service: TestBed.inject<DataService>(DataService),
    };
  }

  describe(unittest.SUITE_INITIAL_TEXT, () => {
    it(unittest.SERVICE_CREATED_TEXT, () => {
      const { service } = setup();
      expect(service).toBeTruthy();
    });
  });

  describe(unittest.SUITE_METHODS_TEXT, () => {
    
    it('getPostsList ist definiert und wird aufgerufen', waitForAsync(() => {
      const { httpClient, service } = setup();
      spyOn(httpClient, 'get');
      service.getPostsList();
      expect(httpClient.get).toHaveBeenCalled();
    }));

    it('createPost ist definiert und wird aufgerufen', waitForAsync(() => {
      const { httpClient, service } = setup();
      spyOn(httpClient, 'post');
      service.createPost({title: 'test', body: 'test_body', userId: 1});
      expect(httpClient.post).toHaveBeenCalled();
    }));

    it('updatePostById ist definiert und wird aufgerufen', waitForAsync(() => {
      const { httpClient, service } = setup();
      const mockPostId = 3;
      spyOn(httpClient, 'put');
      service.updatePostById(mockPostId, {title: 'updated_title', body: 'updated_body'});
      expect(httpClient.put).toHaveBeenCalled();
    }));

    it('deletePostById ist definiert und wird aufgerufen', waitForAsync(() => {
      const { httpClient, service } = setup();
      const mockPostId = 4;
      spyOn(httpClient, 'delete');
      service.deletePostById(mockPostId);
      expect(httpClient.delete).toHaveBeenCalledTimes(1);
    }));
    
    it('getCommentsById ist definiert und wird aufgerufen', waitForAsync(() => {
      const { httpClient, service } = setup();
      const mockPostId = 4;
      spyOn(httpClient, 'get');
      service.getCommentsById(mockPostId);
      expect(httpClient.get).toHaveBeenCalled();
    }));
  });
});
