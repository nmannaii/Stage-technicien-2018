import { MaterialElementsModule } from './material-elements.module';

describe('MaterialElementsModule', () => {
  let materialElementsModule: MaterialElementsModule;

  beforeEach(() => {
    materialElementsModule = new MaterialElementsModule();
  });

  it('should create an instance', () => {
    expect(materialElementsModule).toBeTruthy();
  });
});
