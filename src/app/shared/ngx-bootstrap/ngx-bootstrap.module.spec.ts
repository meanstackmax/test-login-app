import { NgxBootstrapModule } from './ngx-bootstrap.module';

describe('NgxBootstrapModule', () => {
  let ngxBootstrapModule: NgxBootstrapModule;

  beforeEach(() => {
    ngxBootstrapModule = new NgxBootstrapModule();
  });

  it('should create an instance', () => {
    expect(ngxBootstrapModule).toBeTruthy();
  });
});
